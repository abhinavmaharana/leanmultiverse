"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  quote: string
  rating: number
  achievement: string
  course: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rudra Narayan Behera",
    role: "Fresher (Student)",
    company: "Student",
    quote: "I have been following and training under @corporate.wala.youtuber (Nitesh Prasad), and his Instagram content has genuinely transformed the way I approach my career and professional growth. His videos are not only highly engaging and easy to understand, but they are also packed with real-world insights that help learners like me improve career skills, build confidence, and better navigate the corporate world. The practical advice he shares - from choosing the right certifications to mastering workplace dynamics - has helped me grow both personally and professionally. His positive direction, motivational style, and deep understanding of corporate challenges make his content extremely valuable not just to me, but to many others who aspire to upskill, succeed in their jobs, and achieve higher goals. The consistency and quality of his guidance have made learning enjoyable and inspiring.",
    rating: 5,
    achievement: "Career Transformation",
    course: "Professional Development Program"
  },
  {
    id: "2",
    name: "Akash Dhankani",
    role: "Business Architecture Analyst",
    company: "Accenture",
    quote: "What makes this experience exceptional is the hands-on approach to complex PM frameworks. The incredible 1:1 mentorship from Nitesh Sir, this program is a deep dive into the DNA of Product Management. From mastering scrum and agile to perfecting my professional brand, the attention to detail is unmatched. If you want to move from 'learning' to 'leading' projects with confidence, this is the place to be.",
    rating: 5,
    achievement: "PM Framework Mastery",
    course: "Product Management Program"
  },
  {
    id: "3",
    name: "Piyush Mahajan",
    role: "Professional",
    company: "Wipro Ltd.",
    quote: "Had a great learning experience in the Product Management session conducted by Nitish Prasad. The session was extremely insightful, well-structured, and practical. Nitish has a remarkable way of breaking down complex product concepts into simple, real-world examples, making them easy to understand and apply. The discussions around product strategy, user-centric thinking, and decision-making added immense value and clarity. Truly appreciate the energy, clarity, and depth of knowledge he brought to the session. Highly recommended for anyone looking to build or strengthen their understanding of Product Management!",
    rating: 5,
    achievement: "Product Strategy Excellence",
    course: "Product Management Training"
  },
  {
    id: "4",
    name: "Sumit Roy",
    role: "Professional",
    company: "Aml Rightsource",
    quote: "The product training session was very informative and well-structured. It provided a clear understanding of key product features, use cases, and customer value. The trainer explained concepts effectively with relevant examples, making it easy to connect theory with practical scenarios. Overall, it was an engaging and useful session that enhanced my product knowledge and confidence.",
    rating: 5,
    achievement: "Enhanced Product Knowledge",
    course: "Product Training Program"
  }
]

export default function SuccessStories() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Safety check
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const nextTestimonial = () => {
    setSelectedTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setSelectedTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return
    
    const interval = setInterval(() => {
      setSelectedTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  return (
    <section className="py-20 bg-black relative overflow-hidden">

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
            className="relative z-10"
          >
            <div className="text-center lg:text-left">
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
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6"
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
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={prevTestimonial}
              className="bg-white/10 text-white hover:bg-white/20 rounded-full w-12 h-12 p-0 border border-white/20 backdrop-blur-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            
            <Button
              onClick={nextTestimonial}
              className="bg-white/10 text-white hover:bg-white/20 rounded-full w-12 h-12 p-0 border border-white/20 backdrop-blur-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>

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
          {testimonials.map((testimonial) => (
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
                  className="mb-4"
                >
                  <h4 
                    className="text-white font-semibold mb-1"
                  >
                    {testimonial.name}
                  </h4>
                  <p 
                    className="text-gray-400 text-sm"
                  >
                    {testimonial.role} {testimonial.company && `• ${testimonial.company}`}
                  </p>
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
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Start Your Journey
              </Button>
              <Button className="bg-white/10 text-white hover:bg-white/20 rounded-full px-8 py-4 text-lg font-semibold border border-white/20 backdrop-blur-md hover:border-white/40 transition-all duration-300">
                View All Courses
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
