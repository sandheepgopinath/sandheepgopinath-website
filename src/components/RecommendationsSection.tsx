"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Recommendation {
  name: string;
  title: string;
  meta: string;
  image: string;
  quote: string;
}

const RECOMMENDATIONS: Recommendation[] = [
  {
    name: "John Foy",
    title: "Sr. Customer Success Manager | Helping companies close the Engagement Capacity Gap",
    meta: "September 2, 2026 · Worked with Sandheep on different teams (Verint Systems)",
    image: "/john.jpeg",
    quote:
      "I say without hesitation that Sandheep is a solid professional who combines technical depth with real people skills as a Product Manager. He has a gift for stakeholder engagement — he listens first, translates complexity into clarity, and builds the kind of trust that keeps cross-functional teams and customers aligned. When things get complicated, whether it's competing priorities, a tight roadmap, or a technical curveball, Sandheep is the one you want in the room. He finds a path forward without losing sight of the customer and the business outcome. In sum, Sandheep has the rare gift of having left and right brain aptitude combined with a solid understanding of P&L.",
  },
  {
    name: "Nadia Vento",
    title: "Head of Interface Product Operations | IT & Product Operations | Data Analytics | AI Ops to Excellence",
    meta: "March 12, 2024 · Senior to Sandheep",
    image: "/Nadia.jpeg",
    quote:
      "Sandheep is ambitious, dynamic and very diligent. It was a lot of fun working with him to solve technical challenges through automations. He is a good listener and that's how you build trust. He can deal with challenges quickly in a targeted manner and his calmness is transmitted to others which is priceless. Best of luck for your future!",
  },
  {
    name: "Umang Yadav",
    title: "Built First Travel AI Copilot @ HRS Group | Built 20+ AI Agent | Sr. Data Scientist @ HRS Group",
    meta: "November 24, 2023 · Worked with Sandheep on the same team",
    image: "/Umang.jpeg",
    quote:
      "Working with Sandheep as a Product Manager was an absolute pleasure. His dedication and hard work were like the engine that kept our team moving forward. Sandheep had this amazing knack for understanding our projects inside out, making sure every piece fit perfectly into our goals. But beyond all the professional stuff, Sandheep's passion for what he does is infectious. It's the kind of thing that motivates everyone around him to strive for their best. I highly recommend Sandheep for his outstanding professionalism and commitment.",
  },
  {
    name: "Peter Hindsgaul Bjerre Jensen",
    title: "Principal Data Scientist, PhD at Danfoss | Nordic 100 in Data, Analytics & AI",
    meta: "July 17, 2022 · Worked with Sandheep on different teams",
    image: "/peter.jpeg",
    quote:
      "I have come to know Sandheep as an ambitious and hard working colleague, eager to learn about new technology and apply it where relevant. Not only running for new and fancy tech, but also ensuring that it brings business value. One concrete example was on a project where we were looking into image recognition on a production line — many would instantly have looked into the \"AI toolbox\", but Sandheep looked into more traditional geometric approaches with great success. Also, he is not afraid of stepping out of his dedicated role to ensure everything in the project runs smoothly.",
  },
  {
    name: "Lukasz Jarosz",
    title: "Manager, Global Manufacturing Technology Excellence",
    meta: "June 22, 2022 · Managed Sandheep directly",
    image: "/lukasz.jpeg",
    quote:
      "Working with Sandheep had been great experience for me as his manager. He had always been demonstrating proactiveness, innovative mindset and unique talent for quick learning of new things within IoT, AI, machine learning. His passion towards new technology is truly amazing. All these combined with Sandheep's natural easiness in global network creation makes him a great candidate for numerous positions in the business.",
  },
  {
    name: "Rohan Sahu",
    title: "Founder, ContentLens.ai | C2PA | Content Authenticity",
    meta: "June 13, 2022 · Managed Sandheep directly",
    image: "/rohan.jpeg",
    quote:
      "Sandheep worked with me for a brief period during his program at Plaksha. In a short span of time, he demonstrated the ability to understand market needs and translate them into product requirements (with a roadmap), keeping in mind the competitor landscape. Without any prior healthcare experience, he was able to understand complex clinical concepts, nuances of healthcare technology and deliver on the goals we had set out for him. He is a self-starter with a positive attitude towards work & life. He will definitely create value for himself and any organization that backs him.",
  },
  {
    name: "Gokul Jawahar",
    title: "Responsible for Product Engineering, ESG, PDM, Design to Quality and Product Compliance",
    meta: "May 16, 2022 · Worked with Sandheep on the same team",
    image: "/gokul.jpeg",
    quote:
      "I have worked with Sandheep for the Performance board Digitalization project in the RAC Factory of Danfoss India. Sandheep has been outstanding in finding solutions for tough scenarios. The innovative thoughts he brought forward when we had challenges to connect really old machines to network were amazing. He single handedly developed a part counting solution using a cheap webcam which was recognized and appreciated by all levels of management. Once a task is handed over, I am sure that Sandheep will find a way to get a solution.",
  },
  {
    name: "Yasir Hareed",
    title: "Business Development at Octopus Energy | On a mission to decarbonise UK homes",
    meta: "January 24, 2022 · Reported to Sandheep directly",
    image: "/yasir.jpeg",
    quote:
      "Sandheep is definitely one of the most driven people I have come across in my career. Having had the pleasure of working with him in Synapse Technologies, the lessons I learnt from him have modelled my career. Sandheep is not only self motivated, he is also someone who is capable of motivating his entire team. His positive outlook towards problem solving and mentoring nature is something I found very valuable while working under him. He leads from the front and is unafraid to get involved in hands-on work when the need arises.",
  },
];

