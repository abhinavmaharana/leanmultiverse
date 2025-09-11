"use client"

import CircularGallery from "../ui/CircularGallery"

export default function NewWayOfWorking() {
  return (
    <section className="relative py-20 bg-black">
      <div className="text-center">
        <p className="uppercase line-through decoration-red-600 tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium mb-3">
            IT`&apos;`s Not Just A Process
        </p>
        <h1 className="text-[30px] md:text-[46.13px] font-bold mb-6">
            It`&apos;`s a New Way of Working
        </h1>
        <div style={{ height: '600px', position: 'relative' }}>
            <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
        </div>
      </div>
    </section>
  )
}
