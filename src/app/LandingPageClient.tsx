'use client'

import Image from 'next/image'

export default function LandingPageClient() {
  return (
    <>
      {/* Background: gradient only (galaxy + gradient mesh hidden) */}
      <div className="fixed inset-0 -z-30 bg-black pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Background Image Layer */}
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
