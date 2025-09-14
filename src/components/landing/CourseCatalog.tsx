"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface Course {
  id: string
  title: string
  category: string
  duration: string
  level: string
  price: string
  originalPrice?: string
  rating: number
  learners: number
  image: string
  skills: string[]
  university: string
  description: string
  isPopular?: boolean
  isNew?: boolean
}

const courses: Course[] = [
  {
    id: "1",
    title: "Master of Business Administration in Enterprise Agility",
    category: "MBA",
    duration: "18 Months",
    level: "Graduate",
    price: "$12,999",
    originalPrice: "$15,999",
    rating: 4.8,
    learners: 2500,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    skills: ["Agile Leadership", "Strategic Management", "Digital Transformation", "Change Management"],
    university: "Lean Multiverse University",
    description: "Comprehensive MBA program focused on enterprise agility, digital transformation, and modern leadership practices.",
    isPopular: true
  },
  {
    id: "2",
    title: "Executive Diploma in Agile Project Management",
    category: "Management",
    duration: "12 Months",
    level: "Professional",
    price: "$8,999",
    rating: 4.7,
    learners: 1800,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    skills: ["Scrum Master", "Kanban", "SAFe", "Project Leadership"],
    university: "Lean Multiverse University",
    description: "Advanced project management techniques for agile environments and digital transformation initiatives."
  },
  {
    id: "3",
    title: "Certified Enterprise Agility Coach",
    category: "Certification",
    duration: "6 Months",
    level: "Professional",
    price: "$4,999",
    rating: 4.9,
    learners: 1200,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
    skills: ["Agile Coaching", "Team Facilitation", "Organizational Change", "Leadership Development"],
    university: "Lean Multiverse University",
    description: "Become a certified enterprise agility coach and help organizations transform their ways of working.",
    isNew: true
  },
  {
    id: "4",
    title: "Digital Transformation Strategy",
    category: "Strategy",
    duration: "9 Months",
    level: "Executive",
    price: "$6,999",
    rating: 4.6,
    learners: 950,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    skills: ["Digital Strategy", "Technology Integration", "Change Management", "Innovation"],
    university: "Lean Multiverse University",
    description: "Strategic approach to digital transformation in modern enterprises."
  },
  {
    id: "5",
    title: "Lean Six Sigma Black Belt",
    category: "Certification",
    duration: "8 Months",
    level: "Professional",
    price: "$5,999",
    rating: 4.8,
    learners: 2100,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop",
    skills: ["Process Improvement", "Statistical Analysis", "Lean Methodology", "Quality Management"],
    university: "Lean Multiverse University",
    description: "Master lean six sigma methodologies for process improvement and operational excellence."
  },
  {
    id: "6",
    title: "Executive Leadership in Agile Organizations",
    category: "Leadership",
    duration: "10 Months",
    level: "Executive",
    price: "$9,999",
    rating: 4.7,
    learners: 750,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    skills: ["Agile Leadership", "Team Building", "Strategic Thinking", "Change Leadership"],
    university: "Lean Multiverse University",
    description: "Develop leadership skills for agile and adaptive organizations."
  }
]

const categories = ["All", "MBA", "Management", "Certification", "Strategy", "Leadership"]
const levels = ["All", "Graduate", "Professional", "Executive"]

export default function CourseCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
      const matchesLevel = selectedLevel === "All" || course.level === selectedLevel
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      
      return matchesCategory && matchesLevel && matchesSearch
    })
  }, [selectedCategory, selectedLevel, searchQuery])

  return (
    <section className="py-20 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="uppercase tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium mb-3">
            Comprehensive Learning
          </p>
          <h1 className="text-[30px] md:text-[46.13px] font-bold mb-6 text-white">
            Master Enterprise Agility
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Transform your career with our comprehensive courses in enterprise agility, 
            digital transformation, and modern leadership practices.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search courses, skills, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              <span className="text-white font-medium mr-2">Categories:</span>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-6 py-2 ${
                    selectedCategory === category
                      ? "bg-yellow-400 text-black hover:bg-yellow-500"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-white font-medium mr-2">Level:</span>
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  onClick={() => setSelectedLevel(level)}
                  className={`rounded-full px-6 py-2 ${
                    selectedLevel === level
                      ? "bg-yellow-400 text-black hover:bg-yellow-500"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  }`}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group">
              <div className="relative">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {course.isPopular && (
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </span>
                  )}
                  {course.isNew && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      New
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-yellow-400 text-sm font-semibold">★ {course.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3">
                  <span className="text-yellow-400 text-sm font-medium">{course.category}</span>
                  <span className="text-gray-400 text-sm ml-2">• {course.duration}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {course.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-white/10 text-white text-xs px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {course.skills.length > 3 && (
                      <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">
                        +{course.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.learners.toLocaleString()}+ learners
                  </div>
                  <div className="text-sm text-gray-400">
                    {course.university}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">{course.price}</span>
                    {course.originalPrice && (
                      <span className="text-gray-400 line-through text-lg">{course.originalPrice}</span>
                    )}
                  </div>
                  <Button className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-full px-6 py-2 font-semibold">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No courses found matching your criteria.</p>
            <Button
              onClick={() => {
                setSelectedCategory("All")
                setSelectedLevel("All")
                setSearchQuery("")
              }}
              className="mt-4 bg-yellow-400 text-black hover:bg-yellow-500 rounded-full px-6 py-2"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
