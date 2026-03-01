# LeanMultiverse Developer Reference Guide

This document serves as a quick-reference for any developer (or AI assistant) working on the **LeanMultiverse** project. It outlines the project's architecture, key components, and provides a decision matrix for where to apply changes.

---

## 🚀 1. Quick Facts & Tech Stack
- **Framework:** Next.js 15 (App Router), React 19, TypeScript.
- **Styling:** Tailwind CSS, shadcn/ui.
- **Animations:** GSAP (ScrollTriggers), Framer Motion (Micro-interactions), Lenis (Smooth Scroll).
- **Backend:** Supabase (PostgreSQL), Next.js API Routes (Serverless Functions).
- **Integrations:** Razorpay (Payments), EmailJS (E-mail), Google Sheets (Tracking CRM), Zoom (Webinars).
- **Monitoring:** Sentry, Vercel Analytics, Google Analytics 4, Meta Pixel.

---

## 📂 2. Core Directory Breakdown

| Directory | Purpose | Key Files / Subdirectories |
| :--- | :--- | :--- |
| `src/app/` | Routing & Pages (App Router) | `page.tsx`, `layout.tsx`, `api/`, `admin/`, `courses/` |
| `src/components/` | Reusable React Components | `landing/`, `shared/`, `ui/`, `providers/` |
| `src/lib/` | Core Utilities & Integrations | `db.ts`, `email.ts`, `chatbot-integrations.ts`, `admin-auth.ts` |
| `src/data/` | Static Data (JSON/TS) | Course data, case studies, etc. |
| `src/hooks/` | Custom React Hooks | `use-toast.ts`, etc. |
| `public/` | Static Assets | Images, logos, configuration files for SEO |

---

## 🛠️ 3. Where Do I Work? (Task-to-File Matrix)

Use this matrix to identify where to start when given a specific type of task:

### 🎨 UI & Design Changes
- **Global Styles / Colors:** `src/app/globals.css`, `tailwind.config.ts`, `components.json`.
- **Homepage Sections:** `src/components/landing/` (e.g., `Hero.tsx`, `SuccessStories.tsx`).
- **New Reusable Widget:** `src/components/ui/` (using shadcn patterns).
- **Navbar / Footer:** `src/components/shared/Nav.tsx`, `src/components/shared/Footer.tsx`.
- **Animations:** GSAP configurations within the specific component or `src/components/providers/LenisProvider.tsx`.

### 📄 Pages & Routing
- **New Page:** Create a new directory under `src/app/` with a `page.tsx` file.
- **Shared Layout (Wrappers):** `src/app/layout.tsx`.
- **Admin Specifics:** `src/app/admin/`.

### ⚙️ Logic & Integrations
- **API Endpoint:** `src/app/api/your-endpoint/route.ts`.
- **Form Submission Logic:** Identify the API route being called (usually under `src/app/api/`) and the corresponding utility in `src/lib/`.
- **Database (Supabase):** `src/lib/db.ts` for client init, `src/lib/db-schema.sql` for schema references.
- **Email/Payment flows:** `src/lib/email.ts`, `src/lib/razorpay.ts` (if applicable).

---

## ✨ 4. Key Implementation Patterns
1. **Lazy Loading:** For performance, use the `LazySection` component in `src/app/page.tsx` to defer loading of non-critical sections.
2. **Smooth Scrolling:** Aligned with `DeferredLenisWrapper` for high-performance scrolling.
3. **Form Submissions:** Typically use standard `fetch` or server actions pointing to `/api/` routes.
4. **Environment Variables:** Always use `process.env.*`. For client side expose with `NEXT_PUBLIC_`.

---

## ✅ 5. Pre-Task Checklist
- [ ] am I on the correct branch? (`new-ui` for UI work)
- [ ] Is there an existing component in `src/components/ui` that I can reuse?
- [ ] If adding a new homepage section, did I wrap it in `LazySection` in `src/app/page.tsx`?
- [ ] Are my Tailwind classes using the project's color tokens from `globals.css` or `tailwind.config.ts`?
- [ ] Did I check the server-side logs if I'm modifying API routes?

---
