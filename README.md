# Sandheep Gopinath — Personal Website & Digital Twin

A modern, high-performance personal portfolio and interactive AI Digital Twin built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **AWS Bedrock (Claude 3.5 Sonnet)**.

---

## 🌟 Key Features

1. **Modern Executive Hero Section**:
   - Atmospheric background imagery and dark glassmorphic styling.
   - Profile avatar with live availability badge.
   - High-impact career summary highlighting $10M+ ARR retention and 0→1 scale.

2. **Core Direct Actions**:
   - **Talk to my Digital Twin**: Interactive chat modal powered by **Anthropic Claude on AWS Bedrock** (with smart built-in offline resume intelligence fallback). Visitors can ask anything about Sandheep's experience, achievements at Verint / HRS / Danfoss, skills, and credentials.
   - **Book a Meeting**: Opens an integrated **Calendly** scheduling modal (or new tab) configured for `https://calendly.com/sandheepgopinath`.
   - **Email Me**: Direct redirect to `mailto:hello@sandheepgopinath.com` with quick one-click email copying.

3. **Interactive Career & Metric Breakdown**:
   - Quantifiable metrics ribbon ($10M+ ARR Retained, 6,000+ WAU, 1.5M+ Hotels Scored, 10+ Yrs).
   - Tabbed view for verified Experience, Skills, and Education.
   - Direct "Ask Twin about this role" buttons that load context-specific queries into the Digital Twin.
   - Downloadable verified Resume PDF.

---

## 🚀 Getting Started

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Set your AWS credentials in `.env.local` to enable live **Claude 3.5 Sonnet via AWS Bedrock**:
\`\`\`env
# AWS Bedrock Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1
BEDROCK_MODEL_ID=anthropic.claude-3-5-sonnet-20241022-v2:0

# Calendly Booking Link
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/sandheepgopinath

# Contact Email
NEXT_PUBLIC_CONTACT_EMAIL=hello@sandheepgopinath.com
\`\`\`

> **Note**: Even if AWS credentials are not yet added, the website operates seamlessly using its built-in resume intelligence engine grounded in Sandheep's verified resume.

### 3. Run Development Server
\`\`\`bash
npm run dev
\`\`\`
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
\`\`\`bash
npm run build
npm run start
\`\`\`

---

## 🚢 Deployment

### Deploy to Vercel
1. Push this repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Add the environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `NEXT_PUBLIC_CALENDLY_URL`).
4. Click **Deploy**.
# Sandheep Gopinath portfolio

## Career Admin setup

The private `/admin` workspace uses Google OAuth through Auth.js and permits only `sandheepgopinath@gmail.com`.

Add these server-only values to `.env.local` and to the Firebase App Hosting environment:

```bash
AUTH_SECRET="generate-a-long-random-value"
AUTH_GOOGLE_ID="your-google-oauth-client-id"
AUTH_GOOGLE_SECRET="your-google-oauth-client-secret"
```

Create a Google OAuth 2.0 Web application and register these authorized redirect URIs:

- Local: `http://localhost:3000/api/auth/callback/google`
- Production: `https://sandheepgopinath.com/api/auth/callback/google`

Generate `AUTH_SECRET` with a cryptographically secure tool such as `openssl rand -hex 32`. Career and personal context belongs in `src/data/personal-details.md`; it is read only by the protected server API.
