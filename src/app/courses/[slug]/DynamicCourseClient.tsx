'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Target,
  Users,
  Award,
  Clock,
  IndianRupee,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  TrendingUp,
  Calendar,
  Briefcase
} from 'lucide-react'
import { CareerStarterCourse } from '@/data/careerStarterCourses'
import GenericEnrollmentForm from './GenericEnrollmentForm'

interface DynamicCourseClientProps {
  course: CareerStarterCourse
}

export default function DynamicCourseClient({ course }: DynamicCourseClientProps) {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null)

  const toggleWeek = (weekNum: number) => {
    setExpandedWeek(expandedWeek === weekNum ? null : weekNum)
  }

  const scrollToEnroll = () => {
    const enrollSection = document.getElementById('enroll-section')
    if (enrollSection) {
      enrollSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero with course details */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 via-yellow-500/10 to-amber-600/10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">CAREER STARTER PROGRAM</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {course.shortTitle}
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">{course.goal[0]}</p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="w-5 h-5 text-yellow-400" />
                <span>{course.schedule}</span>
              </div>
            </div>
            
            <div className="flex items-baseline gap-2 justify-center mb-8">
              <span className="text-3xl text-slate-400 line-through">₹{course.originalPrice}</span>
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400">₹{course.price}</span>
            </div>
            
            <button onClick={scrollToEnroll} className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-black rounded-lg font-semibold text-lg">Enroll Now</button>
          </motion.div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Course Goals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.goal.map((goal, index) => (
              <div key={index} className="bg-white/5 border border-yellow-500/20 rounded-xl p-6">
                <CheckCircle2 className="w-6 h-6 text-yellow-400 mb-3" />
                <p className="text-slate-200">{goal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Structure */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Course Structure</h2>
          <div className="space-y-6">
            {course.weeklyStructure.map((week) => (
              <div key={week.week} className="bg-white/5 border border-yellow-500/20 rounded-2xl overflow-hidden">
                <button onClick={() => toggleWeek(week.week)} className="w-full p-6 flex items-center justify-between hover:bg-yellow-500/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center text-black font-bold">{week.week}</div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white">WEEK {week.week} — {week.title}</h3>
                      <p className="text-slate-400 text-sm">{week.goal}</p>
                    </div>
                  </div>
                  {expandedWeek === week.week ? <ChevronUp className="w-6 h-6 text-slate-400" /> : <ChevronDown className="w-6 h-6 text-slate-400" />}
                </button>
                {expandedWeek === week.week && (
                  <div className="p-6 space-y-6 border-t border-white/10">
                    {week.sessions.map((session, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-6">
                        <h4 className="text-lg font-bold text-yellow-400 mb-4">{session.title}</h4>
                        <ul className="space-y-2">
                          {session.topics.map((topic, j) => (
                            <li key={j} className="flex items-start gap-2 text-slate-300 text-sm">
                              <span className="text-yellow-400">•</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment */}
      <section id="enroll-section" className="py-20 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Enroll Now</h2>
          <GenericEnrollmentForm course={course} />
        </div>
      </section>
    </div>
  )
}
