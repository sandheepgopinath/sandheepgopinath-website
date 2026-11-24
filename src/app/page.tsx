"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { portfolioV5Data } from "@/data/portfolioData";
import { decisionStories } from "@/data/decisionStories";
import { Navbar } from "@/components/Navbar";
import { DigitalTwinModal } from "@/components/DigitalTwinModal";
import { CalendlyModal } from "@/components/CalendlyModal";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { AmbientMusic } from "@/components/AmbientMusic";
import { ExperienceSection } from "@/components/ExperienceSection";
import { BrainCircuit, GraduationCap, Microchip, UsersRound, X } from "lucide-react";

const FULL_SUMMARY_TEXT =
  "A product leader and founder with 11+ years of experience bridging product, technology, and business across diverse industries — from early-stage ventures to global organizations.";

const educationIcons = [UsersRound, BrainCircuit, Microchip, GraduationCap];
const workDecisionStories = decisionStories.filter((story) => story.org !== "Sketch Theory");

const pageSections = [
  { id: "landing-hero", label: "01 / HOME", nextId: "experience", action: "NEXT SECTION", arrow: "↓" },
  { id: "expertise", label: "02 / EXPERTISE & IMPACT", nextId: "experience", action: "NEXT SECTION", arrow: "↓" },
  { id: "experience", label: "03 / EXPERIENCE", nextId: "education", action: "NEXT SECTION", arrow: "↓" },
  { id: "education", label: "04 / EDUCATION", nextId: "philosophy", action: "NEXT SECTION", arrow: "↓" },
  { id: "philosophy", label: "05 / HOW I THINK", nextId: "work", action: "NEXT SECTION", arrow: "↓" },
  { id: "work", label: "06 / PRODUCTS, PROBLEMS, DECISIONS", nextId: "reading", action: "NEXT SECTION", arrow: "↓" },
  { id: "reading", label: "07 / BOOKS", nextId: "landing-hero", action: "BACK TO TOP", arrow: "↑" },
] as const;

function TypingHeroSummary({ text }: { text: string }) {
  const typedRef = useRef<HTMLSpanElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typedEl = typedRef.current;
    const ghostEl = ghostRef.current;
    const cursorEl = cursorRef.current;
    if (!typedEl || !ghostEl || !cursorEl) return;

    // Respect reduced motion preference
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      typedEl.textContent = text;
      ghostEl.textContent = "";
      cursorEl.style.display = "none";
      return;
    }

    let rafId: number;
    let startTime: number | null = null;
    let charIndex = 0;
    const startDelay = 450; // pause initially so headline is seen first
    let nextCharTime = 0;

    const tick = (now: number) => {
      if (startTime === null) {
        startTime = now;
        nextCharTime = now + startDelay;
      }

      if (now >= nextCharTime) {
        while (now >= nextCharTime && charIndex < text.length) {
          charIndex++;
          const char = text[charIndex - 1];
          let delay = 18;
          if (char === "," || char === "—") delay = 85;
          else if (char === " ") delay = 28;
          nextCharTime += delay;
        }

        typedEl.textContent = text.slice(0, charIndex);
        ghostEl.textContent = text.slice(charIndex);

        if (charIndex >= text.length) {
          cursorEl.style.display = "none";
          return;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    // Guaranteed fallback: after 4.5s ensure full text is visible
    const fallbackTimer = setTimeout(() => {
      if (typedEl) typedEl.textContent = text;
      if (ghostEl) ghostEl.textContent = "";
      if (cursorEl) cursorEl.style.display = "none";
      cancelAnimationFrame(rafId);
    }, 4500);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(fallbackTimer);
    };
  }, [text]);

  return (
    <p
      className="text-[clamp(12.5px,0.98vw,15.5px)] text-[#636c64] leading-[1.6] max-w-[540px] max-md:max-w-[460px] max-md:text-center max-md:mx-auto md:text-left md:mx-0"
      aria-label={text}
    >
      <span ref={typedRef} />
      <span
        ref={cursorRef}
        aria-hidden="true"
        className="inline-block w-[2px] h-[1.1em] bg-[#1c2921] align-middle -mt-0.5 mx-[1px] animate-pulse"
      />
      <span
        ref={ghostRef}
        aria-hidden="true"
        className="opacity-0 select-none pointer-events-none"
      >
        {text}
      </span>
    </p>
  );
}

