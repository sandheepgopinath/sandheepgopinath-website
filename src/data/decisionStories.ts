export const decisionStories = [
  {
    "id": "hotel",
    "org": "HRS Group",
    "category": "ai",
    "kind": "AI product · Executive investment",
    "title": "Building an AI-led hotel quality intelligence platform",
    "competencies": [
      "Executive Communication",
      "AI/ML Product Development",
      "MVP Definition & Go-to-Market"
    ],
    "teaser": "Business travellers were reporting serious hotel-quality issues. How could we justify a scalable response?",
    "problem": "HRS had sourced hotels over several years, but changes in safety, cleanliness and maintenance were not always reassessed. Complaints from business travellers were becoming a material customer-experience concern, and manual review across a large hotel network was difficult to scale.",
    "why": "The issue affected more than hotel operations: travellers’ confidence, corporate client trust and complaint-handling effort were at stake. Addressing it required investment in new capabilities and a decision to expand the data team beyond reporting.",
    "decision": "I established the business importance through complaint trends and quality signals, and led an MVP with data scientists using historical complaints, flagged properties, external ratings, and GeoSure information. I presented the opportunity, feasibility, and expected value to my director; together we secured CPO support for investment.",
    "outcome": "Leadership backed the initiative. Hotel Quality Scoring reached production in approximately six months and evaluated more than 1.5 million hotels.",
    "insight": "A promising technology only earns investment when the underlying business risk, value and feasibility are clear."
  },
  {
    "id": "data",
    "org": "HRS Group",
    "category": "ai",
    "kind": "Data readiness · AI product evaluation",
    "title": "Building a trustworthy data foundation for hotel quality intelligence",
    "competencies": [
      "AI Data Readiness & Evaluation",
      "AI/ML Product Strategy"
    ],
    "teaser": "Complaints, third-party ratings and historical quality flags offered different views of hotel risk. Were they sufficient to support a scoring product?",
    "problem": "HRS needed to identify hotels likely to deliver poor business-travel experiences, but evidence of hotel quality was fragmented. Complaints, previously flagged properties, external hotel ratings and safety indicators had different origins and limitations.",
    "why": "Before committing to predictive scoring, the team had to determine whether available data meaningfully represented the quality problems it wanted to detect. A model built on weak or mismatched signals could generate misleading rankings and undermine customer trust.",
    "decision": "I worked with data scientists to examine the available signals and identify historical examples of poor-quality hotels that could inform a supervised approach. We brought together complaint histories, manually flagged properties, external ratings and GeoSure data to test feasibility and shape the initial logistic-regression scoring model. I kept the intended product decision—identifying potentially problematic hotels—central to the data work.",
    "outcome": "The available evidence supported an MVP and the subsequent Hotel Quality Scoring product, which evaluated more than 1.5 million hotels. Specific validation thresholds and model performance measures have not yet been documented.",
    "insight": "Model readiness starts by asking whether the data actually represents the customer problem—not by choosing an algorithm first."
  },
  {
    "id": "ai-transition",
    "org": "HRS Group",
    "category": "ai",
    "kind": "AI adoption · Organizational change",
    "title": "Evolving a reporting team into an AI product capability",
    "competencies": [
      "AI Adoption & Change Management",
      "Organizational Change & Delivery Leadership",
      "Strategic Alignment & Decision-Making"
    ],
    "teaser": "A team with data-science expertise was primarily delivering reports. How could its work move closer to real business problems?",
    "problem": "The HRS data team largely produced MicroStrategy reports and dossiers. The organization had data science expertise, but its day-to-day remit did not consistently involve defining and developing AI products around business problems.",
    "why": "New AI tools alone would not change the team’s contribution. The team needed a meaningful product direction, leadership support and a concrete problem that demonstrated why its capabilities should be used differently.",
    "decision": "I proposed shifting attention from reporting requests toward identifying high-value problems suitable for AI-driven products. The hotel-quality challenge offered a tangible starting point. I worked with data scientists to shape an MVP, connected the work to customer outcomes and business priorities, and engaged leadership to support the direction.",
    "outcome": "The team advanced beyond reporting into AI-driven product development, including Hotel Quality Scoring, which reached production. The change in team operating model has not been separately quantified.",
    "insight": "Adopting AI across a team is as much about shared purpose, ownership and organizational support as it is about technology."
  },
  {
    "id": "recommend",
    "org": "HRS Group",
    "category": "enterprise",
    "kind": "Adoption · Enterprise product design",
    "title": "Unlocking enterprise adoption through self-service design",
    "competencies": [
      "Enterprise Product Design",
      "Solution Prioritization",
      "Business Acumen"
    ],
    "teaser": "The Recommendation Engine was valuable, yet only 6% of customers used it. More features were not the answer.",
    "problem": "Customers could not easily configure Recommendation Engine for their needs. Onboarding depended heavily on engineering and could take months, discouraging adoption even where the product could deliver value.",
    "why": "Continuing to add functionality would do little if customers could not activate the existing product. The real decision was whether to increase sophistication or remove the barriers preventing use.",
    "decision": "Working with Customer Success, I investigated the configuration journey and prioritized a one-step experience with four predefined options. Advanced settings remained available for complex customers, while self-service setup reduced engineering dependency.",
    "outcome": "Adoption rose from 6% to 60%, and onboarding fell from months to under an hour.",
    "insight": "Sometimes the highest-value product decision is to make what already exists substantially easier to use."
  },
  {
    "id": "rebook",
    "org": "HRS Group",
    "category": "enterprise",
    "kind": "Growth · Self-service",
    "title": "Scaling automated rebooking without engineering bottlenecks",
    "competencies": [
      "Enterprise Product Design",
      "Business Acumen",
      "Solution Prioritization"
    ],
    "teaser": "A revenue-generating product struggled to grow because customers needed months of technical support just to start.",
    "problem": "Rebooking could identify lower hotel rates and automatically rebook reservations, but activation required a lengthy engineering-led configuration process. Adoption remained around 3%.",
    "why": "Customer value was locked behind implementation effort. Scaling adoption through repeated custom onboarding would continue to strain technical teams and delay customer benefits.",
    "decision": "I prioritized self-service configuration so customer-facing teams could activate the capability with far less engineering intervention, reducing the cost of bringing new accounts onto the product.",
    "outcome": "Rebooking adoption rose from 3% to 25%. Alongside Recommendation Engine improvements, the two products contributed to a reported 12% revenue increase.",
    "insight": "A product cannot scale commercially if every new customer requires a bespoke technical project."
  },
  {
    "id": "request",
    "org": "Verint",
    "category": "enterprise",
    "kind": "0→1 product · Retention",
    "title": "Removing enterprise scheduling barriers at scale",
    "competencies": [
      "Product Strategy",
      "Stakeholder Management",
      "MVP Definition & GTM",
      "Business Acumen"
    ],
    "teaser": "Routine scheduling requests depended on privileged administrators, while enterprise customers were considering alternatives.",
    "problem": "Frontline staff needed help from administrators for schedule-related changes. The resulting friction affected employee experience and became a significant concern for several enterprise customers, including four at risk of leaving.",
    "why": "A narrow feature fix would not necessarily resolve the recurring workflow problem. The product had to support employee requests within enterprise controls while demonstrating enough customer value to protect important relationships.",
    "decision": "Starting from an existing product concept, I defined the requirements and roadmap, worked with domain experts and Customer Success to identify early customers, and used controlled releases and direct demonstrations to learn which capabilities mattered most.",
    "outcome": "Request Anything reached more than 10,000 weekly active users and 100,000 weekly requests, and directly supported approximately $10 million in retained annual recurring revenue.",
    "insight": "Enterprise product growth begins by removing an important workflow constraint, not by accumulating features."
  },
  {
    "id": "ecosystem",
    "org": "Verint",
    "category": "enterprise",
    "kind": "Platform thinking · Enterprise extensibility",
    "title": "Extending enterprise products without compromising the ecosystem",
    "competencies": [
      "Platform Thinking & Reusability",
      "Enterprise Product Design & Scalability",
      "Trade-off Decisions & Product Prioritization"
    ],
    "teaser": "New capabilities such as Net Staffing and paid customer enhancements had to fit into a mature, interconnected product landscape.",
    "problem": "Request Anything needed new capabilities, including Net Staffing, while enterprise customers also requested paid enhancements. Each change had to coexist with established products, permission models, workflows and existing customer configurations.",
    "why": "A feature that solves one customer’s immediate need can disrupt shared behaviour, create inconsistent experiences, or increase long-term product complexity. Enterprise extensibility depends on treating each addition as part of an interconnected system.",
    "decision": "I evaluated proposed capabilities and customer-specific enhancements against existing workflows, product boundaries, dependencies and likely effects on other customers. I challenged isolated customizations where necessary and worked to make new functionality fit the broader product experience rather than solving requests in isolation.",
    "outcome": "This approach guided the definition and prioritization of new capabilities and paid enhancements within the enterprise product portfolio. A separate metric for reduced regressions or technical reuse has not been established.",
    "insight": "Every enterprise feature becomes part of a system. Good product decisions account for everyone affected, not just the customer requesting the change."
  },
  {
    "id": "roadmap",
    "org": "Verint",
    "category": "enterprise",
    "kind": "Roadmap · Trade-offs",
    "title": "Rebalancing customer demands and legacy product investment",
    "competencies": [
      "Product Prioritization",
      "Strategic Decision-Making",
      "Stakeholder Management"
    ],
    "teaser": "Hundreds of requests competed with accessibility work, technical debt and finite engineering capacity.",
    "problem": "Request Management carried years of feature requests from customers while also needing accessibility improvements and maintenance of older capabilities. Several demands were urgent to individual accounts, but the team could not do everything.",
    "why": "Accepting the loudest request could add complexity without improving the product for most customers. Ignoring account concerns could create commercial risk. Prioritization demanded choices across immediate value and long-term sustainability.",
    "decision": "I evaluated requests against the underlying problem, customer importance, commercial context, product fit and capacity. I worked with UX on accessibility requirements and challenged requests when an alternative solution made more sense, escalating commercially sensitive decisions with clear recommendations.",
    "outcome": "The roadmap balanced customer enhancements, accessibility and product sustainability. An isolated numerical outcome for this prioritization practice has not been established.",
    "insight": "Preserve the lessons of a legacy product without letting its history determine every future decision."
  },
  {
    "id": "delivery",
    "org": "Verint",
    "category": "enterprise",
    "kind": "Execution · Organizational change",
    "title": "Modernizing enterprise product delivery",
    "competencies": [
      "Organizational Change",
      "Cross-functional Leadership",
      "Strategic Alignment"
    ],
    "teaser": "A 64-person cross-functional effort was falling behind a demanding release timeline.",
    "problem": "Request Anything had an aggressive schedule and slow initial progress. Coordination across engineering, QA, UX, product and customer-facing stakeholders was limiting execution.",
    "why": "More pressure alone would not resolve unclear commitments, dependencies or shifting scope. Improving the way the organization worked was a product leadership decision in its own right.",
    "decision": "I proposed a more structured operating approach to management, aligned release scope and GTM commitments, and introduced monthly PI plans, sprint-level goals, velocity review and capacity visibility. Teams understood not only their deliverables but the purpose and constraints behind them.",
    "outcome": "Delivery velocity increased by 25%, and time-to-market improved by 4× compared with earlier release cycles.",
    "insight": "A shared plan only works when teams understand the why, contribute to commitments and trust the people coordinating them."
  },
  {
    "id": "factory",
    "org": "Danfoss",
    "category": "industry",
    "kind": "Global digitalization · Frontline workflows",
    "title": "Scaling human-centered digital transformation across factories",
    "competencies": [
      "Stakeholder Management",
      "Digital Adoption",
      "Product Discovery"
    ],
    "teaser": "Manual production records limited visibility, but a technically correct solution would fail if it did not fit daily work.",
    "problem": "Shop-floor information was often collected manually, making traceability and operational visibility harder. Factory teams across countries had different routines and constraints.",
    "why": "A digital system could look successful in a prototype yet fail in practice if operators did not trust it or if its workflow added friction. Scaling required learning what people actually experienced during their work.",
    "decision": "I spent time with operators and plant leaders, developed relationships beyond formal observation, and shaped digital workflows around real production needs. We adapted validated approaches across sites in India, Denmark, Poland and China rather than assuming a single factory’s implementation would fit every location.",
    "outcome": "The wider Industry 4.0 initiatives contributed to a reported 2.4% annual productivity improvement.",
    "insight": "To earn adoption, become someone users trust enough to tell you what really frustrates them."
  },
  {
    "id": "vision",
    "org": "Danfoss",
    "category": "industry",
    "kind": "Quality · Computer vision",
    "title": "Reducing manufacturing defects through computer vision",
    "competencies": [
      "AI/ML Product Development",
      "Solution Prioritization",
      "Product Strategy"
    ],
    "teaser": "Late defect detection increased scrap and lost production efficiency.",
    "problem": "Manufacturing defects were not always identified early enough to avoid wasted material and disrupted workflows. Manual inspection could limit the consistency and speed of detection.",
    "why": "The goal was not to introduce computer vision for its own sake. Any solution needed to improve quality decisions within the realities of the production line.",
    "decision": "I identified the quality-inspection opportunity, evaluated computer vision as a feasible approach, validated it through early prototypes and helped guide the solution toward production use with relevant teams.",
    "outcome": "The vision inspection initiative detected 90% of manufacturing defects, improved production efficiency by 17%, and received the CII Kaizen Gold Award.",
    "insight": "Technology choices should follow the operational decision they need to improve."
  },
  {
    "id": "predict",
    "org": "Danfoss",
    "category": "ai",
    "kind": "Predictive analytics · Maintenance",
    "title": "Reducing factory downtime through predictive maintenance",
    "competencies": [
      "AI/ML Product Strategy",
      "Technical Fluency",
      "Solution Prioritization"
    ],
    "teaser": "Unexpected motor and pump problems created costly downtime across factories.",
    "problem": "Machine failures could interrupt manufacturing and generate avoidable maintenance costs. Conventional maintenance practices did not always provide advance warning.",
    "why": "Predictive models were only useful if they could identify actionable anomalies from available machine signals and support practical maintenance decisions.",
    "decision": "I worked with factory teams to understand failure consequences and shape a predictive-maintenance product using equipment signals and anomaly detection. The approach connected operational priorities, data feasibility and how maintenance teams would act on alerts.",
    "outcome": "The initiative delivered approximately $80,000 in annual savings across six factories.",
    "insight": "AI creates value when its predictions connect to a timely real-world decision."
  },
  {
    "id": "pivot",
    "org": "Synapse Technologies",
    "category": "venture",
    "kind": "Business model · Founder judgment",
    "title": "Repositioning a hardware venture for sustainable B2B growth",
    "competencies": [
      "Strategic Decision-Making",
      "Business Acumen",
      "Go-to-Market"
    ],
    "teaser": "Selling consumer hardware one customer at a time was limiting growth.",
    "problem": "Synapse’s original consumer-focused approach produced limited growth, while larger opportunities were appearing with builders, institutions and industrial customers.",
    "why": "Continuing with small individual orders required repeated acquisition effort. A B2B model promised larger contracts and recurring relationships, but required changing what the company sold and how it operated.",
    "decision": "I helped redirect the business toward B2B opportunities, adapting the product offering, pricing, customer acquisition, partnerships and operations to serve institutional and enterprise needs.",
    "outcome": "B2B became the primary business. Synapse reached profitability and developed 12 recurring B2B customer relationships.",
    "insight": "A founder must be willing to change the commercial model, not just improve the product."
  },
  {
    "id": "discovery",
    "org": "Synapse Technologies",
    "category": "venture",
    "kind": "Customer discovery · Product definition",
    "title": "Turning customer requests into validated product opportunities",
    "competencies": [
      "Product Discovery",
      "Solution Prioritization",
      "Business Acumen"
    ],
    "teaser": "Customers often arrived with a specific device or feature in mind, not a fully understood problem.",
    "problem": "Industrial and laboratory customers approached Synapse with equipment ideas ranging from automation to safety monitoring. Their first request did not always describe the real workflow need or the most useful solution.",
    "why": "Simply building what someone initially requested risked delivering capable technology that solved the wrong problem. Positive feedback was also not sufficient proof of demand.",
    "decision": "I worked closely with customers, listened to how they operated, challenged assumptions, and shaped product requirements around their actual constraints. I learned to distinguish polite agreement from stronger evidence such as willingness to commit to a purchase or deployment.",
    "outcome": "This customer-led approach supported a broader B2B product portfolio and recurring customer relationships. Individual product outcomes have not been quantified.",
    "insight": "Customer commitment is a stronger signal of value than customer compliments."
  },
  {
    "id": "qure",
    "org": "Qure.ai",
    "category": "ai",
    "kind": "Healthcare AI · Discovery",
    "title": "Defining clinical AI products through deep customer discovery",
    "competencies": [
      "Product Discovery",
      "AI/ML Product Strategy",
      "MVP Definition"
    ],
    "teaser": "Medical AI opportunities could not be understood through technical feasibility alone.",
    "problem": "Finding meaningful AI applications in radiology required understanding clinical routines, diagnostic decisions, specialist terminology and constraints that would not emerge from a generic market analysis.",
    "why": "A technically promising AI product could still miss an important clinical need. Understanding specialists as people, not simply research subjects, was essential to identifying an opportunity worth pursuing.",
    "decision": "I invested in learning radiologists’ and doctors’ working language, building relationships and engaging with their real concerns. Combining this discovery with market research and data-feasibility discussions, I defined the product direction, priorities, PRD and roadmap.",
    "outcome": "Within the three-month engagement, I delivered a development-ready product definition. Qure.ai began development afterward; a launch or commercial result has not been confirmed.",
    "insight": "To understand a specialist customer’s pain, learn their world and earn the trust needed for honest conversations."
  },
  {
    "id": "sketch",
    "org": "Sketch Theory",
    "category": "venture",
    "kind": "Commerce · Product-market exploration",
    "title": "Reinventing an artist-led commerce business model",
    "competencies": [
      "Product Strategy",
      "Customer Discovery",
      "Business Model Innovation"
    ],
    "teaser": "A do-it-yourself merchandise marketplace was creating friction for buyers and insufficient recognition for artists.",
    "problem": "An open print-on-demand approach expected shoppers to create designs themselves, while artists wanted their original work and identity to remain central. The model did not adequately serve either group.",
    "why": "Polishing the customization interface would not solve the misalignment. The underlying value proposition needed to change.",
    "decision": "Based on conversations with artists and customers, I helped shift Sketch Theory toward curated original artwork, premium made-to-order apparel, artist storytelling and limited artist-approved personalization.",
    "outcome": "The first artist-led collection launched and received nine paid orders in its first three days—an early demand signal, not established product-market fit.",
    "insight": "When research challenges the core proposition, change the proposition rather than defending the original solution."
  },
  {
    "id": "artistai",
    "org": "Sketch Theory",
    "category": "ai",
    "kind": "Generative AI · Operations",
    "title": "Streamlining artist onboarding with controlled generative AI",
    "competencies": [
      "Generative AI Product Development",
      "AI/ML Technical Fluency",
      "Product Definition"
    ],
    "teaser": "Preparing consistent artist biographies and artwork descriptions required repetitive manual work.",
    "problem": "Artist profiles needed credible bios, style descriptors and artwork descriptions, but incoming artist information varied in detail and format.",
    "why": "Generative AI could save preparatory effort, but unconstrained output risked inconsistent content or unsupported claims about an artist.",
    "decision": "I defined a controlled workflow using Amazon Bedrock and AWS Lambda, with bounded inputs, an artwork image, structured output fields, length constraints and administrative access controls. The system supplies draft content for review rather than acting as an autonomous agent.",
    "outcome": "The internal artist-analysis generator was integrated and tested. Production-scale time savings have not yet been quantified.",
    "insight": "Generative AI works best when the workflow, safeguards, and human review are clearly defined. This is a GenAI product, not an autonomous agent."
  }
] as const;

