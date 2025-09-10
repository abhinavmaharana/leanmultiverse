'use client'

import Galaxy from '../components/Galaxy'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <main className="relative w-full h-screen overflow-hidden text-white">
      {/* Background Galaxy */}
      <div className="absolute inset-0 -z-30 bg-black">
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
        />
      </div>

      {/* Background Image Layer */}
      <div className="absolute inset-0 -z-20 flex items-center justify-center">
        <Image 
          src="/bg.png" 
          alt="Background Design" 
          fill 
          className="object-contain opacity-70"
          priority
        />
      </div>

      {/* Optional Overlay to blend */}
      <div className="absolute inset-0 -z-10" />

      {/* Content */}
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        <Footer />
      </div>
    </main>
  )
}
