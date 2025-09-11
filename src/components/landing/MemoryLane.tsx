"use client"

import DomeGallery from "../ui/DomeGallery"

export default function MemoryLane() {
  return (
    <section className="relative py-20 bg-black">
      <div className="text-center">
        <p className="uppercase line-through decoration-red-600 tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium mb-3">
            Gallery
        </p>
        <h1 className="text-[30px] md:text-[46.13px] font-bold mb-6">
            Memory Lane
        </h1>
        <div style={{ width: '100vw', height: '100vh' }}>
            <DomeGallery />
        </div>
      </div>
    </section>
  )
}
