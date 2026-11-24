export interface Book {
  title: string;
  author: string;
  category: string;
  reflection: string;
  href: string;
  image: string;
  fallbackClass?: string;
}

export interface Metric {
  value: string;
  description: string;
  company: string;
}

export interface ExperienceItem {
  dates: string;
  company: string;
  job: string;
  description: string;
}

export interface WorkItem {
  tag: string;
  title: string;
  description: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  dates: string;
  duration: string;
}

export const portfolioV5Data = {
  name: "Sandheep Gopinath",
  title: "Product Leader",
  roleline: "PRODUCT LEADER · 0→1 PRODUCTS · ENTERPRISE SAAS & AI",
  kicker: "Product strategy / Customer understanding / Technology",
  location: "Based in Bengaluru, India",
  email: "hello@sandheepgopinath.com",
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/sandheepgopinath",
  resumePdf: "/api/resume/download",
  summary:
    "Connecting why an organization exists with what its customers genuinely need.",
  about: {
    number: "01 / ABOUT",
    heading: "What experience has taught me.",
    aside: "Different industries. Different markets. The same question: did our work create value that matters?",
    paragraphs: [
      "I've spent over a decade building products across industries, technologies, and businesses at very different stages of growth. One thing that experience has consistently reinforced is that the success of a product isn't determined by how sophisticated the technology is, but by the value it creates for the people and businesses it serves.",
      "Working across hardware, software, AI, and data-driven products has shown me how differently the same problem can be approached. An idea that works in manufacturing might solve an entirely different problem in healthcare or hospitality. Often, the most valuable insights come from looking beyond the conventions of a particular industry.",
      "My experience spans building businesses from the ground up, helping early-stage teams make their first critical product decisions, and working with established enterprises where even small improvements can create substantial value at scale. These experiences have taught me that impact looks different at every stage — sometimes it's finding the first paying customer, sometimes it's discovering that an idea isn't worth pursuing, and sometimes it's improving a product used by thousands of people.",
      "Working on-site in India, China, Poland, and Denmark, and collaborating with teams across the world, has added another dimension to that understanding. I've seen how the same product, process, or decision can affect people differently depending on their environment, expectations, and ways of working. It has reinforced a simple belief: meaningful outcomes begin with understanding the people affected by our decisions.",
      "Today, that perspective shapes how I approach product management. I look beyond features and delivery milestones to understand whether we're solving the right problem, whether it aligns with why the organization exists, and whether the outcome genuinely matters to the customer.",
    ],
    principles: [
      "Organizational purpose",
      "Customer psychology",
      "Product strategy",
      "Cross-functional leadership",
    ],
  },
  impact: {
    number: "02 / SELECTED OUTCOMES",
    heading: "Measured by outcomes.",
    intro:
      "Selected results from products I have helped shape, launch, and scale.",
    metrics: [
      {
        value: "$10M",
        description: "ARR retention supported by product enhancements",
        company: "VERINT",
      },
      {
        value: "4×",
        description: "Acceleration in time-to-market through roadmap transformation",
        company: "VERINT",
      },
      {
        value: "6% → 60%",
        description: "Growth in recommendation-engine adoption",
        company: "HRS GROUP",
      },
      {
        value: "80%",
        description: "Reduction in customer complaints through ML-powered hotel scoring",
        company: "HRS GROUP",
      },
    ],
  },
  work: {
    number: "06 / PRODUCTS, PROBLEMS, DECISIONS",
    heading: "Products, problems, decisions.",
    intro:
      "Real product problems, consequential decisions, and what I learned from them across enterprise software, AI, manufacturing, and new ventures.",
    items: [
      {
        tag: "HRS GROUP / AI PRODUCT · EXECUTIVE INVESTMENT",
        title: "Building an AI-led hotel quality intelligence platform",
        description: "Business travellers were reporting serious hotel-quality issues. How could we justify a scalable response?",
      },
      {
        tag: "HRS GROUP / DATA READINESS · AI PRODUCT EVALUATION",
        title: "Building a trustworthy data foundation for hotel quality intelligence",
        description: "Complaints, third-party ratings and historical quality flags offered different views of hotel risk. Were they sufficient to support a scoring product?",
      },
      {
        tag: "HRS GROUP / AI ADOPTION · ORGANIZATIONAL CHANGE",
        title: "Evolving a reporting team into an AI product capability",
        description: "A team with data-science expertise was primarily delivering reports. How could its work move closer to real business problems?",
      },
      {
        tag: "HRS GROUP / ADOPTION · ENTERPRISE PRODUCT DESIGN",
        title: "Unlocking enterprise adoption through self-service design",
        description: "The Recommendation Engine was valuable, yet only 6% of customers used it. More features were not the answer.",
      },
      {
        tag: "HRS GROUP / GROWTH · SELF-SERVICE",
        title: "Scaling automated rebooking without engineering bottlenecks",
        description: "A revenue-generating product struggled to grow because customers needed months of technical support just to start.",
      },
      {
        tag: "VERINT / 0→1 PRODUCT · RETENTION",
        title: "Removing enterprise scheduling barriers at scale",
        description: "Routine scheduling requests depended on privileged administrators, while enterprise customers were considering alternatives.",
      },
      {
        tag: "VERINT / PLATFORM THINKING · ENTERPRISE EXTENSIBILITY",
        title: "Extending enterprise products without compromising the ecosystem",
        description: "New capabilities and paid customer enhancements had to fit into a mature, interconnected product landscape.",
      },
      {
        tag: "VERINT / ROADMAP · TRADE-OFFS",
        title: "Rebalancing customer demands and legacy product investment",
        description: "Hundreds of requests competed with accessibility work, technical debt and finite engineering capacity.",
      },
      {
        tag: "VERINT / EXECUTION · ORGANIZATIONAL CHANGE",
        title: "Modernizing enterprise product delivery",
        description: "A 64-person cross-functional effort was falling behind a demanding release timeline.",
      },
      {
        tag: "DANFOSS / GLOBAL DIGITALIZATION · FRONTLINE WORKFLOWS",
        title: "Scaling human-centered digital transformation across factories",
        description: "Manual production records limited visibility, but a technically correct solution would fail if it did not fit daily work.",
      },
      {
        tag: "DANFOSS / QUALITY · COMPUTER VISION",
        title: "Reducing manufacturing defects through computer vision",
        description: "Late defect detection increased scrap and lost production efficiency.",
      },
      {
        tag: "DANFOSS / PREDICTIVE ANALYTICS · MAINTENANCE",
        title: "Reducing factory downtime through predictive maintenance",
        description: "Unexpected motor and pump problems created costly downtime across factories.",
      },
      {
        tag: "SYNAPSE TECHNOLOGIES / BUSINESS MODEL · FOUNDER JUDGMENT",
        title: "Repositioning a hardware venture for sustainable B2B growth",
        description: "Selling consumer hardware one customer at a time was limiting growth.",
      },
      {
        tag: "SYNAPSE TECHNOLOGIES / CUSTOMER DISCOVERY · PRODUCT DEFINITION",
        title: "Turning customer requests into validated product opportunities",
        description: "Customers often arrived with a specific device or feature in mind, not a fully understood problem.",
      },
      {
        tag: "QURE.AI / HEALTHCARE AI · DISCOVERY",
        title: "Defining clinical AI products through deep customer discovery",
        description: "Medical AI opportunities could not be understood through technical feasibility alone.",
      },
      {
        tag: "SKETCH THEORY / COMMERCE · PRODUCT-MARKET EXPLORATION",
        title: "Reinventing an artist-led commerce business model",
        description: "A do-it-yourself merchandise marketplace was creating friction for buyers and insufficient recognition for artists.",
      },
      {
        tag: "SKETCH THEORY / GENERATIVE AI · OPERATIONS",
        title: "Streamlining artist onboarding with controlled generative AI",
        description: "Preparing consistent artist biographies and artwork descriptions required repetitive manual work.",
      },
    ],
    advisoryNote:
      "Stories adapted from the product-decision case library in the reference portfolio.",
  },
  philosophy: {
    number: "05 / HOW I THINK",
    heading: "Build with conviction.",
    subheading: "Validate with humility.",
    pullQuote:
      "The hardest part of building a product isn't deciding what to build. It's being willing to find out you're wrong.",
    principles: [
      {
        id: "01",
        title: "My thinking starts with understanding.",
        description:
          "Study the person, the context, and the underlying need—not just the feature request.",
      },
      {
        id: "02",
        title: "Try to prove yourself wrong.",
        description:
          "Seek disconfirming evidence, question assumptions, and know when to change direction.",
      },
      {
        id: "03",
        title: "Earn the right to be used.",
        description:
          "Make the value real for buyers and for the people using the product every day.",
      },
    ],
  },
  reading: {
    number: "07 / THE THINKING SHELF",
    heading: "Ideas I keep coming back to.",
    intro:
      "A few books that have shaped how I think about building, communicating, learning, and understanding people. These are my short reflections—not quotations from the books.",
    footnote:
      "Selected reading · Cover images are loaded from external book retailers and may vary by edition. If a cover is unavailable, the title remains visible. Takeaways reflect my interpretation, not quotations.",
    books: [
      {
        title: "Inspired",
        author: "Marty Cagan",
        category: "Product",
        reflection: "Fall in love with the customer problem, not the first solution that comes to mind.",
        href: "https://books.google.com/books?id=S8Q_DwAAQBAJ",
        image: "https://books.google.com/books/content?id=S8Q_DwAAQBAJ&printsec=frontcover&img=1&zoom=2&source=gbs_api",
      },
      {
        title: "The Art of Thinking Clearly",
        author: "Rolf Dobelli",
        category: "Thinking",
        reflection: "Recognizing biases is a practical first step toward better decisions.",
        href: "https://books.google.com/books?id=yaE5mgEACAAJ",
        image: "https://shop.nypl.org/cdn/shop/files/the-art-thinking-clearly-book_1200x.jpg?v=1717188818",
      },
      {
        title: "Never Split the Difference",
        author: "Chris Voss",
        category: "Communication",
        reflection: "Listen for the emotions, constraints, and motivations behind what people say.",
        href: "https://books.google.com/books?id=TL8CCwAAQBAJ",
        image: "https://www.knjizare-vulkan.rs/files/watermark/files/images/slike_proizvoda/thumbs_w/404343_w_1200_1200px.jpg",
      },
      {
        title: "Building a StoryBrand",
        author: "Donald Miller",
        category: "Storytelling",
        reflection: "The customer is the hero; a product should help them succeed.",
        href: "https://books.google.com/books?id=kudDzQEACAAJ",
        image: "https://rarebooksbd.com/cdn/shop/files/rn-image_picker_lib_temp_06e61611-4383-47a8-8110-536f63b702b3.png?v=1776168227&width=1445",
      },
      {
        title: "Jab, Jab, Jab, Right Hook",
        author: "Gary Vaynerchuk",
        category: "Marketing",
        reflection: "Create value and earn attention before asking people for something.",
        href: "https://books.google.com/books?id=JQYwAAAAQBAJ",
        image: "https://media.s-bol.com/77L0Zq3n9xEB/qvBZRD/966x1200.jpg",
      },
      {
        title: "The Book of Five Rings",
        author: "Miyamoto Musashi",
        category: "Strategy",
        reflection: "Strategy requires careful observation, timing, discipline, and adaptability.",
        href: "https://books.google.com/books?id=eSlPmQEACAAJ",
        image: "https://shop.royalarmouries.org/cdn/shop/files/The-Book-of-Five-Rings-cover_1024x1024.jpg?v=1713186304",
      },
      {
        title: "Mastery",
        author: "Robert Greene",
        category: "Growth",
        reflection: "Expertise compounds through deliberate practice and sustained curiosity.",
        href: "https://books.google.com/books?id=8auMEAAAQBAJ",
        image: "https://www.ilmibookhouse.com/cdn/shop/files/mastery.png?v=1723029877",
      },
      {
        title: "The Niche Code",
        author: "Rajeev Roy",
        category: "Positioning",
        reflection: "Serving a focused audience deeply can be more powerful than trying to serve everyone.",
        href: "https://www.panmacmillan.com/authors/rajeev-roy/the-niche-code/9789361134036",
        image: "https://www.crossword.in/cdn/shop/files/71kWSBRQcjL._SL1500.jpg?v=1763109489",
      },
      {
        title: "The Psychology of Marketing",
        author: "Harinder Singh Pelia",
        category: "Behaviour",
        reflection: "People make decisions through perception, emotion, context, and trust—not only logic.",
        href: "https://books.google.com/books?id=3pgH0QEACAAJ",
        image: "https://www.crossword.in/cdn/shop/files/the-psychology-of-marketing-how-marketers-trick-us-into-buying-more-bk0520295-44693890400473.jpg?v=1746629082",
      },
      {
        title: "The Connection Book",
        author: "Emma Serlin",
        category: "Relationships",
        reflection: "Genuine curiosity and generosity create relationships that outlast a transaction.",
        href: "https://lidpublishing.com/books/the-connection-book/",
        image: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/b7/ac/e1/b7ace12d-7d28-ffed-d176-bb0d6cf085c1/9781917391009.jpg/1200x1200wz.jpg",
      },
    ],
  },
  education: {
    number: "04 / EDUCATION",
    heading: "Education & Learning",
    intro: "From understanding how things work to discovering what technology can make possible.",
    items: [
      {
        institution: "Plaksha University",
        degree: "Post Graduate Diploma",
        field: "Leadership & AI–ML",
        dates: "2021 — 2022",
        duration: "1 year",
        summary: "Selected for a 60-member cohort in Plaksha’s one-year Tech Leaders Program, co-designed with UC Berkeley to integrate AI/ML, real-world application, leadership, and mentorship. The program has since evolved into the M.Sc. in Artificial Intelligence.",
      },
      {
        institution: "McCombs School of Business, University of Texas",
        degree: "Post Graduate Program",
        field: "Artificial Intelligence",
        dates: "2020 — 2021",
        duration: "1 year",
        summary: "Built a practical foundation in machine learning and AI, including NLP, computer vision, and reinforcement learning. Later returned as a course trainer, teaching these subjects while completing the Tech Leaders Program at Plaksha.",
      },
      {
        institution: "Accel IT Academy",
        degree: "Post Graduate Diploma",
        field: "Embedded Systems",
        dates: "2016 — 2017",
        duration: "1 year",
        summary: "Developed a deeper understanding of embedded systems design and programming, including low-level, chip-level development and the core concepts behind connected hardware.",
      },
      {
        institution: "Sree Chitra Tirunal College of Engineering",
        degree: "B.Tech",
        field: "Electronics & Communication",
        dates: "2012 — 2016",
        duration: "4 years",
        summary: "Built a foundation in electronics while teaching robotics and embedded systems to students and educators. Conducted workshops at colleges across India in collaboration with communities and brands including DIY Hacking and CEST (Council of Electronics Studies).",
      },
    ],
  },
  contact: {
    number: "08 / CONTACT",
    heading: "Let's have a conversation.",
    subtitle:
      "Product challenges, new opportunities, or an interesting idea — I'd be glad to connect.",
  },
};
