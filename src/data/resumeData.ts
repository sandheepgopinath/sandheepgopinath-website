export interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface ResumeData {
  name: string;
  title: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  calendly: string;
  summary: string;
  stats: { label: string; value: string; desc: string }[];
  education: Education[];
  experience: Experience[];
  skills: {
    category: string;
    items: string[];
  }[];
}

export const resumeData: ResumeData = {
  name: "Sandheep Gopinath",
  title: "Product Manager | AI & Enterprise SaaS",
  headline: "Building 0→1 enterprise SaaS, AI-driven platforms, and Industry 4.0 products that scale.",
  email: "hello@sandheepgopinath.com",
  phone: "+91-9745355256",
  location: "Bangalore, India",
  linkedin: "https://www.linkedin.com/in/sandheepgopinath/",
  github: "https://github.com/sandheepgopinath",
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/sandheepgopinath",
  summary:
    "Product Manager with nearly 11 years of high-impact experience building and scaling enterprise workforce management software, AI/ML platforms, and IoT solutions. Proven track record driving $10M+ ARR retention, scaling 0→1 products to thousands of active enterprise users, and transforming legacy roadmaps into high-velocity agile engines.",
  stats: [
    { label: "Experience", value: "10+ Yrs", desc: "Enterprise & AI Product Management" },
    { label: "ARR Retention", value: "$10M+", desc: "Retained across core enterprise accounts" },
    { label: "0→1 Scale", value: "6,000+ WAU", desc: "Scaled 'Request Anything' in 12 months" },
    { label: "AI Platforms", value: "1.5M+", desc: "Hotels evaluated via ML scoring platform" },
  ],
  education: [
    {
      degree: "Post Graduate Diploma in Leadership & AI-ML",
      institution: "Plaksha University (Technology Leaders Program)",
      year: "2021 – 2022",
    },
    {
      degree: "Post Graduate Program in Artificial Intelligence",
      institution: "McCombs School of Business, University of Texas",
      year: "2020 – 2021",
    },
    {
      degree: "Post Graduate Diploma in Embedded Systems",
      institution: "Accel IT Academy",
      year: "2016 – 2017",
    },
    {
      degree: "B.Tech in Electronics and Communication",
      institution: "Sree Chitra Tirunal College of Engineering",
      year: "2012 – 2016",
    },
  ],
  experience: [
    {
      company: "Verint",
      role: "Product Manager (Senior Product Manager Responsibilities)",
      period: "Mar 2024 – Sep 2026",
      location: "Bangalore",
      highlights: [
        "Drove $10M ARR retention and $5M in incremental revenue through paid product enhancements across 2 core enterprise workforce management products — leading strategy, vision, and roadmap.",
        "Transformed product roadmap from a 3-year waterfall model to an agile, customer-driven delivery approach — accelerating time-to-market by 4x and driving ~$5M ARR retention across 63 enterprise customers.",
        "Systematized engineering execution from the ground up — introducing sprint-level planning, velocity tracking, monthly PI planning, and 3-month roadmap cycles that improved delivery velocity by 25%, accelerating time-to-market and enabling faster customer-driven product validation.",
        "Enabled $1M–$2M in annual operational efficiency gains per enterprise account by building and scaling 'Request Anything' from 0→1 in 12 months — reaching 6,000+ weekly active users and 12K+ weekly requests.",
      ],
    },
    {
      company: "HRS Group",
      role: "Product Manager",
      period: "Aug 2022 – Mar 2024",
      highlights: [
        "Owned product strategy and roadmap across 3 core products of HRS, prioritizing roadmap investments to increase enterprise adoption, improve booking quality, and drive commercial outcomes.",
        "Increased Recommendation Engine adoption from 6% to 60% and Rebooking adoption from 3% to 25% by eliminating onboarding friction, replacing engineering-led implementations with self-service workflows, and driving a 12% increase in revenue across both products.",
        "Conceived, launched, and scaled a machine learning-powered hotel quality scoring platform, evaluating 1.5M+ hotels to reduce customer complaints by 80% and generate $0.5M in incremental revenue.",
      ],
    },
    {
      company: "Danfoss",
      role: "Product Lead, Digital Transformation (Internal: Process Expert)",
      period: "Sep 2017 – Aug 2021",
      highlights: [
        "Led end-to-end product discovery across manufacturing plants in India, Denmark, Poland, and China, partnering with plant leaders and shop-floor operators to identify operational bottlenecks, define product strategy, and prioritize digital transformation initiatives aligned with business objectives.",
        "Built and scaled multiple Industry 4.0 products from concept to global deployment, rapidly validating solutions through self-developed prototypes before leading cross-functional engineering teams to productionize them across global factories, eventually resulting in a 2.4% annual increase in productivity.",
        "Conceived and launched a vision quality inspection system that detected 90% of manufacturing defects, improved production efficiency by 17%, and earned the prestigious CII Kaizen Gold Award.",
        "Led the product strategy and roadmap for a predictive maintenance product that reduced machine downtimes and delivered an annual savings of $80k across 6 factories.",
      ],
    },
    {
      company: "Synapse Technologies",
      role: "Founding Member, Head of Products and Operation",
      period: "Aug 2014 – Sep 2017",
      highlights: [
        "Co-founded an IoT and industrial automation company, defining company vision, strategy, and roadmap for a portfolio of connected hardware and industrial automation products that democratized affordable automation for B2B customers across India and international markets.",
        "Led end-to-end product discovery through market research, customer interviews, and rapid MVP validation, launching products that secured recurring enterprise customers and achieved profitability.",
        "Defined go-to-market strategy and enterprise sales motion, acquiring the first 12 recurring B2B customers through direct outreach, securing international clients, and growing the business to profitability with annual revenue of ~₹10 lakh and enterprise deals worth up to ₹6 lakh.",
      ],
    },
  ],
  skills: [
    {
      category: "Product & Business",
      items: [
        "Enterprise SaaS",
        "B2B Products",
        "Platform Products",
        "Product Lifecycle Management",
        "Growth Product Management",
        "North Star Metrics",
        "Product Experimentation",
        "User Research",
        "Commercial Strategy",
      ],
    },
    {
      category: "Agile & Delivery",
      items: [
        "Release Planning",
        "Story Mapping",
        "Capacity Planning",
        "User Stories & Epics",
        "Acceptance Criteria",
        "Sprint Execution",
        "PI Planning",
      ],
    },
    {
      category: "AI & Data",
      items: [
        "Machine Learning",
        "Artificial Intelligence",
        "Natural Language Processing (NLP)",
        "Computer Vision",
        "Predictive Analytics",
        "Recommendation Systems",
        "SQL & Presto SQL",
        "Python",
        "Classification & Sentiment Analysis",
      ],
    },
    {
      category: "Technical & Architecture",
      items: [
        "REST APIs",
        "Firebase",
        "Postman",
        "Git",
        "IoT & Embedded Systems",
        "Industry 4.0",
        "Data Visualization",
      ],
    },
    {
      category: "Analytics & Tools",
      items: [
        "Pendo",
        "Google Analytics",
        "Tableau",
        "Power BI",
        "MicroStrategy",
        "Jira",
        "Confluence",
        "Miro",
        "Balsamiq",
      ],
    },
  ],
};

