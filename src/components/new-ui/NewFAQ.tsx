'use client'

import { useState } from 'react'
import { Plus, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const faqs = [
    {
        question: 'Do I need prior Product or Project experience to attend?',
        answer: 'No. This session is designed for working professionals and freshers who want to transition strategically, even if they don\'t currently hold a PM title.',
    },
    {
        question: 'Will this help me switch companies or roles?',
        answer: 'Yes, the frameworks shared are designed to highlight your transferable skills and position you as a high-value candidate for top-tier roles.',
    },
    {
        question: 'Is this relevant if I\'m already working in an MNC?',
        answer: 'Absolutely. Many of our attendees are from MNCs like Google and Microsoft who want to master strategic leadership and AI-driven workflows.',
    },
    {
        question: 'Will I receive a certificate after the webinar?',
        answer: 'Yes, all attendees who complete the live session receive an official certificate of attendance to showcase their commitment to professional growth.',
    },
    {
        question: 'Can I download the course materials for offline access?',
        answer: 'During the webinar, we provide exclusive access to frameworks and templates that you can save and use in your professional projects.',
    },
]

export function NewFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section className="w-full py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                    
                    {/* Left Column: Heading */}
                    <div className="lg:w-1/3">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                            Frequently<br />Asked Questions
                        </h2>
                        <p className="text-xs font-bold text-amber-400 tracking-widest uppercase">
                            More Questions?
                        </p>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="lg:w-2/3">
                        <div className="border border-gray-100 rounded-sm">
                            {faqs.map((faq, index) => {
                                const isOpen = openIndex === index
                                return (
                                    <div 
                                        key={index} 
                                        className={`border-b border-gray-100 last:border-0 transition-all ${isOpen ? 'bg-white' : ''}`}
                                    >
                                        <button
                                            className="w-full py-6 px-4 md:px-8 flex items-center justify-between text-left group"
                                            onClick={() => setOpenIndex(isOpen ? null : index)}
                                        >
                                            <span className={`text-lg font-semibold pr-8 ${isOpen ? 'text-gray-900' : 'text-gray-800'}`}>
                                                {faq.question}
                                            </span>
                                            <div className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center transition-colors ${isOpen ? 'bg-[#FDF6E9]' : 'bg-[#FDF6E9]'}`}>
                                                {isOpen ? (
                                                    <X className="w-4 h-4 text-gray-600" />
                                                ) : (
                                                    <Plus className="w-4 h-4 text-gray-600" />
                                                )}
                                            </div>
                                        </button>
                                        
                                        <div 
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                                isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                        >
                                            <div className="px-4 md:px-8 pb-8 pt-2">
                                                <p className="text-gray-600 leading-relaxed mb-8 text-base">
                                                    {faq.answer}
                                                </p>
                                                
                                                {/* Book Now Button */}
                                                <Link href="/book-webinar">
                                                    <div className="bg-amber-400 hover:bg-amber-500 text-white rounded-lg p-4 flex items-center justify-between group/btn cursor-pointer transition-all max-w-lg shadow-sm">
                                                        <span className="font-semibold text-gray-900 ml-2">Book now</span>
                                                        <div className="bg-white rounded-full p-2 text-amber-400 group-hover/btn:translate-x-1 transition-transform">
                                                            <ArrowRight className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
