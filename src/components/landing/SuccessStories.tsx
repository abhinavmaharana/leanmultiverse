"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useShouldAnimate } from "@/hooks/useShouldAnimate"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

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
  const shouldAnimate = useShouldAnimate()
  
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    setIsAutoPlaying(shouldAnimate)
  }, [shouldAnimate])

  // GSAP Animations
  useEffect(() => {
    if (typeof window === 'undefined' || !shouldAnimate) return

    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(headerRef.current, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Animate featured testimonial
      gsap.fromTo(featuredRef.current, 
        { y: 120, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Animate grid items with stagger
      if (gridRef.current?.children) {
        gsap.fromTo(gridRef.current.children, 
          { y: 80, opacity: 0, scale: 0.8 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.2,
            delay: 0.6,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Animate CTA section
      gsap.fromTo(ctaRef.current, 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2,
          ease: "power3.out",
          delay: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Floating animation for achievement badges
      gsap.to(".achievement-badge", {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [shouldAnimate])

  return (
    <motion.section 
      ref={sectionRef}
      className="py-20 bg-black min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-16"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p 
            className="uppercase tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium mb-3"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            Success Stories
          </motion.p>
          <motion.h2 
            className="text-[30px] md:text-[46.13px] font-bold mb-6 text-white"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            Transform Your Career
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-lg max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true }}
          >
            Join thousands of professionals who have transformed their careers 
            and organizations through our comprehensive learning programs.
          </motion.p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div 
          ref={featuredRef}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden"
          initial={{ y: 120, opacity: 0, scale: 0.9 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full blur-2xl"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedTestimonial}
              className="flex flex-col lg:flex-row items-center gap-8 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.div 
                className="flex-shrink-0"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
              <Image
                src={testimonials[selectedTestimonial].image}
                alt={testimonials[selectedTestimonial].name}
                width={120}
                height={120}
                    className="rounded-full object-cover border-4 border-yellow-400/30"
                  />
                  <motion.div
                    className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>

            <div className="flex-1 text-center lg:text-left">
                <motion.div 
                  className="flex justify-center lg:justify-start mb-4"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                >
                {[...Array(5)].map((_, i) => (
                    <motion.svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </motion.div>

                <motion.blockquote 
                  className="text-xl md:text-2xl text-white mb-6 leading-relaxed"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                >
                &ldquo;{testimonials[selectedTestimonial].quote}&rdquo;
                </motion.blockquote>

                <motion.div 
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
                >
                <div>
                    <motion.h4 
                      className="text-xl font-bold text-white"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                    {testimonials[selectedTestimonial].name}
                    </motion.h4>
                    <motion.p 
                      className="text-gray-300"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                    >
                    {testimonials[selectedTestimonial].role}
                    </motion.p>
                    <motion.p 
                      className="text-yellow-400 font-semibold"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                    >
                    {testimonials[selectedTestimonial].company}
                    </motion.p>
                  </div>
                  <motion.div 
                    className="text-center sm:text-right"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                  >
                    <motion.div 
                      className="achievement-badge text-yellow-400 font-bold text-lg bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/30"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(251, 191, 36, 0.2)" }}
                    >
                      {testimonials[selectedTestimonial].achievement}
                    </motion.div>
                    <motion.div 
                      className="text-gray-400 text-sm mt-1"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.6 }}
                    >
                    {testimonials[selectedTestimonial].course}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Navigation */}
          <motion.div 
            className="flex justify-center gap-4 mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
            <Button
              onClick={prevTestimonial}
                className="bg-white/10 text-white hover:bg-white/20 rounded-full w-12 h-12 p-0 border border-white/20 backdrop-blur-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
            <Button
              onClick={nextTestimonial}
                className="bg-white/10 text-white hover:bg-white/20 rounded-full w-12 h-12 p-0 border border-white/20 backdrop-blur-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
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
            </motion.div>
          </motion.div>

          {/* Enhanced Dots */}
          <motion.div 
            className="flex justify-center gap-2 mt-6"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 2 }}
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === selectedTestimonial ? "bg-yellow-400" : "bg-white/30"
                }`}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.8 }}
                animate={{ 
                  scale: index === selectedTestimonial ? 1.2 : 1,
                  backgroundColor: index === selectedTestimonial ? "#fbbf24" : "rgba(255, 255, 255, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* All Testimonials Grid */}
        <motion.div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 relative overflow-hidden group"
              initial={{ y: 80, opacity: 0, scale: 0.8 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut", 
                delay: 0.6 + index * 0.2 
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {/* Hover effect background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              <div className="relative z-10">
                <motion.div 
                  className="flex items-center mb-4"
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                      className="rounded-full object-cover mr-4 border-2 border-yellow-400/30"
                />
                  </motion.div>
                <div>
                    <motion.h4 
                      className="text-white font-semibold"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      {testimonial.name}
                    </motion.h4>
                    <motion.p 
                      className="text-gray-400 text-sm"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.1 + index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      {testimonial.role}
                    </motion.p>
                </div>
                </motion.div>

                <motion.div 
                  className="flex mb-3"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, delay: 1.3 + index * 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </motion.div>

                <motion.p 
                  className="text-gray-300 text-sm mb-4 line-clamp-3"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                &ldquo;{testimonial.quote}&rdquo;
                </motion.p>

                <motion.div 
                  className="border-t border-white/10 pt-4"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.5 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="achievement-badge text-yellow-400 font-semibold text-sm bg-yellow-400/10 px-3 py-1 rounded-full inline-block mb-2"
                    whileHover={{ scale: 1.05 }}
                  >
                  {testimonial.achievement}
                  </motion.div>
                  <motion.div 
                    className="text-gray-400 text-xs"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.6 + index * 0.2 }}
                    viewport={{ once: true }}
                  >
                  {testimonial.course}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div 
          ref={ctaRef}
          className="text-center mt-16 relative"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Background glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-blue-400/10 rounded-3xl blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
            <motion.h3 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              viewport={{ once: true }}
            >
            Ready to Transform Your Career?
            </motion.h3>
            <motion.p 
              className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              viewport={{ once: true }}
            >
            Join thousands of successful professionals who have advanced their careers 
            through our comprehensive learning programs.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Start Your Journey
            </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-white/10 text-white hover:bg-white/20 rounded-full px-8 py-4 text-lg font-semibold border border-white/20 backdrop-blur-md hover:border-white/40 transition-all duration-300">
              View All Courses
            </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
