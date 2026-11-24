export interface RecaptchaVerificationResult {
  success: boolean;
  score?: number;
  action?: string;
  reasons?: string[];
  error?: string;
}

const PROJECT_ID =
  process.env.GOOGLE_CLOUD_PROJECT || "sandheep-portfolio-6321";
const SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeuPTAuAAAAAIQhXZiUnVHpfHYcW_n80J5i4Uoj";

/**
 * Automatically retrieves a Google Cloud IAM access token from the GCP metadata server
 * when running inside Cloud Run / Cloud Functions / Firebase Hosting.
 */
async function getGcpServiceAccountToken(): Promise<string | null> {
  try {
    const res = await fetch(
      "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token",
      {
        headers: { "Metadata-Flavor": "Google" },
        signal: AbortSignal.timeout(1500),
      }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { access_token?: string };
    return data.access_token || null;
  } catch {
    // Not running inside GCP or metadata server unreachable (e.g. local dev)
    return null;
  }
}

/**
 * Server-side verification for reCAPTCHA Enterprise tokens via Google Cloud Assessments API.
 */
export async function verifyRecaptcha(
  token: string | undefined | null,
  expectedAction = "CHAT"
): Promise<RecaptchaVerificationResult> {
  if (!token) {
    if (process.env.RECAPTCHA_ENFORCE === "true") {
      return {
        success: false,
        error: "Missing reCAPTCHA fraud defense token.",
      };
    }
    return { success: true };
  }

  // 1. Try Google Cloud IAM Authentication (Native on Firebase Cloud Run)
  const gcpToken = await getGcpServiceAccountToken();
  const apiKey = process.env.RECAPTCHA_API_KEY || process.env.GOOGLE_API_KEY;

  if (gcpToken || apiKey) {
    try {
      const url = apiKey
        ? `https://recaptchaenterprise.googleapis.com/v1/projects/${PROJECT_ID}/assessments?key=${apiKey}`
        : `https://recaptchaenterprise.googleapis.com/v1/projects/${PROJECT_ID}/assessments`;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (gcpToken) {
        headers["Authorization"] = `Bearer ${gcpToken}`;
      }

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          event: {
            token,
            expectedAction,
            siteKey: SITE_KEY,
          },
        }),
      });

      const assessment = await res.json();

      if (!res.ok) {
        console.warn("reCAPTCHA Enterprise assessment response:", assessment);
        // Do not block human visitors if the GCP project role needs a permission
        return { success: true };
      }

      if (!assessment.tokenProperties?.valid) {
        return {
          success: false,
          error: `reCAPTCHA invalid: ${assessment.tokenProperties?.invalidReason || "Failed assessment"}`,
        };
      }

      const score = assessment.riskAnalysis?.score ?? 1.0;
      if (score < 0.3) {
        return {
          success: false,
          score,
          reasons: assessment.riskAnalysis?.reasons,
          error: "Low confidence score (potential bot detected).",
        };
      }

      return {
        success: true,
        score,
        action: assessment.tokenProperties?.action,
        reasons: assessment.riskAnalysis?.reasons,
      };
    } catch (err) {
      console.warn("reCAPTCHA assessment request failed:", err);
      return { success: true };
    }
  }

  // 2. Fallback token sanity check
  if (typeof token === "string" && token.length > 20) {
    return { success: true };
  }

  return { success: false, error: "Invalid token format." };
}
