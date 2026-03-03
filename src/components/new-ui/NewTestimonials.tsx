'use client'

import { useState } from 'react'
import { Star, PlayCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Marquee from 'react-fast-marquee'
import { testimonials } from '@/data/testimonials'

export function NewTestimonials() {
    return (
        <section id="testimonial" className="w-full py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-16">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">
                            Our <br /> Testimonials
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg md:text-xl font-medium">
                            Real stories from real professionals who transformed their careers.
                            Our alumni work at world-class companies like Amazon, Synechron, MetLife, and Accenture.
                        </p>
                    </div>
                    <Link href="/testimonials">
                        <button className="px-10 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm active:scale-95 whitespace-nowrap">
                            View All
                        </button>
                    </Link>
                </div>
            </div>

            {/* Testimonial Marquee */}
            <div className="w-full">
                <Marquee speed={40} pauseOnHover gradient={false} className="py-10">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </Marquee>
            </div>
        </section>
    )
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
    // Extract ID initially to allow trying different formats
    const getFileId = (url: string) => {
        if (!url) return null
        const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/) || url.match(/\/d\/([a-zA-Z0-9_-]+)/)
        return idMatch ? idMatch[1] : null
    }

    const fileId = getFileId(testimonial.image || '')

    // Initial source: try lh3 link first as it's often most reliable for embeds, falling back to thumbnail
    // Using lh3.googleusercontent.com/d/ format which is very robust for next/image
    const initialSrc = fileId
        ? `https://lh3.googleusercontent.com/d/${fileId}`
        : (testimonial.image || '')

    const [imgSrc, setImgSrc] = useState(initialSrc)
    const [imgError, setImgError] = useState(false)
    const [retryCount, setRetryCount] = useState(0)

    return (
        <div
            className="w-[280px] md:w-[320px] mx-4 md:mx-6 bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-[650px]"
        >
            {/* Image Container */}
            <div className="relative h-[240px] w-full bg-gray-50 overflow-hidden shrink-0">
                {!imgError && imgSrc ? (
                    <>
                        <Image
                            src={imgSrc}
                            alt={testimonial.name}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                            sizes="(max-width: 768px) 100vw, 25vw"
                            unoptimized
                            onError={() => {
                                if (!fileId) {
                                    setImgError(true)
                                    return
                                }

                                // Retry strategy
                                if (retryCount === 0) {
                                    // Try thumbnail format
                                    setImgSrc(`https://drive.google.com/thumbnail?id=${fileId}&sz=w400`)
                                    setRetryCount(1)
                                } else if (retryCount === 1) {
                                    // Try export view format
                                    setImgSrc(`https://drive.google.com/uc?export=view&id=${fileId}`)
                                    setRetryCount(2)
                                } else {
                                    // Give up
                                    setImgError(true)
                                }
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-amber-100 text-amber-500 text-6xl font-black uppercase">
                        {testimonial.name.charAt(0)}
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-1 bg-white relative">
                <div className="mb-3">
                    <h4 className="font-black text-gray-900 text-sm uppercase tracking-tight leading-tight line-clamp-1">{testimonial.name}</h4>
                    <p className="text-gray-400 text-[10px] uppercase font-black mt-1 tracking-wider line-clamp-2 min-h-[2.5em]">
                        {testimonial.role} <br />
                        <span className="text-amber-500">{testimonial.company}</span>
                    </p>
                </div>

                <p className="text-gray-600 text-xs font-bold mb-4 italic leading-relaxed line-clamp-[8] flex-grow whitespace-normal break-words">
                    &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Rating & Label */}
                <div className="mt-auto pt-4 border-t border-gray-50 flex flex-col gap-2">
                    <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shadow-sm">
                                <PlayCircle className="w-3 h-3 text-white fill-white" />
                            </div>
                            <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Success Story</span>
                        </div>
                        {testimonial.achievement && (
                            <span className="text-[9px] font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-full border border-amber-100 truncate max-w-[120px]">
                                {testimonial.achievement}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