export default function Home() {
  const [digitalTwinOpen, setDigitalTwinOpen] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState<boolean | null>(null);
  const [initialQuestion, setInitialQuestion] = useState<string | undefined>(undefined);
  const [isHeroFootVisible, setIsHeroFootVisible] = useState(true);
  const [activePageSection, setActivePageSection] = useState(0);
  const [openBookTakeaway, setOpenBookTakeaway] = useState<number | null>(null);
  const [workPreviewCount, setWorkPreviewCount] = useState(6);
  const [showAllWork, setShowAllWork] = useState(false);
  const [activeDecisionStory, setActiveDecisionStory] = useState<number | null>(null);
  const selectedBook = openBookTakeaway === null ? null : portfolioV5Data.reading.books[openBookTakeaway];

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("ambient_music_choice");
      if (stored === "true") setMusicEnabled(true);
      else if (stored === "false") setMusicEnabled(false);
    } catch {}
  }, []);

  const handleToggleMusic = () => {
    setMusicEnabled((prev) => {
      const next = prev !== true;
      try {
        sessionStorage.setItem("ambient_music_choice", String(next));
      } catch {}
      return next;
    });
  };

  const handleSelectMusicChoice = (enable: boolean) => {
    setMusicEnabled(enable);
    try {
      sessionStorage.setItem("ambient_music_choice", String(enable));
    } catch {}
  };

  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    let observer: IntersectionObserver | null = null;

    if (sentinel) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsHeroFootVisible(entry.isIntersecting);
        },
        { threshold: [0, 1] }
      );
      observer.observe(sentinel);
    }

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setIsHeroFootVisible(scrollY < 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!selectedBook) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenBookTakeaway(null);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedBook]);

  useEffect(() => {
    const updateWorkPreviewCount = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const reservedHeight = width <= 760 ? 310 : 300;
      const rowHeight = width <= 760 ? 132 : 184;
      const rowsThatFit = Math.max(1, Math.floor((height - reservedHeight) / rowHeight));
      setWorkPreviewCount(Math.min(workDecisionStories.length, rowsThatFit * 2));
    };
    updateWorkPreviewCount();
    window.addEventListener("resize", updateWorkPreviewCount);
    return () => window.removeEventListener("resize", updateWorkPreviewCount);
  }, []);

  useEffect(() => {
    if (activeDecisionStory === null) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveDecisionStory(null);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeDecisionStory]);

  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const viewportMarker = window.innerHeight * 0.45;
        const activeIndex = pageSections.findIndex(({ id }) => {
          const section = document.getElementById(id);
          if (!section) return false;
          const rect = section.getBoundingClientRect();
          return rect.top <= viewportMarker && rect.bottom > viewportMarker;
        });
        if (activeIndex >= 0) setActivePageSection(activeIndex);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const handleOpenDigitalTwin = (question?: string) => {
    setInitialQuestion(question);
    setDigitalTwinOpen(true);
  };

  const handleScrollToExplore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsHeroFootVisible(false);
    const expertiseSection = document.getElementById("expertise");
    if (expertiseSection) {
      expertiseSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookMeeting = () => {
    const width = 720;
    const height = 750;
    const left = typeof window !== "undefined" ? window.screen.width / 2 - width / 2 : 100;
    const top = typeof window !== "undefined" ? window.screen.height / 2 - height / 2 : 100;
    const popup = window.open(
      "https://calendly.com/sandheepgopinath",
      "calendlyPopup",
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=no`
    );
    if (!popup || popup.closed || typeof popup.closed === "undefined") {
      setCalendlyOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen text-[#252a28] bg-[#f7f7f3]">
      {/* Sentinel for detecting if page is at the very top */}
      <div id="top-sentinel" className="absolute top-0 left-0 w-full h-[20px] pointer-events-none -z-10" />

      {/* Navigation */}
      <Navbar
        onOpenDigitalTwin={() => handleOpenDigitalTwin()}
        onOpenCalendly={() => setCalendlyOpen(true)}
        isMusicPlaying={musicEnabled === true}
        onToggleMusic={handleToggleMusic}
      />

      <main>
        {/* SECTION 1: HERO (UPDATED TO MATCH EDITORIAL DESIGN) */}
        <section id="landing-hero" className="landing-hero relative flex flex-col justify-between overflow-hidden">
          {/* Main Hero Content Area */}
          <div className="hero-wrap relative flex flex-1 items-center">
            <div className="hero-copy relative z-10">
              {/* Text Block */}
              <div className="flex-none">
                {/* Kicker */}
                <div className="whitespace-nowrap text-[10px] min-[380px]:text-[11px] sm:text-[12px] font-semibold tracking-[0.13em] sm:tracking-[0.16em] text-[#6b776f] uppercase mb-2.5 sm:mb-6 text-center md:text-left">
                  PRODUCT · BUSINESS · TECHNOLOGY
                </div>

                {/* Main Headline */}
                <h1 className="serif-font text-[clamp(24px,3.5vw,50px)] font-normal text-[#171918] leading-[1.12] tracking-[-0.035em] mb-5 sm:mb-8 text-center md:text-left">
                  Understanding Customers.<br />
                  <span className="italic relative inline-block">
                    Driving Growth.
                    <svg
                      className="absolute left-1 -bottom-1 sm:-bottom-1.5 w-[98%] h-[7px] sm:h-[10px] text-[#9ca79e] pointer-events-none"
                      viewBox="0 0 240 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M2 11C60 3 175 3.5 238 10.5"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>

                {/* Experience Summary with Realistic Character-by-Character Typing */}
                <TypingHeroSummary text={FULL_SUMMARY_TEXT} />
              </div>

              {/* Action Buttons: Centered dynamically in the available vertical space */}
              <div className="flex-1 flex flex-col justify-center min-h-0 pt-4 sm:pt-6 md:pt-8 max-md:max-w-[165px]">
                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2.5 sm:gap-3 w-full">
                  <a
                    href="/Sandheep%20Gopinath%20Resume%202026.pdf"
                    download="Sandheep_Gopinath_Resume_2026.pdf"
                    className="btn hero-liquid-glass hero-liquid-glass--primary text-[10px] sm:text-[11.5px] h-[31px] sm:h-[35px] px-3 justify-center w-full sm:w-auto"
                  >
                    Download Resume <span aria-hidden="true">↓</span>
                  </a>
                  <a
                    href="mailto:hello@sandheepgopinath.com"
                    className="btn hero-liquid-glass text-[10px] sm:text-[11.5px] h-[31px] sm:h-[35px] px-3 justify-center w-full sm:w-auto"
                  >
                    Email me <span aria-hidden="true">✉</span>
                  </a>
                  <button
                    onClick={handleBookMeeting}
                    className="btn hero-liquid-glass text-[10px] sm:text-[11.5px] h-[31px] sm:h-[35px] px-3 justify-center w-full sm:w-auto"
                  >
                    Set up a meeting <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Existing portrait image - preserved unchanged */}
            <div aria-label="Portrait of Sandheep Gopinath" className="hero-portrait">
              <Image
                src="/sandheep-landing-portrait.webp"
                alt="Sandheep Gopinath"
                fill
                priority
                sizes="(max-width: 760px) 100vw, 55vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Bottom Bar Spacer: Preserves exact flex-centering of action buttons above */}
          <div className="h-[46px] sm:h-[57px] flex-none w-full pointer-events-none" aria-hidden="true" />
        </section>

        {/* Pinned viewport bottom bar */}
        <div
          className={`hero-foot fixed bottom-0 left-0 right-0 z-30 bg-[#f9f7f5] border-t border-[#e2ddd5] ${
            !isHeroFootVisible ? "is-hidden" : ""
          }`}
          aria-label="Section navigation"
        >
          <div className="hero-wrap flex items-center justify-between py-3.5 sm:py-5 text-[11px] font-semibold tracking-[0.14em] text-[#6d7770] uppercase">
            <span>02 / EXPERTISE &amp; IMPACT</span>
            <a
              href="#expertise"
              onClick={handleScrollToExplore}
              className="hover:text-[#191f1b] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <ExpertiseSection />

        <ExperienceSection />

        {/* 04 / EDUCATION */}
        <section className="education-section" id="education" aria-labelledby="education-title">
          <div className="wrap education-layout">
            <div className="education-intro">
              <span>04 / EDUCATION</span>
              <h2 id="education-title">{portfolioV5Data.education.heading}</h2>
              <p>{portfolioV5Data.education.intro}</p>
              <div className="education-summary">
                <strong>10 years of learning</strong>
                <span>Engineering → Embedded Systems → AI → Leadership</span>
              </div>
            </div>

            <div className="education-list">
              {portfolioV5Data.education.items.map((edu, idx) => {
                const Icon = educationIcons[idx];
                return (
                  <article key={edu.institution} className="education-entry">
                    <div className="education-timeline-mark"><Icon aria-hidden="true" /></div>
                    <div className="education-entry-content">
                      <div className="education-entry-title">
                        <h3>{edu.institution}</h3>
                        <div className="education-entry-head">
                          <time>{edu.dates}</time>
                          <span>{edu.duration}</span>
                        </div>
                      </div>
                      <div className="education-credentials">
                        <span className="education-degree">{edu.degree}</span>
                        <span aria-hidden="true">·</span>
                        <span className="education-field">{edu.field}</span>
                      </div>
                      {"summary" in edu && <p className="education-note">{edu.summary}</p>}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 05 / HOW I THINK (PHILOSOPHY) */}
        <section className="how-section" id="philosophy" aria-labelledby="philosophy-title">
          <div className="how-landscape" aria-hidden="true"><i /><i /></div>
          <div className="wrap how-shell">
            <div className="how-kicker">
              <span>{portfolioV5Data.philosophy.number}</span>
              <i aria-hidden="true" />
            </div>

            <div className="how-intro">
              <h2 id="philosophy-title">
                {portfolioV5Data.philosophy.heading}
                <em>{portfolioV5Data.philosophy.subheading}</em>
              </h2>
              <p>{portfolioV5Data.philosophy.pullQuote}</p>
            </div>

          </div>
        </section>

        {/* 06 / PRODUCTS, PROBLEMS, DECISIONS */}
        <section className={`work-section ${showAllWork ? "is-expanded" : ""}`} id="work">
          <div className="wrap work-shell">
            <div className="work-section-label">
              {portfolioV5Data.work.number}
            </div>
            <h2>
              {portfolioV5Data.work.heading}
            </h2>
            <p className="work-intro">
              {portfolioV5Data.work.intro}
            </p>

            <div className="work-grid">
              {workDecisionStories.slice(0, showAllWork ? undefined : workPreviewCount).map((card, idx) => (
                <button
                  key={card.id}
                  type="button"
                  className="work-card"
                  aria-haspopup="dialog"
                  aria-label={`Open decision story: ${card.title}`}
                  onClick={() => setActiveDecisionStory(idx)}
                >
                  <h3>{card.title}</h3>
                </button>
              ))}
            </div>

            <div className="work-actions">
              <span>{showAllWork ? `${workDecisionStories.length} stories shown` : `${Math.min(workPreviewCount, workDecisionStories.length)} of ${workDecisionStories.length} stories`}</span>
              {(showAllWork || workPreviewCount < workDecisionStories.length) && (
                <button
                  type="button"
                  className="liquid-glass-button"
                  onClick={() => {
                    setShowAllWork((current) => !current);
                    if (showAllWork) requestAnimationFrame(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }));
                  }}
                >
                  {showAllWork ? "Show less" : `See more (${workDecisionStories.length - workPreviewCount})`}
                </button>
              )}
            </div>
          </div>
        </section>

        {activeDecisionStory !== null && (() => {
          const story = workDecisionStories[activeDecisionStory];
          const sections = [
            ["Context", `${story.problem} ${story.why}`],
            ["Action", story.decision],
            ["Results", story.outcome],
            ["Learnings", story.insight],
          ] as const;
          return (
            <div className="decision-dialog" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveDecisionStory(null); }}>
              <section className="decision-modal" role="dialog" aria-modal="true" aria-labelledby="decision-modal-title">
                <header>
                  <span>CONTEXT · ACTION · RESULTS · LEARNINGS</span>
                  <button type="button" className="liquid-glass-button liquid-glass-button--icon" aria-label="Close decision story" onClick={() => setActiveDecisionStory(null)}><X aria-hidden="true" /></button>
                </header>
                <div className="decision-modal-body">
                  <span className="decision-modal-org">{story.org} / {story.kind}</span>
                  <h2 id="decision-modal-title">{story.title}</h2>
                  <p className="decision-modal-teaser">{story.teaser}</p>
                  <div className="decision-modal-tags">{story.competencies.map((item) => <span key={item}>{item}</span>)}</div>
                  <div className="decision-narrative">
                    {sections.map(([title, content]) => <section key={title}><h3>{title}</h3><p>{content}</p></section>)}
                  </div>
                </div>
              </section>
            </div>
          );
        })()}

        {/* 07 / THE THINKING SHELF (READING) */}
        <section className="py-[100px] max-md:py-[70px] bg-[#f8f8f5]" id="reading">
          <div className="wrap">
            <div className="flex justify-between max-md:block gap-[70px] max-md:gap-[35px] items-end mb-[39px]">
              <div>
                <div className="text-[10px] text-[#7b897e] tracking-[0.11em] font-semibold">
                  {portfolioV5Data.reading.number}
                </div>
                <h2 className="serif-font text-[clamp(26px,3vw,39px)] font-normal tracking-[-0.045em] leading-[1.3] my-[20px]">
                  {portfolioV5Data.reading.heading}
                </h2>
              </div>
              <p className="max-w-[370px] text-[12px] leading-[1.85] text-[#647067] max-md:mt-[20px]">
                {portfolioV5Data.reading.intro}
              </p>
            </div>

            <div className="book-tile-grid">
              {portfolioV5Data.reading.books.map((book, idx) => (
                <article
                  key={idx}
                  className="book-tile"
                >
                  <a
                    href={book.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${book.title} book details`}
                    className="book-cover real-cover book-tile-cover"
                    data-cover-title={book.title}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={book.image}
                      alt={`Cover of ${book.title}`}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        target.parentElement?.classList.add("cover-unavailable");
                      }}
                    />
                  </a>
                  <div className="book-tile-copy">
                    <span className="book-tile-category">
                      {book.category}
                    </span>
                    <a href={book.href} target="_blank" rel="noopener noreferrer">
                      <h3>{book.title}</h3>
                    </a>
                    <span className="book-tile-author">{book.author}</span>
                    <button
                      type="button"
                      className="book-takeaway-button"
                      aria-expanded={openBookTakeaway === idx}
                      onClick={() => setOpenBookTakeaway(idx)}
                    >
                      View my takeaway
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <p className="text-[10px] text-[#899389] leading-[1.7] mt-[26px]">
              {portfolioV5Data.reading.footnote}
            </p>
          </div>
        </section>

        {selectedBook && (
          <div
            className="book-takeaway-dialog"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpenBookTakeaway(null);
            }}
          >
            <section className="book-takeaway-popup" role="dialog" aria-modal="true" aria-labelledby="book-takeaway-title">
              <header>
                <span>MY TAKEAWAY</span>
                <button type="button" className="liquid-glass-button liquid-glass-button--icon" aria-label="Close takeaway" onClick={() => setOpenBookTakeaway(null)}>
                  <X aria-hidden="true" />
                </button>
              </header>
              <div className="book-takeaway-popup-body">
                <span className="book-cover real-cover book-takeaway-popup-cover" data-cover-title={selectedBook.title}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedBook.image} alt={`Cover of ${selectedBook.title}`} />
                </span>
                <div>
                  <h2 id="book-takeaway-title">{selectedBook.title}</h2>
                  <strong>{selectedBook.author}</strong>
                  <p>{selectedBook.reflection}</p>
                </div>
              </div>
            </section>
          </div>
        )}

      </main>

      <div className={`section-page-footer ${pageSections[activePageSection].id === "philosophy" ? "section-page-footer--dark" : ""} ${pageSections[activePageSection].id === "reading" ? "section-page-footer--back" : ""}`} aria-label="Section navigation">
        {pageSections[activePageSection].id !== "reading" && <span>{pageSections[(activePageSection + 1) % pageSections.length].label}</span>}
        <a href={`#${pageSections[activePageSection].nextId}`}>
          {pageSections[activePageSection].action} <span aria-hidden="true">{pageSections[activePageSection].arrow}</span>
        </a>
      </div>

      {/* Digital Twin Chat Widget */}
      <DigitalTwinModal
        isOpen={digitalTwinOpen}
        onClose={() => setDigitalTwinOpen(false)}
        initialQuestion={initialQuestion}
      />

      {/* Booking Modal */}
      <CalendlyModal
        isOpen={calendlyOpen}
        onClose={() => setCalendlyOpen(false)}
      />

      <AmbientMusic
        enabled={musicEnabled}
        onToggle={handleToggleMusic}
        onSelectChoice={handleSelectMusicChoice}
      />
    </div>
  );
}
