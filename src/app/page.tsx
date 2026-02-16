import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import LandingPageClient from './LandingPageClient'
import LazySection from '../components/shared/LazySection'

// Critical components loaded immediately
import Navbar from '../components/shared/Navbar'
import Hero from '../components/landing/Hero'

// Lazy load heavy components - will be loaded via intersection observer
// Removed ssr: false for Server Components compatibility - intersection observer handles client-side lazy loading
const Courses = dynamic(() => import('@/components/landing/Courses'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />
})

const SuccessStories = dynamic(() => import('@/components/landing/SuccessStories'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />
})

const ContactSupport = dynamic(() => import('@/components/landing/ContactSupport'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />
})

const Certification = dynamic(() => import('@/components/landing/Certification'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />
})

const Footer = dynamic(() => import('../components/shared/Footer'), {
  loading: () => <div className="h-32 bg-black animate-pulse" />
})

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
  // demoItems commented out - not currently used
  // const demoItems = [
  //   {
  //     link: "/case-studies/netflix",
  //     text: "Netflix",
  //     image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2000&auto=format&fit=crop&crop=center"
  //   },
  //   {
  //     link: "/case-studies/nasa",
  //     text: "NASA",
  //     image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=2000&auto=format&fit=crop&crop=center"
  //   },
  //   {
  //     link: "/case-studies/porsche",
  //     text: "Porsche",
  //     image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop&crop=center"
  //   }
  // ]

  return (
    <main className="relative w-full min-h-screen text-white">
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Critical content loads first */}
      <div className="relative flex flex-col min-h-screen pt-24">
        <Hero />
        
        {/* Background effects - Client component */}
        <LandingPageClient />
        
        {/* Lazy loaded sections with intersection observer */}
        <LazySection id="certification">
          <Certification />
        </LazySection>

        <LazySection id="stories">
          <SuccessStories />
        </LazySection>
        
        {/* Courses section hidden - will add new courses later */}
        <LazySection id="courses">
          <Courses />
        </LazySection>
        
        <LazySection id="contact">
          <ContactSupport />
        </LazySection>
        
        <LazySection fallback={<div className="h-32 bg-black animate-pulse" />}>
          <Footer />
        </LazySection>
      </div>
    </main>
  )
}
