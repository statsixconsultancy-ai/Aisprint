# AIsprint — AI Education Platform

> Premium 1:1 live AI/ML education platform. Built with Next.js 14, TypeScript, TailwindCSS, and PostgreSQL. Deployed on Vercel.

---

## Project Structure

```
edtech/
├── apps/
│   └── web/                          # Next.js 14 web application
│       ├── src/
│       │   ├── app/                  # App Router pages
│       │   │   ├── page.tsx          # Landing page (11 sections)
│       │   │   ├── layout.tsx        # Root layout + metadata
│       │   │   ├── ml-ai/
│       │   │   │   ├── page.tsx      # ML/AI course page
│       │   │   │   └── apply/
│       │   │   │       └── page.tsx  # ML/AI application form
│       │   │   ├── prompt-engineering/
│       │   │   │   ├── page.tsx      # Prompt Engineering course page
│       │   │   │   └── apply/
│       │   │   │       └── page.tsx  # PE application form
│       │   │   ├── courses/
│       │   │   │   └── page.tsx      # All courses overview
│       │   │   ├── contact/
│       │   │   │   └── page.tsx      # Contact page + form
│       │   │   ├── thank-you/
│       │   │   │   └── page.tsx      # Post-submission confirmation
│       │   │   ├── policies/
│       │   │   │   ├── privacy/page.tsx
│       │   │   │   ├── terms/page.tsx
│       │   │   │   └── refund/page.tsx
│       │   │   └── api/
│       │   │       └── lead/
│       │   │           └── route.ts  # POST /api/lead
│       │   ├── components/
│       │   │   ├── layout/
│       │   │   │   ├── Navbar.tsx
│       │   │   │   └── Footer.tsx
│       │   │   ├── sections/         # All landing page sections
│       │   │   │   ├── HeroSection.tsx
│       │   │   │   ├── ProblemSection.tsx
│       │   │   │   ├── WhyTraditionalFailSection.tsx
│       │   │   │   ├── SolutionSection.tsx
│       │   │   │   ├── CoursesOverviewSection.tsx
│       │   │   │   ├── HowItWorksSection.tsx
│       │   │   │   ├── PlacementSection.tsx
│       │   │   │   ├── PartnersSection.tsx
│       │   │   │   ├── TestimonialsSection.tsx
│       │   │   │   ├── FAQSection.tsx
│       │   │   │   └── FinalCTASection.tsx
│       │   │   └── forms/
│       │   │       └── ApplicationForm.tsx
│       │   ├── lib/
│       │   │   ├── db.ts             # PostgreSQL connection pool
│       │   │   ├── schema.sql        # Database schema
│       │   │   └── validations.ts    # Zod validation schemas
│       │   └── styles/
│       │       └── globals.css       # Global styles + Google Fonts
│       ├── public/                   # Static assets
│       ├── .env.example
│       ├── next.config.js
│       ├── tailwind.config.ts
│       └── tsconfig.json
├── packages/
│   ├── ui/                           # Shared UI (React Native ready)
│   ├── config/                       # Shared config (ESLint, TS, etc.)
│   └── lib/                          # Shared utilities
├── .gitignore
└── package.json
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | TailwindCSS 3 |
| Database | PostgreSQL (via `pg` pool) |
| Validation | Zod |
| Typography | DM Sans (headings) + Inter (body) via Google Fonts |
| Deployment | Vercel |

---

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or pnpm 8+
- PostgreSQL 14+ database (local or cloud)

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-org/AiSprint.git
cd AiSprint
```

### 2. Install dependencies

```bash
cd apps/web
npm install
```

### 3. Configure environment

```bash
cp .env.example .env.local
# Edit .env.local and fill in your values
```

**Required variables:**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/AiSprint_dev
```

### 4. Set up the database

Connect to your PostgreSQL instance and run:

```bash
# Using psql
psql -U your_user -d your_database -f src/lib/schema.sql

