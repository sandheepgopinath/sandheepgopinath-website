import { NextResponse } from "next/server";
import { ADMIN_EMAIL, auth } from "@/auth";
import {
  adminActions,
  analyzeJobDescription,
  type AdminAction,
} from "@/lib/adminAssistant";

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.email?.toLowerCase() !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { action?: string; jobDescription?: string };
    const action = body.action as AdminAction;
    const jobDescription = body.jobDescription?.trim() || "";

    if (!adminActions.includes(action)) {
      return NextResponse.json({ error: "Choose a valid career task." }, { status: 400 });
    }
    if (jobDescription.length < 80) {
      return NextResponse.json(
        { error: "Paste a fuller job description before generating guidance." },
        { status: 400 }
      );
    }
    if (jobDescription.length > 30_000) {
      return NextResponse.json(
        { error: "The job description must be under 30,000 characters." },
        { status: 400 }
      );
    }

    const result = await analyzeJobDescription(action, jobDescription);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Admin career assistant error:", error);
    return NextResponse.json(
      { error: "The career assistant could not complete this request. Please try again." },
      { status: 500 }
    );
  }
}
