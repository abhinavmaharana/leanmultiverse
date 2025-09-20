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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatePresence>
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                className="course-card group relative"
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
                  className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 h-[520px] overflow-hidden flex flex-col"
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
                        <motion.div
                          className="text-yellow-400 text-sm font-medium mb-2"
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          {course.category} • {course.duration}
                        </motion.div>
                        <motion.h3
                          className="text-lg font-bold text-white mb-3 line-clamp-2 min-h-[2.5rem]"
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

                        {/* Skills */}
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
                    <div className="mt-auto flex gap-3">
                      {/* Get More Details Button */}
                      <motion.div
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative group flex-1"
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
                          onClick={() => window.open(`/course-details/${course.id}`, '_blank')}
                        >
                          <motion.span
                            className="relative z-10 flex items-center justify-center gap-1"
                            whileHover={{ y: -0.5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="hidden sm:inline">Get More Details</span>
                            <span className="sm:hidden">Details</span>
                          </motion.span>
                        </Button>
                      </motion.div>

                      {/* Talk to Expert Button */}
                      <motion.div
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative group flex-1"
                      >
                        <motion.div
                          className="absolute inset-0 bg-orange-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                          className="relative w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600 rounded-xl py-2.5 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-400/20"
                          data-cursor-hover
                          onClick={() => window.open(`https://wa.me/919876543210?text=Hi, I'm interested in the ${course.title} course. Can you provide more details?`, '_blank')}
                        >
                          <motion.span
                            className="relative z-10 flex items-center justify-center gap-1"
                            whileHover={{ y: -0.5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                            </svg>
                            <span className="hidden sm:inline">Talk to Expert</span>
                            <span className="sm:hidden">Expert</span>
                          </motion.span>
                        </Button>
                      </motion.div>
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



