"use client";

import { useState } from "react";
import { Briefcase, FolderArchive } from "lucide-react";
import { AdminWorkspace } from "./AdminWorkspace";
import { FilesWorkspace } from "./FilesWorkspace";
import styles from "./admin.module.css";

export function AdminTabs() {
  const [activeTab, setActiveTab] = useState<"workbench" | "files">("workbench");

  return (
    <>
      <nav className={styles.tabNav} aria-label="Admin Navigation">
        <button
          type="button"
          onClick={() => setActiveTab("workbench")}
          className={activeTab === "workbench" ? styles.tabActive : styles.tabButton}
          aria-selected={activeTab === "workbench"}
          role="tab"
        >
          <Briefcase aria-hidden="true" />
          <span>Career Workbench</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("files")}
          className={activeTab === "files" ? styles.tabActive : styles.tabButton}
          aria-selected={activeTab === "files"}
          role="tab"
        >
          <FolderArchive aria-hidden="true" />
          <span>Files & Resume</span>
        </button>
      </nav>

      {activeTab === "workbench" ? <AdminWorkspace /> : <FilesWorkspace />}
    </>
  );
}
