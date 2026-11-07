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
}

export const portfolioV5Data = {
  name: "Sandheep Gopinath",
  title: "Product Leader",
  roleline: "PRODUCT LEADER · 0→1 PRODUCTS · ENTERPRISE SAAS & AI",
  kicker: "Product strategy / Customer understanding / Technology",
  location: "Based in Bengaluru, India",
  email: "hello@sandheepgopinath.com",
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/sandheepgopinath",
  resumePdf: "/Sandheep_Gopinath_Resume.pdf",
  summary:
    "I connect organizational purpose with customer needs to identify the problems worth solving. Working across customers, business leaders, and product teams, I shape the strategy and build solutions that create meaningful value for people and measurable outcomes for the business.",
  about: {
    number: "01 / ABOUT",
    heading: "Purpose. People. Products.",
    aside: "Connecting why an organization exists with what its customers genuinely need.",
    paragraphs: [
      "For me, product leadership begins with an organizational question: why do we exist, and which customer problems are we uniquely positioned to solve? The answer should inform product vision, investment choices, and what we deliberately choose not to build.",
      "I work across customers, business leaders, design, engineering, and commercial teams to understand the problem, define a credible solution, and turn that shared understanding into a product. The responsibility goes beyond delivery: every choice should fit the organization’s mission, strategy, and long-term direction.",
      "The relationship works both ways. Customer evidence should shape product strategy—and, when necessary, challenge the assumptions behind the organization’s strategy. I value continuous discovery, candid validation, and outcomes that matter to people and the business.",
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
      "A few results from products and teams I've led. The work matters most when it changes what customers and businesses can achieve.",
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
  experience: {
    number: "03 / PROFESSIONAL JOURNEY",
    heading: "Experience.",
    intro:
      "From connected hardware and global manufacturing to AI platforms and enterprise SaaS.",
    items: [
      {
        dates: "2024 — 2026",
        company: "Verint",
        job: "Product Manager",
        description:
          "Owned strategy and roadmaps across enterprise workforce-management products, driving commercial enhancements and moving teams toward agile, customer-driven releases.",
      },
      {
        dates: "2022 — 2024",
        company: "HRS Group",
        job: "Product Manager",
        description:
          "Led product strategy across core products, improved adoption through self-service workflows, and launched a machine-learning hotel-quality scoring platform.",
      },
      {
        dates: "2017 — 2021",
        company: "Danfoss",
        job: "Product Lead · Digital Transformation",
        description:
          "Developed and scaled Industry 4.0 solutions across global factories, including computer vision quality inspection and predictive maintenance.",
      },
      {
        dates: "2014 — 2017",
        company: "Synapse Technologies",
        job: "Founding Member · Products & Operations",
        description:
          "Helped build an industrial automation and IoT company, leading discovery, early product development, go-to-market, and enterprise customer acquisition.",
      },
    ],
  },
  work: {
    number: "04 / SELECTED WORK",
    heading: "Products, problems, decisions.",
    intro:
      "A small selection of product problems I've worked on, spanning early product discovery, applied intelligence, and enterprise-scale execution.",
    items: [
      {
        tag: "ENTERPRISE SAAS / VERINT",
        title: "Modernizing enterprise product delivery",
        description:
          "Shifting a multi-year waterfall roadmap into faster, customer-led delivery with measurable commercial outcomes.",
      },
      {
        tag: "APPLIED AI / HRS GROUP",
        title: "Improving hotel quality at scale",
        description:
          "An ML-powered scoring platform evaluating more than 1.5 million hotels to improve quality and reduce complaints.",
      },
      {
        tag: "INDUSTRY 4.0 / DANFOSS",
        title: "Connecting factories to better decisions",
        description:
          "Digital transformation through computer vision, predictive maintenance, and rapid prototype-led validation.",
      },
    ],
    advisoryNote:
      "Independent ventures and verified startup advisory engagements can be added here as distinct case studies, with your exact role and contributions clearly stated.",
  },
  philosophy: {
    number: "05 / HOW I THINK",
    heading: "Build with conviction.",
    subheading: "Validate with humility.",
    pullQuote:
      "The hardest part of building a product isn't deciding what to build. It's being willing to find out you're wrong.",
    paragraphs: [
      "Product management is not only deciding what, why, when, and how to build. It starts by understanding why the organization exists, where it intends to go, and the needs, motivations, and circumstances of the people it serves. The right product decisions connect those realities.",
      "That means working across customers, leadership, engineering, design, and commercial teams—not merely to coordinate delivery, but to establish a shared understanding of the problem, the opportunity, and how the solution supports the organization’s mission and strategy. Equally, evidence from customers should be allowed to change our strategic assumptions.",
      "That demands being honest about our own blind spots. Sunk-cost bias makes it difficult to walk away from an investment. Confirmation bias encourages us to see what we hope is true. And experience can tempt us to believe we know our customers better than they know themselves.",
      "In B2B, it gets even more complicated: the person who buys the product isn't always the person who uses it. A commercial win is not the same thing as meaningful user value. I want to understand both.",
      "A product earns its place when someone chooses to spend their time, attention, or money on it—because it genuinely solves a problem that matters.",
    ],
    principles: [
      {
        id: "01",
        title: "Understand before you build.",
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
    number: "06 / THE THINKING SHELF",
    heading: "Ideas I keep coming back to.",
    intro:
      "A few books that have shaped how I think about building, communicating, learning, and understanding people. These are my short reflections—not quotations from the books.",
    footnote:
      "Short takeaways from books that have shaped my thinking. These are curated personal reflections, not direct book quotations.",
    books: [
      {
        title: "Inspired",
        author: "Marty Cagan",
        category: "Product",
        reflection: "Fall in love with the customer problem, not the first solution that comes to mind.",
        href: "https://books.google.com/books?id=S8Q_DwAAQBAJ",
        image: "https://atarim.io/wp-content/uploads/How-To-Create-Products-Customers-Love-by-Marty-Cagan.png",
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
        title: "The Complete Book of Yoga",
        author: "Swami Vivekananda",
        category: "Mind",
        reflection: "The practice of attention and self-understanding can shape how we act, learn, and make decisions.",
        href: "https://rupapublications.co.in/book/the-complete-book-of-yoga-karma-yoga-bhakti-yoga-raja-yoga-jnana-yoga",
        image: "https://www.crossword.in/cdn/shop/products/the-complete-book-of-yoga-karma-yoga-bhakti-yoga-raja-yoga-jnana-yoga-paperback-swami-vivekananda-bk0457194-40569997459673.jpg?v=1746622380",
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
    number: "07 / EDUCATION",
    heading: "Continual learning.",
    items: [
      {
        institution: "Plaksha University",
        degree: "Post Graduate Diploma",
        field: "Leadership & AI–ML",
        dates: "2021–22",
      },
      {
        institution: "McCombs School of Business, University of Texas",
        degree: "Post Graduate Program",
        field: "Artificial Intelligence",
        dates: "2020–21",
      },
      {
        institution: "Accel IT Academy",
        degree: "Post Graduate Diploma",
        field: "Embedded Systems",
        dates: "2016–17",
      },
      {
        institution: "Sree Chitra Tirunal College of Engineering",
        degree: "B.Tech",
        field: "Electronics & Communication",
        dates: "2012–16",
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
