"use client";

import { useEffect } from "react";
import Script from "next/script";
import {
  GA_MEASUREMENT_ID,
  trackEvent,
  trackResumeDownload,
  trackMeetingClick,
  trackEmailClick,
  trackScrollMilestone,
  trackSectionView,
} from "@/lib/analytics";

export function AnalyticsProvider() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

    // 1. Global Click & Interaction Delegation
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest<HTMLElement>(
        "button, a, [data-analytics], [role='button']"
      );
      if (!clickable) return;

      // Extract details
      const text =
        clickable.getAttribute("data-analytics") ||
        clickable.getAttribute("aria-label") ||
        clickable.innerText?.trim()?.slice(0, 60) ||
        clickable.getAttribute("title") ||
        "unnamed_button";

      const href = clickable.getAttribute("href") || "";
      const nearestSection =
        clickable.closest("section[id], div[id]")?.id || "unspecified";

      // Track general button click
      trackEvent("button_click", {
        button_text: text,
        section: nearestSection,
        target_href: href ? href.slice(0, 100) : undefined,
      });

      // Track specialized conversion intents automatically
      if (href.includes("/api/resume/download") || href.toLowerCase().endsWith(".pdf")) {
        trackResumeDownload(nearestSection);
      } else if (href.startsWith("mailto:")) {
        trackEmailClick(nearestSection);
      } else if (href.includes("calendly.com")) {
        trackMeetingClick(nearestSection);
      }
    };

    document.addEventListener("click", handleDocumentClick, { passive: true });

    // 2. Granular Scroll Depth Tracker (25%, 50%, 75%, 100%)
    const milestones = new Set<number>();
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;

        if (docHeight > 0) {
          const scrollPercent = Math.min(
            100,
            Math.round((scrollTop / docHeight) * 100)
          );

          const checkMilestones = [25, 50, 75, 100];
          for (const m of checkMilestones) {
            if (scrollPercent >= m && !milestones.has(m)) {
              milestones.add(m);
              trackScrollMilestone(m);
            }
          }
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // 3. Section Dwell Time & Visibility Tracker
    const sectionEnterTimes = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        const now = Date.now();
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (!sectionId) return;

          if (entry.isIntersecting) {
            sectionEnterTimes.set(sectionId, now);
          } else {
            const enterTime = sectionEnterTimes.get(sectionId);
            if (enterTime) {
              const dwellSeconds = Math.round((now - enterTime) / 1000);
              // Only record if user spent at least 3 seconds reading the section
              if (dwellSeconds >= 3) {
                trackSectionView(sectionId, dwellSeconds);
              }
              sectionEnterTimes.delete(sectionId);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const trackedSections = document.querySelectorAll(
      "section[id], [data-track-section]"
    );
    trackedSections.forEach((el) => observer.observe(el));

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
