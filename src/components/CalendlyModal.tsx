"use client";

import React, { useState, useEffect } from "react";
import { portfolioV5Data } from "@/data/portfolioData";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  const [calendlyUrl, setCalendlyUrl] = useState(portfolioV5Data.calendly);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sg_calendly_v2");
      if (saved) setCalendlyUrl(saved);
    } catch {
      // ignore
    }
  }, []);

  const handleSaveAndOpen = () => {
    const v = calendlyUrl.trim();
    try {
      const u = new URL(v);
      if (u.protocol !== "https:" || !(u.hostname === "calendly.com" || u.hostname.endsWith(".calendly.com"))) {
        throw new Error();
      }
      try {
        localStorage.setItem("sg_calendly_v2", v);
      } catch {
        // ignore
      }
      setError("");
      onClose();
      window.open(v, "_blank", "noopener,noreferrer");
    } catch {
      setError("Please enter a valid https://calendly.com/... link.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#17211b96] backdrop-blur-xs p-5"
      onClick={onClose}
    >
      <div
        className="bg-[#fbfbf8] p-[32px] w-[min(430px,100%)] relative shadow-[0_25px_90px_rgba(0,0,0,0.2)] rounded-[3px] border border-[#d5d9d2]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="liquid-glass-button liquid-glass-button--icon absolute top-[15px] right-[20px] text-[#647266] hover:text-black text-[22px]"
        >
          ✕
        </button>
        <h3 className="serif-font text-[21px] font-normal text-[#252a28] mb-2">Book a meeting</h3>
        <p className="text-[13px] leading-[1.8] text-[#657066] mb-4">
          Connect directly on Calendly for an introductory chat, product discussion, or advisory collaboration.
        </p>
        <input
          type="url"
          value={calendlyUrl}
          onChange={(e) => setCalendlyUrl(e.target.value)}
          placeholder="https://calendly.com/sandheepgopinath"
          className="w-full p-[12px] border border-[#cbd4c8] text-[12px] text-[#252a28] rounded-[2px] bg-white focus:outline-none focus:border-[#6f8071]"
        />
        {error && <p className="text-[11px] text-red-600 mt-1">{error}</p>}

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSaveAndOpen}
            className="btn btn-dark w-full justify-center text-center py-3 text-[11px]"
          >
            Open Calendly ↗
          </button>
        </div>
      </div>
    </div>
  );
}
