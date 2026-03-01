'use client'

import { useState } from 'react'
import { ChevronDown, CheckCircle2 } from 'lucide-react'

const steps = [
    {
        number: '01',
        title: 'Register for Webinar',
        description: 'Sign up for the webinar and get instant access to exclusive career acceleration resources.',
        moreInfo: 'Upon registration, you\'ll receive a curated "Career Accelerator Kit" via email, including resume templates and a PM readiness checklist.'
    },
    {
        number: '02',
        title: 'Attend Live Session',
        description: 'Join our expert-led session and learn proven strategies used by top professionals.',
        moreInfo: 'During the 90-minute live workshop, Nitesh Prasad will break down real-world case studies from MNCs and answer your career-specific questions.'
    },
    {
        number: '03',
        title: 'Transform Your Career',
        description: 'Apply the frameworks and watch your career trajectory change within weeks.',
        moreInfo: 'Get access to our exclusive alumni community where you can network with 50,000+ professionals and find referral opportunities.'
    },
]

export function NewStepsSection() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

    return (
        <section className="w-full py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        A Webinar Worth Your Time. <span className="text-amber-400">Guaranteed.</span>
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Follow our proven 3-step framework to transition into high-growth roles.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {steps.map((step, index) => {
                        const isExpanded = expandedIndex === index
                        return (
                            <div 
                                key={index} 
                                className={`group flex flex-col items-center text-center p-8 rounded-2xl transition-all duration-300 cursor-pointer ${
                                    isExpanded ? 'bg-amber-50/50 ring-1 ring-amber-200 shadow-sm' : 'hover:bg-gray-50'
                                }`}
                                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                            >
                                <div className="relative mb-6">
                                    <span className="text-7xl font-black text-amber-400/20 group-hover:text-amber-400/30 transition-colors">
                                        {step.number}
                                    </span>
                                    <div className="absolute inset-0 flex items-center justify-center pt-4">
                                        <CheckCircle2 className={`w-8 h-8 ${isExpanded ? 'text-amber-500' : 'text-amber-400'}`} />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-500 transition-colors">
                                    {step.title}
                                </h3>
                                
                                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                                    {step.description}
                                </p>

                                <div className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-500 transition-all ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
                                    <span>Learn more</span>
                                    <ChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
                                </div>

                                {/* Expandable Detail */}
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    isExpanded ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
                                }`}>
                                    <div className="p-4 bg-white rounded-xl border border-amber-100 shadow-sm">
                                        <p className="text-gray-700 text-xs leading-relaxed italic">
                                            {step.moreInfo}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
