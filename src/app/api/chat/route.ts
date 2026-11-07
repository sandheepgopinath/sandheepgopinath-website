import { NextRequest, NextResponse } from "next/server";
import { askDigitalTwin, ChatMessage } from "@/lib/bedrock";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required." },
        { status: 400 }
      );
    }

    // Limit conversation history to last 10 messages for speed and context sanity
    const recentMessages: ChatMessage[] = messages.slice(-10).map((m: { role?: string; content?: string }) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content || "").slice(0, 2000), // sanitize length
    }));

    const result = await askDigitalTwin(recentMessages);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        text: "I apologize, but I encountered a temporary issue processing your question. Please feel free to email Sandheep at hello@sandheepgopinath.com or try again.",
        source: "offline-knowledge-base",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
