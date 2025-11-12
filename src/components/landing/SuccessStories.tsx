"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  image: string
  quote: string
  rating: number
  achievement: string
  course: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "VP of Digital Transformation",
    company: "TechCorp Inc.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    quote: "The Enterprise Agility MBA transformed my approach to leadership. I've successfully led 3 major digital transformation initiatives, resulting in 40% efficiency gains across our organization.",
    rating: 5,
    achievement: "40% efficiency improvement",
    course: "MBA in Enterprise Agility"
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Agile Coach",
    company: "Global Solutions Ltd.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    quote: "The Certified Enterprise Agility Coach program gave me the tools and confidence to help 15+ teams adopt agile practices. My salary increased by 60% within 6 months of completion.",
    rating: 5,
    achievement: "60% salary increase",
    course: "Certified Enterprise Agility Coach"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Head of Operations",
    company: "InnovateNow",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    quote: "The Lean Six Sigma Black Belt certification helped me streamline our processes and reduce waste by 35%. I'm now leading a team of 50+ professionals across multiple locations.",
    rating: 5,
    achievement: "35% waste reduction",
    course: "Lean Six Sigma Black Belt"
  },
  {
    id: "4",
    name: "David Thompson",
    role: "Chief Technology Officer",
    company: "FutureTech",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
    quote: "The Digital Transformation Strategy course provided me with a comprehensive framework that I used to modernize our entire technology stack. We've seen 50% faster delivery times.",
    rating: 5,
    achievement: "50% faster delivery",
    course: "Digital Transformation Strategy"
  },
  {
    id: "5",
    name: "Lisa Wang",
    role: "Senior Project Manager",
    company: "AgileWorks",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2070&auto=format&fit=crop",
    quote: "The Executive Diploma in Agile Project Management completely changed how I approach project delivery. I've successfully managed projects worth over $10M with 95% on-time delivery.",
    rating: 5,
    achievement: "95% on-time delivery",
    course: "Executive Diploma in Agile Project Management"
  },
  {
    id: "6",
    name: "James Wilson",
    role: "Director of Innovation",
    company: "TransformCorp",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2070&auto=format&fit=crop",
    quote: "The Executive Leadership program gave me the skills to lead organizational change. I've helped 3 companies successfully transform their culture and processes, resulting in 25% productivity gains.",
    rating: 5,
    achievement: "25% productivity gains",
    course: "Executive Leadership in Agile Organizations"
  }
]

export default function SuccessStories() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextTestimonial = () => {
    setSelectedTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setSelectedTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  return (
    <section className="py-20 bg-black min-h-screen relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium mb-3">
            Success Stories
          </p>
          <h2 className="text-[30px] md:text-[46.13px] font-bold mb-6 text-white">
            Transform Your Career
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Join thousands of professionals who have transformed their careers 
            and organizations through our comprehensive learning programs.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div 
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full blur-2xl"
            />
          </div>

          <div 
            key={selectedTestimonial}
            className="flex flex-col lg:flex-row items-center gap-8 relative z-10"
          >
              <div 
                className="flex-shrink-0"
              >
                <div
                  className="relative"
                >
              <Image
                src={testimonials[selectedTestimonial].image}
                alt={testimonials[selectedTestimonial].name}
                width={120}
                height={120}
                    className="rounded-full object-cover border-4 border-yellow-400/30"
                  />
                  <div
                    className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>

            <div className="flex-1 text-center lg:text-left">
                <div 
                  className="flex justify-center lg:justify-start mb-4"
                >
                {[...Array(5)].map((_, i) => (
                    <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote 
                  className="text-xl md:text-2xl text-white mb-6 leading-relaxed"
                >
                &ldquo;{testimonials[selectedTestimonial].quote}&rdquo;
                </blockquote>

                <div 
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                <div>
                    <h4 
                      className="text-xl font-bold text-white"
                    >
                    {testimonials[selectedTestimonial].name}
                    </h4>
                    <p 
                      className="text-gray-300"
                    >
                    {testimonials[selectedTestimonial].role}
                    </p>
                    <p 
                      className="text-yellow-400 font-semibold"
                    >
                    {testimonials[selectedTestimonial].company}
                    </p>
                  </div>
                  <div 
                    className="text-center sm:text-right"
                  >
                    <div 
                      className="achievement-badge text-yellow-400 font-bold text-lg bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/30"
                    >
                      {testimonials[selectedTestimonial].achievement}
                    </div>
                    <div 
                      className="text-gray-400 text-sm mt-1"
                    >
                    {testimonials[selectedTestimonial].course}
                    </div>
                  </div>
                </div>
              </div>
          </div>

          {/* Enhanced Navigation */}
          <div 
            className="flex justify-center gap-4 mt-8"
          >
            <div
            >
            <Button
              onClick={prevTestimonial}
                className="bg-white/10 text-white hover:bg-white/20 rounded-full w-12 h-12 p-0 border border-white/20 backdrop-blur-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            </div>
            
            <div
            >
            <Button
              onClick={nextTestimonial}
                className="bg-white/10 text-white hover:bg-white/20 rounded-full w-12 h-12 p-0 border border-white/20 backdrop-blur-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            </div>

            <div
            >
              <Button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`rounded-full w-12 h-12 p-0 border backdrop-blur-md ${
                  isAutoPlaying 
                    ? "bg-yellow-400/20 text-yellow-400 border-yellow-400/30" 
                    : "bg-white/10 text-white border-white/20"
                }`}
              >
                {isAutoPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </Button>
            </div>
          </div>

          {/* Enhanced Dots */}
          <div 
            className="flex justify-center gap-2 mt-6"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === selectedTestimonial ? "bg-yellow-400" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 relative overflow-hidden group"
            >
              {/* Hover effect background */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div className="relative z-10">
                <div 
                  className="flex items-center mb-4"
                >
                  <div
                  >
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                      className="rounded-full object-cover mr-4 border-2 border-yellow-400/30"
                />
                  </div>
                <div>
                    <h4 
                      className="text-white font-semibold"
                    >
                      {testimonial.name}
                    </h4>
                    <p 
                      className="text-gray-400 text-sm"
                    >
                      {testimonial.role}
                    </p>
                </div>
                </div>

                <div 
                  className="flex mb-3"
                >
                {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p 
                  className="text-gray-300 text-sm mb-4 line-clamp-3"
                >
                &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div 
                  className="border-t border-white/10 pt-4"
                >
                  <div 
                    className="achievement-badge text-yellow-400 font-semibold text-sm bg-yellow-400/10 px-3 py-1 rounded-full inline-block mb-2"
                  >
                  {testimonial.achievement}
                  </div>
                  <div 
                    className="text-gray-400 text-xs"
                  >
                  {testimonial.course}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div 
          className="text-center mt-16 relative"
        >
          {/* Background glow effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-blue-400/10 rounded-3xl blur-3xl"
          />

          <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
            <h3 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
            Ready to Transform Your Career?
            </h3>
            <p 
              className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg"
            >
            Join thousands of successful professionals who have advanced their careers 
            through our comprehensive learning programs.
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <div
              >
                <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Start Your Journey
            </Button>
              </div>
              <div
              >
                <Button className="bg-white/10 text-white hover:bg-white/20 rounded-full px-8 py-4 text-lg font-semibold border border-white/20 backdrop-blur-md hover:border-white/40 transition-all duration-300">
              View All Courses
            </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
