import { NextRequest, NextResponse } from "next/server";
import { askDigitalTwin, ChatMessage } from "@/lib/bedrock";
import { verifyRecaptcha } from "@/lib/recaptchaServer";
import { createChatSessionToken, isValidChatSessionToken } from "@/lib/chatSession";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, recaptchaToken, sessionToken } = body;

    // Check if user has an active valid session token (via cookie or request payload)
    const cookieToken = req.cookies.get("chat_session")?.value;
    const isSessionVerified =
      isValidChatSessionToken(sessionToken) || isValidChatSessionToken(cookieToken);

    let newSessionToken: string | null = null;

    if (!isSessionVerified) {
      // First message or expired session: Fraud defense verification via reCAPTCHA Enterprise
      const verification = await verifyRecaptcha(recaptchaToken, "CHAT");
      if (!verification.success) {
        return NextResponse.json(
          {
            text: "Verification failed. Our fraud defense system detected automated traffic. Please complete the verification checkbox and try again.",
            source: "offline-knowledge-base",
            error: verification.error || "Bot verification failed",
            requireVerification: true,
          },
          { status: 403 }
        );
      }
      // Verification succeeded: Issue signed chat session token valid for 30 minutes
      newSessionToken = createChatSessionToken();
    }

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

    const activeSession = newSessionToken || sessionToken || cookieToken;
    const response = NextResponse.json({
      ...result,
      sessionToken: activeSession,
      verified: true,
    });

    if (newSessionToken) {
      response.cookies.set("chat_session", newSessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 60, // 30 minutes
        path: "/",
      });
    }

    return response;
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
