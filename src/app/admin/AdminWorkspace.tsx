"use client";

import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Check,
  Clipboard,
  FilePenLine,
  GraduationCap,
  Loader2,
  Mail,
  MessageSquareText,
  SearchCheck,
  Sparkles,
} from "lucide-react";
import type { AdminAction } from "@/lib/adminAssistant";
import styles from "./admin.module.css";

const tasks: Array<{
  id: AdminAction;
  label: string;
  description: string;
  icon: typeof SearchCheck;
}> = [
  { id: "fit-analysis", label: "Assess fit", description: "Match, gaps and positioning", icon: SearchCheck },
  { id: "resume", label: "Tailor résumé", description: "Summary, bullets and ATS keywords", icon: FilePenLine },
  { id: "cover-letter", label: "Cover letter", description: "A specific, ready-to-edit draft", icon: Mail },
  { id: "outreach", label: "Outreach", description: "Recruiter, manager and referral notes", icon: MessageSquareText },
  { id: "interview", label: "Interview prep", description: "Stories, questions and study topics", icon: GraduationCap },
];

function renderInline(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index}>{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  );
}

function Result({ content }: { content: string }) {
  return (
    <div className={styles.resultBody}>
      {content.split("\n").map((line, index) => {
        const value = line.trim();
        if (!value) return <div className={styles.resultGap} key={index} />;
        if (value.startsWith("### ")) return <h3 key={index}>{renderInline(value.slice(4))}</h3>;
        if (value.startsWith("## ")) return <h2 key={index}>{renderInline(value.slice(3))}</h2>;
        if (value.startsWith("# ")) return <h2 key={index}>{renderInline(value.slice(2))}</h2>;
        if (/^[-*•]\s/.test(value)) return <div className={styles.resultBullet} key={index}><span>•</span><p>{renderInline(value.slice(2))}</p></div>;
        if (/^\d+\.\s/.test(value)) return <p key={index}>{renderInline(value)}</p>;
        return <p key={index}>{renderInline(value)}</p>;
      })}
    </div>
  );
}

export function AdminWorkspace() {
  const [jobDescription, setJobDescription] = useState("");
  const [task, setTask] = useState<AdminAction>("fit-analysis");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setJobDescription(localStorage.getItem("admin-job-description") || "");
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      localStorage.setItem("admin-job-description", jobDescription);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [jobDescription]);

  async function generate() {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const response = await fetch("/api/admin/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: task, jobDescription }),
      });
      const data = (await response.json()) as { result?: string; error?: string };
      if (!response.ok || !data.result) throw new Error(data.error || "Unable to generate guidance.");
      setResult(data.result);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to generate guidance.");
    } finally {
      setLoading(false);
    }
  }

  async function copyResult() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  const activeTask = tasks.find((item) => item.id === task) ?? tasks[0];

  return (
    <div className={styles.workspace}>
      <section className={styles.inputPanel}>
        <div className={styles.panelHeading}>
          <div>
            <span className={styles.eyebrow}>01 · ROLE CONTEXT</span>
            <h2>Paste the job description</h2>
          </div>
          <span className={styles.characterCount}>{jobDescription.length.toLocaleString()} / 30,000</span>
        </div>
        <textarea
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value.slice(0, 30_000))}
          placeholder="Paste the complete role description here — responsibilities, requirements, company context and anything else that matters."
          aria-label="Job description"
        />
        <div className={styles.privacyNote}>
          <BriefcaseBusiness aria-hidden="true" />
          <span>Saved only in this browser. Submitted securely when you generate an output.</span>
          {jobDescription && <button type="button" onClick={() => { setJobDescription(""); setResult(""); }}>Clear</button>}
        </div>
      </section>

      <section className={styles.taskPanel}>
        <div className={styles.panelHeading}>
          <div>
            <span className={styles.eyebrow}>02 · CHOOSE AN OUTPUT</span>
            <h2>What should we work on?</h2>
          </div>
        </div>
        <div className={styles.taskGrid}>
          {tasks.map((item) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                key={item.id}
                className={task === item.id ? styles.activeTask : styles.task}
                onClick={() => setTask(item.id)}
                aria-pressed={task === item.id}
              >
                <Icon aria-hidden="true" />
                <span><strong>{item.label}</strong><small>{item.description}</small></span>
                {task === item.id && <Check className={styles.taskCheck} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className={styles.generateButton}
          disabled={loading || jobDescription.trim().length < 80}
          onClick={generate}
        >
          {loading ? <Loader2 className={styles.spinner} aria-hidden="true" /> : <Sparkles aria-hidden="true" />}
          {loading ? "Working through the role…" : `Generate ${activeTask.label.toLowerCase()}`}
        </button>
        {error && <p className={styles.error} role="alert">{error}</p>}
      </section>

      <section className={styles.outputPanel} aria-live="polite">
        <div className={styles.outputHeader}>
          <div>
            <span className={styles.eyebrow}>03 · CAREER WORKBENCH</span>
            <h2>{result ? activeTask.label : "Your tailored output"}</h2>
          </div>
          {result && (
            <button type="button" className={styles.copyButton} onClick={copyResult}>
              {copied ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
        {loading ? (
          <div className={styles.emptyState}><Loader2 className={styles.largeSpinner} /><p>Connecting your experience to this opportunity…</p></div>
        ) : result ? (
          <Result content={result} />
        ) : (
          <div className={styles.emptyState}><Sparkles /><p>Paste a role, choose an output, and your tailored guidance will appear here.</p></div>
        )}
      </section>
    </div>
  );
}
