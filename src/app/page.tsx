"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolioV5Data } from "@/data/portfolioData";
import { Navbar } from "@/components/Navbar";
import { DigitalTwinModal } from "@/components/DigitalTwinModal";
import { CalendlyModal } from "@/components/CalendlyModal";

export default function Home() {
  const [digitalTwinOpen, setDigitalTwinOpen] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState<string | undefined>(undefined);

  const handleOpenDigitalTwin = (question?: string) => {
    setInitialQuestion(question);
    setDigitalTwinOpen(true);
  };

  const handleBookMeeting = () => {
    try {
      const u = localStorage.getItem("sg_calendly_v2");
      if (u) {
        window.open(u, "_blank", "noopener,noreferrer");
        return;
      }
    } catch {
      // ignore
    }
    setCalendlyOpen(true);
  };

  return (
    <div className="relative min-h-screen text-[#252a28] bg-[#f7f7f3]">
      {/* Navigation */}
      <Navbar
        onOpenDigitalTwin={() => handleOpenDigitalTwin()}
        onOpenCalendly={() => setCalendlyOpen(true)}
      />

      <main>
        {/* HERO SECTION */}
        <section className="bg-[#eeeee9] relative min-h-[645px] max-md:min-h-[790px] overflow-hidden">
          <div className="wrap relative min-h-[645px] max-md:min-h-[790px] flex items-center max-md:items-start">
            <div className="relative z-10 w-[min(665px,66%)] max-md:w-full pt-[35px] max-md:pt-[65px] pb-[85px] max-md:pb-[290px]">
              <div className="font-semibold text-[#78847a] text-[10px] tracking-[0.16em] uppercase">
                {portfolioV5Data.kicker}
              </div>

              <h1 className="serif-font font-normal text-[clamp(42px,5vw,68px)] max-md:text-[46px] tracking-[-0.055em] leading-[1.12] my-[26px]">
                Sandheep<br />
                Gopinath<span className="text-[#88978a]">.</span>
              </h1>

              <p className="text-[12px] text-[#576259] tracking-[0.04em] mb-[31px]">
                {portfolioV5Data.roleline}
              </p>

              <p className="text-[17px] max-md:text-[15px] leading-[1.8] max-w-[580px] text-[#49524c] mb-[32px]">
                {portfolioV5Data.summary}
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
            </div>

            {/* Hero portrait with editorial multiply filter */}
            <div aria-label="Portrait of Sandheep" className="hero-portrait">
              {/* Fallback & Portrait representation */}
              <Image
                src="/portrait.jpg"
                alt="Sandheep Gopinath"
                fill
                priority
                className="object-cover object-[50%_29%]"
              />
            </div>

            {/* Hero footer line */}
            <div className="absolute z-10 bottom-[28px] max-md:bottom-[16px] left-0 right-0 flex justify-between text-[10px] text-[#7c857d] tracking-[0.10em] uppercase">
              <span>{portfolioV5Data.location}</span>
              <a href="#about" className="hover:text-[#252a28]">
                Scroll to explore ↓
              </a>
            </div>
          </div>
        </section>

        {/* 01 / ABOUT SECTION */}
        <section className="py-[100px] max-md:py-[70px] bg-[#f8f8f5]" id="about">
          <div className="wrap grid grid-cols-[35%_1fr] max-md:grid-cols-1 gap-[11%] max-md:gap-[14px] items-start">
            <div>
              <div className="text-[10px] text-[#7b897e] tracking-[0.11em] font-semibold">
                {portfolioV5Data.about.number}
              </div>
              <h2 className="serif-font text-[clamp(26px,3vw,39px)] font-normal tracking-[-0.045em] leading-[1.3] my-[20px]">
                {portfolioV5Data.about.heading}
              </h2>
              <div className="w-[42px] h-[1px] bg-[#89988d] my-[30px]" />
              <p className="text-[12px] text-[#7b847d] leading-[1.9] max-w-[250px]">
                {portfolioV5Data.about.aside}
              </p>
            </div>

            <div className="text-[16px] max-md:text-[14px] text-[#3e4840] leading-[1.95] pt-[8px]">
              {portfolioV5Data.about.paragraphs.map((para, i) => (
                <p key={i} className="mb-[22px]">
                  {para}
                </p>
              ))}

              <div className="flex gap-[12px] flex-wrap mt-[26px]">
                {portfolioV5Data.about.principles.map((p, i) => (
                  <span
                    key={i}
                    className="border border-[#d5dcd3] rounded-[2px] text-[#626e64] px-[13px] py-[10px] text-[11px]"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 02 / SELECTED OUTCOMES (IMPACT SECTION) */}
        <section className="py-[100px] max-md:py-[70px] bg-[#202925] text-[#f0f1ec]" id="impact">
          <div className="wrap">
            <div className="flex justify-between max-md:block gap-[35px] items-end">
              <div>
                <div className="text-[10px] text-[#889c8b] tracking-[0.11em] font-semibold">
                  {portfolioV5Data.impact.number}
                </div>
                <h2 className="serif-font text-[clamp(26px,3vw,39px)] font-normal tracking-[-0.045em] leading-[1.3] my-[20px] text-[#f0f1ec]">
                  {portfolioV5Data.impact.heading}
                </h2>
              </div>
              <p className="max-w-[590px] leading-[1.85] text-[#aebdb0] text-[14px] mb-2">
                {portfolioV5Data.impact.intro}
              </p>
            </div>

            <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 mt-[56px] border-t border-[#4a5950]">
              {portfolioV5Data.impact.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className={`pt-[29px] pb-[10px] pr-[18px] ${
                    idx !== 0 ? "pl-[18px] max-sm:pl-0" : ""
                  } ${
                    idx !== 3 ? "border-r border-[#4a5950] max-md:border-r-0" : ""
                  } ${
                    idx >= 2 ? "max-md:border-t max-md:border-[#4a5950]" : ""
                  }`}
                >
                  <strong className="block serif-font font-normal text-[clamp(24px,3vw,38px)] tracking-[-0.05em] text-[#dce6d9]">
                    {m.value}
                  </strong>
                  <p className="text-[#d0d8ce] text-[12px] leading-[1.6] min-h-[44px] mb-[20px] mt-1">
                    {m.description}
                  </p>
                  <small className="text-[10px] tracking-[0.09em] text-[#889c8b]">
                    {m.company}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 / PROFESSIONAL JOURNEY (EXPERIENCE) */}
        <section className="py-[100px] max-md:py-[70px] bg-[#f7f7f3]" id="experience">
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

        {/* 04 / SELECTED WORK */}
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

        {/* 05 / HOW I THINK (PHILOSOPHY) */}
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

        {/* 06 / THE THINKING SHELF (READING) */}
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

        {/* 07 / EDUCATION */}
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

      {/* 08 / CONTACT & FOOTER */}
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

      {/* Floating Ask my AI sticky badge (v5 style) */}
      <button
        onClick={() => setDigitalTwinOpen(!digitalTwinOpen)}
        className="fixed right-[23px] bottom-[21px] z-40 flex items-center gap-[9px] bg-[#25342b] hover:bg-[#32453a] text-[#f1f4ed] border border-[#6f8071] px-[17px] py-[12px] rounded-[3px] text-[11px] font-semibold shadow-[0_7px_25px_rgba(0,0,0,0.2)] transition-all"
      >
        <span>✳</span>
        <span>Ask my AI</span>
      </button>

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
    </div>
  );
}
