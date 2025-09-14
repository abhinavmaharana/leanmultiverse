'use client'

import { Suspense, lazy } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Critical components loaded immediately
import Navbar from '../components/shared/Navbar'
import Hero from '../components/landing/Hero'

// Lazy load heavy components (unused - using dynamic imports instead)
const Courses = lazy(() => import('@/components/landing/Courses'))
const SuccessStories = lazy(() => import('@/components/landing/SuccessStories'))
const ContactSupport = lazy(() => import('@/components/landing/ContactSupport'))
const NewWayOfWorking = lazy(() => import('@/components/landing/NewWayOfWorking'))
const Certification = lazy(() => import('@/components/landing/Certication'))
const FlowingMenu = lazy(() => import('@/components/ui/FlowingMenu'))
const Footer = lazy(() => import('../components/shared/Footer'))

// Dynamic imports with loading states
const DynamicGalaxy = dynamic(() => import('../components/ui/Galaxy'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-30 bg-black" />
})

const DynamicGradientMesh = dynamic(() => import('../components/ui/GradientMesh'), {
  ssr: false,
  loading: () => <div />
})

export default function LandingPage() {

  const demoItems = [
    {
      link: "/case-studies/netflix",
      text: "Netflix",
      image: "https://images.unsplash.com/photo-1574375927938-c5a4422a05f6?w=800&h=600&fit=crop"
    },
    {
      link: "/case-studies/nasa",
      text: "NASA",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop"
    },
    {
      link: "/case-studies/porsche",
      text: "Porsche",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop"
    }
  ];

  return (
    <main className="relative w-full min-h-screen text-white">
      {/* Background Galaxy - Lazy loaded */}
      <div className="fixed inset-0 -z-30 bg-black">
        <Suspense fallback={<div className="fixed inset-0 -z-30 bg-black" />}>
          <DynamicGalaxy 
            mouseRepulsion={true}
            mouseInteraction={true}
            density={0.8}
          />
        </Suspense>
      </div>

      {/* Gradient Mesh Background - Lazy loaded */}
      <Suspense fallback={<div />}>
        <DynamicGradientMesh />
      </Suspense>

      {/* Background Image Layer - Optimized */}
      <div className="fixed inset-0 -z-10 flex items-center justify-center">
        <Image 
          src="/bg.png" 
          alt="Background Design" 
          fill 
          className="object-contain opacity-50"
          priority
          quality={75}
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        
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
              <Suspense fallback={<div className="h-full bg-gray-900 animate-pulse" />}>
                <FlowingMenu items={demoItems} />
              </Suspense>
            </div>
          </section>
        </div>
        
        <div id='stories'>
          <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
            <SuccessStories />
          </Suspense>
        </div>
        
        <div id="newwayofworking">
          <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
            <NewWayOfWorking />
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
