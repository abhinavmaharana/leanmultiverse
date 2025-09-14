import { Metadata } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import LandingPageClient from './LandingPageClient'

// Critical components loaded immediately
import Navbar from '../components/shared/Navbar'
import Hero from '../components/landing/Hero'

// Lazy load heavy components
const Courses = dynamic(() => import('@/components/landing/Courses'), {
  ssr: true,
  loading: () => <div className="h-96 bg-black animate-pulse" />
})

const SuccessStories = dynamic(() => import('@/components/landing/SuccessStories'), {
  ssr: true,
  loading: () => <div className="h-96 bg-black animate-pulse" />
})

const ContactSupport = dynamic(() => import('@/components/landing/ContactSupport'), {
  ssr: true,
  loading: () => <div className="h-96 bg-black animate-pulse" />
})

const Certification = dynamic(() => import('@/components/landing/Certication'), {
  ssr: true,
  loading: () => <div className="h-96 bg-black animate-pulse" />
})


const Footer = dynamic(() => import('../components/shared/Footer'), {
  ssr: true,
  loading: () => <div className="h-32 bg-black animate-pulse" />
})

export const metadata: Metadata = {
  title: "Master Enterprise Agility & Digital Transformation",
  description: "Join 50,000+ professionals who transformed their careers with our comprehensive courses in enterprise agility, digital transformation, and modern leadership practices.",
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
    <main className="relative w-full min-h-screen text-white">
      {/* Critical content loads first */}
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        
        {/* Background effects - Client component */}
        <LandingPageClient />
        
        {/* Lazy loaded sections with intersection observer */}
        <div id='certification'>
          <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
            <Certification />
          </Suspense>
        </div>
        
        <div id="courses">
          <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
            <Courses />
          </Suspense>
        </div>
        
        <div id="partners">
          <section className='bg-black'>
            <div className="text-center mb-16 bg-black">
              <p className="uppercase tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium mb-3">
                Success Stories
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Real-World Impact
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                See how leading organizations transformed their operations using our Lean Enterprise methodologies
              </p>
            </div>
            <div className='bg-black' style={{ height: '600px', position: 'relative' }}>
              <div className="h-full bg-gray-900 flex items-center justify-center">
                <p className="text-white">Success Stories Component Loading...</p>
              </div>
            </div>
          </section>
        </div>
        
        <div id='stories'>
          <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
            <SuccessStories />
          </Suspense>
        </div>
        
        <div id="contact">
          <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
            <ContactSupport />
          </Suspense>
        </div>
        
        <Suspense fallback={<div className="h-32 bg-black animate-pulse" />}>
          <Footer />
        </Suspense>
      </div>
    </main>
  )
}
