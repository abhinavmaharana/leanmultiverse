'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Trophy, Users, Award, Star } from 'lucide-react'

const achievements = [
    { icon: Users, label: '700K+', detail: 'Community Members' },
    { icon: Award, label: '1,000+', detail: 'Mentored Professionals' },
    { icon: Trophy, label: '15+ Years', detail: 'Industry Experience' },
    { icon: Star, label: '4.9★', detail: 'User Rating' },
]

export function NewMentorSection() {
    return (
        <section 
            id="mentor" 
            className="w-full bg-white overflow-hidden border-t border-gray-100"
        >
            <div className="flex flex-col lg:flex-row min-h-[550px] md:min-h-[700px]">
                {/* Left Side: Content */}
                <div className="flex flex-1 relative">
                    {/* Far Left Amber Bar */}
                    <div className="w-12 md:w-44 bg-amber-400 self-stretch flex-shrink-0" />
                    
                    {/* Text Area */}
                    <div className="flex-1 flex flex-col justify-center py-20 px-8 md:px-20 bg-white">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight leading-tight">
                                Meet your Mentor
                            </h2>
                            <div className="space-y-6">
                                <p className="text-sm md:text-lg leading-relaxed text-gray-600 font-medium">
                                    Corporate YouTuber with 680k+ Instagram community. Mentor to 1000+ professionals who have transitioned into Product, Project and AI roles at top companies like Deloitte, JPMorgan, Accenture and Infosys.
                                </p>
                                <p className="text-sm md:text-lg leading-relaxed text-gray-600 font-medium">
                                    His TEDx talk on career acceleration has 300K+ views. He brings practical frameworks used by professionals at leading MNCs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Image Area */}
                <div className="flex flex-1 relative min-h-[350px] lg:min-h-auto">
                    {/* Mid Amber Bar - Extremely thin as per image */}
                    <div className="w-1.5 md:w-3 bg-amber-400 self-stretch z-10 flex-shrink-0" />
                    
                    {/* Image */}
                    <div className="flex-1 relative overflow-hidden bg-white">
                        <Image
                            src="/tedex.jpeg"
                            alt="Nitesh Prasad - TEDx Speaker & Mentor"
                            fill
                            className="object-cover object-center"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
