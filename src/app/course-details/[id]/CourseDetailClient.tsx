"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Course } from '@/data/courses'
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface CourseDetailClientProps {
  course: Course
}

export default function CourseDetailClient({ course }: CourseDetailClientProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Simple GSAP animations without ScrollTrigger conflicts
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(heroRef.current, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power2.out",
          delay: 0.2
        }
      )

      // Content animation
      gsap.fromTo(contentRef.current, 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: "power2.out",
          delay: 0.4
        }
      )

      // Skills animation
      gsap.fromTo(skillsRef.current, 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          ease: "power2.out",
          delay: 0.6
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleBackClick = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="relative pt-20">
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
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-400/3 rounded-full blur-3xl"
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

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={handleBackClick}
              className="text-white hover:text-yellow-400 hover:bg-white/10 p-4 rounded-xl transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Courses
            </Button>
          </div>

          {/* Hero Section */}
          <div 
            ref={heroRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center"
          >
            {/* Left Side - Course Info */}
            <div className="space-y-6">
              <div className="flex gap-4">
                {course.isPopular && (
                  <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
                    Popular
                  </span>
                )}
                {course.isNew && (
                  <span className="bg-green-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
                    New
                  </span>
                )}
              </div>

              <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-xl border border-yellow-400/30 rounded-full px-6 py-3 inline-block">
                <p className="uppercase tracking-[4px] text-yellow-400 text-sm font-medium">
                  {course.category} • {course.duration}
                </p>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {course.title}
              </h1>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                {course.description}
              </p>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="text-white text-lg font-medium">{course.rating}</span>
                </div>
                <div className="text-gray-300">
                  {course.learners.toLocaleString()}+ learners
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-white">
                  ₹{course.price.toLocaleString('en-IN')}
                </div>
                {course.originalPrice && (
                  <div className="text-gray-400 text-lg line-through">
                    ₹{course.originalPrice.toLocaleString('en-IN')}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleBackClick}
                  variant="outline"
                  className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400 px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 flex-1"
                >
                  View All Courses
                </Button>
              </div>
            </div>

            {/* Right Side - Course Stats */}
            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Course Highlights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Duration</span>
                    <span className="text-white font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Level</span>
                    <span className="text-white font-semibold">{course.level}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Rating</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-white font-semibold">{course.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Learners</span>
                    <span className="text-white font-semibold">{course.learners.toLocaleString()}+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Provider</span>
                    <span className="text-white font-semibold">{course.university}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Skills Section */}
          <div 
            ref={skillsRef}
            className="mb-16"
          >
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <CardHeader>
                <CardTitle className="text-3xl text-white mb-6">Skills You&apos;ll Master</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {course.skills.map((skill) => (
                    <Badge 
                      key={skill}
                      variant="secondary"
                      className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-white hover:from-yellow-400/30 hover:to-orange-400/30 px-6 py-3 text-base font-medium rounded-full border border-yellow-400/30 transition-all duration-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Details Section */}
          <div 
            ref={contentRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          >
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <CardHeader>
                <CardTitle className="text-2xl text-white mb-6">What You&apos;ll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  {course.description}
                </p>
                {course.highlights && course.highlights.length > 0 ? (
                  <div className="mt-6 space-y-4">
                    {course.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-gray-300 text-sm leading-relaxed">{highlight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-yellow-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Interactive Learning</h4>
                        <p className="text-gray-300 text-sm">Hands-on exercises and real-world scenarios</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-yellow-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Expert Instructors</h4>
                        <p className="text-gray-300 text-sm">Learn from industry professionals with years of experience</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-yellow-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Certification</h4>
                        <p className="text-gray-300 text-sm">Receive industry-recognized certification upon completion</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <CardHeader>
                <CardTitle className="text-2xl text-white mb-6">Course Format</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-300">Duration</span>
                    <span className="text-white font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-300">Level</span>
                    <span className="text-white font-semibold">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-300">Format</span>
                    <span className="text-white font-semibold">Live Sessions</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-300">Access</span>
                    <span className="text-white font-semibold">Lifetime</span>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/20">
                  <h4 className="text-white font-semibold mb-3">What&apos;s Included</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Course materials and resources
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Interactive exercises and assessments
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Digital certificate of completion
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Post-course support and community access
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Final CTA Section */}
          <div className="text-center mb-16">
            <Card className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-12">
              <CardContent className="space-y-8">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Career?
                </h2>
                <p className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto">
                  Join thousands of professionals who have already advanced their careers with this comprehensive course. 
                  Start your journey towards becoming an industry expert today.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
                  <Button
                    onClick={handleBackClick}
                    variant="outline"
                    className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex-1"
                  >
                    View All Courses
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
