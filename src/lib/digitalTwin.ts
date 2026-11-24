import { getAppCheckToken } from "./firebase";

export const API_URL =
  process.env.NEXT_PUBLIC_DIGITAL_TWIN_API_URL ||
  "https://5a2oalt0ce.execute-api.us-east-1.amazonaws.com/ask";

export const MAX_QUESTION_LENGTH = 1500;
export const MAX_HISTORY_MESSAGES = 6;
export const REQUEST_TIMEOUT = 30000;

export interface DigitalTwinMessage {
  role: "user" | "assistant";
  content: string;
}

export interface DigitalTwinResult {
  answer: string;
  status: string;
  sources: string[];
  requestId?: string;
}

export interface ApiError extends Error {
  httpStatus?: number;
  status?: string;
}

async function makeRequest(
  question: string,
  conversationHistory: DigitalTwinMessage[],
  forceRefresh = false
) {
  const token = await getAppCheckToken(forceRefresh);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck": token,
      },
      body: JSON.stringify({
        question,
        conversation_history: conversationHistory
          .slice(-MAX_HISTORY_MESSAGES)
          .map((message) => ({
            role: message.role,
            content: message.content.slice(0, 2000),
          })),
      }),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));

    return { response, data };
  } finally {
    clearTimeout(timeout);
  }
}

export async function askDigitalTwin(
  question: string,
  conversationHistory: DigitalTwinMessage[] = []
): Promise<DigitalTwinResult> {
  const cleanQuestion = question.trim();

  if (!cleanQuestion) {
    throw new Error("Please enter a question.");
  }

  if (cleanQuestion.length > MAX_QUESTION_LENGTH) {
    throw new Error("Your question must be under 1,500 characters.");
  }

  let result = await makeRequest(cleanQuestion, conversationHistory);

  // Refresh verification once if rejected.
  if (
    result.response.status === 403 &&
    result.data.status === "app_check_failed"
  ) {
    result = await makeRequest(cleanQuestion, conversationHistory, true);
  }

  const { response, data } = result;

  if (!response.ok) {
    const error: ApiError = new Error(
      data.answer || "The assistant is temporarily unavailable."
    );
    error.httpStatus = response.status;
    error.status = data.status;
    throw error;
  }

  if (!data.success || typeof data.answer !== "string") {
    throw new Error("Invalid response from the assistant.");
  }

  return {
    answer: data.answer,
    status: data.status,
    sources: data.sources || [],
    requestId: data.request_id,
  };
}
