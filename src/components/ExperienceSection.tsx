"use client";

import { useState } from "react";
import { CalendarDays, Lightbulb, MapPin } from "lucide-react";

const roles = [
  {
    company: "Verint",
    dates: "Mar 2024 – Sep 2026",
    role: "Product Manager",
    duration: "2 yrs 7 mos",
    locations: ["Bengaluru, Karnataka, India"],
    highlights: [
      "Drove $10M ARR retention and $5M in incremental revenue through paid product enhancements across 2 core enterprise workforce management products—leading strategy, vision, and roadmap.",
      "Transformed the product roadmap from a 3-year waterfall model to an agile, customer-driven delivery approach—accelerating time-to-market by 4× and driving approximately $5M ARR retention across 63 enterprise customers.",
      "Systematized engineering execution from the ground up—introducing sprint-level planning, velocity tracking, monthly PI planning, and 3-month roadmap cycles that improved delivery velocity by 25%.",
      "Enabled $1M–$2M in annual operational efficiency gains per enterprise account by building and scaling Request Anything from 0→1 in 12 months—reaching 6,000+ weekly active users and 12K+ weekly requests.",
    ],
    lesson: "Legacy products carry both valuable lessons and accumulated complexity. Understand the reasons behind existing decisions, then choose carefully what to preserve, change or decline.",
  },
  {
    company: "HRS Group",
    dates: "Aug 2022 – Mar 2024",
    role: "Product Manager · AI & Data Products",
    duration: "1 yr 8 mos",
    locations: ["Remote"],
    highlights: [
      "Owned product strategy and roadmap across 3 core HRS products, prioritizing roadmap investments to increase enterprise adoption, improve booking quality, and drive commercial outcomes.",
      "Increased Recommendation Engine adoption from 6% to 60% and Rebooking adoption from 3% to 25% by eliminating onboarding friction, replacing engineering-led implementations with self-service workflows, and driving a 12% increase in revenue across both products.",
      "Conceived, launched, and scaled a machine learning-powered hotel quality scoring platform, evaluating 1.5M+ hotels to reduce customer complaints by 80% and generate $0.5M in incremental revenue.",
    ],
    lesson: "Working Backwards and Agile matter, but a team moves faster when people understand why their work matters, have a voice in decisions and know their contribution is valued.",
  },
  {
    company: "Danfoss",
    dates: "Sep 2017 – Aug 2021",
    role: "Product Lead · Digital Transformation",
    duration: "4 years",
    locations: ["Chennai, India", "Kolding & Nordborg, Denmark", "Grodzisk, Poland", "Wuqing, China"],
    highlights: [
      "Led end-to-end product discovery across manufacturing plants in India, Denmark, Poland, and China, partnering with plant leaders and shop-floor operators to identify operational bottlenecks, define product strategy, and prioritize digital transformation initiatives.",
      "Built and scaled multiple Industry 4.0 products from concept to global deployment, rapidly validating solutions through self-developed prototypes before leading cross-functional engineering teams to productionize them across global factories, contributing to a 2.4% annual productivity increase.",
      "Conceived and launched a vision quality inspection system that detected 90% of manufacturing defects, improved production efficiency by 17%, and earned the CII Kaizen Gold Award.",
      "Led product strategy and roadmap for a predictive maintenance product that reduced machine downtime and delivered $80K in annual savings across 6 factories.",
    ],
    lesson: "Adoption depends on how a product feels in everyday work. Build trust with frontline users—not just observations of them—to understand the friction and needs they may never put into a requirements document.",
  },
  {
    company: "Synapse Technologies",
    dates: "Aug 2014 – Sep 2017",
    role: "Founding Member · Products & Operations",
    duration: "3 yrs 2 mos",
    locations: ["Cochin, Kerala, India"],
    highlights: [
      "Co-founded an IoT and industrial automation company, defining company vision, strategy, and roadmap for connected hardware and industrial automation products that democratized affordable automation for B2B customers across India and international markets.",
      "Led end-to-end product discovery through market research, customer interviews, and rapid MVP validation, launching products that secured recurring enterprise customers and achieved profitability.",
      "Defined go-to-market strategy and enterprise sales motion, acquiring the first 12 recurring B2B customers through direct outreach, securing international clients, and growing the business to approximately ₹10 lakh in annual revenue with enterprise deals worth up to ₹6 lakh.",
    ],
    lesson: "The best technology is rarely the point. Listen with empathy, understand the real problem and look for genuine customer commitment—not polite agreement—as evidence of value.",
  },
  {
    company: "Qure.ai",
    dates: "Dates to confirm",
    role: "Product Discovery & Strategy · Short-term engagement",
    duration: "3 months",
    locations: [],
    highlights: [],
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
                <strong>{item.company}</strong>
                <small className="career-role-duration">{item.duration}</small>
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
              {experience.locations.length > 0 && (
                <div className="career-location-meta">
                  <MapPin aria-hidden="true" />
                  <span><strong>Locations</strong><span className="career-location-pills">{experience.locations.map((location) => <i key={location}>{location}</i>)}</span></span>
                </div>
              )}
            </div>

            <div className="career-highlights">
              <strong>Resume highlights</strong>
              {experience.highlights.length > 0 ? (
                <ul>{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
              ) : (
                <p>This short-term engagement is not detailed in the current resume.</p>
              )}
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