# Or using the connection string
psql "$DATABASE_URL" -f src/lib/schema.sql
```

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploying to Vercel

### Step 1: Set up PostgreSQL

Choose one of:
- **Vercel Postgres** (recommended — zero config): [vercel.com/docs/storage/vercel-postgres](https://vercel.com/docs/storage/vercel-postgres)
- **Supabase**: Free tier, fully managed PostgreSQL
- **Neon**: Serverless PostgreSQL with generous free tier
- **PlanetScale**: MySQL-compatible (requires schema changes)

After provisioning, copy the connection string.

### Step 2: Run the schema

Connect to your cloud database and run `src/lib/schema.sql`:

```bash
psql "$DATABASE_URL" -f apps/web/src/lib/schema.sql
```

### Step 3: Create Vercel project

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from apps/web directory
cd apps/web
vercel
```

Or connect your GitHub repository via the Vercel dashboard.

### Step 4: Set Environment Variables in Vercel

In the Vercel dashboard → Project → Settings → Environment Variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | Full PostgreSQL connection string |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Production URL (e.g. https://AiSprint.in) |
| `NODE_ENV` | Auto | Set to `production` by Vercel |
| `GOOGLE_SITE_VERIFICATION` | Optional | Google Search Console verification |
| `NEXT_PUBLIC_GA_ID` | Optional | Google Analytics 4 Measurement ID |

### Step 5: Deploy

```bash
vercel --prod
```

---

## Build Configuration

**vercel.json** (place in `apps/web/`):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

For monorepo root deployment, use:

```json
{
  "buildCommand": "npm run build --workspace=apps/web",
  "outputDirectory": "apps/web/.next",
  "installCommand": "npm install"
}
```

---

## API Reference

### POST /api/lead

Submit a course application. Data is stored in the `leads` PostgreSQL table.

**Request body:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "experience": "beginner",
  "career_goal": "Transition to ML engineer at a product company",
  "course_type": "ml-ai"
}
```

**Experience values:** `no-experience` | `beginner` | `intermediate` | `advanced`

**Course type values:** `ml-ai` | `prompt-engineering`

**Success response (201):**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "id": "uuid-here"
}
```

**Validation error (422):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Please enter a valid email address" }
  ]
}
```

---

## Database Schema

```sql
-- Main leads table
CREATE TABLE leads (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  phone         VARCHAR(20) NOT NULL,
  experience    VARCHAR(100) NOT NULL,
  career_goal   TEXT NOT NULL,
  course_type   VARCHAR(100) NOT NULL,
  source        VARCHAR(100) DEFAULT 'website',
  ip_address    INET,
  user_agent    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## Production Checklist

### Before Going Live

- [ ] **Database:** Schema applied to production DB, indexes created
- [ ] **Environment:** All required env vars set in Vercel
- [ ] **Domain:** Custom domain configured in Vercel
- [ ] **SSL:** Automatically handled by Vercel
- [ ] **SEO:** Update metadata in `layout.tsx` with real domain URLs
- [ ] **OG Image:** Add `public/og-image.png` (1200×630px)
- [ ] **Favicon:** Add `public/favicon.ico` and related assets
- [ ] **Google Search Console:** Submit sitemap, verify ownership
- [ ] **Analytics:** Add Google Analytics or Posthog
- [ ] **Forms:** Test lead submission end-to-end
- [ ] **Email:** Configure transactional email for confirmations
- [ ] **Refund policy:** Review legal content with a lawyer
- [ ] **Privacy policy:** Review DPDP compliance for India
- [ ] **Performance:** Run Lighthouse audit (target 90+ all metrics)

### Post-Launch

- [ ] Set up error monitoring (Sentry)
- [ ] Set up uptime monitoring (Better Uptime)
- [ ] Schedule weekly backup of PostgreSQL leads table
- [ ] Set up Slack/email alerts for new leads

---

## Adding Mobile App (React Native)

The monorepo is structured for future React Native addition:

```bash
# Add React Native app
npx create-expo-app apps/mobile

# Shared packages are already in packages/
# - packages/lib → shared API calls, types
# - packages/config → shared ESLint, TypeScript
# - packages/ui → will hold shared components
```

Move shared types and API utilities to `packages/lib/` and import from both `apps/web` and `apps/mobile`.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes
4. Push and create a Pull Request

---

## License

© 2025 AiSprint Technologies Pvt. Ltd. All rights reserved.
