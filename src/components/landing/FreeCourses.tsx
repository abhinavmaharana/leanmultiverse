"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useShouldAnimate } from "@/hooks/useShouldAnimate"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface FreeCourse {
  id: string
  title: string
  duration: string
  learners: number
  rating: number
  image: string
  skills: string[]
  description: string
  isNew?: boolean
}

const freeCourses: FreeCourse[] = [
  {
    id: "1",
    title: "Introduction to Enterprise Agility",
    duration: "2 Hours",
    learners: 15000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    skills: ["Agile Fundamentals", "Scrum Basics", "Team Collaboration"],
    description: "Learn the fundamentals of enterprise agility and how it transforms organizations.",
    isNew: true
  },
  {
    id: "2",
    title: "Digital Transformation Essentials",
    duration: "3 Hours",
    learners: 12000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    skills: ["Digital Strategy", "Technology Trends", "Change Management"],
    description: "Understand the key principles of digital transformation in modern enterprises."
  },
  {
    id: "3",
    title: "Lean Six Sigma Basics",
    duration: "4 Hours",
    learners: 18000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop",
    skills: ["Process Improvement", "Quality Management", "Data Analysis"],
    description: "Master the basics of Lean Six Sigma methodology for process improvement."
  },
  {
    id: "4",
    title: "Agile Project Management",
    duration: "2.5 Hours",
    learners: 14000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop",
    skills: ["Project Management", "Scrum Master", "Team Leadership"],
    description: "Learn agile project management techniques for modern teams."
  },
  {
    id: "5",
    title: "Leadership in Digital Age",
    duration: "3.5 Hours",
    learners: 11000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    skills: ["Digital Leadership", "Team Building", "Strategic Thinking"],
    description: "Develop leadership skills for the digital transformation era."
  },
  {
    id: "6",
    title: "Data-Driven Decision Making",
    duration: "2 Hours",
    learners: 16000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    skills: ["Data Analysis", "Business Intelligence", "Decision Making"],
    description: "Learn to make informed decisions using data and analytics."
  }
]

export default function FreeCourses() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const shouldAnimate = useShouldAnimate()

  useEffect(() => {
    if (typeof window === 'undefined' || !shouldAnimate) return

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current, 
        { y: 80, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Course cards staggered animation
      gsap.fromTo(".course-card", 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
            once: true // Only animate once to prevent glitches
          }
        }
      )

      // CTA section animation
      gsap.fromTo(ctaRef.current, 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            once: true // Only animate once to prevent glitches
          }
        }
      )


    }, sectionRef)

    return () => ctx.revert()
  }, [shouldAnimate])

  return (
    <section ref={sectionRef} className="relative py-20 min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-20"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
          >
            <span className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-full text-sm sm:text-base font-bold uppercase tracking-wider shadow-lg">
              🎓 Free Learning
            </span>
          </motion.div>

          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="block">Start Learning</span>
            <span className="block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              For Free
            </span>
          </motion.h2>

          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Explore our collection of premium-quality free courses and get a taste of our world-class 
            education. No commitment required - start learning today!
          </motion.p>
        </motion.div>

        {/* Course Grid */}
        <motion.div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {freeCourses.map((course, index) => (
            <motion.div
              key={course.id}
              className="course-card group"
              initial={{ y: 100, opacity: 0, scale: 0.8 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-yellow-500/10 h-full">
                <div className="relative overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={400}
                    height={250}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <motion.span 
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      FREE
                    </motion.span>
                    {course.isNew && (
                      <motion.span 
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        New
                      </motion.span>
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full">
                    <span className="text-yellow-400 text-sm font-bold flex items-center gap-1">
                      <span>★</span> {course.rating}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  {/* Duration */}
                  <div className="mb-4">
                    <span className="text-yellow-400 text-sm font-semibold bg-yellow-400/10 px-3 py-1 rounded-full">
                      {course.duration}
                    </span>
                    <span className="text-gray-400 text-sm ml-2">• Free Course</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm sm:text-base mb-6 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {course.skills.slice(0, 3).map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          className="bg-white/10 text-white text-xs px-3 py-1 rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-300"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                      {course.skills.length > 3 && (
                        <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full border border-white/20">
                          +{course.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Learners Count */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-sm text-gray-400">
                      <svg className="w-4 h-4 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">{course.learners.toLocaleString()}+ learners</span>
                    </div>
                  </div>

                  {/* Enroll Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 rounded-2xl font-bold py-3 text-base shadow-lg hover:shadow-yellow-500/25 transition-all duration-300">
                      Enroll for Free
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          ref={ctaRef}
          className="text-center bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/10"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h3 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready for More Advanced Learning?
          </motion.h3>
          
          <motion.p 
            className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore our comprehensive paid programs for deeper learning and 
            industry-recognized certifications.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 rounded-2xl px-8 py-4 text-lg font-bold shadow-xl hover:shadow-yellow-500/25 transition-all duration-300">
                View All Courses
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-white/10 text-white hover:bg-white/20 rounded-2xl px-8 py-4 text-lg font-semibold border border-white/20 backdrop-blur-md transition-all duration-300">
                Get Career Guidance
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
