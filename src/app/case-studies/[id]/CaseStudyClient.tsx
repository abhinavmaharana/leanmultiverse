'use client'

import Image from "next/image"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface CaseStudyClientProps {
  study: {
    id: string
    company: string
    industry: string
    logo: string
    image: string
    challenge: string
    solution: string
    results: string[]
    duration: string
    teamSize: string
  }
}

export default function CaseStudyClient({ study }: CaseStudyClientProps) {
  const [activeSection, setActiveSection] = useState('overview')
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  
  const sectionRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'challenge', label: 'Challenge' },
    { id: 'solution', label: 'Solution' },
    { id: 'results', label: 'Results' },
    { id: 'impact', label: 'Impact' }
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(heroRef.current, 
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

      // Image reveal animation
      gsap.fromTo(imageRef.current, 
        { y: 120, opacity: 0, scale: 0.8, rotationX: 15 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          rotationX: 0,
          duration: 2,
          ease: "power3.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Content sections staggered animation
      if (contentRef.current?.children) {
        gsap.fromTo(contentRef.current.children, 
          { y: 80, opacity: 0, scale: 0.9 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.2,
            delay: 0.8,
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Results animation with counter effect
      if (resultsRef.current?.children) {
        gsap.fromTo(resultsRef.current.children, 
          { y: 60, opacity: 0, scale: 0.8 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            delay: 1,
            scrollTrigger: {
              trigger: resultsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Stats animation with number counting
      if (statsRef.current?.children) {
        gsap.fromTo(statsRef.current.children, 
          { y: 40, opacity: 0, scale: 0.9 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            delay: 1.2,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Timeline animation
      if (timelineRef.current?.children) {
        gsap.fromTo(timelineRef.current.children, 
          { x: -100, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            delay: 1.4,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // CTA animation
      gsap.fromTo(ctaRef.current, 
        { y: 60, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 1.6,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Parallax effect for background elements
      gsap.to(".parallax-bg", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="relative w-full min-h-screen text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-30 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-600/5" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl parallax-bg"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl parallax-bg"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Background Image Layer */}
      <div className="fixed inset-0 -z-20 flex items-center justify-center">
        <Image 
          src="/bg.png" 
          alt="Background Design" 
          fill 
          className="object-contain opacity-30"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <motion.section 
          ref={heroRef}
          className="relative py-20 px-6 min-h-screen flex items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                className="space-y-8"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {/* Company Badge */}
                <motion.div
                  className="inline-block"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 backdrop-blur-xl border border-yellow-400/30 rounded-full px-6 py-3">
                    <div className="flex items-center gap-3">
                      <Image 
                        src={study.logo} 
                        alt={`${study.company} logo`} 
                        width={32} 
                        height={32} 
                        className="invert" 
                      />
                      <span className="text-yellow-400 font-medium">{study.industry}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold leading-tight"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {study.company}
                  <motion.span 
                    className="block text-3xl lg:text-5xl text-yellow-400 mt-2"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    Case Study
                  </motion.span>
                </motion.h1>

                {/* Description */}
                <motion.p 
                  className="text-xl text-gray-300 leading-relaxed max-w-lg"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  Transforming {study.industry.toLowerCase()} through innovative solutions and strategic implementation.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-yellow-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <Button
                      className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-2xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 border border-yellow-400/20"
                      data-cursor-hover
                    >
                      <motion.span
                        className="relative z-10"
                        whileHover={{ y: -1 }}
                        transition={{ duration: 0.2 }}
                      >
                        View Project Details
                      </motion.span>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0, 0.2, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                    <Button
                      className="relative bg-white/10 text-white hover:bg-white/20 rounded-2xl px-8 py-4 text-lg font-semibold border border-white/20 backdrop-blur-md hover:border-white/40 transition-all duration-300 hover:shadow-xl"
                      data-cursor-hover
                    >
                      <motion.span
                        className="relative z-10"
                        whileHover={{ y: -1 }}
                        transition={{ duration: 0.2 }}
                      >
                        Download Report
                      </motion.span>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                ref={imageRef}
                className="relative"
                initial={{ x: 100, opacity: 0, scale: 0.8 }}
                whileInView={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={study.image}
                    alt={`${study.company} case study`}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    onLoad={() => setIsImageLoaded(true)}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isImageLoaded ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>

                {/* Floating Stats */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-6 rounded-2xl shadow-2xl"
                  initial={{ scale: 0, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                >
                  <div className="text-2xl font-bold">{study.duration}</div>
                  <div className="text-sm opacity-80">Project Duration</div>
                </motion.div>

                <motion.div
                  className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-xl border border-white/20 text-white p-6 rounded-2xl shadow-2xl"
                  initial={{ scale: 0, rotate: 10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: -2 }}
                >
                  <div className="text-2xl font-bold">{study.teamSize}</div>
                  <div className="text-sm opacity-80">Team Size</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Navigation Tabs */}
        <motion.div 
          className="sticky top-20 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10"
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex space-x-1 py-4">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === section.id
                      ? "bg-yellow-400 text-black"
                      : "text-white hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor-hover
                >
                  {section.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <section ref={sectionRef} className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Challenge & Solution */}
            <motion.div 
              ref={contentRef}
              className="grid lg:grid-cols-2 gap-12 mb-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="group relative"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-red-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0, 0.2, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center text-white mb-6"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-4">The Challenge</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">{study.challenge}</p>
                </div>
              </motion.div>

              <motion.div
                className="group relative"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0, 0.2, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center text-white mb-6"
                    whileHover={{ rotate: -5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-4">Our Solution</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">{study.solution}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Key Results */}
            <motion.div 
              ref={resultsRef}
              className="mb-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="text-center mb-12"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-4">Key Results</h2>
                <p className="text-gray-400 text-lg">Measurable impact and outcomes</p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {study.results.map((result: string, i: number) => (
                  <motion.div
                    key={i}
                    className="group relative"
                    initial={{ y: 60, opacity: 0, scale: 0.8 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 1, 
                      ease: "easeOut", 
                      delay: 0.2 + i * 0.1 
                    }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0, 0.2, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                      }}
                    />
                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center text-black mx-auto mb-6"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <span className="text-2xl font-bold">{i + 1}</span>
                      </motion.div>
                      <p className="text-gray-300 text-lg leading-relaxed">{result}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Project Timeline */}
            <motion.div 
              ref={timelineRef}
              className="mb-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="text-center mb-12"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-4">Project Timeline</h2>
                <p className="text-gray-400 text-lg">Our journey from concept to completion</p>
              </motion.div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"></div>
                
                <div className="space-y-12">
                  {[
                    { phase: "Discovery", duration: "2 weeks", description: "Research and analysis" },
                    { phase: "Planning", duration: "3 weeks", description: "Strategy and architecture" },
                    { phase: "Development", duration: "6 weeks", description: "Implementation and testing" },
                    { phase: "Launch", duration: "1 week", description: "Deployment and monitoring" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className={`flex items-center ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                      initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 + i * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className={`w-1/2 ${i % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                        <motion.div
                          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
                          whileHover={{ scale: 1.05, y: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-xl font-bold mb-2">{item.phase}</h3>
                          <p className="text-yellow-400 font-semibold mb-2">{item.duration}</p>
                          <p className="text-gray-300">{item.description}</p>
                        </motion.div>
                      </div>
                      <div className="relative z-10">
                        <motion.div
                          className="w-6 h-6 bg-yellow-400 rounded-full border-4 border-black"
                          whileHover={{ scale: 1.5 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div className="w-1/2"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div 
              ref={ctaRef}
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/5 rounded-3xl blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="relative z-10">
                  <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
                  <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                    Let&apos;s discuss how we can help transform your business with innovative solutions.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-yellow-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0, 0.3, 0]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <Button
                        className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-2xl px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 border border-yellow-400/20"
                        data-cursor-hover
                      >
                        <motion.span
                          className="relative z-10"
                          whileHover={{ y: -1 }}
                          transition={{ duration: 0.2 }}
                        >
                          Start Your Project
                        </motion.span>
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0, 0.2, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                      />
                      <Button
                        className="relative bg-white/10 text-white hover:bg-white/20 rounded-2xl px-10 py-4 text-lg font-semibold border border-white/20 backdrop-blur-md hover:border-white/40 transition-all duration-300 hover:shadow-xl"
                        data-cursor-hover
                      >
                        <motion.span
                          className="relative z-10"
                          whileHover={{ y: -1 }}
                          transition={{ duration: 0.2 }}
                        >
                          View More Cases
                        </motion.span>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}


