import { BedrockRuntimeClient, ConverseCommand, Message, ContentBlock } from "@aws-sdk/client-bedrock-runtime";
import { portfolioV5Data } from "@/data/portfolioData";

export const DIGITAL_TWIN_SYSTEM_PROMPT = `You are Sandheep Gopinath's official Digital Twin on his personal portfolio website.
Your purpose is to represent Sandheep thoughtfully, authentically, and conversationally. You answer questions about Sandheep's product management leadership, career journey, 0→1 products, philosophy ("How I think"), book reflections ("The Thinking Shelf"), education, and outcomes.

Core Philosophy ("How I Think"):
- "Build with conviction. Validate with humility."
- "The hardest part of building a product isn't deciding what to build. It's being willing to find out you're wrong."
- Product leadership connects organizational purpose with what customers genuinely need.
- Always check blind spots: sunk-cost bias, confirmation bias, and the false comfort that teams know customers better than they know themselves.
- In B2B, the buyer is often not the everyday user: a commercial win is not the same as real user value. Sandheep designs for both.
- Three Product Principles:
  1. Understand before you build: Study the person, context, and underlying need—not just feature requests.
  2. Try to prove yourself wrong: Seek disconfirming evidence, question assumptions, know when to pivot.
  3. Earn the right to be used: Make the value real for buyers and daily users alike.

The Thinking Shelf (Books that shaped his thinking):
- Inspired (Marty Cagan): Fall in love with the customer problem, not the first solution.
- The Art of Thinking Clearly (Rolf Dobelli): Recognizing cognitive biases is a practical first step to better decisions.
- Never Split the Difference (Chris Voss): Listen for emotions, constraints, and motivations behind what people say.
- Building a StoryBrand (Donald Miller): The customer is the hero; a product should help them succeed.
- Jab, Jab, Jab, Right Hook (Gary Vaynerchuk): Create value and earn attention before asking people for something.
- The Book of Five Rings (Miyamoto Musashi): Strategy requires careful observation, timing, and adaptability.
- Mastery (Robert Greene): Deliberate practice and sustained curiosity.
- The Complete Book of Yoga (Swami Vivekananda): The practice of attention and self-understanding.
- The Niche Code (Rajeev Roy), The Psychology of Marketing (Harinder Singh Pelia), The Connection Book (Emma Serlin).

Selected Outcomes & Experience:
1. Verint (2024–2026) | Product Manager:
   - Drove $10M in ARR retention & $5M in incremental revenue across core workforce management products.
   - Accelerated time-to-market by 4x by shifting a 3-year waterfall model into agile, customer-driven delivery.
   - Scaled 0→1 "Request Anything" to 6,000+ weekly active users and 12,000+ weekly requests.
2. HRS Group (2022–2024) | Product Manager:
   - Increased recommendation engine adoption from 6% to 60% and rebooking adoption from 3% to 25% with self-service workflows (+12% revenue).
   - Built ML hotel-quality scoring platform evaluating 1.5M+ hotels, reducing customer complaints by 80% ($0.5M incremental revenue).
3. Danfoss (2017–2021) | Product Lead · Digital Transformation:
   - Built Industry 4.0 products across factories in India, Denmark, Poland, China (+2.4% annual factory productivity).
   - Launched computer vision quality inspection (90% defect catch, CII Kaizen Gold Award).
   - Predictive maintenance delivering $80K annual savings across 6 plants.
4. Synapse Technologies (2014–2017) | Founding Member · Products & Operations:
   - Co-founded IoT and industrial automation venture; acquired first 12 recurring B2B enterprise clients; took company to profitability.
   - Note on Sketch Theory: An active creative venture focused on thoughtful design and innovation.

Education:
- Plaksha University (Technology Leaders Program): Post Graduate Diploma in Leadership & AI–ML (2021–22)
- McCombs School of Business, UT Austin: Post Graduate Program in Artificial Intelligence (2020–21)
- Accel IT Academy: Post Graduate Diploma in Embedded Systems (2016–17)
- Sree Chitra Tirunal College of Engineering: B.Tech in Electronics & Communication (2012–16)

Tone & Contact:
- Tone: Thoughtful, articulate, grounded, executive, warm.
- Contact: Email hello@sandheepgopinath.com, or schedule via Calendly (https://calendly.com/sandheepgopinath).
`;

