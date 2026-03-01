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
            <div className="flex flex-col lg:flex-row min-h-[700px]">
                {/* Left Side: Content */}
                <div className="flex flex-[1.2] relative">
                    {/* Far Left Amber Bar */}
                    <div className="w-10 md:w-24 bg-amber-400 self-stretch group-hover:w-12 md:group-hover:w-28 transition-all duration-500 flex-shrink-0" />
                    
                    {/* Text Area */}
                    <div className="flex-1 py-20 px-10 md:px-20 flex flex-col justify-center bg-white">
                        <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-12 tracking-tight leading-[1] uppercase">
                            Meet your <br /> Mentor
                        </h2>
                        <div className="max-w-2xl space-y-10 text-gray-700">
                            <p className="text-2xl md:text-3xl leading-snug font-black text-gray-900 tracking-tight">
                                Corporate YouTuber with 680k+ Instagram community. Mentor to 1000+ professionals who have transitioned into Product, Project and AI roles.
                            </p>
                            <p className="text-xl md:text-2xl leading-relaxed text-gray-600 font-bold">
                                His TEDx talk on career acceleration has 300K+ views. He brings practical frameworks used by professionals at leading MNCs like Deloitte, JPMorgan, Accenture and Infosys.
                            </p>
                        </div>

                        <div className={`flex items-center gap-4 mt-16 text-amber-500 font-black uppercase text-base tracking-[0.2em] transition-opacity ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
                            <span>Click to reveal achievements</span>
                            <ChevronDown className="w-6 h-6 animate-bounce" />
                        </div>

                        {/* Animated Achievements Grid */}
                        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[600px] opacity-100 mt-16' : 'max-h-0 opacity-0'}`}>
                            <div className="grid grid-cols-2 gap-8">
                                {achievements.map((item, i) => (
                                    <div key={i} className="p-8 bg-amber-50 rounded-[2rem] border border-amber-100 shadow-sm hover:shadow-xl transition-all">
                                        <item.icon className="w-10 h-10 text-amber-500 mb-4" />
                                        <p className="text-3xl font-black text-gray-900">{item.label}</p>
                                        <p className="text-xs text-gray-500 font-black uppercase tracking-widest mt-2">{item.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Image Area */}
                <div className="flex flex-1 relative min-h-[500px] lg:min-h-auto">
                    {/* Mid Amber Bar */}
                    <div className="w-6 md:w-14 bg-amber-400 self-stretch z-10 flex-shrink-0" />
                    
                    {/* Image */}
                    <div className="flex-1 relative overflow-hidden bg-gray-50">
                        <Image
                            src="/nitesh-updated-image-area.png"
                            alt="Nitesh Prasad - Mentor"
                            fill
                            className="object-cover object-center group-hover:scale-110 transition-transform duration-[2000ms]"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {/* Overlay vignette */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    )
}
