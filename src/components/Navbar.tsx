"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolioV5Data } from "@/data/portfolioData";

interface NavbarProps {
  onOpenDigitalTwin: () => void;
  onOpenCalendly: () => void;
}

export function Navbar({ onOpenDigitalTwin, onOpenCalendly }: NavbarProps) {
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
        <nav aria-label="Main navigation" className="hidden min-[1101px]:flex items-center gap-[36px]">
          <a href="#expertise" className="text-[14px] text-[#252a28] hover:text-[#111] transition-colors">
            Expertise
          </a>
          <a href="#experience" className="text-[14px] text-[#252a28] hover:text-[#111] transition-colors">
            Experience
          </a>
          <a href="#journey" className="text-[14px] text-[#252a28] hover:text-[#111] transition-colors">
            Journey
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
          <a href="#contact" className="text-[14px] text-[#252a28] hover:text-[#111] transition-colors">
            Contact
          </a>
          <button
            onClick={onOpenDigitalTwin}
            className="liquid-glass-button liquid-glass-button--primary px-[21px] py-[13px] text-[13px] font-medium"
          >
            Talk to my digital twin ↗
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          className={`mobile-menu-trigger liquid-glass-button liquid-glass-button--icon min-[1101px]:hidden ${mobileMenuOpen ? "is-open" : ""}`}
        >
          <span /><span /><span />
        </button>
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
          <a href="#journey" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">
            Journey
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
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">
            Contact
          </a>
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
