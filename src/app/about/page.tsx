import { Metadata } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '../../components/shared/Navbar'
import Footer from '../../components/shared/Footer'

// Lazy load the About component
const About = dynamic(() => import('@/components/landing/About'), {
  ssr: true,
  loading: () => <div className="h-96 bg-black animate-pulse" />
})

export const metadata: Metadata = {
  title: "About Us - Lean Multiverse | Empowering Boundless Creation",
  description: "Learn about Lean Multiverse's mission to empower boundless creation. Discover our globally accredited programs, proven results, and personalized approach to transforming careers.",
  keywords: [
    "about lean multiverse",
    "mission statement",
    "globally accredited",
    "proven results",
    "personalized training",
    "career transformation"
  ],
  openGraph: {
    title: "About Us - Lean Multiverse | Empowering Boundless Creation",
    description: "Learn about Lean Multiverse's mission to empower boundless creation. Discover our globally accredited programs, proven results, and personalized approach to transforming careers.",
    type: "website",
    url: "https://leanmultiverse.com/about",
    images: [
      {
        url: "https://leanmultiverse.com/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Lean Multiverse - Empowering Boundless Creation"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Lean Multiverse | Empowering Boundless Creation",
    description: "Learn about Lean Multiverse's mission to empower boundless creation. Discover our globally accredited programs, proven results, and personalized approach to transforming careers.",
    images: ["https://leanmultiverse.com/og-about.jpg"]
  },
  alternates: {
    canonical: "https://leanmultiverse.com/about"
  }
}

export default function AboutPage() {
  return (
    <main className="relative w-full min-h-screen text-white bg-black">
      {/* Fixed Navbar */}
      <Navbar />
      
      <div className="relative flex flex-col min-h-screen bg-black pt-24">
        <div id="about">
          <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
            <About />
          </Suspense>
        </div>
        
        <Suspense fallback={<div className="h-32 bg-black animate-pulse" />}>
          <Footer />
        </Suspense>
      </div>
    </main>
  )
}
