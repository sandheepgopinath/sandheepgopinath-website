"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { expertiseAreas, type ExpertiseGroup } from "@/data/expertiseData";

const filters: { label: string; value: ExpertiseGroup }[] = [
  { label: "Product & Business", value: "foundation" },
  { label: "Leadership", value: "leadership" },
  { label: "AI & Technology", value: "ai" },
];

export function ExpertiseSection() {
  const [filter, setFilter] = useState<ExpertiseGroup>("foundation");
  const [activeArea, setActiveArea] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const area = activeArea === null ? null : expertiseAreas[activeArea];

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

  return (
    <>
      <section className="expertise-section" id="expertise" aria-labelledby="expertise-title">
        <div className="expertise-shell">
          <div className="expertise-heading-row">
            <div>
              <span className="expertise-section-label">02 / EXPERTISE AND IMPACT</span>
              <h2 id="expertise-title">Expertise and Impact</h2>
            </div>
            <span>{expertiseAreas.length} COMPETENCIES</span>
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
                    setActiveArea(index);
                  }}
                >
                  <span className="expertise-card-number">{item.num}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {area && (
        <div className="expertise-dialog" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
          <section className="expertise-modal" role="dialog" aria-modal="true" aria-labelledby="expertise-modal-title">
            <header className="expertise-modal-header">
              <span>COMPETENCY</span>
              <button ref={closeButtonRef} type="button" className="liquid-glass-button liquid-glass-button--icon" onClick={close} aria-label="Close expertise details">
                <X aria-hidden="true" />
              </button>
            </header>

            <div className="expertise-modal-body">
              <h2 id="expertise-modal-title">{area.title}</h2>
              <p className="expertise-modal-intro">{area.description}</p>
            </div>

          </section>
        </div>
      )}
    </>
  );
}