export const RESUME_SYSTEM_PROMPT = `You are Sandheep Gopinath's official Digital Twin on his personal website.
Your role is to represent Sandheep accurately, professionally, and warmly in conversation with recruiters, hiring managers, founders, collaborators, and visitors.
You answer any questions regarding Sandheep's background, work experience, achievements, technical expertise, leadership style, and education based exclusively on his authentic resume and professional history.

Tone & Personality:
- Professional, thoughtful, articulate, confident yet humble, like a senior product leader.
- First-person perspective ("I", "my work", "at Verint, I led...") or referring to yourself as Sandheep's digital twin when asked.
- Provide concrete numbers and metrics from the resume when discussing accomplishments (e.g., $10M ARR retained, 6,000+ WAU, 4x faster time-to-market, 1.5M+ hotels evaluated).
- If asked about something completely outside Sandheep's professional background or something not mentioned in the resume (like personal secrets or speculative topics), politely state that your knowledge is focused on Sandheep's professional journey, product management craft, and portfolio, and suggest getting in touch with Sandheep directly via email (hello@sandheepgopinath.com) or booking a call via Calendly.

Key Facts about Sandheep Gopinath:
- Title: Senior Product Manager (AI & Enterprise SaaS)
- Total Experience: Nearly 11 years (10 years 11 months)
- Current Location: Bangalore, India
- Email: hello@sandheepgopinath.com
- Phone: +91-9745355256
- Education:
  * Plaksha University (Technology Leaders Program): Post Graduate Diploma in Leadership & AI-ML (2021-2022)
  * McCombs School of Business, UT Austin: Post Graduate Program in Artificial Intelligence (2020-2021)
  * Accel IT Academy: PG Diploma in Embedded Systems (2016-2017)
  * Sree Chitra Tirunal College of Engineering: B.Tech in Electronics & Communication (2012-2016)

Career Highlights & Experience:
1. Verint (Mar 2024 – Present) - Product Manager (Senior PM responsibilities):
   * Drove $10M ARR retention and $5M in incremental revenue through paid product enhancements across 2 core enterprise workforce management products.
   * Transformed product roadmap from a 3-year waterfall model to an agile, customer-driven delivery approach, accelerating time-to-market by 4x and driving ~$5M ARR retention across 63 enterprise customers.
   * Systematized engineering execution from scratch: sprint planning, velocity tracking, PI planning, 3-month roadmap cycles improving velocity by 25%.
   * Built & scaled "Request Anything" from 0→1 in 12 months, delivering $1M-$2M annual operational efficiency gains per account, reaching 6,000+ WAU and 12K+ weekly requests.

2. HRS Group (Aug 2022 – Mar 2024) - Product Manager:
   * Strategy & roadmap across 3 core HRS products.
   * Increased Recommendation Engine adoption from 6% to 60% and Rebooking adoption from 3% to 25% by removing onboarding friction and instituting self-service workflows (12% revenue increase).
   * Conceived, launched, and scaled a machine learning hotel quality scoring platform evaluating 1.5M+ hotels, reducing customer complaints by 80% and bringing $0.5M incremental revenue.

3. Danfoss (Sep 2017 – Aug 2021) - Product Lead, Digital Transformation (Process Expert):
   * Led product discovery across manufacturing plants in India, Denmark, Poland, and China.
   * Built Industry 4.0 products resulting in 2.4% annual factory productivity increase.
   * Created vision inspection system detecting 90% of defects, boosting efficiency by 17%, winning the CII Kaizen Gold Award.
   * Predictive maintenance product saving $80k annually across 6 factories.

4. Synapse Technologies (Aug 2014 – Sep 2017) - Founding Member, Head of Products & Operations:
   * Co-founded IoT & industrial automation startup, acquiring first 12 recurring B2B clients, taking it to profitability.

Always invite visitors to book a meeting or send an email if they'd like to discuss an opportunity or project!
`;
