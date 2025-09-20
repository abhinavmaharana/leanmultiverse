'use client'

import { Suspense } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Dynamic imports with loading states (client-side only)
const DynamicGalaxy = dynamic(() => import('../components/ui/Galaxy'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-30 bg-black" />
})

const DynamicGradientMesh = dynamic(() => import('../components/ui/GradientMesh'), {
  ssr: false,
  loading: () => <div />
})

export default function LandingPageClient() {
  return (
    <>
      {/* Background effects load after hero */}
      <div className="fixed inset-0 -z-30 bg-black pointer-events-none">
        <Suspense fallback={<div className="fixed inset-0 -z-30 bg-black" />}>
          <DynamicGalaxy 
            mouseRepulsion={true}
            mouseInteraction={true}
            density={0.4}
          />
        </Suspense>
      </div>

      {/* Gradient Mesh Background - Lazy loaded */}
      <Suspense fallback={<div />}>
        <DynamicGradientMesh />
      </Suspense>

      {/* Background Image Layer - Optimized */}
      <div className="fixed inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <Image 
          src="/bg.png" 
          alt="Background Design" 
          fill 
          className="object-contain opacity-50"
          priority={false}
          quality={60}
          sizes="100vw"
        />
      </div>
    </>
  )
}
