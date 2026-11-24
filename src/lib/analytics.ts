export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-T0TCPRECHN";

export type GTagEventParams = Record<
  string,
  string | number | boolean | undefined | null
>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "set",
      targetIdOrAction: string | Date,
      params?: GTagEventParams
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Sends a custom event to Google Analytics.
 */
export function trackEvent(eventName: string, params?: GTagEventParams) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", eventName, params);
  } catch {
    // Fail silently in case of ad-blockers
  }
}

/**
 * Common convenience tracking methods
 */
export function trackButtonClick(
  buttonName: string,
  section?: string,
  extra?: GTagEventParams
) {
  trackEvent("button_click", {
    button_name: buttonName,
    section: section || "page",
    ...extra,
  });
}

export function trackResumeDownload(
  location: string,
  filename = "Sandheep_Gopinath_Resume_2026.pdf"
) {
  trackEvent("resume_download", {
    location,
    filename,
    event_category: "Conversion",
    event_label: `Resume Download from ${location}`,
  });
}

export function trackMeetingClick(source: string) {
  trackEvent("schedule_meeting_click", {
    source,
    event_category: "Conversion",
    event_label: "Calendly Meeting Trigger",
  });
}

export function trackEmailClick(source: string) {
  trackEvent("email_click", {
    source,
    event_category: "Conversion",
  });
}

export function trackDigitalTwin(
  action: "open" | "close" | "message_sent" | "preset_clicked",
  prompt?: string
) {
  trackEvent("digital_twin_interaction", {
    action,
    prompt: prompt ? prompt.slice(0, 100) : undefined,
    event_category: "Interactive",
  });
}

export function trackMusic(
  action: "play" | "pause" | "choice_yes" | "choice_no"
) {
  trackEvent("ambient_music_interaction", {
    action,
    event_category: "Interactive",
  });
}

export function trackScrollMilestone(percentage: number) {
  trackEvent("scroll_milestone", {
    depth_percentage: percentage,
    event_category: "Engagement",
  });
}

export function trackSectionView(sectionName: string, dwellSeconds: number) {
  trackEvent("section_view", {
    section_name: sectionName,
    dwell_seconds: dwellSeconds,
    event_category: "Engagement",
  });
}
