'use client'

import { Star, PlayCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Helper function to convert Google Drive sharing link to direct image URL
const getDriveImageUrl = (driveUrl: string): string => {
    if (!driveUrl) return ""
    const idMatch = driveUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/)
    let fileId = idMatch ? idMatch[1] : null
    if (!fileId) {
        const dMatch = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/)
        if (dMatch) fileId = dMatch[1]
    }
    return fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w400` : driveUrl
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
        <section id="testimonial" className="relative w-full py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Our Testimonials
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                            Real stories from real professionals who transformed their careers. 
                            Our alumni work at world-class companies like Amazon, Synechron, MetLife, and Accenture.
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
                            {/* Image Container */}
                            <div className="relative aspect-[4/5] w-full bg-gray-100 overflow-hidden">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                    unoptimized={true}
                                />
                            </div>

                            {/* Content Area */}
                            <div className="p-6 flex flex-col flex-1 bg-white">
                                <div className="mb-4">
                                    <h4 className="font-bold text-gray-900 text-[13px] uppercase tracking-tight leading-tight">{testimonial.name}</h4>
                                    <p className="text-gray-400 text-[9px] uppercase font-bold mt-1">
                                        {testimonial.role} <br />
                                        <span className="text-amber-500">{testimonial.company}</span>
                                    </p>
                                </div>
                                
                                <p className="text-gray-600 text-xs font-medium mb-6 italic leading-relaxed">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>

                                {/* Rating & Label */}
                                <div className="mt-auto pt-4 border-t border-gray-50">
                                    <div className="flex gap-0.5 mb-2">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3.5 h-3.5 rounded-full bg-amber-400 flex items-center justify-center">
                                            <PlayCircle className="w-2.5 h-2.5 text-white fill-white" />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-800 uppercase tracking-tighter">Success Story</span>
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
