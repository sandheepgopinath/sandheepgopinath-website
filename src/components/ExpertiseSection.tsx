"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { expertiseAreas, expertiseStories, type ExpertiseGroup } from "@/data/expertiseData";

const filters: { label: string; value: ExpertiseGroup }[] = [
  { label: "Leadership", value: "leadership" },
  { label: "Product & Business", value: "foundation" },
  { label: "AI & Technology", value: "ai" },
];

export function ExpertiseSection() {
  const [filter, setFilter] = useState<ExpertiseGroup>("leadership");
  const [activeArea, setActiveArea] = useState<number | null>(null);
  const [activeStory, setActiveStory] = useState(0);
  const [showMobileFooter, setShowMobileFooter] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const area = activeArea === null ? null : expertiseAreas[activeArea];
  const story = area ? expertiseStories[area.storyIds[activeStory]] : null;

  const close = () => {
    setActiveArea(null);
    requestAnimationFrame(() => openerRef.current?.focus());
  };

  useEffect(() => {
    if (!area) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [area]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowMobileFooter(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="expertise-section" id="expertise" aria-labelledby="expertise-title">
        <div className="expertise-shell">
          <div className="expertise-heading-row">
            <div>
              <span className="expertise-section-label">02 / EXPERTISE AND IMPACT</span>
              <h2 id="expertise-title">Expertise and Impact</h2>
            </div>
            <span>18 COMPETENCIES · REAL USE CASES</span>
          </div>

          <div className="expertise-filters" role="group" aria-label="Filter competencies">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`liquid-glass-button ${filter === item.value ? "is-active liquid-glass-button--primary" : ""}`}
                aria-pressed={filter === item.value}
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="expertise-grid">
            {expertiseAreas.map((item, index) => {
              if (item.group !== filter) return null;
              return (
                <button
                  key={item.num}
                  ref={(node) => { if (activeArea === index) openerRef.current = node; }}
                  type="button"
                  className="expertise-card liquid-glass-button"
                  aria-haspopup="dialog"
                  onClick={(event) => {
                    openerRef.current = event.currentTarget;
                    setActiveStory(0);
                    setActiveArea(index);
                  }}
                >
                  <span className="expertise-card-number">{item.num}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="expertise-card-action"><span className="expertise-action-label">Read Use Case</span><ArrowUpRight aria-hidden="true" /></span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {showMobileFooter && !area && (
        <div className="expertise-mobile-footer" aria-label="Next section">
          <span>02 / EXPERTISE &amp; IMPACT</span>
          <a href="#experience">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
        </div>
      )}

      {area && story && (
        <div className="expertise-dialog" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
          <section className="expertise-modal" role="dialog" aria-modal="true" aria-labelledby="expertise-modal-title">
            <header className="expertise-modal-header">
              <span>COMPETENCY / EVIDENCE FROM REAL WORK</span>
              <button ref={closeButtonRef} type="button" className="liquid-glass-button liquid-glass-button--icon" onClick={close} aria-label="Close expertise details">
                <X aria-hidden="true" />
              </button>
            </header>

            <div className="expertise-modal-body">
              <h2 id="expertise-modal-title">{area.title}</h2>
              <p className="expertise-modal-intro">{area.description} Explore related work below; where the evidence is partial, that is made explicit.</p>

              <div className="expertise-case-browser">
                <div className="expertise-case-menu" role="tablist" aria-label="Related use cases">
                  {area.storyIds.map((storyId, index) => {
                    const option = expertiseStories[storyId];
                    return (
                      <button
                        key={storyId}
                        type="button"
                        role="tab"
                        aria-selected={activeStory === index}
                        className={`liquid-glass-button ${activeStory === index ? "is-active liquid-glass-button--primary" : ""}`}
                        onClick={() => setActiveStory(index)}
                      >
                        <strong>{option.org}</strong>
                        <small>{option.title}</small>
                      </button>
                    );
                  })}
                </div>

                <article className="expertise-case-detail" role="tabpanel">
                  <div className="expertise-case-meta"><span>{story.org}</span><span>{story.domain}</span></div>
                  <h3>{story.title}</h3>
                  {(["Problem", "Solution", "Impact"] as const).map((label) => (
                    <div className="expertise-evidence" key={label}>
                      <strong>{label}</strong>
                      <p>{story[label.toLowerCase() as "problem" | "solution" | "impact"]}</p>
                    </div>
                  ))}
                </article>
              </div>
            </div>

          </section>
        </div>
      )}
    </>
  );
}
