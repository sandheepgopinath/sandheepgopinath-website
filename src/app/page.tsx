"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { portfolioV5Data } from "@/data/portfolioData";
import { Navbar } from "@/components/Navbar";
import { DigitalTwinModal } from "@/components/DigitalTwinModal";
import { CalendlyModal } from "@/components/CalendlyModal";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { AmbientMusic } from "@/components/AmbientMusic";
import { ExperienceSection } from "@/components/ExperienceSection";

const FULL_SUMMARY_TEXT =
  "A product leader and founder with 11+ years of experience bridging product, technology, and business across diverse industries — from early-stage ventures to global organizations.";

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
  const [initialQuestion, setInitialQuestion] = useState<string | undefined>(undefined);
  const [showAiBadge, setShowAiBadge] = useState(false);
  const [isHeroFootVisible, setIsHeroFootVisible] = useState(true);
  const sectionSnapLockRef = useRef(false);

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
    const hero = document.getElementById("landing-hero");
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => {
      setShowAiBadge(!entry.isIntersecting);
    });

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 760px)");
    let touchStartX = 0;
    let touchStartY = 0;
    let unlockTimer: ReturnType<typeof setTimeout> | undefined;

    const getSnapTarget = (direction: "up" | "down") => {
      const expertise = document.getElementById("expertise");
      const experience = document.getElementById("experience");
      if (!expertise || !experience) return null;

      const scrollY = window.scrollY;
      const expertiseTop = expertise.offsetTop;
      const experienceTop = experience.offsetTop;

      if (direction === "down") {
        if (scrollY < expertiseTop - 2) return expertise;
        if (scrollY < experienceTop - 2) return experience;
        return null;
      }

      if (scrollY >= experienceTop - 6 && scrollY <= experienceTop + window.innerHeight * 0.12) {
        return expertise;
      }
      if (scrollY >= expertiseTop - 6 && scrollY < experienceTop - 6) {
        return "top" as const;
      }
      return null;
    };

    const snapToSection = (target: HTMLElement | "top") => {
      if (sectionSnapLockRef.current) return;
      sectionSnapLockRef.current = true;
      if (target === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      unlockTimer = setTimeout(() => {
        sectionSnapLockRef.current = false;
      }, 900);
    };

    const handleWheel = (event: WheelEvent) => {
      if (
        !mobileQuery.matches ||
        Math.abs(event.deltaY) < 18 ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX) * 1.25
      ) return;
      const target = getSnapTarget(event.deltaY > 0 ? "down" : "up");
      if (!target) return;
      event.preventDefault();
      snapToSection(target);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0]?.clientX ?? 0;
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!mobileQuery.matches) return;
      const currentX = event.touches[0]?.clientX ?? touchStartX;
      const currentY = event.touches[0]?.clientY ?? touchStartY;
      const deltaX = touchStartX - currentX;
      const deltaY = touchStartY - currentY;
      if (Math.abs(deltaY) < 32 || Math.abs(deltaY) <= Math.abs(deltaX) * 1.25) return;
      const target = getSnapTarget(deltaY > 0 ? "down" : "up");
      if (!target) return;
      event.preventDefault();
      snapToSection(target);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      if (unlockTimer) clearTimeout(unlockTimer);
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

        {/* 04 / PROFESSIONAL JOURNEY (EXPERIENCE) */}
        <section className="py-[100px] max-md:py-[70px] bg-[#f7f7f3]" id="journey">
          <div className="wrap">
            <div className="text-[10px] text-[#7b897e] tracking-[0.11em] font-semibold">
              {portfolioV5Data.experience.number}
            </div>
            <h2 className="serif-font text-[clamp(26px,3vw,39px)] font-normal tracking-[-0.045em] leading-[1.3] my-[20px]">
              {portfolioV5Data.experience.heading}
            </h2>
            <p className="max-w-[590px] leading-[1.85] text-[#647067] text-[14px] mb-[32px]">
              {portfolioV5Data.experience.intro}
            </p>

            <div className="border-t border-[#d4d9d0]">
              {portfolioV5Data.experience.items.map((item, idx) => (
                <div
                  key={idx}
                  className="border-b border-[#d4d9d0] grid grid-cols-[145px_220px_1fr] max-md:grid-cols-[120px_1fr] max-sm:grid-cols-1 gap-[24px] max-md:gap-[10px] py-[28px]"
                >
                  <span className="text-[11px] text-[#838d83]">{item.dates}</span>
                  <div>
                    <h3 className="text-[15px] tracking-[-0.02em] font-semibold mb-[7px]">
                      {item.company}
                    </h3>
                    <span className="text-[#68746a] text-[11px] leading-[1.7] block">
                      {item.job}
                    </span>
                  </div>
                  <p className="text-[#59655a] leading-[1.9] text-[13px] m-0 max-md:col-span-2 max-sm:col-span-1">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05 / SELECTED WORK */}
        <section className="py-[100px] max-md:py-[70px] bg-[#e9ece6]" id="work">
          <div className="wrap">
            <div className="text-[10px] text-[#7b897e] tracking-[0.11em] font-semibold">
              {portfolioV5Data.work.number}
            </div>
            <h2 className="serif-font text-[clamp(26px,3vw,39px)] font-normal tracking-[-0.045em] leading-[1.3] my-[20px]">
              {portfolioV5Data.work.heading}
            </h2>
            <p className="max-w-[590px] leading-[1.85] text-[#647067] text-[14px]">
              {portfolioV5Data.work.intro}
            </p>

            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-[14px] mt-[35px]">
              {portfolioV5Data.work.items.map((card, idx) => (
                <article
                  key={idx}
                  className="bg-[#f8f8f4] border border-[#d6dbd3] min-h-[235px] max-md:min-h-[180px] p-[27px] flex flex-col justify-between"
                >
                  <span className="text-[10px] tracking-[0.08em] text-[#7e8a7f] uppercase">
                    {card.tag}
                  </span>
                  <div>
                    <h3 className="serif-font text-[20px] leading-[1.4] tracking-[-0.035em] font-normal my-[10px]">
                      {card.title}
                    </h3>
                    <p className="text-[#68736a] text-[12px] leading-[1.75]">
                      {card.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <p className="text-[11px] text-[#7b867c] leading-[1.75] mt-[18px]">
              {portfolioV5Data.work.advisoryNote}
            </p>
          </div>
        </section>

        {/* 06 / HOW I THINK (PHILOSOPHY) */}
        <section className="py-[100px] max-md:py-[70px] bg-[#e6eae2]" id="philosophy">
          <div className="wrap">
            <div className="text-[10px] text-[#7b897e] tracking-[0.11em] font-semibold">
              {portfolioV5Data.philosophy.number}
            </div>

            <div className="grid grid-cols-[1fr_1.12fr] max-md:grid-cols-1 gap-[10%] max-md:gap-[30px] mt-[10px]">
              <div>
                <h2 className="serif-font text-[clamp(26px,3.1vw,39px)] leading-[1.45] my-[19px]">
                  {portfolioV5Data.philosophy.heading}
                  <br />
                  <em className="font-normal not-italic text-[#778b7a]">
                    {portfolioV5Data.philosophy.subheading}
                  </em>
                </h2>
                <div className="border-l-2 border-[#8ca08f] pl-[19px] serif-font text-[18px] max-md:text-[16px] leading-[1.8] text-[#35443b] max-w-[420px]">
                  {portfolioV5Data.philosophy.pullQuote}
                </div>
              </div>

              <div className="text-[13px] leading-[2] text-[#536258] space-y-[17px]">
                {portfolioV5Data.philosophy.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* 3 Principles */}
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-0 mt-[62px] max-md:mt-[35px] border-t border-[#bcc9bc]">
              {portfolioV5Data.philosophy.principles.map((prin, i) => (
                <div
                  key={i}
                  className={`pt-[25px] pb-0 pr-[30px] ${
                    i !== 0 ? "pl-[30px] max-md:pl-0 border-l border-[#c7d1c6] max-md:border-l-0" : ""
                  } ${
                    i !== 2 ? "max-md:border-b max-md:border-[#c7d1c6] max-md:pb-[22px]" : ""
                  }`}
                >
                  <span className="block text-[#8a9a8d] text-[10px] tracking-[0.12em] mb-[21px] max-md:mb-[8px]">
                    {prin.id}
                  </span>
                  <h3 className="text-[14px] tracking-[-0.015em] font-semibold leading-[1.5]">
                    {prin.title}
                  </h3>
                  <p className="text-[12px] text-[#667469] leading-[1.85] max-w-[285px] mt-1">
                    {prin.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

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

            <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-[0_29px] border-t border-[#d9ded5]">
              {portfolioV5Data.reading.books.map((book, idx) => (
                <article
                  key={idx}
                  className="flex items-start gap-[17px] border-b border-[#d9ded5] py-[25px] max-md:py-[20px] min-w-0"
                >
                  <a
                    href={book.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${book.title} book details`}
                    className="book-cover real-cover flex-[0_0_89px] w-[89px] h-[127px] max-md:w-[82px] max-md:flex-[0_0_82px] max-md:h-[118px]"
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
                  <div className="min-w-0">
                    <span className="block text-[9px] tracking-[0.1em] uppercase text-[#86938a] my-[2px]">
                      {book.category}
                    </span>
                    <h3 className="text-[13px] leading-[1.4] font-semibold tracking-[-0.02em] mb-[6px]">
                      {book.title}
                    </h3>
                    <div className="text-[10px] text-[#838d82] mb-[9px]">
                      {book.author}
                    </div>
                    <p className="text-[11px] leading-[1.8] text-[#657166] m-0">
                      {book.reflection}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <p className="text-[10px] text-[#899389] leading-[1.7] mt-[26px]">
              {portfolioV5Data.reading.footnote}
            </p>
          </div>
        </section>

        {/* 08 / EDUCATION */}
        <section className="py-[100px] max-md:py-[70px] bg-[#f7f7f3]" id="education">
          <div className="wrap">
            <div className="text-[10px] text-[#7b897e] tracking-[0.11em] font-semibold">
              {portfolioV5Data.education.number}
            </div>
            <h2 className="serif-font text-[clamp(26px,3vw,39px)] font-normal tracking-[-0.045em] leading-[1.3] my-[20px]">
              {portfolioV5Data.education.heading}
            </h2>

            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[20px_60px] mt-[30px]">
              {portfolioV5Data.education.items.map((edu, idx) => (
                <div key={idx} className="border-t border-[#d6dad3] pt-[22px]">
                  <strong className="text-[13px] font-semibold block mb-[8px]">
                    {edu.institution}
                  </strong>
                  <p className="text-[12px] leading-[1.75] text-[#6a766b] m-0">
                    {edu.degree} · {edu.field} · {edu.dates}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 09 / CONTACT & FOOTER */}
      <footer className="bg-[#1f2823] text-[#f2f4ed] pt-[82px] pb-[28px]" id="contact">
        <div className="wrap">
          <div className="text-[10px] text-[#8a9b8e] tracking-[0.11em] font-semibold">
            {portfolioV5Data.contact.number}
          </div>
          <h2 className="serif-font text-[clamp(26px,3vw,39px)] max-md:text-[30px] font-normal tracking-[-0.045em] leading-[1.3] mt-[20px] mb-[25px] text-[#f2f4ed]">
            {portfolioV5Data.contact.heading}
          </h2>
          <p className="max-w-[590px] leading-[1.85] text-[#a9b7ac] text-[14px] mb-[35px]">
            {portfolioV5Data.contact.subtitle}
          </p>

          <div className="flex gap-[10px] flex-wrap">
            <a
              className="btn btn-dark"
              href={`mailto:${portfolioV5Data.email}`}
            >
              Email me <span>↗</span>
            </a>
            <button
              className="btn"
              onClick={handleBookMeeting}
            >
              Book a meeting <span>↗</span>
            </button>
            <button
              className="btn"
              onClick={() => handleOpenDigitalTwin()}
            >
              Talk to my digital twin <span>✳</span>
            </button>
          </div>

          <div className="border-t border-[#4d5c50] mt-[90px] pt-[20px] flex max-md:flex-col justify-between gap-[20px] text-[#9fb0a2] text-[10px]">
            <div>© 2026 SANDHEEP GOPINATH</div>
            <div className="flex gap-[20px]">
              <a
                href={portfolioV5Data.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Download CV ↓
              </a>
              <a href="#top" className="hover:text-white">
                Back to top ↑
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Show the floating AI shortcut after the landing hero scrolls away. */}
      {showAiBadge && (
        <button
          onClick={() => handleOpenDigitalTwin()}
          className="liquid-glass-button liquid-glass-button--primary fixed right-[23px] bottom-[21px] z-40 flex items-center gap-[9px] px-[17px] py-[12px] text-[11px] font-semibold"
        >
          <span>✳</span>
          <span>Ask my AI</span>
        </button>
      )}

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

      <AmbientMusic />
    </div>
  );
}
