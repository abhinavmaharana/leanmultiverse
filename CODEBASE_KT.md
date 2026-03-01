# LeanMultiverse - Codebase Walkthrough & Knowledge Transfer (KT)

## 1. Executive Summary & Architecture Overview
**LeanMultiverse** is an enterprise agility and digital transformation learning platform. The application is built to deliver a high-performance, SEO-optimized experience using **Next.js 15** with the **App Router**, **React 19**, and **TypeScript**. 

The architecture leverages a hybrid rendering approach:
- **Server components** are used for layout, pages, and SEO-heavy static content (SSR/SSG).
- **Client components** handle interactivity, complex animations (GSAP/Framer Motion), and stateful logic.
- **API Routes** (Next.js serverless functions) handle backend logic, form submissions, payment webhooks, and third-party integrations.

## 2. Tech Stack & Dependencies

### Core Frameworks
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**

### Styling & UI
- **Tailwind CSS %** (Utility-first CSS)
- **shadcn/ui** (Accessible component library)
- **Lucide React & Tabler Icons** (Iconography)

### Animations & UX
- **GSAP** (Scroll-triggered complex animations)
- **Framer Motion** (Micro-interactions and gestures)
- **Lenis** (Smooth scroll)

### Backend & Integrations
- **Supabase** (PostgreSQL Database & Admin Auth)
- **EmailJS / Resend** (Email delivery system)
- **Razorpay** (Payment gateway)
- **Google Sheets API** (Data tracking/CRM sync)
- **Upstash Redis** (Rate limiting)
- **OpenAI / Anthropic** (AI Chatbot integrations)

### Monitoring & Analytics
- **Sentry** (Error tracking for Edge & Server)
- **Vercel Analytics & Speed Insights**
- **Google Analytics 4 (GA4)** & **Meta Pixel**
- **Microsoft Clarity** (Session recording)

---

## 3. Directory Structure (`src/`)

```text
src/
├── app/                  # Next.js App Router (Pages & API)
│   ├── api/              # Serverless backend routes (webhooks, email, etc.)
│   ├── admin/            # Admin dashboard routes
│   ├── courses/          # Dynamic course pages
│   ├── book-webinar/     # Auto-booking flows
│   ├── layout.tsx        # Root layout (Providers, Analytics scripts)
│   ├── page.tsx          # Homepage with lazy-loaded sections
│   ├── globals.css       # Core Tailwind configuration
│   └── sitemap & robots  # SEO configurations
├── components/           # Reusable UI components
│   ├── landing/          # Homepage specific sections (Hero, Certification, SuccessStories)
│   ├── shared/           # Navbar, Footer, LazySection
│   ├── ui/               # shadcn baseline components + effects (CustomCursor)
│   └── providers/        # Context providers (Lenis, Clarity, etc.)
├── data/                 # Static JSON/TS data (Case studies, course details)
├── hooks/                # Custom React hooks
└── lib/                  # Core Utilities & Integration Logic
    ├── db.ts & db-schema.sql # Supabase initialization & SQL schema
    ├── email.ts          # EmailJS wrapper
    ├── chatbot-integrations.ts # AI provider factory (OpenAI/Anthropic/Mock)
    ├── google-sheets-tracker.ts # GSheets tracking utilities
    ├── rate-limit.ts     # Upstash Redis rate limiting
    └── admin-auth.ts     # Supabase admin authentication
```

---

## 4. Core Features & Component Architecture

### Landing Page Ecosystem (`src/app/page.tsx`)
The home page is heavily optimized for Core Web Vitals. It loads the `Navbar` and `Hero` section immediately, but defers heavier sections (like `SuccessStories`, `Certification`, and `ContactSupport`) using `dynamic` imports and a specialized `LazySection` wrapper that utilizes Intersection Observer.

### Animations
The project uses `DeferredLenisWrapper` to ensure smooth scrolling. It includes high-performance background effects (like `Galaxy.tsx` and custom gradients) combined with GSAP scroll triggers and Framer Motion variants.

### Learning & Booking Flows (`/book-webinar`, `/courses`)
Users can browse courses and case studies. They can also book webinars or 1-on-1 sessions. These flows capture user data, integrate with Razorpay for payment collection, generate `.ics` calendar invites, and fire off Google Meet links.

