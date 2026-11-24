"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Music2, Volume2, VolumeX } from "lucide-react";
import { portfolioV5Data } from "@/data/portfolioData";

interface NavbarProps {
  onOpenDigitalTwin: () => void;
  onOpenCalendly: () => void;
  isMusicPlaying?: boolean;
  onToggleMusic?: () => void;
}

export function Navbar({
  onOpenDigitalTwin,
  onOpenCalendly,
  isMusicPlaying = false,
  onToggleMusic,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header relative z-20">
      <div className="nav-wrap h-[78px] flex items-center justify-between">
        {/* Brand */}
        <a href="#top" className="site-brand">
          <Image
            src="/sandheep-mark.png"
            alt=""
            aria-hidden="true"
            width={32}
            height={32}
            className="site-brand-mark"
            priority
          />
          <span className="site-brand-name">{portfolioV5Data.name}</span>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden min-[1101px]:flex items-center gap-[32px]">
          <a href="#expertise" className="text-[14px] text-[#252a28] hover:text-[#111] transition-colors">
            Expertise
          </a>
          <a href="#experience" className="text-[14px] text-[#252a28] hover:text-[#111] transition-colors">
            Experience
          </a>
          <a href="#work" className="text-[14px] text-[#252a28] hover:text-[#111] transition-colors">
            Work
          </a>
          <a href="#philosophy" className="text-[14px] text-[#252a28] hover:text-[#111] transition-colors">
            How I think
          </a>
          <a href="#reading" className="text-[14px] text-[#252a28] hover:text-[#111] transition-colors">
            Reading
          </a>

          {/* Desktop Music Control */}
          {onToggleMusic && (
            <button
              type="button"
              onClick={onToggleMusic}
              className={`liquid-glass-button px-3 py-2 text-[12.5px] font-medium flex items-center gap-2 cursor-pointer transition-all ${
                isMusicPlaying
                  ? "border-[#8fa895] bg-[#e3eae4] text-[#1c3825] shadow-xs"
                  : "text-[#5d6760] opacity-85 hover:opacity-100"
              }`}
              title={isMusicPlaying ? "Turn off background music" : "Play soothing background music"}
              aria-label={isMusicPlaying ? "Turn off music" : "Play soothing music"}
              aria-pressed={isMusicPlaying}
            >
              {isMusicPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#254d31]" aria-hidden="true" />
                  <span>Turn off music</span>
                  <span className="flex items-center gap-[2px] ml-0.5" aria-hidden="true">
                    <span className="w-[2px] h-[7px] bg-[#2d5c3b] rounded-full animate-pulse" />
                    <span className="w-[2px] h-[11px] bg-[#2d5c3b] rounded-full animate-pulse [animation-delay:200ms]" />
                    <span className="w-[2px] h-[5px] bg-[#2d5c3b] rounded-full animate-pulse [animation-delay:400ms]" />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#636f66]" aria-hidden="true" />
                  <span>Play music</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={onOpenDigitalTwin}
            className="liquid-glass-button liquid-glass-button--primary px-[21px] py-[13px] text-[13px] font-medium"
          >
            Talk to my digital twin ↗
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 min-[1101px]:hidden">
          {/* Mobile Music Toggle directly in header */}
          {onToggleMusic && (
            <button
              type="button"
              onClick={onToggleMusic}
              aria-label={isMusicPlaying ? "Turn off background music" : "Play soothing background music"}
              title={isMusicPlaying ? "Turn off background music" : "Play soothing background music"}
              aria-pressed={isMusicPlaying}
              className={`liquid-glass-button liquid-glass-button--icon header-music-mobile-btn flex items-center justify-center transition-all ${
                isMusicPlaying ? "border-[#8fa895] bg-[#e3eae4] text-[#1c3825] shadow-xs" : "text-[#5d6760]"
              }`}
            >
              {isMusicPlaying ? (
                <Volume2 className="w-4 h-4 text-[#254d31]" aria-hidden="true" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#636f66]" aria-hidden="true" />
              )}
            </button>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className={`mobile-menu-trigger liquid-glass-button liquid-glass-button--icon ${mobileMenuOpen ? "is-open" : ""}`}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <nav className="min-[1101px]:hidden bg-[#eeeee9] border-t border-[#d6d9d2] px-6 py-6 flex flex-col gap-5 text-[12px] text-[#344038]">
          <a href="#expertise" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">
            Expertise
          </a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">
            Experience
          </a>
          <a href="#work" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">
            Work
          </a>
          <a href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">
            How I think
          </a>
          <a href="#reading" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">
            Reading
          </a>

          {/* Mobile drawer music toggle option */}
          {onToggleMusic && (
            <button
              type="button"
              onClick={() => {
                onToggleMusic();
              }}
              className={`liquid-glass-button w-full text-center py-2.5 px-4 text-[11px] font-semibold flex items-center justify-center gap-2 ${
                isMusicPlaying ? "border-[#8fa895] bg-[#e3eae4] text-[#1c3825]" : "text-[#4a584f]"
              }`}
            >
              {isMusicPlaying ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#254d31]" aria-hidden="true" />
                  <span>Turn off music</span>
                </>
              ) : (
                <>
                  <Music2 className="w-3.5 h-3.5 text-[#5e6b61]" aria-hidden="true" />
                  <span>Play soothing music</span>
                </>
              )}
            </button>
          )}

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDigitalTwin();
              }}
              className="liquid-glass-button liquid-glass-button--primary w-full text-center py-2.5 px-4 text-[11px] font-semibold"
            >
              Talk to my digital twin ↗
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalendly();
              }}
              className="liquid-glass-button w-full text-center py-2.5 px-4 text-[11px] font-semibold"
            >
              Book a meeting ↗
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
