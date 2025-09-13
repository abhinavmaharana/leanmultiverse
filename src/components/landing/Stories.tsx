// components/landing/Courses.tsx
"use client"

import { useRef } from 'react'
import FlowingMenu from '../ui/FlowingMenu';

export default function Stories() {
  const sectionRef = useRef<HTMLElement>(null)

  const demoItems = [
    { link: '#', text: 'Netflix', image: 'https://picsum.photos/600/400?random=1' },
    { link: '#', text: 'Porsche', image: 'https://picsum.photos/600/400?random=2' },
    { link: '#', text: 'NASA', image: 'https://picsum.photos/600/400?random=3' },
    { link: '#', text: 'Philips', image: 'https://picsum.photos/600/400?random=4' }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 bg-black min-h-screen">
      {/* Header */}
      <div className="text-center">
        <p className="uppercase line-through decoration-red-600 tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium mb-3">
          IT&apos;s Not Just A Process
        </p>
        <h1 className="text-[30px] md:text-[46.13px] font-bold mb-6 text-white">
          It&apos;s a New Way of Working
        </h1>
      </div>
      <div style={{ height: '600px', position: 'relative' }}>
        <FlowingMenu items={demoItems} />
      </div>
    </section>
  )
}