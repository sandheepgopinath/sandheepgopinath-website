"use client";

import { useState } from "react";
import { BriefcaseBusiness, CalendarDays, Lightbulb, MapPin } from "lucide-react";

const roles = [
  {
    company: "Verint",
    dates: "Mar 2024 – Sep 2026",
    role: "Product Manager",
    duration: "2 yrs 7 mos",
    location: "Bengaluru, Karnataka, India",
    focus: "Enterprise product strategy, prioritization, customer retention and cross-functional execution.",
    lesson: "Legacy products carry both valuable lessons and accumulated complexity. Understand the reasons behind existing decisions, then choose carefully what to preserve, change or decline.",
  },
  {
    company: "HRS Group",
    dates: "Aug 2022 – Mar 2024",
    role: "Product Manager · AI & Data Products",
    duration: "1 yr 8 mos",
    location: "Remote",
    focus: "AI product opportunity discovery, growth, adoption, self-service workflows and team alignment.",
    lesson: "Working Backwards and Agile matter, but a team moves faster when people understand why their work matters, have a voice in decisions and know their contribution is valued.",
  },
  {
    company: "Danfoss",
    dates: "Sep 2017 – Aug 2021",
    role: "Product Lead · Digital Transformation",
    duration: "4 years",
    location: "Chennai, India · Kolding & Nordborg, Denmark · Grodzisk, Poland · Wuqing, China",
    focus: "Industry 4.0 product discovery, operational UX, predictive analytics and international product scaling.",
    lesson: "Adoption depends on how a product feels in everyday work. Build trust with frontline users—not just observations of them—to understand the friction and needs they may never put into a requirements document.",
  },
  {
    company: "Synapse Technologies",
    dates: "Aug 2014 – Sep 2017",
    role: "Founding Member · Products & Operations",
    duration: "3 yrs 2 mos",
    location: "Cochin, Kerala, India",
    focus: "Product strategy, customer discovery, business-model transformation, B2B sales and business leadership.",
    lesson: "The best technology is rarely the point. Listen with empathy, understand the real problem and look for genuine customer commitment—not polite agreement—as evidence of value.",
  },
  {
    company: "Qure.ai",
    dates: "Dates to confirm",
    role: "Product Discovery & Strategy · Short-term engagement",
    duration: "3 months",
    location: null,
    focus: "Medical AI market study, radiology customer discovery, product vision, requirements and roadmap.",
    lesson: "To understand a specialist customer, learn their language and earn their trust. Speaking with doctors and radiologists as a curious collaborator—not an outsider seeking answers—revealed problems I could not have understood from documents alone.",
  },
] as const;

export function ExperienceSection() {
  const [activeRole, setActiveRole] = useState(0);
  const experience = roles[activeRole];

  return (
    <section className="career-section" id="experience" aria-labelledby="experience-title">
      <div className="career-shell">
        <div className="career-heading">
          <div>
            <span>03 / EXPERIENCE</span>
            <h2 id="experience-title">Experience.</h2>
          </div>
          <strong>ROLES · LOCATIONS · PERSPECTIVES</strong>
        </div>

        <div className="career-layout">
          <div className="career-role-list" role="tablist" aria-label="Experience by organization">
            {roles.map((item, index) => (
              <button
                key={item.company}
                type="button"
                role="tab"
                aria-selected={activeRole === index}
                aria-controls="career-role-panel"
                className={`liquid-glass-button ${activeRole === index ? "is-active liquid-glass-button--primary" : ""}`}
                onClick={() => setActiveRole(index)}
              >
                <span className="career-role-name"><strong>{item.company}</strong><small>{item.duration}</small></span>
                <span>{item.dates}</span>
              </button>
            ))}
          </div>

          <article className="career-panel" id="career-role-panel" role="tabpanel">
            <header className="career-panel-header">
              <div className="career-wordmark" aria-hidden="true">{experience.company.charAt(0)}</div>
              <div>
                <span>{experience.company}</span>
                <h3>{experience.role}</h3>
              </div>
            </header>

            <div className="career-meta">
              <div><CalendarDays aria-hidden="true" /><span><strong>{experience.dates}</strong>{experience.duration}</span></div>
              {experience.location && <div><MapPin aria-hidden="true" /><span><strong>Location</strong>{experience.location}</span></div>}
            </div>

            <div className="career-focus">
              <BriefcaseBusiness aria-hidden="true" />
              <div><strong>Focus</strong><p>{experience.focus}</p></div>
            </div>

            <div className="career-lesson">
              <Lightbulb aria-hidden="true" />
              <div><strong>What stayed with me</strong><p>{experience.lesson}</p></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
