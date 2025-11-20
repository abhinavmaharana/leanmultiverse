// components/landing/Courses.tsx
"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { courses, categories, levels, targetAudiences } from "@/data/courses"
import ContactFormModal from "@/components/ui/ContactFormModal"

const TALK_TO_EXPERT_DISPLAY = "080 6217 7938"
const TALK_TO_EXPERT_TEL = "+918062177938"

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [selectedTargetAudience, setSelectedTargetAudience] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      // Temporarily hide the webinar card until further notice.
      if (course.id === 1) {
        return false
      }
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
      const matchesLevel = selectedLevel === "All" || course.level === selectedLevel
      const matchesTargetAudience = selectedTargetAudience === "All" || 
        (selectedTargetAudience === "Freshers" && course.targetAudience === "freshers") ||
        (selectedTargetAudience === "Working Professional" && course.targetAudience === "working-professional") ||
        (selectedTargetAudience === "Everyone" && course.targetAudience === "everyone")
      const query = searchQuery.trim().toLowerCase()
      const matchesSearch = query === "" || 
        course.title.toLowerCase().includes(query) ||
        course.skills.some(skill => skill.toLowerCase().includes(query))
      return matchesCategory && matchesLevel && matchesTargetAudience && matchesSearch
    })
  }, [selectedCategory, selectedLevel, selectedTargetAudience, searchQuery])

  const handleTalkToExpert = (courseId: number) => {
    setSelectedCourse(courseId)
    setIsContactFormOpen(true)
  }

  const handleFormSubmit = () => {
    // After form submission, redirect to phone call
    setTimeout(() => {
      window.location.href = `tel:${TALK_TO_EXPERT_TEL}`
    }, 500)
    setIsContactFormOpen(false)
    setSelectedCourse(null)
  }

  return (
    <section className="relative py-20 bg-black min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Modern Course Catalog Section */}
        <div className="mt-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 backdrop-blur-xl border border-yellow-400/30 rounded-full px-8 py-4">
                <p className="uppercase tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium">
                  Elevate Your Expertise
                </p>
              </div>
            </div>
            
            <h2 className="text-[30px] md:text-[46.13px] lg:text-[56px] font-bold mb-8 text-white">
              Training That Transforms
            </h2>
            
            <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
              Step confidently into leadership roles that transform organizations. 
              Become the driving force behind business agility and innovation.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-10 flex flex-col gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses, skills, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 focus:bg-white/15 transition-all duration-300"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <p className="text-center text-sm text-gray-400">
              All prices shown below are inclusive of GST.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-6 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-4">Categories:</h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-yellow-400 text-black"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                      data-cursor-hover
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Level:</h3>
                <div className="flex flex-wrap gap-3">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedLevel === level
                          ? "bg-yellow-400 text-black"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                      data-cursor-hover
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Target Audience:</h3>
                <div className="flex flex-wrap gap-3">
                  {targetAudiences.map((audience) => (
                    <button
                      key={audience}
                      onClick={() => setSelectedTargetAudience(audience)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedTargetAudience === audience
                          ? "bg-yellow-400 text-black"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                      data-cursor-hover
                    >
                      {audience}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="course-card group relative h-full flex"
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-400" />

                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 h-full w-full overflow-hidden flex flex-col group-hover:border-yellow-400/40 group-hover:bg-white/8 transition-all duration-300">
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Badges */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-2">
                        {course.isPopular && (
                          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold">
                            Popular
                          </span>
                        )}
                        {course.isNew && (
                          <span className="bg-green-400 text-black px-3 py-1 rounded-full text-xs font-semibold">
                            New
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="text-yellow-400 text-sm font-medium mb-2">
                          {course.subheading || `${course.category} • ${course.duration}`}
                        </div>

                        {course.limitedSeats && (
                          <div className="mb-2">
                            <span className="inline-flex items-center gap-1 bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-semibold border border-red-500/30">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                              Limited Seats • Live Interactive Session
                            </span>
                          </div>
                        )}

                        {course.discount && (
                          <div className="mb-2">
                            <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-semibold border border-green-500/30">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              {course.discount}
                            </span>
                          </div>
                        )}

                        <h3 className="text-lg font-bold text-white mb-3 line-clamp-3 min-h-[3.5rem]">
                          {course.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 min-h-[3.5rem]">
                          {course.description}
                        </p>

                        {course.highlights && course.highlights.length > 0 && (
                          <div className="mb-6">
                            <div className="space-y-2">
                              {course.highlights.slice(0, 3).map((highlight, highlightIndex) => (
                                <div
                                  key={highlightIndex}
                                  className="flex items-start gap-2 text-xs text-gray-300"
                                >
                                  <svg className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                  <span className="leading-relaxed">{highlight}</span>
                                </div>
                              ))}
                              {course.highlights.length > 3 && (
                                <div className="text-yellow-400 text-xs font-medium">
                                  +{course.highlights.length - 3} more highlights
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {(!course.highlights || course.highlights.length === 0) && (
                          <div className="mb-6">
                            <div className="flex flex-wrap gap-2">
                              {course.skills.slice(0, 3).map((skill) => (
                                <span
                                  key={skill}
                                  className="bg-white/10 text-white px-3 py-1 rounded-full text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                              {course.skills.length > 3 && (
                                <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs">
                                  +{course.skills.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-auto">
                        <div className="flex justify-between items-center mb-4">
                          {course.learners > 0 && (
                            <div className="text-gray-400 text-sm">
                              {course.learners.toLocaleString()}+ learners
                            </div>
                          )}
                          <div className="text-gray-400 text-sm">
                            {course.university}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <div className="text-2xl font-bold text-white">
                              ₹{course.price.toLocaleString('en-IN')}
                            </div>
                            {course.originalPrice && (
                              <div className="text-gray-400 text-sm line-through">
                                ₹{course.originalPrice.toLocaleString('en-IN')}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`mt-auto flex gap-3 ${course.buttons.secondary ? '' : 'flex-col'}`}>
                      <div className={`relative group ${course.buttons.secondary ? 'flex-1' : 'w-full'}`}>
                        <div className="absolute inset-0 bg-yellow-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Button
                          className={`relative w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-300 border border-yellow-400/20 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 shadow-lg hover:shadow-xl`}
                          data-cursor-hover
                          onClick={() => {
                            window.open(`/course-details/${course.id}`, '_blank')
                          }}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-1">
                            {course.buttons.primary}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </span>
                        </Button>
                      </div>

                      {course.buttons.secondary && (
                        <div className="relative group flex-1">
                          <div className="absolute inset-0 bg-white/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <Button 
                            className={`relative w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-300 border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 shadow-lg hover:shadow-xl hover:border-white/40`}
                            data-cursor-hover
                            onClick={() => {
                              if (course.buttons.secondary?.includes('Talk to Expert') || course.buttons.secondary?.includes('Expert') || course.buttons.secondary?.includes('Contact us')) {
                                handleTalkToExpert(course.id)
                              } else {
                                window.open(`/course-details/${course.id}`, '_blank')
                              }
                            }}
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              {course.buttons.secondary}
                            </span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isContactFormOpen}
        onClose={() => {
          setIsContactFormOpen(false)
          setSelectedCourse(null)
        }}
        onSubmit={handleFormSubmit}
        source={selectedCourse ? `course-${selectedCourse}` : "courses-page"}
      />
    </section>
  )
}
