import { getAppCheckToken } from "./firebase";

export const API_URL =
  process.env.NEXT_PUBLIC_DIGITAL_TWIN_API_URL ||
  "https://5a2oalt0ce.execute-api.us-east-1.amazonaws.com/ask";

export interface DigitalTwinResponse {
  success?: boolean;
  request_id?: string;
  status?: string;
  answer?: string;
  sources?: string[];
  [key: string]: unknown;
}

export async function askDigitalTwinApi(
  question: string,
  conversationHistory: { role: string; content: string }[] = []
): Promise<DigitalTwinResponse> {
  const token = await getAppCheckToken();

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
      question,
      conversation_history: conversationHistory.slice(-6),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.answer || data.message || "Unable to process the request.");
  }

  return data;
}
