import { connection, NextResponse } from "next/server";
import { getResumeFile } from "@/lib/storage";

export async function GET() {
  await connection();

  try {
    const fileData = await getResumeFile();

    if (!fileData) {
      return new NextResponse("Resume file not found.", { status: 404 });
    }

    const encodedFilename = encodeURIComponent(fileData.filename).replace(/['()]/g, escape);

    return new NextResponse(new Uint8Array(fileData.buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileData.filename.replace(/"/g, "")}"; filename*=UTF-8''${encodedFilename}`,
        "Content-Length": fileData.size.toString(),
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error serving resume download:", error);
    return new NextResponse("Failed to retrieve resume.", { status: 500 });
  }
}
