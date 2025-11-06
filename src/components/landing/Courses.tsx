// components/landing/Courses.tsx
"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { courses, categories, levels } from "@/data/courses"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// SAFe Course data - now imported from data/courses.ts

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null)
  
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)
  const coursesRef = useRef<HTMLDivElement>(null)

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel
    const matchesSearch = searchQuery === "" || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesLevel && matchesSearch
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

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

      // Animate search bar
      gsap.fromTo(searchRef.current, 
        { y: 80, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1.2,
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

      // Animate filters
      gsap.fromTo(filtersRef.current, 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
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

      // Animate courses grid
      if (coursesRef.current?.children) {
        gsap.fromTo(coursesRef.current.children, 
          { y: 120, opacity: 0, scale: 0.8 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.2,
            delay: 0.7,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }


    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <motion.section 
      ref={sectionRef}
      className="relative py-20 bg-black min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-400/3 rounded-full blur-3xl"
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

      <div className="max-w-7xl mx-auto px-6 relative z-10">
      {/* Header */}
        {/* <motion.div 
          ref={headerRef}
          className="text-center mb-10"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p 
            className="uppercase line-through decoration-red-600 tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium mb-3"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
          IT&apos;s Not Just A Process
          </motion.p>
          <motion.h1 
            className="text-[30px] md:text-[46.13px] font-bold mb-6 text-white"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            It&apos;s a New Way of Working
          </motion.h1>
        </motion.div> */}

        {/* Apple Cards Carousel Section - COMMENTED OUT */}
        {/* <motion.div
          ref={carouselRef}
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <AppleCardsCarouselDemo />
        </motion.div> */}

        {/* Modern Course Catalog Section */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 backdrop-blur-xl border border-yellow-400/30 rounded-full px-8 py-4">
                <p className="uppercase tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium">
                  Elevate Your Expertise
                </p>
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-[30px] md:text-[46.13px] lg:text-[56px] font-bold mb-8 text-white"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true }}
            >
              Training That Transforms
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true }}
            >
              Step confidently into leadership roles that transform organizations. 
              Become the driving force behind business agility and innovation.
            </motion.p>
          </motion.div>

        {/* Search Bar */}
        <motion.div 
          ref={searchRef}
          className="max-w-2xl mx-auto mb-12"
          initial={{ y: 80, opacity: 0, scale: 0.9 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="relative">
            <motion.input
              type="text"
              placeholder="Search courses, skills, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 focus:bg-white/15 transition-all duration-300"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.div
              className="absolute right-4 top-1/2 -translate-y-1/2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          ref={filtersRef}
          className="flex flex-col md:flex-row gap-6 mb-16"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-4">Categories:</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-yellow-400 text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor-hover
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-4">Level:</h3>
            <div className="flex flex-wrap gap-3">
              {levels.map((level) => (
                <motion.button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedLevel === level
                      ? "bg-yellow-400 text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor-hover
                >
                  {level}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div 
          ref={coursesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatePresence>
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                className="course-card group relative h-full flex"
                initial={{ y: 120, opacity: 0, scale: 0.8 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 1.2, 
                  ease: "easeOut", 
                  delay: 0.7 + index * 0.2 
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredCourse(course.id)}
                onHoverEnd={() => setHoveredCourse(null)}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ 
                    scale: hoveredCourse === course.id ? [1, 1.1, 1] : 1,
                    opacity: hoveredCourse === course.id ? [0, 0.3, 0] : 0
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <motion.div
                  className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 h-full w-full overflow-hidden flex flex-col"
                  whileHover={{ 
                    borderColor: "rgba(251, 191, 36, 0.4)",
                    backgroundColor: "rgba(255, 255, 255, 0.08)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
                        style={{
                          left: `${20 + i * 20}%`,
                          top: `${30 + i * 15}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.3, 0.8, 0.3],
                          scale: [1, 1.5, 1]
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Badges */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-2">
                        {course.isPopular && (
                          <motion.span
                            className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            Popular
                          </motion.span>
                        )}
                        {course.isNew && (
                          <motion.span
                            className="bg-green-400 text-black px-3 py-1 rounded-full text-xs font-semibold"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                          >
                            New
                          </motion.span>
                        )}
                      </div>
                      <motion.div
                        className="flex items-center gap-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <span className="text-yellow-400">★</span>
                        <span className="text-white text-sm font-medium">{course.rating}</span>
                      </motion.div>
                    </div>

                    {/* Course Info */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        {/* Subheading */}
                        <motion.div
                          className="text-yellow-400 text-sm font-medium mb-2"
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          {course.subheading || `${course.category} • ${course.duration}`}
                        </motion.div>
                        
                        {/* Limited Seats Badge */}
                        {course.limitedSeats && (
                          <motion.div
                            className="mb-2"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.55 }}
                          >
                            <span className="inline-flex items-center gap-1 bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-semibold border border-red-500/30">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                              Limited Seats • Live Interactive Session
                            </span>
                          </motion.div>
                        )}
                        
                        {/* Discount Badge */}
                        {course.discount && (
                          <motion.div
                            className="mb-2"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.55 }}
                          >
                            <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-semibold border border-green-500/30">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              {course.discount}
                            </span>
                          </motion.div>
                        )}
                        
                        <motion.h3
                          className="text-lg font-bold text-white mb-3 line-clamp-3 min-h-[3.5rem]"
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          {course.title}
                        </motion.h3>
                        <motion.p
                          className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 min-h-[3.5rem]"
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                        >
                          {course.description}
                        </motion.p>

                        {/* Highlights */}
                        {course.highlights && course.highlights.length > 0 && (
                          <motion.div
                            className="mb-6"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                          >
                            <div className="space-y-2">
                              {course.highlights.slice(0, 3).map((highlight, highlightIndex) => (
                                <motion.div
                                  key={highlightIndex}
                                  className="flex items-start gap-2 text-xs text-gray-300"
                                  initial={{ x: -10, opacity: 0 }}
                                  whileInView={{ x: 0, opacity: 1 }}
                                  transition={{ duration: 0.3, delay: 0.9 + highlightIndex * 0.1 }}
                                >
                                  <svg className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                  <span className="leading-relaxed">{highlight}</span>
                                </motion.div>
                              ))}
                              {course.highlights.length > 3 && (
                                <motion.div
                                  className="text-yellow-400 text-xs font-medium"
                                  initial={{ opacity: 0 }}
                                  whileInView={{ opacity: 1 }}
                                  transition={{ duration: 0.3, delay: 1.2 }}
                                >
                                  +{course.highlights.length - 3} more highlights
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {/* Skills (fallback if no highlights) */}
                        {(!course.highlights || course.highlights.length === 0) && (
                          <motion.div
                            className="mb-6"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                          >
                            <div className="flex flex-wrap gap-2">
                              {course.skills.slice(0, 3).map((skill, skillIndex) => (
                                <motion.span
                                  key={skill}
                                  className="bg-white/10 text-white px-3 py-1 rounded-full text-xs"
                                  initial={{ scale: 0 }}
                                  whileInView={{ scale: 1 }}
                                  transition={{ duration: 0.3, delay: 0.9 + skillIndex * 0.1 }}
                                >
                                  {skill}
                                </motion.span>
                              ))}
                              {course.skills.length > 3 && (
                                <motion.span
                                  className="bg-white/10 text-white px-3 py-1 rounded-full text-xs"
                                  initial={{ scale: 0 }}
                                  whileInView={{ scale: 1 }}
                                  transition={{ duration: 0.3, delay: 1.2 }}
                                >
                                  +{course.skills.length - 3} more
                                </motion.span>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Stats and Price - Fixed at bottom */}
                      <div className="mt-auto">
                        <div className="flex justify-between items-center mb-4">
                          <motion.div
                            className="text-gray-400 text-sm"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1 }}
                          >
                            {course.learners.toLocaleString()}+ learners
                          </motion.div>
                          <motion.div
                            className="text-gray-400 text-sm"
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.1 }}
                          >
                            {course.university}
                          </motion.div>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <motion.div
                              className="text-2xl font-bold text-white"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ duration: 0.5, delay: 1.2 }}
                            >
                              ₹{course.price.toLocaleString('en-IN')}
                            </motion.div>
                            {course.originalPrice && (
                              <motion.div
                                className="text-gray-400 text-sm line-through"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.3 }}
                              >
                                ₹{course.originalPrice.toLocaleString('en-IN')}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons - Always at bottom */}
                    <div className={`mt-auto flex gap-3 ${course.buttons.secondary ? '' : 'flex-col'}`}>
                      {/* Primary Button */}
                      <motion.div
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative group ${course.buttons.secondary ? 'flex-1' : 'w-full'}`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-yellow-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                        <Button 
                          className="relative w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-xl py-2.5 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-yellow-400/20"
                          data-cursor-hover
                          onClick={() => {
                            if (course.id === 1) {
                              // Webinar course - link to booking page
                              window.location.href = '/book-webinar'
                            } else {
                              window.open(`/course-details/${course.id}`, '_blank')
                            }
                          }}
                        >
                          <motion.span
                            className="relative z-10 flex items-center justify-center gap-1"
                            whileHover={{ y: -0.5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {course.buttons.primary}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </motion.span>
                        </Button>
                      </motion.div>

                      {/* Secondary Button */}
                      {course.buttons.secondary && (
                        <motion.div
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative group flex-1"
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                          <Button 
                            className="relative w-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 rounded-xl py-2.5 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-white/40"
                            data-cursor-hover
                            onClick={() => {
                              if (course.buttons.secondary?.includes('Talk to Expert') || course.buttons.secondary?.includes('Expert')) {
                                window.open(`https://wa.me/919876543210?text=Hi, I'm interested in the ${course.title} course. Can you provide more details?`, '_blank')
                              } else if (course.buttons.secondary?.includes('Pay Now')) {
                                window.location.href = '/book-webinar'
                              } else {
                                window.open(`/course-details/${course.id}`, '_blank')
                              }
                            }}
                          >
                            <motion.span
                              className="relative z-10 flex items-center justify-center gap-1"
                              whileHover={{ y: -0.5 }}
                              transition={{ duration: 0.2 }}
                            >
                              {course.buttons.secondary}
                            </motion.span>
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        </motion.div>
    </div>
    </motion.section>
  )
}



