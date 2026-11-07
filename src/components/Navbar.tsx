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
    <header className="bg-[#eeeee9] relative z-20 border-b border-[#d7d9d3]">
      <div className="wrap h-[92px] max-md:h-[68px] flex items-center justify-between">
        {/* Brand */}
        <a href="#top" className="text-[14px] max-md:text-[12px] font-bold tracking-tight text-[#252a28] flex items-center">
          {portfolioV5Data.name}
          <span className="font-normal tracking-normal text-[#7f8580] text-[10px] ml-[13px] max-md:hidden">
            / {portfolioV5Data.title}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-[38px]">
          <a href="#about" className="text-[11px] text-[#515a54] hover:text-[#111] transition-colors">
            About
          </a>
          <a href="#experience" className="text-[11px] text-[#515a54] hover:text-[#111] transition-colors">
            Experience
          </a>
          <a href="#work" className="text-[11px] text-[#515a54] hover:text-[#111] transition-colors">
            Selected work
          </a>
          <a href="#philosophy" className="text-[11px] text-[#515a54] hover:text-[#111] transition-colors">
            How I think
          </a>
          <a href="#reading" className="text-[11px] text-[#515a54] hover:text-[#111] transition-colors">
            Reading
          </a>
          <a href="#contact" className="text-[11px] text-[#515a54] hover:text-[#111] transition-colors">
            Contact
          </a>
          <button
            onClick={onOpenDigitalTwin}
            className="border border-[#a4ada4] hover:border-[#26312b] px-[16px] py-[11px] rounded-[3px] text-[#26312b] text-[11px] font-medium transition-colors"
          >
            Ask my AI ↗
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[12px] text-[#344038] py-2 px-3 border border-[#ccd5ca] rounded bg-[#f7f7f3]"
        >
          {mobileMenuOpen ? "Close ✕" : "Menu ☰"}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#eeeee9] border-t border-[#d6d9d2] px-6 py-6 flex flex-col gap-5 text-[12px] text-[#344038]">
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">
            About
          </a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">
            Experience
          </a>
          <a href="#work" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">
            Selected work
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
              Ask my AI ↗
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
