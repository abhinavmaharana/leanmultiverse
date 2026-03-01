'use client'

import { Star, PlayCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const testimonials = [
    {
        name: 'Arsh',
        role: 'Lead',
        image: '/nitesh-prasad-updated-pic.png', // Using available asset
        content: 'LOREM',
        rating: 5,
    },
    {
        name: 'NITESH',
        role: 'Owner',
        image: '/nitesh-prasad-updated-pic.png',
        content: 'LOREM',
        rating: 5,
    },
    {
        name: 'XYZ',
        role: 'V/Z',
        image: '/nitesh-prasad-updated-pic.png',
        content: 'LOREM',
        rating: 5,
    },
    {
        name: 'XYZ',
        role: 'D/Z',
        image: '/nitesh-prasad-updated-pic.png',
        content: 'LOREM',
        rating: 5,
    },
]

export function NewTestimonials() {
    return (
        <section id="testimonial" className="relative w-full py-20 bg-white overflow-hidden">
            {/* Left Amber Bar */}
            {/* <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 md:w-8 h-40 bg-amber-400 z-10" /> */}

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Our Testimonials
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                            Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. 
                            Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.
                        </p>
                    </div>
                    <Link href="/testimonials">
                        <button className="px-8 py-3 border border-gray-200 rounded-xl text-gray-800 font-semibold text-sm hover:bg-gray-50 transition-all shadow-sm">
                            View All
                        </button>
                    </Link>
                </div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
                        >
                            {/* Image Container - Grayscale as in image */}
                            <div className="relative aspect-[4/5] w-full bg-gray-100 overflow-hidden">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                />
                            </div>

                            {/* Content Area */}
                            <div className="p-6 flex flex-col flex-1 bg-white">
                                <div className="mb-4">
                                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-tight">{testimonial.name}</h4>
                                    <p className="text-gray-400 text-[10px] uppercase font-medium">{testimonial.role}</p>
                                </div>
                                
                                <p className="text-gray-800 text-xs font-bold mb-8 uppercase tracking-widest">
                                    {testimonial.content}
                                </p>

                                {/* Rating & Label */}
                                <div className="mt-auto pt-4 border-t border-gray-50">
                                    <div className="flex gap-0.5 mb-2">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-amber-400 flex items-center justify-center">
                                            <PlayCircle className="w-2 h-2 text-white fill-white" />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-800 uppercase tracking-tighter">Testimonial</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
