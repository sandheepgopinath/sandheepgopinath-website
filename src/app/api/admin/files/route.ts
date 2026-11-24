import { NextResponse } from "next/server";
import { ADMIN_EMAIL, auth } from "@/auth";
import { getResumeMetadata, saveResumeFile } from "@/lib/storage";

export async function GET() {
  const session = await auth();
  if (session?.user?.email?.toLowerCase() !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const metadata = await getResumeMetadata();
    return NextResponse.json({ metadata });
  } catch (error) {
    console.error("Error fetching resume metadata:", error);
    return NextResponse.json({ error: "Failed to read file metadata" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.email?.toLowerCase() !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file was uploaded." }, { status: 400 });
    }

    // Validate file type
    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF documents (.pdf) are allowed." },
        { status: 400 }
      );
    }

    // Max 25 MB
    const MAX_SIZE = 25 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File exceeds the 25MB maximum size limit." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const metadata = await saveResumeFile(
      buffer,
      file.name,
      session.user?.email || ADMIN_EMAIL
    );

    return NextResponse.json({
      success: true,
      message: "Resume updated successfully.",
      metadata,
    });
  } catch (error) {
    console.error("Error saving resume upload:", error);
    return NextResponse.json(
      { error: "Internal server error while saving file." },
      { status: 500 }
    );
  }
}
