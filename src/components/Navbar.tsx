"use client";

import React, { useState } from "react";
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
          <span className="site-brand-name">{portfolioV5Data.name}</span>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden min-[1101px]:flex items-center gap-[36px]">
          <a href="#about" className="text-[14px] text-[#252a28] hover:text-[#111] transition-colors">
            About
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
          <a href="#contact" className="text-[14px] text-[#252a28] hover:text-[#111] transition-colors">
            Contact
          </a>
          <button
            onClick={onOpenDigitalTwin}
            className="bg-[#1c2921] hover:bg-[#283b30] px-[21px] py-[13px] rounded-[5px] text-white text-[13px] font-medium transition-colors"
          >
            Talk to my digital twin ↗
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          className={`mobile-menu-trigger min-[1101px]:hidden ${mobileMenuOpen ? "is-open" : ""}`}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <nav className="min-[1101px]:hidden bg-[#eeeee9] border-t border-[#d6d9d2] px-6 py-6 flex flex-col gap-5 text-[12px] text-[#344038]">
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">
            About
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
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">
            Contact
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDigitalTwin();
              }}
              className="w-full text-center py-2.5 px-4 bg-[#25322b] text-white rounded-[3px] text-[11px] font-semibold"
            >
              Talk to my digital twin ↗
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalendly();
              }}
              className="w-full text-center py-2.5 px-4 border border-[#bcc3b9] bg-transparent text-[#26302a] rounded-[3px] text-[11px] font-semibold"
            >
              Book a meeting ↗
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
