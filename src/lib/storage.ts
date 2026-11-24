import fs from "fs";
import path from "path";

export interface ResumeMetadata {
  filename: string;
  size: number;
  updatedAt: string;
  downloadUrl: string;
  uploadedBy?: string;
}

const PUBLIC_DIR = path.join(process.cwd(), "public");
const UPLOADS_DIR = path.join(PUBLIC_DIR, "uploads");
const METADATA_FILE = path.join(UPLOADS_DIR, "resume-metadata.json");
const PRIMARY_RESUME_NAME = "Sandheep Gopinath Resume 2026.pdf";
const SECONDARY_RESUME_NAME = "Sandheep_Gopinath_Resume.pdf";
const ACTIVE_UPLOAD_NAME = "latest-resume.pdf";

function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

/**
 * Returns metadata about the currently active resume.
 */
export async function getResumeMetadata(): Promise<ResumeMetadata> {
  ensureUploadsDir();

  // 1. Try reading the saved metadata JSON
  if (fs.existsSync(METADATA_FILE)) {
    try {
      const content = fs.readFileSync(METADATA_FILE, "utf-8");
      const data = JSON.parse(content) as ResumeMetadata;
      if (data && data.filename) {
        return data;
      }
    } catch {
      // Fallback if JSON is malformed
    }
  }

  // 2. Fallback to existing public resume files
  const candidates = [
    path.join(UPLOADS_DIR, ACTIVE_UPLOAD_NAME),
    path.join(PUBLIC_DIR, PRIMARY_RESUME_NAME),
    path.join(PUBLIC_DIR, SECONDARY_RESUME_NAME),
  ];

  for (const filePath of candidates) {
    if (fs.existsSync(/*turbopackIgnore: true*/ filePath)) {
      const stats = fs.statSync(/*turbopackIgnore: true*/ filePath);
      return {
        filename: path.basename(filePath),
        size: stats.size,
        updatedAt: stats.mtime.toISOString(),
        downloadUrl: "/api/resume/download",
      };
    }
  }

  return {
    filename: PRIMARY_RESUME_NAME,
    size: 0,
    updatedAt: new Date().toISOString(),
    downloadUrl: "/api/resume/download",
  };
}

/**
 * Saves a newly uploaded resume buffer to local storage / public directory.
 */
export async function saveResumeFile(
  buffer: Buffer,
  originalFilename: string,
  uploaderEmail?: string
): Promise<ResumeMetadata> {
  ensureUploadsDir();

  const cleanFilename = originalFilename.trim() || PRIMARY_RESUME_NAME;
  const activeUploadPath = path.join(UPLOADS_DIR, ACTIVE_UPLOAD_NAME);
  const primaryPath = path.join(PUBLIC_DIR, PRIMARY_RESUME_NAME);
  const secondaryPath = path.join(PUBLIC_DIR, SECONDARY_RESUME_NAME);

  // Write to active upload path
  fs.writeFileSync(activeUploadPath, buffer);

  // Also synchronize to the canonical static files in public
  try {
    fs.writeFileSync(primaryPath, buffer);
    fs.writeFileSync(secondaryPath, buffer);
  } catch (err) {
    console.warn("Could not sync to canonical public files:", err);
  }

  const metadata: ResumeMetadata = {
    filename: cleanFilename,
    size: buffer.length,
    updatedAt: new Date().toISOString(),
    downloadUrl: "/api/resume/download",
    uploadedBy: uploaderEmail,
  };

  fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2), "utf-8");

  return metadata;
}

/**
 * Retrieves the raw resume file buffer and headers for downloading.
 */
export async function getResumeFile(): Promise<{
  buffer: Buffer;
  filename: string;
  size: number;
  contentType: string;
  updatedAt: string;
} | null> {
  const metadata = await getResumeMetadata();

  const candidates = [
    path.join(UPLOADS_DIR, ACTIVE_UPLOAD_NAME),
    path.join(PUBLIC_DIR, PRIMARY_RESUME_NAME),
    path.join(PUBLIC_DIR, SECONDARY_RESUME_NAME),
  ];

  for (const filePath of candidates) {
    if (fs.existsSync(/*turbopackIgnore: true*/ filePath)) {
      const buffer = fs.readFileSync(/*turbopackIgnore: true*/ filePath);
      return {
        buffer,
        filename: metadata.filename || PRIMARY_RESUME_NAME,
        size: buffer.length,
        contentType: "application/pdf",
        updatedAt: metadata.updatedAt,
      };
    }
  }

  return null;
}
