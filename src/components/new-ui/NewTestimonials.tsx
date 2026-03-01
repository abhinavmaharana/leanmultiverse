'use client'

import { Star, PlayCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Using the most robust thumbnail format for Google Drive public files
const getDriveImageUrl = (driveUrl: string): string => {
    if (!driveUrl) return ""
    const idMatch = driveUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/)
    let fileId = idMatch ? idMatch[1] : null
    if (!fileId) {
        const dMatch = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/)
        if (dMatch) fileId = dMatch[1]
    }
    
    if (fileId) {
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
    }
    
    return driveUrl
}

const testimonials = [
    {
        name: "Saurabh Gurav",
        role: "Senior Associate Consultant- Lead BA",
        company: "Synechron",
        quote: "Grateful to be trained under Nitesh Prasad for Product Management and to continue my PMP® preparation under his guidance. His ability to simplify complex concepts truly stands out.",
        rating: 5,
        image: getDriveImageUrl("https://drive.google.com/open?id=1LJlduhYpOivR9pBIpv8xH-ynSuj0LbSV"),
    },
    {
        name: "Pratha Mathur",
        role: "Senior Associate",
        company: "MetLife",
        quote: "I'm extremely grateful to Nitesh sir for providing such an insightful coursework on Product Management. His zest to bring out the best in everybody is noteworthy.",
        rating: 5,
        image: getDriveImageUrl("https://drive.google.com/open?id=1ctCrbSVkEOF1hlKHoDlqX4OCiVlFf1Fc"),
    },
    {
        name: "Akash Dhankani",
        role: "Business Architecture Analyst",
        company: "Accenture",
        quote: "The hands-on approach to complex PM frameworks is exceptional. If you want to move from 'learning' to 'leading' projects with confidence, this is the place to be.",
        rating: 5,
        image: getDriveImageUrl("https://drive.google.com/open?id=1enlRMLPxGDgMGYRLFuTUBhho7X_1Mgdo"),
    },
    {
        name: "Tithi Kundu",
        role: "Senior Associate",
        company: "Amazon",
        quote: "The coaching covered everything from strong fundamentals to hands-on assignments. Beyond certification, the team supported me in building my CV and profile.",
        rating: 5,
        image: getDriveImageUrl("https://drive.google.com/open?id=1uJiQ_ngk4ryfyWqbovwqZ3I0cpkbMu5n"),
    },
]

export function NewTestimonials() {
    return (
        <section id="testimonial" className="w-full py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
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
                        <button className="px-10 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                            View All
                        </button>
                    </Link>
                </div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full hover:-translate-y-2"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/5] w-full bg-gray-50 overflow-hidden">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Content Area */}
                            <div className="p-8 flex flex-col flex-1 bg-white relative">
                                <div className="mb-6">
                                    <h4 className="font-black text-gray-900 text-base uppercase tracking-tight leading-tight">{testimonial.name}</h4>
                                    <p className="text-gray-400 text-[10px] uppercase font-black mt-1.5 tracking-wider">
                                        {testimonial.role} <br />
                                        <span className="text-amber-500">{testimonial.company}</span>
                                    </p>
                                </div>
                                
                                <p className="text-gray-600 text-sm font-bold mb-8 italic leading-relaxed line-clamp-4">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>

                                {/* Rating & Label */}
                                <div className="mt-auto pt-6 border-t border-gray-50 flex flex-col gap-3">
                                    <div className="flex gap-1">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shadow-sm">
                                            <PlayCircle className="w-3 h-3 text-white fill-white" />
                                        </div>
                                        <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest">Success Story</span>
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
