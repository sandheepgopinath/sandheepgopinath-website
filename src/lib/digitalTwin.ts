import { getAppCheckToken } from "./firebase";

export const API_URL =
  process.env.NEXT_PUBLIC_DIGITAL_TWIN_API_URL ||
  "https://5a2oalt0ce.execute-api.us-east-1.amazonaws.com/ask";

export type DigitalTwinStatus =
  | "answered"
  | "insufficient_information"
  | "out_of_scope"
  | "verification_failed"
  | "app_check_failed"
  | "invalid_request"
  | "internal_error"
  | "service_disabled"
  | "rate_limit_exceeded"
  | "network_error";

export interface DigitalTwinMessage {
  role: "user" | "assistant";
  content: string;
}

export interface DigitalTwinResponse {
  success: boolean;
  request_id?: string;
  status: DigitalTwinStatus;
  answer: string;
  sources?: string[];
}

/**
 * Sends a question and conversation history to the AWS Digital Twin API
 * protected by Firebase App Check.
 */
export async function askDigitalTwinApi(
  question: string,
  conversationHistory: DigitalTwinMessage[] = [],
  isRetry = false
): Promise<DigitalTwinResponse> {
  // Validate question length (max 1500 chars per spec)
  const sanitizedQuestion = String(question || "").trim().slice(0, 1500);
  if (!sanitizedQuestion) {
    return {
      success: false,
      status: "invalid_request",
      answer: "Please enter a question to ask the digital twin.",
    };
  }

  // Format conversation history: maximum last 6 messages, each content up to 2000 chars
  const sanitizedHistory = conversationHistory.slice(-6).map((m) => ({
    role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
    content: String(m.content || "").slice(0, 2000),
  }));

  try {
    const token = await getAppCheckToken(isRetry);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["X-Firebase-AppCheck"] = token;
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        question: sanitizedQuestion,
        conversation_history: sanitizedHistory,
      }),
    });

    // 403 App Check verification failed -> Attempt one forced token refresh and retry
    if (response.status === 403 && !isRetry) {
      console.warn("App Check 403 received. Retrying once with forced token refresh...");
      return await askDigitalTwinApi(sanitizedQuestion, sanitizedHistory, true);
    }

    // 429 Rate or usage limit exceeded
    if (response.status === 429) {
      let limitMsg = "Daily AI question limit reached. Please check back tomorrow or feel free to email Sandheep at hello@sandheepgopinath.com.";
      try {
        const errJson = await response.json();
        if (errJson.answer || errJson.message) {
          limitMsg = errJson.answer || errJson.message;
        }
      } catch {
        // ignore parse error
      }
      return {
        success: false,
        status: "rate_limit_exceeded",
        answer: limitMsg,
      };
    }

    // 400 Invalid request
    if (response.status === 400) {
      let valMsg = "The request was invalid. Please rephrase your question.";
      try {
        const errJson = await response.json();
        if (errJson.answer || errJson.message) valMsg = errJson.answer || errJson.message;
      } catch {
        // ignore
      }
      return {
        success: false,
        status: "invalid_request",
        answer: valMsg,
      };
    }

    // 502/503/504 Service Unavailable / Timeout
    if ([502, 503, 504].includes(response.status)) {
      return {
        success: false,
        status: "service_disabled",
        answer: "The digital twin service is temporarily unavailable. Please try again in a few moments.",
      };
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        status: (data.status as DigitalTwinStatus) || "internal_error",
        answer:
          data.answer ||
          "I encountered an unexpected issue while processing your inquiry. Please try again.",
        request_id: data.request_id,
        sources: Array.isArray(data.sources) ? data.sources : undefined,
      };
    }

    return {
      success: Boolean(data.success),
      request_id: data.request_id,
      status: (data.status as DigitalTwinStatus) || "answered",
      answer:
        data.answer ||
        "I'm here to answer questions about Sandheep's product leadership and experience.",
      sources: Array.isArray(data.sources) ? data.sources : undefined,
    };
  } catch (error: unknown) {
    console.error("Digital Twin API communication error:", error);
    return {
      success: false,
      status: "network_error",
      answer:
        "Unable to connect to the digital twin service. Please check your internet connection or try again shortly.",
    };
  }
}
