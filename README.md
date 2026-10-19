# eSitesz Bio — Professional Digital Identity & Bio Link SaaS

A production-ready SaaS platform allowing anyone to create, customize, and manage high-converting digital bio link pages, business cards, and organizational profiles inspired by [Hasnain Baqai](https://hasnainbaqai.esitesz.com/) and [JRM Antophill](https://jrmantophill.esitesz.com/).

Includes **Automated SEO, AEO (Answer Engine Optimization for AI Search), and hyper-local GEO schema generation** directly configured through an interactive UI without touching code.

---

## 🌟 Key Features

### 1. Tailored Multi-Theme System
- **Esitesz Dark Luxury** (Exact recreation of Hasnain Baqai & JRM Antophill with deep navy `#0f1724`, glassmorphism, glowing rounded avatars, sliding buttons, and 3-column contact bar).
- **Minimalist Linktree** (Centered high-contrast rounded pill links with clean modern typography).
- **Executive Business Card** (Dual-tone card with verified authenticity badge and 1-tap vCard export).
- **Creator Neon Glow** (Vibrant gradient borders, ambient flares, and dynamic badges for artists and influencers).
- **Islamic Community Org** (Dedicated mission statement card, official channel links, donation support, and location pin).

### 2. Zero-Code SEO, AEO & GEO Studio
- **Dynamic SEO Engine:** Automatic `<title>`, `<meta name="description">`, OpenGraph cards, Twitter cards, canonical tags, and dynamic `sitemap.xml` / `robots.txt` generation.
- **AEO (AI Answer Engine Optimization):** Generates `schema.org/FAQPage` and structured `Person` / `Organization` / `LocalBusiness` JSON-LD so AI answer bots (ChatGPT, Google Gemini, Perplexity, Claude) quote your credentials and facts accurately.
- **GEO (Local & India Search):** Hyper-local targeting with `geo.region` (e.g. `IN-MH`, `IN-UP`), `geo.placename`, coordinates (`geo.position`), and `PostalAddress` schemas for local ranking on Google Maps.

### 3. Comprehensive Super Admin Governance
- Centralized KPI Dashboard: Total Profiles, Approved, Pending Review, Rejected, Registered Users, and System Views.
- Complete Profile CRUD: View, edit, delete, or reassign profile ownership to any user.
- Moderation Queue: Instant 1-click Approval or Rejection with audit reason.

### 4. Client Self-Serve SaaS Dashboard
- Create unlimited bio link pages with instantaneous slug availability check.
- Live Interactive Mobile Viewport Mockup previewing changes in real time.
- Link CRUD: Custom icons (WhatsApp, Instagram, Facebook, YouTube, X, Telegram, LinkedIn, Spotify, etc.), custom brand colors, reordering, and visibility toggles.
- Action Bar: Direct 1-tap phone calls, WhatsApp messages, and Gmail web compose fallback.
- Export Assets: High-resolution downloadable QR Code (PNG) & RFC 6350 compliant vCard `.vcf` export.
- Email OTP Security: Profile claiming and sensitive security actions protected by a 6-digit cryptographic verification code.

### 5. Compliance & Security
- **India DPDP Act 2023:** Data minimization, explicit user consent, cookie consent banner, and data deletion rights.
- **GDPR Compliant:** Privacy policy, terms of service, and essential session-only cookie handling.
- **Security:** HTTP-only JWT sessions, bcrypt password hashing, input sanitization via Zod schemas, and structured error boundaries.

---

## 🚀 Quickstart

### Prerequisites
- Node.js 18+ (tested on Node v20, v22, v24)
- npm 9+

### 1. Installation
```bash
npm install
```

### 2. Configuration
Copy the template `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Default Credentials

The platform automatically seeds initial data on first launch:
- **Super Admin Email:** `admin@esitesz.com`
- **Super Admin Password:** `Admin@Esitesz2026!`
- **Pre-Seeded Profile 1:** `/hasnainbaqai`
- **Pre-Seeded Profile 2:** `/jrmantophill`

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS + Custom CSS Variables & Animations
- **Icons:** SVG Brand Icons + Lucide React
- **Database:** Zero-external-dependency embedded SQLite with WAL mode & prepared statements
- **Authentication:** JWT (`jose`) + HTTP-only cookies + bcryptjs
- **Validation:** Zod schemas
- **QR Code Generation:** `qrcode`

---

## 📦 Deployment to Vercel

1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Set the environment variables in the Vercel project settings:
   - `JWT_SECRET` (generate a random 32+ character string)
   - `SUPER_ADMIN_EMAIL`
   - `SUPER_ADMIN_PASSWORD`
   - `NEXT_PUBLIC_APP_URL` (your custom domain or vercel.app URL)
4. Deploy!

---

## 📄 License & Attribution
Designed & Developed by **[Esitesz](https://www.esitesz.com)**. All Rights Reserved.
