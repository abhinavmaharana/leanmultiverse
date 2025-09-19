// components/landing/Courses.tsx
"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// SAFe Course data
const courses = [
  {
    id: 1,
    title: "Leading SAFe®",
    shortTitle: "Leading SAFe",
    description: "Step confidently into a leadership role that transforms organizations. Become the driving force behind business agility and innovation.",
    category: "Leadership",
    duration: "2 Days",
    level: "Executive",
    rating: 4.9,
    learners: 1800,
    price: 24999,
    originalPrice: 34999,
    isPopular: true,
    isNew: false,
    skills: ["Lean-Agile Leadership", "PI Planning", "Strategic Alignment", "Business Agility", "Stakeholder Engagement"],
    university: "Lean Multiverse"
  },
  {
    id: 2,
    title: "SAFe® for Teams",
    shortTitle: "SAFe for Teams",
    description: "Become an essential part of an empowered Agile Release Train. Learn the teamwork skills that produce seamless, high-value delivery.",
    category: "Certification",
    duration: "2 Days",
    level: "Professional",
    rating: 4.7,
    learners: 1500,
    price: 22999,
    originalPrice: 32999,
    isPopular: true,
    isNew: false,
    skills: ["Team Collaboration", "Sprint Planning", "Agile Events", "Value Delivery", "Cross-team Communication"],
    university: "Lean Multiverse"
  },
  {
    id: 3,
    title: "SAFe® Scrum Master",
    shortTitle: "SAFe Scrum Master",
    description: "Unleash your servant leadership to enable teams to excel. Guide Agile ceremonies and clear impediments to boost team performance.",
    category: "Certification",
    duration: "2 Days",
    level: "Professional",
    rating: 4.6,
    learners: 1100,
    price: 24999,
    originalPrice: 34999,
    isPopular: false,
    isNew: false,
    skills: ["Servant Leadership", "Agile Events", "Obstacle Removal", "Team Collaboration", "Continuous Improvement"],
    university: "Lean Multiverse"
  },
  {
    id: 4,
    title: "SAFe® PO/PM",
    shortTitle: "SAFe PO/PM",
    description: "Take charge of product value delivery and customer satisfaction. Champion product vision and strategy with a Lean mindset.",
    category: "Certification",
    duration: "2 Days",
    level: "Professional",
    rating: 4.8,
    learners: 1300,
    price: 25999,
    originalPrice: 35999,
    isPopular: false,
    isNew: false,
    skills: ["Backlog Prioritization", "Product Vision", "Customer-centric Management", "Lean Economics", "Stakeholder Management"],
    university: "Lean Multiverse"
  },
  {
    id: 5,
    title: "SAFe® for DevOps",
    shortTitle: "SAFe DevOps",
    description: "Be the key to faster, reliable product releases. Bridge development and operations with streamlined workflows and automation.",
    category: "Certification",
    duration: "2 Days",
    level: "Professional",
    rating: 4.7,
    learners: 900,
    price: 26999,
    originalPrice: 36999,
    isPopular: false,
    isNew: false,
    skills: ["Continuous Delivery", "CI/CD Automation", "DevOps Collaboration", "Flow Optimization", "Quality Management"],
    university: "Lean Multiverse"
  },
  {
    id: 6,
    title: "SAFe® for Hardware",
    shortTitle: "SAFe Hardware",
    description: "Lead innovative physical product development with Agile principles. Balance speed, quality, and iterative feedback in complex environments.",
    category: "Certification",
    duration: "2 Days",
    level: "Professional",
    rating: 4.5,
    learners: 700,
    price: 27999,
    originalPrice: 37999,
    isPopular: false,
    isNew: false,
    skills: ["Hardware-Software Integration", "Rapid Prototyping", "Quality Management", "Continuous Improvement", "Customer-aligned Delivery"],
    university: "Lean Multiverse"
  },
  {
    id: 7,
    title: "Agile Software Engineering",
    shortTitle: "Agile Engineering",
    description: "Elevate your technical skills for robust Agile software delivery. Build quality and scalability into every step of the development lifecycle.",
    category: "Certification",
    duration: "3 Days",
    level: "Professional",
    rating: 4.8,
    learners: 1200,
    price: 29999,
    originalPrice: 39999,
    isPopular: false,
    isNew: false,
    skills: ["Continuous Integration", "TDD", "Automated Testing", "Scalable Architecture", "Agile Engineering"],
    university: "Lean Multiverse"
  },
  {
    id: 8,
    title: "SAFe® for Architects",
    shortTitle: "SAFe Architects",
    description: "Lead with vision to drive technical excellence and business value. Shape architecture that supports continuous delivery and innovation at scale.",
    category: "Leadership",
    duration: "3 Days",
    level: "Executive",
    rating: 4.9,
    learners: 800,
    price: 34999,
    originalPrice: 44999,
    isPopular: false,
    isNew: false,
    skills: ["Agile Architecture", "Solution Architecture", "Technical Strategy", "Roadmap Planning", "Cross-team Collaboration"],
    university: "Lean Multiverse"
  },
  {
    id: 9,
    title: "Lean Portfolio Management",
    shortTitle: "Lean Portfolio",
    description: "Take control of strategic investment and execution. Manage portfolios with Lean practices that focus on value and business outcomes.",
    category: "Strategy",
    duration: "3 Days",
    level: "Executive",
    rating: 4.8,
    learners: 600,
    price: 32999,
    originalPrice: 42999,
    isPopular: false,
    isNew: false,
    skills: ["Lean Budgeting", "Portfolio Kanban", "Strategy Alignment", "Performance Metrics", "Agile Portfolio Operations"],
    university: "Lean Multiverse"
  },
  {
    id: 10,
    title: "Agile Product Management",
    shortTitle: "Agile Product",
    description: "Become a champion of innovation and market success. Master techniques to build products users love and that drive business growth.",
    category: "Certification",
    duration: "2 Days",
    level: "Professional",
    rating: 4.7,
    learners: 1400,
    price: 24999,
    originalPrice: 34999,
    isPopular: false,
    isNew: false,
    skills: ["Customer Insight", "Design Thinking", "Product Strategy", "MVP Development", "Stakeholder Collaboration"],
    university: "Lean Multiverse"
  },
  {
    id: 11,
    title: "Implementing SAFe®",
    shortTitle: "Implementing SAFe",
    description: "Be the trusted guide for enterprise Agile transformations. Build skills to launch Agile Release Trains and coach leaders and teams through change.",
    category: "Leadership",
    duration: "3 Days",
    level: "Executive",
    rating: 4.9,
    learners: 500,
    price: 37999,
    originalPrice: 47999,
    isPopular: false,
    isNew: false,
    skills: ["SAFe Transformation", "ART Launching", "Change Management", "Coaching Skills", "Agile Adoption"],
    university: "Lean Multiverse"
  }
]

const categories = ["All", "Certification", "Leadership", "Strategy"]
const levels = ["All", "Professional", "Executive"]

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

                    {/* Enroll Button - Always at bottom */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group mt-auto"
                    >
                      <motion.div
                        className="absolute inset-0 bg-yellow-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                        className="relative w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-2xl py-3 text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 border border-yellow-400/20"
                        data-cursor-hover
                      >
                        <motion.span
                          className="relative z-10"
                          whileHover={{ y: -1 }}
                          transition={{ duration: 0.2 }}
                        >
                          Enroll Now
                        </motion.span>
                      </Button>
                    </motion.div>
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