export function RecommendationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = React.useRef<number | null>(null);

  const prev = () => {
    setActiveIndex((i) => (i === 0 ? RECOMMENDATIONS.length - 1 : i - 1));
  };

  const next = () => {
    setActiveIndex((i) => (i === RECOMMENDATIONS.length - 1 ? 0 : i + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  const current = RECOMMENDATIONS[activeIndex];

  return (
    <section
      className="py-[100px] max-md:py-[70px] bg-[#f3f2ee] border-t border-[#e2e5dd]"
      id="recommendations"
      aria-labelledby="recommendations-title"
    >
      <div className="career-shell">
        <div className="career-heading mb-10">
          <div>
            <span>05 / RECOMMENDATIONS</span>
            <h2 id="recommendations-title">Recommendations.</h2>
            <p>
              Perspectives from managers, peers, data scientists, and direct reports across companies.
            </p>
          </div>
          <strong>{activeIndex + 1} OF {RECOMMENDATIONS.length}</strong>
        </div>

        <article
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="bg-white border border-[#dce3da] rounded-[16px] p-[24px] sm:p-[32px] shadow-[0_12px_36px_rgba(23,32,25,0.06)] touch-pan-y"
        >
          <div className="flex items-center gap-3.5 pb-5 mb-5 border-b border-[#e8ece6]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.image}
              alt={current.name}
              className="w-12 h-12 rounded-full object-cover border border-[#d6ddd4] flex-shrink-0"
            />
            <div>
              <strong className="block text-[14.5px] font-semibold text-[#18231c]">
                {current.name}
              </strong>
              <span className="block text-[12px] text-[#556358] leading-snug">
                {current.title}
              </span>
              <span className="block text-[11px] text-[#7a887d] mt-0.5">
                {current.meta}
              </span>
            </div>
          </div>

          <Quote className="w-5 h-5 text-[#8fa392] mb-3" aria-hidden="true" />

          <p className="text-[13.5px] sm:text-[14px] leading-[1.7] text-[#222d26]">
            &ldquo;{current.quote}&rdquo;
          </p>
        </article>

        <div className="flex items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Recommendation slides">
            {RECOMMENDATIONS.map((rec, idx) => (
              <button
                key={rec.name}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`View recommendation from ${rec.name}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === activeIndex
                    ? "w-6 bg-[#2c3a31]"
                    : "w-2 bg-[#cad2c9] hover:bg-[#9aa89b]"
                }`}
              />
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous recommendation"
              className="w-10 h-10 rounded-full border border-[#cad2c9] bg-white hover:bg-[#eef2ec] text-[#25322b] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next recommendation"
              className="w-10 h-10 rounded-full border border-[#cad2c9] bg-white hover:bg-[#eef2ec] text-[#25322b] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
