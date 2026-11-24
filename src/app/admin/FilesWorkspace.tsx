"use client";

import { useEffect, useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Loader2,
  Download,
  RefreshCw,
  Clock,
  HardDrive,
} from "lucide-react";
import styles from "./admin.module.css";

interface ResumeMetadata {
  filename: string;
  size: number;
  updatedAt: string;
  downloadUrl: string;
  uploadedBy?: string;
}

function formatBytes(bytes: number, decimals = 1) {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function formatDate(isoString: string) {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

export function FilesWorkspace() {
  const [metadata, setMetadata] = useState<ResumeMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function fetchMetadata() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/files");
      if (!res.ok) throw new Error("Failed to load file status.");
      const data = await res.json();
      setMetadata(data.metadata);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading files.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMetadata();
  }, []);

  async function handleFileUpload(file: File) {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      setError("Please select a PDF file (.pdf).");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setError("File is larger than the 25MB limit.");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/files", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload resume.");
      }

      setMetadata(data.metadata);
      setSuccessMessage(
        `"${file.name}" was successfully uploaded! The public resume download has been updated immediately.`
      );
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload error.");
    } finally {
      setUploading(false);
    }
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }

  return (
    <div className={styles.filesWorkspace}>
      {/* Overview & Instructions */}
      <section className={styles.filesSectionHeader}>
        <div>
          <span className={styles.eyebrow}>STORAGE & ASSET MANAGEMENT</span>
          <h2>Resume Storage</h2>
          <p>
            Upload and update your official CV. When updated here, the latest PDF is
            saved to storage and dynamically served to visitors downloading your resume
            across the website.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchMetadata}
          className={styles.refreshButton}
          title="Refresh status"
          disabled={loading || uploading}
        >
          <RefreshCw className={loading ? styles.spinner : ""} aria-hidden="true" />
          <span>Refresh</span>
        </button>
      </section>

      {/* Messages */}
      {error && (
        <div className={styles.filesAlertError} role="alert">
          <AlertCircle aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className={styles.filesAlertSuccess} role="status">
          <CheckCircle2 aria-hidden="true" />
          <span>{successMessage}</span>
        </div>
      )}

      <div className={styles.filesGrid}>
        {/* Upload Zone */}
        <div
          className={`${styles.dropZone} ${dragOver ? styles.dropZoneActive : ""} ${
            uploading ? styles.dropZoneUploading : ""
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => {
            if (!uploading && fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,application/pdf"
            className={styles.hiddenFileInput}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFileUpload(e.target.files[0]);
              }
            }}
            disabled={uploading}
          />
          <div className={styles.dropZoneContent}>
            <div className={styles.dropZoneIcon}>
              {uploading ? (
                <Loader2 className={styles.spinner} aria-hidden="true" />
              ) : (
                <UploadCloud aria-hidden="true" />
              )}
            </div>
            <h3>
              {uploading ? "Uploading & Saving..." : "Upload New Resume PDF"}
            </h3>
            <p>
              {uploading
                ? "Writing to storage and synchronizing assets..."
                : "Drag & drop your new resume PDF here, or click to browse"}
            </p>
            <span className={styles.dropZoneBadge}>PDF up to 25MB</span>
          </div>
        </div>

        {/* Current Active Resume Details Card */}
        <div className={styles.fileDetailsCard}>
          <div className={styles.cardHeader}>
            <span className={styles.eyebrow}>CURRENT ACTIVE FILE</span>
            <h3>Live Resume on Website</h3>
          </div>

          {loading ? (
            <div className={styles.fileDetailsLoading}>
              <Loader2 className={styles.spinner} aria-hidden="true" />
              <span>Checking active storage...</span>
            </div>
          ) : metadata ? (
            <div className={styles.fileDetailsContent}>
              <div className={styles.filePrimaryRow}>
                <div className={styles.fileTypeBadge}>
                  <FileText aria-hidden="true" />
                </div>
                <div className={styles.fileInfo}>
                  <strong className={styles.fileName}>{metadata.filename}</strong>
                  <div className={styles.fileMetaList}>
                    <span>
                      <HardDrive aria-hidden="true" /> {formatBytes(metadata.size)}
                    </span>
                    <span>
                      <Clock aria-hidden="true" /> {formatDate(metadata.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.fileEndpointBox}>
                <div className={styles.fileEndpointLabel}>PUBLIC DOWNLOAD ENDPOINT</div>
                <code className={styles.fileEndpointCode}>
                  {metadata.downloadUrl}
                </code>
              </div>

              <div className={styles.fileCardActions}>
                <a
                  href="/api/resume/download"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.downloadLinkButton}
                >
                  <Download aria-hidden="true" />
                  <span>Download Live File</span>
                </a>
                <a
                  href="/api/resume/download"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.previewLinkButton}
                >
                  <ExternalLink aria-hidden="true" />
                  <span>Test Endpoint ↗</span>
                </a>
              </div>
            </div>
          ) : (
            <div className={styles.emptyFilesState}>
              <FileText aria-hidden="true" />
              <p>No active resume file found in storage.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
