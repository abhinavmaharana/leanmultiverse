'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import Image from 'next/image'

export function NewVideoSection() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xl overflow-hidden shadow-lg aspect-video bg-gray-900 group cursor-pointer">
          {!playing ? (
            <>
              <Image
                src="/webinar-thumb.jpg"
                alt="Webinar Preview"
                fill
                className="w-full h-full object-cover opacity-80 group-hover:opacity-70 transition-opacity"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              {/* Play Button Overlay */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                onClick={() => setPlaying(true)}
              >
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" />
                </div>
              </div>
            </>
          ) : (
            <video
              src="/video/bg1.mp4"
              autoPlay
              controls
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
}
