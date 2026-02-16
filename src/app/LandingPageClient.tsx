'use client'

import { Suspense } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useShouldAnimate } from '@/hooks/useShouldAnimate'
import { useIsMobile } from '@/hooks/useIsMobile'

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
  const shouldAnimate = useShouldAnimate()
  const isMobile = useIsMobile()

  return (
    <>
      {/* Background effects load after hero */}
      <div className="fixed inset-0 -z-30 bg-black pointer-events-none">
        {shouldAnimate ? (
          <Suspense fallback={<div className="fixed inset-0 -z-30 bg-black" />}>
            <DynamicGalaxy 
              mouseRepulsion={true}
              mouseInteraction={true}
              density={isMobile ? 0.2 : 0.4}
            />
          </Suspense>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        )}
      </div>

      {/* Gradient Mesh Background - Lazy loaded */}
      {shouldAnimate && (
        <Suspense fallback={<div />}>
          <DynamicGradientMesh />
        </Suspense>
      )}

      {/* Background Image Layer - Optimized */}
      <div className="fixed inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <Image 
          src="/bg.png" 
          alt="Background Design" 
          fill 
          className="object-contain opacity-50"
          priority={false}
          quality={50}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwMDAiLz48L3N2Zz4="
        />
      </div>
    </>
  )
}