const getBedrockClient = () => {
  const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "us-east-1";

  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    return new BedrockRuntimeClient({
      region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        ...(process.env.AWS_SESSION_TOKEN ? { sessionToken: process.env.AWS_SESSION_TOKEN } : {}),
      },
    });
  }

  return new BedrockRuntimeClient({ region });
};

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function askDigitalTwin(
  messages: ChatMessage[]
): Promise<{ text: string; source: "aws-bedrock-claude" | "offline-knowledge-base"; error?: string }> {
  const hasAwsConfig =
    Boolean(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) ||
    Boolean(process.env.AWS_PROFILE) ||
    Boolean(process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI);

  if (hasAwsConfig) {
    try {
      const client = getBedrockClient();
      const modelId =
        process.env.BEDROCK_MODEL_ID ||
        process.env.AWS_BEDROCK_MODEL_ID ||
        "anthropic.claude-3-5-sonnet-20241022-v2:0";

      const formattedMessages: Message[] = messages.map((m) => ({
        role: m.role,
        content: [{ text: m.content }] as ContentBlock[],
      }));

      const command = new ConverseCommand({
        modelId,
        system: [{ text: DIGITAL_TWIN_SYSTEM_PROMPT }],
        messages: formattedMessages,
        inferenceConfig: {
          maxTokens: 1024,
          temperature: 0.35,
          topP: 0.9,
        },
      });

      const response = await client.send(command);
      const outputText = response.output?.message?.content?.[0]?.text;

      if (outputText) {
        return {
          text: outputText,
          source: "aws-bedrock-claude",
        };
      }
    } catch (err: unknown) {
      console.warn("Bedrock Claude API error, using portfolio knowledge engine:", err);
    }
  }

  const lastUserMsg = messages[messages.length - 1]?.content || "";
  const reply = generateResumeFallbackResponse(lastUserMsg);

  return {
    text: reply,
    source: "offline-knowledge-base",
  };
}

function generateResumeFallbackResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // Greetings
  if (/\b(hi|hello|hey|greetings|who are you)\b/i.test(q)) {
    return `Hello! I'm Sandheep Gopinath's Digital Twin.

I have full context on Sandheep's product leadership journey across 0→1 products, enterprise SaaS, and AI platforms.

You can ask me about:
• **How he thinks** & his product philosophy (e.g., questioning biases, buyer vs user in B2B)
• **Key commercial results** ($10M ARR retention at Verint, 4x time-to-market speedup)
• **Applied AI work** (ML hotel scoring evaluating 1.5M+ hotels at HRS, computer vision at Danfoss)
• **The Thinking Shelf** (Books that shaped his thinking like Marty Cagan's *Inspired* or Voss's *Never Split the Difference*)
• **How to connect** via email or schedule a meeting on Calendly.`;
  }

  // Philosophy / How he thinks
  if (
    /philosoph|bias|customer|discover|product management|how (does|do) (he|sandheep) think|principle|conviction|humility/.test(
      q
    )
  ) {
    return `Sandheep believes product leadership begins with an organizational question: **why do we exist, and which customer problems are we uniquely positioned to solve?**

Key pillars of his thinking:
• **Build with conviction. Validate with humility:** The hardest part of building isn't choosing what to build, but being willing to find out you're wrong.
• **Watch for blind spots:** Be alert to sunk-cost bias, confirmation bias, and the tempting belief that teams know customers better than customers know themselves.
• **B2B nuance:** The person who buys the software isn't always the person who uses it. A commercial win is not the same thing as meaningful user value; product leaders must understand and deliver both.
• **Three Principles:**
  1. *Understand before you build* — study the person, context, and root need.
  2. *Try to prove yourself wrong* — seek disconfirming evidence actively.
  3. *Earn the right to be used* — make value tangible every single day.`;
  }

  // Reading / Thinking Shelf / Books
  if (/book|read|shelf|inspir|storybrand|musashi|vivekananda|cagan|dobelli|voss|negotiat|mastery/.test(q)) {
    return `A few books on Sandheep's **Thinking Shelf** that have shaped his perspective:

• **Inspired** (*Marty Cagan*): Fall in love with the customer problem, not the first solution that comes to mind.
• **The Art of Thinking Clearly** (*Rolf Dobelli*): Recognizing cognitive biases is a practical first step toward better decisions.
• **Never Split the Difference** (*Chris Voss*): Listen for the emotions, constraints, and motivations behind what people say.
• **Building a StoryBrand** (*Donald Miller*): The customer is the hero; a product should help them succeed.
• **Jab, Jab, Jab, Right Hook** (*Gary Vaynerchuk*): Create value and earn attention before asking people for something.
• **The Book of Five Rings** (*Miyamoto Musashi*): Strategy requires careful observation, timing, discipline, and adaptability.
• **Mastery** (*Robert Greene*): Expertise compounds through deliberate practice and sustained curiosity.
• **The Complete Book of Yoga** (*Swami Vivekananda*): The practice of attention and self-understanding shapes how we act and learn.`;
  }

  // Verint / ARR / Commercial Outcomes
  if (/verint|arr|commercial|revenue|retention|request anything|velocity|waterfall/.test(q)) {
    return `At **Verint** (2024–2026), Sandheep served as Product Manager with Senior Product Manager responsibilities:

• **$10M ARR Retention & $5M Incremental Revenue**: Owned strategy, vision, and roadmap across 2 core enterprise workforce management products.
• **Roadmap Transformation**: Shifted from a 3-year waterfall model to customer-driven agile delivery, accelerating time-to-market by **4×** and retaining ~$5M ARR across 63 enterprise clients.
• **Sprint Execution Overhaul**: Introduced velocity tracking, sprint-level planning, and PI planning, boosting delivery velocity by 25%.
• **0→1 Scale ("Request Anything")**: Conceived and scaled the product from scratch in 12 months, reaching **6,000+ weekly active users** and 12K+ weekly requests, generating $1M–$2M annual operational efficiency gains per enterprise account.`;
  }

  // HRS Group / Travel / Hotel / Recommendation
  if (/hrs|hotel|recommend|quality|rebooking|travel/.test(q)) {
    return `At **HRS Group** (2022–2024), Sandheep led product strategy across 3 core platforms:

• **Machine Learning Hotel Quality Platform**: Conceived, launched, and scaled an ML scoring platform evaluating **1.5M+ hotels**, reducing customer complaints by **80%** and producing $0.5M in incremental revenue.
• **Recommendation & Rebooking Engines**: Increased Recommendation Engine adoption from **6% to 60%** and Rebooking adoption from **3% to 25%** by replacing engineering-heavy implementations with self-service workflows (+12% revenue).`;
  }

  // Danfoss / Manufacturing / Industry 4.0
  if (/danfoss|factory|factories|manufacturing|industry 4.0|kaizen|predictive maintenance|defect/.test(q)) {
    return `At **Danfoss** (2017–2021), Sandheep was Product Lead for Digital Transformation:

• **Global Discovery & Deployment**: Led product discovery across plants in India, Denmark, Poland, and China, yielding a **2.4% annual factory productivity increase**.
• **Computer Vision Inspection**: Conceived and launched a vision quality inspection system that caught **90% of defects**, boosted line efficiency by 17%, and earned the **CII Kaizen Gold Award**.
• **Predictive Maintenance**: Led predictive maintenance solutions that slashed downtime and saved **$80,000 annually** across 6 factories.`;
  }

  // Startup / Ventures / Synapse / Sketch Theory
  if (/startup|venture|founder|founding|synapse|sketch theory|iot|automation/.test(q)) {
    return `Sandheep's entrepreneurial ventures:

• **Synapse Technologies (2014–2017)**: Founding Member, Head of Products & Operations for an IoT and industrial automation venture. He led market research, customer discovery, MVP prototyping, acquired the first 12 recurring B2B enterprise clients, and drove the business to profitability.
• **Sketch Theory**: An active independent venture focused on thoughtful creative products and design innovation.`;
  }

  // AI & Technical depth
  if (/ai|artificial intelligence|machine learning|ml|computer vision|nlp|python|sql/.test(q)) {
    return `Sandheep combines practical product leadership with deep technical AI/ML knowledge:

• **Production AI Systems**: ML hotel scoring platform (1.5M+ hotels at HRS), computer vision quality inspection (90% defect detection at Danfoss), recommendation algorithms, and predictive maintenance.
• **Education**: Post Graduate Diploma in Leadership & AI-ML from **Plaksha University** (Technology Leaders Program) and Post Graduate Program in Artificial Intelligence from **McCombs School of Business, UT Austin**.
• **Technical Craft**: Python, SQL, Presto SQL, NLP, Computer Vision, Recommendation Systems, REST APIs, Git.`;
  }

  // Education
  if (/education|degree|college|university|plaksha|texas|mccombs|sree chitra|accel/.test(q)) {
    return `Sandheep's academic credentials:

1. **Post Graduate Diploma in Leadership & AI–ML** — Plaksha University (Technology Leaders Program, 2021–22)
2. **Post Graduate Program in Artificial Intelligence** — McCombs School of Business, University of Texas (2020–21)
3. **Post Graduate Diploma in Embedded Systems** — Accel IT Academy (2016–17)
4. **B.Tech in Electronics & Communication** — Sree Chitra Tirunal College of Engineering (2012–16)`;
  }

  // Contact / Meeting
  if (/contact|email|meet|meeting|calendly|call|hire|reach/.test(q)) {
    return `You can connect with Sandheep directly through:

• **Email**: [hello@sandheepgopinath.com](mailto:hello@sandheepgopinath.com)
• **Book a Meeting**: Use the **"Book a meeting"** button on this page or schedule on [Calendly](${portfolioV5Data.calendly})
• **Resume PDF**: Download his verified CV directly from this website.

He is always keen to discuss senior product challenges, enterprise SaaS/AI roadmaps, and collaborative opportunities!`;
  }

  // Default response
  return `Sandheep Gopinath is a **Product Leader** connecting organizational purpose, customer needs, and technology to build valuable enterprise products.

Key highlights:
• **Verint**: $10M ARR retention, 4× faster time-to-market, 0→1 "Request Anything" scaled to 6K+ WAU.
• **HRS Group**: ML hotel scoring platform (1.5M+ hotels evaluated, 80% complaint reduction).
• **Danfoss**: Industry 4.0 IoT & computer vision inspection (CII Kaizen Gold Award).
• **How I Think**: Grounded in understanding customer needs, testing biases, and making products valuable for buyers and users.

Would you like to know more about his experience, his thinking principles, or would you like to schedule a conversation?`;
}
