"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, X } from "lucide-react";
import { experienceCompanies } from "@/data/experienceData";

const latestFirst = ["Verint", "HRS Group", "Danfoss", "Synapse Technologies"];
const visibleExperienceCompanies = experienceCompanies
  .filter((item) => item.company !== "Sketch Theory · Edition36" && item.company !== "Qure.ai")
  .sort((a, b) => latestFirst.indexOf(a.company) - latestFirst.indexOf(b.company));

export function ExperienceSection() {
  const [activeCompany, setActiveCompany] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const company = activeCompany === null ? null : visibleExperienceCompanies[activeCompany];

  const close = () => {
    setActiveCompany(null);
    requestAnimationFrame(() => openerRef.current?.focus());
  };

  useEffect(() => {
    if (!company) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [company]);

  return (
    <>
      <section className="career-section career-section--reference" id="experience" aria-labelledby="experience-title">
        <div className="career-shell experience-reference-shell">
          <div className="career-heading experience-reference-heading">
            <div>
              <span>03 / EXPERIENCE</span>
              <h2 id="experience-title">Experience.</h2>
              <p>The products, teams and businesses I was entrusted to shape—beyond job titles and résumé highlights.</p>
            </div>
            <strong>SELECT A COMPANY TO VIEW OWNERSHIP</strong>
          </div>

          <div className="experience-company-grid">
            {visibleExperienceCompanies.map((item, index) => (
              <article
                key={item.company}
                className="experience-company-card"
              >
                <span className="experience-company-logo">
                  {(item.logo as string) ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.logo}
                        alt={`${item.company} logo`}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.hidden = true;
                          event.currentTarget.nextElementSibling?.removeAttribute("hidden");
                        }}
                      />
                      <span hidden>{item.company}</span>
                    </>
                  ) : <span>{item.company}</span>}
                </span>
                <span className="experience-company-copy">
                  <strong>{item.company}</strong>
                  <small className="text-[14.5px]">{item.role}</small>
                  <time className="text-[9.5px] text-[#6d7c70] block mt-0.5 mb-1.5">
                    {item.dates} ({item.duration})
                  </time>
                  <span>{item.overview}</span>
                </span>
                <span className="experience-company-meta">
                  <button
                    ref={(node) => { if (activeCompany === index) openerRef.current = node; }}
                    type="button"
                    aria-haspopup="dialog"
                    onClick={(event) => {
                      openerRef.current = event.currentTarget;
                      setActiveCompany(index);
                    }}
                  >
                    View Role &amp; Responsibility
                  </button>
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {company && activeCompany !== null && (
        <div className="experience-detail-dialog" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
          <section className="experience-detail-modal" role="dialog" aria-modal="true" aria-labelledby="experience-detail-title">
            <header>
              <span>PROFESSIONAL JOURNEY / PRODUCT OWNERSHIP</span>
              <button ref={closeButtonRef} type="button" className="liquid-glass-button liquid-glass-button--icon" onClick={close} aria-label="Close experience details"><X aria-hidden="true" /></button>
            </header>

            <div className="experience-detail-body">
              <div className="experience-detail-intro">
                <h2 id="experience-detail-title" className="sr-only">{company.company}</h2>
                <span className="experience-detail-logo">
                  {(company.logo as string) ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={company.logo}
                        alt={`${company.company} logo`}
                        onError={(event) => {
                          event.currentTarget.hidden = true;
                          event.currentTarget.nextElementSibling?.removeAttribute("hidden");
                        }}
                      />
                      <strong hidden>{company.company}</strong>
                    </>
                  ) : <strong>{company.company}</strong>}
                </span>
                <strong>{company.role}</strong>
                <dl className="experience-detail-tenure">
                  <div><dt>Years</dt><dd>{company.dates}</dd></div>
                  <div><dt>Total time</dt><dd>{company.duration}</dd></div>
                </dl>
                <p>{company.overview}</p>
              </div>

              <div className="experience-detail-location"><MapPin aria-hidden="true" /><span><strong>Location</strong>{company.location}</span></div>

              <div className="experience-products">
                {company.products.map((product) => (
                  <article key={product.label} className="experience-product">
                    <span>{product.label}</span>
                    <div>
                      <h3>{product.title}</h3>
                      <strong>{product.phase}</strong>
                      {product.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                  </article>
                ))}
              </div>

              <aside className="experience-reflection"><span>WHAT STAYED WITH ME</span><p>{company.reflection}</p></aside>
            </div>

            <footer className="experience-detail-footer">
              <button type="button" disabled={activeCompany === 0} onClick={() => setActiveCompany((current) => current === null ? 0 : Math.max(0, current - 1))}>Previous</button>
              <span>{activeCompany + 1} of {visibleExperienceCompanies.length}</span>
              <button type="button" disabled={activeCompany === visibleExperienceCompanies.length - 1} onClick={() => setActiveCompany((current) => current === null ? 0 : Math.min(visibleExperienceCompanies.length - 1, current + 1))}>Next</button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
