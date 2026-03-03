'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { testimonials } from '@/data/testimonials'
import { Carousel, Modal } from 'antd'

export function NewTestimonials() {
    const [slidesToShow, setSlidesToShow] = useState(3)
    const [autoPlay, setAutoPlay] = useState(true)
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSlidesToShow(1)
            } else {
                setSlidesToShow(3)
            }
        }
        
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    
    return (
        <section id="testimonial" className="w-full py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Our Testimonials
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg">
                            Real stories from professionals who transformed their careers.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="w-full px-4">
                <Carousel
                    dots
                    arrows
                    infinite
                    autoplay={autoPlay}
                    autoplaySpeed={3000}
                    draggable
                    swipeToSlide
                    pauseOnHover
                    slidesToShow={slidesToShow}
                    slidesToScroll={1}
                    afterChange={() => setAutoPlay(false)}
                >
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="px-3">
                            <TestimonialCard
                                testimonial={testimonial}
                                onInteract={() => setAutoPlay(false)}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    )
}

function TestimonialCard({
    testimonial,
    onInteract,
}: {
    testimonial: typeof testimonials[0]
    onInteract: () => void
}) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    
    const openModal = () => {
        onInteract()
        setIsModalOpen(true)
    }
    
    return (
        <>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition p-5 h-[420px] flex flex-col">
            <div className="flex justify-center mb-4">
                <div className="relative w-24 h-24 rounded-full border-2 border-amber-400 overflow-hidden bg-gray-100">
                {!imageLoaded && testimonial.name.charAt(0)}
                
                {testimonial.image && (
                    <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    loading="lazy"
                    className={`object-cover object-top transition-opacity duration-300 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    />
                )}
                </div>
            </div>
            
            <div className="text-center mb-2">
                <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                    {testimonial.name}
                </h4>
                <p className="text-xs text-gray-500">
                    {testimonial.role}
                    <span className="block text-amber-500 font-semibold">
                        {testimonial.company}
                    </span>
                </p>
            </div>
            
            <p className="text-gray-600 text-sm italic text-center line-clamp-4 mb-3">
                “{testimonial.quote}”...
            </p>
            
            <button
                onClick={openModal}
                className="text-xs text-amber-500 font-semibold hover:underline mb-4"
            >
                Read More
            </button>
            
                {/* FOOTER */}
                <div className="mt-auto flex flex-col items-center gap-3 pt-3 border-t border-gray-100">
                    <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                    
                    {testimonial.achievement && (
                        <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                            {testimonial.achievement}
                        </span>
                    )}
                </div>
            </div>
        
            <Modal
                open={isModalOpen}
                footer={null}
                onCancel={() => setIsModalOpen(false)}
                centered
                width={600}
                bodyStyle={{
                    maxHeight: '60vh',
                    overflowY: 'auto',
                }}
            >
                <h3 className="text-lg font-semibold mb-3">
                    {testimonial.name}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                    “{testimonial.quote}”
                </p>
            </Modal>
        </>
    )
}