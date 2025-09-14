"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

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
  return (
    <section className="py-20 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium mb-3">
            Free Learning
          </p>
          <h2 className="text-[30px] md:text-[46.13px] font-bold mb-6 text-white">
            Start Learning for Free
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Explore our collection of free courses and get a taste of our world-class 
            education. No commitment required - start learning today!
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {freeCourses.map((course) => (
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
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    FREE
                  </span>
                  {course.isNew && (
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
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
                  <span className="text-yellow-400 text-sm font-medium">{course.duration}</span>
                  <span className="text-gray-400 text-sm ml-2">• Free Course</span>
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
                </div>

                <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 rounded-full font-semibold">
                  Enroll for Free
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready for More Advanced Learning?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore our comprehensive paid programs for deeper learning and 
            industry-recognized certifications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-full px-8 py-3 text-lg font-semibold">
              View All Courses
            </Button>
            <Button className="bg-white/10 text-white hover:bg-white/20 rounded-full px-8 py-3 text-lg font-semibold border border-white/20">
              Get Career Guidance
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
