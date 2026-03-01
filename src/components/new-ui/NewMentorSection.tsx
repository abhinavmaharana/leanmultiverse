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
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <section 
            id="mentor" 
            className="w-full bg-white overflow-hidden cursor-pointer group"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="flex flex-col lg:flex-row min-h-[500px]">
                {/* Left Side: Content */}
                <div className="flex flex-1">
                    {/* Far Left Amber Bar */}
                    <div className="w-8 md:w-16 bg-amber-400 self-stretch group-hover:w-10 md:group-hover:w-20 transition-all duration-500" />
                    
                    {/* Text Area */}
                    <div className="flex-1 py-16 px-8 md:px-12 flex flex-col justify-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
                            Meet your Mentor
                        </h2>
                        <div className="max-w-xl space-y-6">
                            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                                Corporate YouTuber with 680k+ Instagram community. Mentor to 1000+ professionals who have transitioned into Product, Project and AI roles at top companies like Deloitte, JPMorgan, Accenture and Infosys.
                            </p>
                            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                                His TEDx talk on career acceleration has 300K+ views. He brings practical frameworks used by professionals at leading MNCs.
                            </p>
                        </div>

                        <div className={`flex items-center gap-2 mt-8 text-amber-500 font-bold uppercase text-xs tracking-widest transition-opacity ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
                            <span>Click to see achievements</span>
                            <ChevronDown className="w-4 h-4 animate-bounce" />
                        </div>

                        {/* Animated Achievements Grid */}
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[400px] opacity-100 mt-10' : 'max-h-0 opacity-0'}`}>
                            <div className="grid grid-cols-2 gap-4">
                                {achievements.map((item, i) => (
                                    <div key={i} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                                        <item.icon className="w-5 h-5 text-amber-500 mb-2" />
                                        <p className="text-xl font-bold text-gray-900">{item.label}</p>
                                        <p className="text-xs text-gray-600">{item.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Image Area */}
                <div className="flex flex-1 relative min-h-[400px] lg:min-h-auto">
                    {/* Mid Amber Bar */}
                    <div className="w-4 md:w-8 bg-amber-400 self-stretch z-10" />
                    
                    {/* Image */}
                    <div className="flex-1 relative">
                        <Image
                            src="/nitesh-updated-image-area.png"
                            alt="Nitesh Prasad - Mentor"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
