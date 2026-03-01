'use client'

import { useState } from 'react'
import { Briefcase, Users, TrendingUp, Lightbulb, ChevronRight, X } from 'lucide-react'

const services = [
    {
        icon: Briefcase,
        title: 'Product Management',
        description: 'Master the skills top tech companies look for in product managers. Learn roadmap planning, user research, and stakeholder management.',
        details: [
            'End-to-end Product Lifecycle Management',
            'Market Analysis & Competitive Benchmarking',
            'User Story Mapping & Backlog Grooming',
            'PRD Writing & Technical Coordination'
        ]
    },
    {
        icon: Users,
        title: 'Project Management',
        description: 'Get certified in Agile, Scrum, and modern project management methodologies that drive successful product delivery.',
        details: [
            'Agile, Scrum & Kanban Frameworks',
            'Resource Allocation & Capacity Planning',
            'Risk Management & Mitigation Strategies',
            'Stakeholder Communication & Reporting'
        ]
    },
    {
        icon: TrendingUp,
        title: 'AI & Data Skills',
        description: 'Stay ahead with AI literacy, data analytics, and machine learning fundamentals for the modern workplace.',
        details: [
            'Generative AI for Workplace Productivity',
            'Data-Driven Decision Making Frameworks',
            'Basic Machine Learning for Professionals',
            'Analytical Tools & Dashboard Mastery'
        ]
    },
    {
        icon: Lightbulb,
        title: 'Career Strategy',
        description: 'Build a personal brand, optimize your resume, and develop interview skills that get you hired faster.',
        details: [
            'LinkedIn Profile & Personal Brand Audit',
            'ATS-Friendly Resume Transformation',
            'Mock Interviews with Industry Experts',
            'Salary Negotiation & Offer Analysis'
        ]
    },
]

export function NewServices() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    return (
        <section id="services" className="w-full py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        What You Will <span className="text-amber-400">Learn</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Comprehensive programs designed to take you from beginner to job-ready professional in the most in-demand fields.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => {
                        const isActive = activeIndex === index
                        return (
                            <div
                                key={index}
                                className={`group relative bg-white rounded-2xl p-8 border transition-all duration-300 cursor-pointer overflow-hidden ${
                                    isActive 
                                    ? 'border-amber-400 ring-1 ring-amber-400 shadow-xl' 
                                    : 'border-gray-100 hover:border-amber-200 hover:shadow-lg'
                                }`}
                                onClick={() => setActiveIndex(isActive ? null : index)}
                            >
                                {/* Icon Header */}
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                                    isActive ? 'bg-amber-400 text-white' : 'bg-amber-400/10 text-amber-400 group-hover:bg-amber-400 group-hover:text-white'
                                }`}>
                                    <service.icon className="w-7 h-7" />
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center justify-between">
                                    {service.title}
                                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isActive ? 'rotate-90 text-amber-400' : 'group-hover:translate-x-1'}`} />
                                </h3>
                                
                                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                                    {service.description}
                                </p>

                                {/* Animated Expandable Info */}
                                <div 
                                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                                        isActive ? 'max-h-60 opacity-100 mt-6 pt-6 border-t border-gray-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">Key Modules:</p>
                                    <ul className="space-y-2">
                                        {service.details.map((detail, i) => (
                                            <li key={i} className="text-gray-700 text-xs flex items-start gap-2">
                                                <div className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {isActive && (
                                    <button 
                                        className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setActiveIndex(null)
                                        }}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-500 text-sm italic">
                        Click on any category to explore the full curriculum.
                    </p>
                </div>
            </div>
        </section>
    )
}
