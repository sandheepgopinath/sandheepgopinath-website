export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeuPTAuAAAAAIQhXZiUnVHpfHYcW_n80J5i4Uoj";

declare global {
  interface Window {
    grecaptcha?: {
      enterprise?: {
        ready: (callback: () => void) => void;
        execute: (
          siteKey: string,
          options: { action: string }
        ) => Promise<string>;
      };
    };
  }
}

/**
 * Executes reCAPTCHA Enterprise in the browser to obtain an assessment token.
 */
export async function getRecaptchaToken(action = "CHAT"): Promise<string | null> {
  if (typeof window === "undefined") return null;

  try {
    const enterprise = window.grecaptcha?.enterprise;
    if (!enterprise) {
      return null;
    }

    const checkboxToken = (enterprise as unknown as { getResponse?: () => string }).getResponse?.();
    if (checkboxToken) {
      return checkboxToken;
    }

    return await new Promise<string>((resolve) => {
      try {
        enterprise.ready(async () => {
          try {
            const token = await enterprise.execute(RECAPTCHA_SITE_KEY, { action });
            resolve(token);
          } catch (err) {
            console.warn("reCAPTCHA enterprise execute error:", err);
            resolve("");
          }
        });
      } catch (err) {
        console.warn("reCAPTCHA enterprise ready error:", err);
        resolve("");
      }
    });
  } catch (err) {
    console.warn("Error obtaining reCAPTCHA token:", err);
    return null;
  }
}
