import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import LazySection from '../components/shared/LazySection'

// ============================================================
// NEW UI (new-ui branch) — active
// ============================================================

// Critical path: load immediately (above the fold)
import { NewAnnouncementBanner } from '../components/new-ui/NewAnnouncementBanner'
import NewNavbar from '../components/new-ui/NewNavbar'
import { NewHero } from '../components/new-ui/NewHero'
import { StickyEnrollBar } from '../components/new-ui/StickyEnrollBar'

// Lazy load heavier new-ui sections via intersection observer
const NewLogoStrip = dynamic(() =>
  import('../components/new-ui/NewLogoStrip').then((m) => ({ default: m.NewLogoStrip })),
  { loading: () => <div className="h-24 bg-white animate-pulse" /> }
)

const NewVideoSection = dynamic(() =>
  import('../components/new-ui/NewVideoSection').then((m) => ({ default: m.NewVideoSection })),
  { loading: () => <div className="h-64 bg-gray-50 animate-pulse" /> }
)

const NewServices = dynamic(() =>
  import('../components/new-ui/NewServices').then((m) => ({ default: m.NewServices })),
  { loading: () => <div className="h-96 bg-white animate-pulse" /> }
)

const NewStepsSection = dynamic(() =>
  import('../components/new-ui/NewStepsSection').then((m) => ({ default: m.NewStepsSection })),
  { loading: () => <div className="h-64 bg-white animate-pulse" /> }
)

const NewMentorSection = dynamic(() =>
  import('../components/new-ui/NewMentorSection').then((m) => ({ default: m.NewMentorSection })),
  { loading: () => <div className="h-96 bg-gray-50 animate-pulse" /> }
)

const NewTestimonials = dynamic(() =>
  import('../components/new-ui/NewTestimonials').then((m) => ({ default: m.NewTestimonials })),
  { loading: () => <div className="h-96 bg-white animate-pulse" /> }
)

const NewFAQ = dynamic(() =>
  import('../components/new-ui/NewFAQ').then((m) => ({ default: m.NewFAQ })),
  { loading: () => <div className="h-64 bg-gray-50 animate-pulse" /> }
)

const NewContactSupport = dynamic(() =>
  import('../components/new-ui/NewContactSupport').then((m) => ({ default: m.NewContactSupport })),
  { loading: () => <div className="h-96 bg-white animate-pulse" /> }
)

const NewFooter = dynamic(() =>
  import('../components/new-ui/NewFooter').then((m) => ({ default: m.NewFooter })),
  { loading: () => <div className="h-48 bg-[#FFC107] animate-pulse" /> }
)

// ============================================================
// OLD UI (dark theme) — commented out for future theme toggle
// ============================================================
// import LandingPageClient from './LandingPageClient'
// import Navbar from '../components/shared/Navbar'
// import Hero from '../components/landing/Hero'
// const SuccessStories = dynamic(() => import('@/components/landing/SuccessStories'), {
//   loading: () => <div className="h-96 bg-black animate-pulse" />
// })
// const ContactSupport = dynamic(() => import('@/components/landing/ContactSupport'), {
//   loading: () => <div className="h-96 bg-black animate-pulse" />
// })
// const Certification = dynamic(() => import('@/components/landing/Certification'), {
//   loading: () => <div className="h-96 bg-black animate-pulse" />
// })
// const Footer = dynamic(() => import('../components/shared/Footer'), {
//   loading: () => <div className="h-32 bg-black animate-pulse" />
// })

/** ISR: revalidate home page at the edge every 60s to reduce server load under traffic */
export const revalidate = 60

export const metadata: Metadata = {
  title: "Build in the Multiverse - Unlock Collaborative Innovation",
  description: "Empowering Boundless Creation - Catalysts for Your Success. Transform ambitious teams and professionals into industry leaders with innovative, impactful learning.",
  keywords: [
    "enterprise agility",
    "digital transformation",
    "lean six sigma",
    "agile project management",
    "leadership development",
    "MBA programs",
    "professional certification",
    "business transformation"
  ],
  openGraph: {
    title: "Master Enterprise Agility & Digital Transformation",
    description: "Join 50,000+ professionals who transformed their careers with our comprehensive courses in enterprise agility, digital transformation, and modern leadership practices.",
    type: "website",
    url: "https://leanmultiverse.com",
  },
}

export default function LandingPage() {
  return (
    // ============================================================
    // NEW UI layout
    // ============================================================
    <main className="relative w-full min-h-screen bg-white text-gray-900 flex flex-col gap-12 md:gap-20">
      {/* Critical: render immediately */}
      <div className="flex flex-col">
        <NewAnnouncementBanner />
        <NewNavbar />
      </div>
      
      <NewHero />

      {/* Lazy sections — loaded via intersection observer */}
      <LazySection id="logo-strip" fallback={<div className="h-24 bg-white animate-pulse" />}>
        <NewLogoStrip />
      </LazySection>

      <LazySection id="video" fallback={<div className="h-64 bg-gray-50 animate-pulse" />}>
        <NewVideoSection />
      </LazySection>

      <LazySection id="services" fallback={<div className="h-[800px] bg-white animate-pulse" />}>
        <NewServices />
      </LazySection>

      <LazySection id="steps" fallback={<div className="h-[600px] bg-white animate-pulse" />}>
        <NewStepsSection />
      </LazySection>

      <LazySection id="mentor" fallback={<div className="h-[700px] bg-white animate-pulse" />}>
        <NewMentorSection />
      </LazySection>

      <LazySection id="testimonial" fallback={<div className="h-[800px] bg-white animate-pulse" />}>
        <NewTestimonials />
      </LazySection>

      <LazySection id="faq" fallback={<div className="h-[500px] bg-white animate-pulse" />}>
        <NewFAQ />
      </LazySection>

     
      {/* <StickyEnrollBar /> */}

      <div className="mt-auto">
        <LazySection fallback={<div className="h-48 bg-[#FFC107] animate-pulse" />}>
          <NewFooter />
        </LazySection>
      </div>

      {/*
      ============================================================
      OLD UI layout (dark theme) — uncomment to switch back
      ============================================================
      <main className="relative w-full min-h-screen text-white">
        <Navbar />
        <div className="relative flex flex-col min-h-screen pt-24">
          <Hero />
          <LandingPageClient />
          <LazySection id="certification"><Certification /></LazySection>
          <LazySection id="stories"><SuccessStories /></LazySection>
          <LazySection id="contact"><ContactSupport /></LazySection>
          <LazySection fallback={<div className="h-32 bg-black animate-pulse" />}><Footer /></LazySection>
        </div>
      </main>
      */}
    </main>
  )
}