---

## 5. External Integrations Deep Dive

### Database (Supabase)
Used to store webinar bookings, one-on-one sessions, course enrollments, and admin user credentials. 
- Configuration: `src/lib/db.ts`
- Schema: Defined in `src/lib/db-schema.sql`. Includes tables `webinar_bookings`, `one_on_one_bookings`, and `admin_users`.

### Payments (Razorpay)
Integrated for course and webinar purchases. Webhooks capture `payment.captured` and `payment.failed` events. Database tables index `razorpay_order_id` for quick lookups.

### Email System (EmailJS & Resend)
Though `EMAIL_SETUP_GUIDE.md` mentions Nodemailer, the actual implementation (`src/lib/email.ts`) leverages **EmailJS**. It sends HTML emails and base64-encoded calendar invites (`.ics`) upon successful bookings.

### Google Sheets Tracking
Implemented in `src/lib/google-sheets-tracker.ts`. Captures leads and attribution data in external Google Sheets using `googleapis` with service account credentials.

### Chatbot System
Configured in `src/lib/chatbot-integrations.ts`. It uses a Factory pattern (`ChatbotService`) allowing the app to switch between `openai`, `anthropic`, a `custom` endpoint, or a `mock` service based on environment variables.

### Zoom API Integration
For auto-generating meeting links upon webinar booking. Zoom is integrated via a Server-to-Server Server (JWT) App architecture.
- API Keys: `ZOOM_API_KEY`, `ZOOM_API_SECRET` must be set in `.env.local`.
- Detailed in `ZOOM_API_SETUP.md`. Meetings are created dynamically with host/participant video on, without waiting rooms.

### Admin Dashboard Configuration
The Admin view is available under `/admin/login` and secured by a custom JWT implementation (`ADMIN_JWT_SECRET`). 
- Table: `admin_users` mapped in Supabase.
- Initialization: A `POST /api/admin/init` endpoint is invoked to seed the initial admin account using environment variables (`ADMIN_DEFAULT_USERNAME` and `ADMIN_DEFAULT_PASSWORD`). Detailed setup in `ADMIN_SETUP.md`.

---

## 6. Testing, Operations & Deployment Strategy

### Deployment
Optimized for **Vercel**. Edge and Server configs are established for `Sentry` to track errors across all environments. 

### Performance Tuning
- **Fonts**: `next/font/google` (Raleway) is preloaded with reduced weights.
- **Images**: Next.js `<Image>` is strictly used with strict width/height to prevent Cumulative Layout Shift (CLS).
- **Scripts**: GA4, Meta Pixel, and Microsoft Clarity are loaded effectively using `next/script` strategies (`afterInteractive`, `beforeInteractive`).

### Available Scripts
- `npm run dev` : Next.js Dev Server
- `npm run build` : Creates production bundle
- `npm run lint` : ESLint checking
- `npm run test` : Vitest test runner
- `npm run test:e2e` : Playwright E2E tests

### Operations & Monitoring
- **Health Check**: `/api/health` validates core application readiness.
- **Sentry**: Tracks runtime exceptions.
- **Analytics**: Vercel Analytics + Google Analytics.

---

## 7. Step-by-Step Developer Onboarding

1. **Clone & Install Dependencies**
   ```bash
   git clone <repo-url>
   cd leanmultiverse
   npm install
   ```

2. **Environment Variables Configuration**
   Copy `.env.example` to `.env.local`. You will need to fill in:
   - Supabase keys (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)
   - EmailJS credentials (`EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY`)
   - Razorpay Keys
   - Google Sheets credentials (if testing leads)
   
3. **Database Setup**
   - Connect to your Supabase instance.
   - Run the SQL script found at `src/lib/db-schema.sql` to initialize tables.

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Navigate to `localhost:3000`.

5. **Key Guidelines**
   - Follow the established `shadcn` pattern for new components.
   - Use `LazySection` for any new heavy landing page modules.
   - Do NOT commit `.env.local` to version control.
   - When modifying Supabase schema, ensure you update `src/lib/db-schema.sql` and the TypeScript interfaces in `src/lib/db.ts`. 

> **Welcome to the LeanMultiverse Team! 🚀**
