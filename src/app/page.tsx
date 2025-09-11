'use client'

import Galaxy from '../components/ui/Galaxy'
import Navbar from '../components/shared/Navbar'
import Hero from '../components/landing/Hero'
import Footer from '../components/shared/Footer'
import Image from 'next/image'
import Courses from '@/components/landing/Courses'
import NewWayOfWorking from '@/components/landing/NewWayOfWorking'
import Certification from '@/components/landing/Certication'
import MemoryLane from '@/components/landing/MemoryLane'

export default function LandingPage() {
  return (
    <main className="relative w-full min-h-screen text-white">
      {/* Background Galaxy */}
      <div className="fixed inset-0 -z-30 bg-black">
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
        />
      </div>

      {/* Background Image Layer */}
      <div className="fixed inset-0 -z-20 flex items-center justify-center">
        <Image 
          src="/bg.png" 
          alt="Background Design" 
          fill 
          className="object-contain opacity-70"
          priority
        />
      </div>

      {/* Optional Overlay to blend */}
      <div className="fixed inset-0 -z-10" />

      {/* Content */}
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        <div id="courses">
          <Courses />
        </div>
        <div id='certification'>
          <Certification />
        </div>
        <div id="newwayofworking">
          <NewWayOfWorking />
        </div>
        <div id="gallery">
          <MemoryLane />
        </div>
        <Footer />
      </div>
    </main>
  )
}
