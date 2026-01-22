'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
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
  GraduationCap,
  Briefcase,
  TrendingUp
} from 'lucide-react'
import EnrollmentForm from './EnrollmentForm'

interface WeekData {
  week: number
  title: string
  goal: string
  modules: {
    title: string
    topics: string[]
    outcome: string
    deliverable?: string
  }[]
}

const courseData = {
  title: 'AI & Machine Learning – Career Foundation Program',
  offered: 'LeanMultiverse',
  duration: '1 Month (4 Weeks)',
  fee: 2499,
  originalFee: 4999,
  
  objectives: [
    'Clearly understand how AI and ML work',
    'Be able to explain AI concepts confidently',
    'Identify the right AI career path for themselves',
    'Understand industry-relevant AI roles',
    'Build and present a foundation-level AI project',
    'Know the exact next steps toward global certifications'
  ],
  
  targetAudience: [
    'Freshers from any educational background',
    'Non-technical professionals (MBA, HR, Sales, Marketing, Operations)',
    'IT professionals (Support, QA, Developers, Analysts)',
    'Career switchers exploring AI opportunities'
  ],
  
  notFor: [
    'Learners looking for hardcore programming',
    'Those seeking advanced mathematics',
    'Deep ML model building enthusiasts'
  ],
  
  valueStack: [
    'Structured foundation training with real-world context',
    'Clear understanding of AI without jargon or hype',
    'Career-focused learning (not theory-heavy)',
    'Personalized skill roadmap',
    'Foundation-level AI project (resume-ready)',
    'LeanMultiverse AI Career Foundation Certification',
    'Lifetime access to recordings and resources',
    'Clear upgrade path to global AI certifications'
  ],
  
  weeklyStructure: [
    {
      week: 1,
      title: 'AI FOUNDATIONS (CLARITY WEEK)',
      goal: 'Build absolute clarity around AI, remove fear, and establish strong fundamentals.',
      modules: [
        {
          title: 'MODULE 1: AI in the Real World',
          topics: [
            'Why Artificial Intelligence exists',
            'Problems AI is designed to solve',
            'Difference between rule-based software and AI systems',
            'Human intelligence vs machine intelligence',
            'Common myths around AI (job loss, super-intelligence, replacement fear)',
            'Realistic impact of AI on careers and industries',
            'Real-world applications: Google Search, Netflix, UPI fraud detection, Swiggy/Uber routing, ChatGPT'
          ],
          outcome: 'Learners can identify AI around them in daily life and stop seeing AI as complex or scary',
          deliverable: 'AI Around Me worksheet'
        },
        {
          title: 'MODULE 2: AI vs ML vs Data Science vs Automation',
          topics: [
            'What exactly Artificial Intelligence means',
            'What Machine Learning actually does',
            'What Data Science focuses on',
            'Where Generative AI fits',
            'Difference between Automation and AI',
            'Why many tools are marketed as AI but are not truly intelligent'
          ],
          outcome: 'Learners can confidently explain differences between AI, ML, and Data Science'
        },
        {
          title: 'MODULE 3: How AI Systems Work (No Math, No Code)',
          topics: [
            'What data is and why it matters',
            'Types of data: Text, Images, Audio, Numerical',
            'What an AI model is (conceptual understanding)',
            'What training means in AI',
            'Difference between training and prediction',
            'Understanding accuracy, bias, and errors conceptually'
          ],
          outcome: 'Learners understand what happens inside an AI system without seeing it as a black box'
        }
      ]
    },
    {
      week: 2,
      title: 'MACHINE LEARNING & GENERATIVE AI',
      goal: 'Understand how modern AI systems learn and generate content without technical complexity.',
      modules: [
        {
          title: 'MODULE 4: Types of Machine Learning',
          topics: [
            'Supervised Learning: Learning with labeled examples',
            'Unsupervised Learning: Pattern discovery and clustering',
            'Reinforcement Learning: Learning through rewards and penalties',
            'Mini case studies: Spam detection, Customer segmentation, Product recommendation'
          ],
          outcome: 'Learners understand where each ML type is used in industry'
        },
        {
          title: 'MODULE 5: Generative AI Deep Dive',
          topics: [
            'What Generative AI is and why it is revolutionary',
            'How tools like ChatGPT work (simplified explanation)',
            'Concepts of tokens, probability, and context',
            'Strengths and limitations of Generative AI',
            'Ethical considerations and misuse scenarios',
            'Live demonstrations: Text generation, Image generation'
          ],
          outcome: 'Learners understand GenAI capabilities and boundaries'
        },
        {
          title: 'MODULE 6: Prompt Engineering & No-Code AI',
          topics: [
            'What prompt engineering is and why prompts matter',
            'Prompt structure and best practices',
            'Good vs bad prompts',
            'Using AI tools without coding',
            'No-Code Tools: Notion AI, Zapier, Airtable AI, Canva AI',
            'Hands-on practice: Resume optimization, Marketing content, Data summarization'
          ],
          outcome: 'Learners can effectively use AI tools in real-world tasks'
        }
      ]
    },
    {
      week: 3,
      title: 'CAREERS, ROLES & SKILL MAPS',
      goal: 'Provide career direction, confidence, and realistic pathways.',
      modules: [
        {
          title: 'MODULE 7: Who Can Transition into AI',
          topics: [
            'AI opportunities for non-technical backgrounds',
            'AI paths for technical professionals',
            'Fresher-specific strategies',
            'Career switcher approaches',
            'Identifying transferable skills'
          ],
          outcome: 'Learners clearly see how their background fits into AI',
          deliverable: 'My AI Transition Map worksheet'
        },
        {
          title: 'MODULE 8: AI Job Roles (Industry Reality)',
          topics: [
            'AI Analyst: Day-to-day responsibilities, tools, skills, salary',
            'Data Analyst (AI-enabled): Responsibilities, tools, skills, salary',
            'Prompt Engineer: Responsibilities, tools, skills, salary',
            'AI Product Associate: Responsibilities, tools, skills, salary',
            'Business Analyst (AI-focused): Responsibilities, tools, skills, salary',
            'Entry-level ML Engineer: Responsibilities, tools, skills, salary'
          ],
          outcome: 'Learners shortlist realistic job roles'
        },
        {
          title: 'MODULE 9: Skill Roadmaps by Role',
          topics: [
            'Skill stacks for each AI role',
            'Tools to learn first',
            'Skills to avoid initially',
            'Learning timelines: 3-month, 6-month, 12-month plans'
          ],
          outcome: 'Each learner selects a primary career path'
        }
      ]
    },
    {
      week: 4,
      title: 'CERTIFICATIONS, PROJECT & CERTIFICATION',
      goal: 'Convert learning into credibility and proof of work.',
      modules: [
        {
          title: 'MODULE 10: Global AI Certification Roadmap',
          topics: [
            'Microsoft AI-900: Who should take, cost, difficulty, preparation time',
            'Microsoft DP-900: Details and preparation',
            'Microsoft PL-900: Details and preparation',
            'AWS AI Practitioner: Details and preparation',
            'Google Data & AI: Details and preparation',
            'IBM AI Engineer: Details and preparation',
            'Recommended certification order'
          ],
          outcome: 'Learners know exactly which certification to target next'
        },
        {
          title: 'MODULE 11: FOUNDATION PROJECT (MANDATORY)',
          topics: [
            'Project: AI-Powered Business/Career Use Case Design',
            'Problem statement creation',
            'Why AI is required for the problem',
            'Type of AI involved',
            'Data involved (conceptual)',
            'Expected outcomes',
            'Tools/platforms to be used',
            'Risks and limitations',
            'NO coding required - Focus on thinking like an AI professional'
          ],
          outcome: 'Demonstrate understanding through a real-world use case'
        },
        {
          title: 'MODULE 12: Assessment, Certification & Closure',
          topics: [
            'Conceptual MCQ-based evaluation',
            'Project review and presentation',
            'Feedback and improvement suggestions',
            'Certified AI Career Foundation – LeanMultiverse'
          ],
          outcome: 'Receive verifiable certification, resume & LinkedIn ready credential'
        }
      ]
    }
  ] as WeekData[]
}

export default function AiMlCourseClient() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null)
  const [showEnrollForm, setShowEnrollForm] = useState(false)

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
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 via-yellow-500/10 to-amber-600/10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">FLAGSHIP FOUNDATION COURSE</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              AI & Machine Learning
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500">
                Career Foundation Program
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Master AI fundamentals, discover your career path, and build real-world projects — No coding or mathematics required
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>{courseData.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <GraduationCap className="w-5 h-5 text-yellow-400" />
                <span>Offered by {courseData.offered}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>Certification Included</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl text-slate-400 line-through">₹{courseData.originalFee}</span>
                  <span className="text-5xl font-bold text-white flex items-center">
                    <IndianRupee className="w-8 h-8" />
                    {courseData.fee}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1">(Including GST)</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                onClick={scrollToEnroll}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-yellow-500 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                data-testid="enroll-now-hero-btn"
              >
                Enroll Now - ₹2,499
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-yellow-500/30 text-white rounded-lg font-semibold text-lg hover:bg-yellow-500/10 transition-all"
              >
                Download Curriculum
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Objectives */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Target className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">Course Objectives</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              By the end of this program, you will achieve these learning outcomes
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseData.objectives.map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6 hover:bg-yellow-500/5 transition-all"
              >
                <CheckCircle2 className="w-6 h-6 text-yellow-400 mb-3" />
                <p className="text-slate-200">{objective}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Who This Course Is For */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-500/10 to-yellow-500/10 border border-yellow-500/30 rounded-2xl p-8"
            >
              <Users className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-3xl font-bold text-white mb-6">Who This Course Is For</h3>
              <ul className="space-y-4">
                {courseData.targetAudience.map((audience, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <span className="text-slate-200">{audience}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Who This Course Is NOT For */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8"
            >
              <Brain className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-3xl font-bold text-white mb-6">This Course Is NOT For</h3>
              <ul className="space-y-4">
                {courseData.notFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-1 flex-shrink-0">
                      <span className="text-red-400 text-xs">✕</span>
                    </div>
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Stack */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Briefcase className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">What You Get</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Comprehensive learning package designed for your success
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseData.valueStack.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/40 transition-all"
              >
                <TrendingUp className="w-6 h-6 text-yellow-400 mb-3" />
                <p className="text-slate-200 text-sm">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Curriculum */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <BookOpen className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">Detailed Course Structure</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              4 weeks of comprehensive, practical, and career-focused AI learning
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {courseData.weeklyStructure.map((week) => (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-yellow-500/20 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleWeek(week.week)}
                  className="w-full p-6 flex items-center justify-between hover:bg-yellow-500/5 transition-all"
                  data-testid={`week-${week.week}-toggle`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {week.week}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">WEEK {week.week} — {week.title}</h3>
                      <p className="text-slate-400 text-sm">{week.goal}</p>
                    </div>
                  </div>
                  {expandedWeek === week.week ? (
                    <ChevronUp className="w-6 h-6 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                
                {expandedWeek === week.week && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-white/10"
                  >
                    <div className="p-6 space-y-6">
                      {week.modules.map((module, index) => (
                        <div key={index} className="bg-white/5 rounded-xl p-6">
                          <h4 className="text-lg font-bold text-yellow-400 mb-4">{module.title}</h4>
                          <ul className="space-y-2 mb-4">
                            {module.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="flex items-start gap-2 text-slate-300 text-sm">
                                <span className="text-yellow-400 mt-1">•</span>
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-2">
                            <p className="text-green-400 font-semibold text-sm mb-1">Outcome:</p>
                            <p className="text-slate-300 text-sm">{module.outcome}</p>
                          </div>
                          {module.deliverable && (
                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                              <p className="text-yellow-400 font-semibold text-sm mb-1">Deliverable:</p>
                              <p className="text-slate-300 text-sm">{module.deliverable}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">Certification Value</h2>
            <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">LeanMultiverse AI Career Foundation Certification</h3>
              <ul className="space-y-4 text-left max-w-2xl mx-auto">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-200">Verifiable credential</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-200">Resume & LinkedIn ready</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-200">Entry-level AI career credibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-200">Strong foundation for advanced certifications</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enrollment Section */}
      <section id="enroll-section" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your AI Journey?</h2>
            <p className="text-slate-300 text-lg mb-2">
              Enroll now and get lifetime access to all course materials
            </p>
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-white">
              <span className="text-slate-400 line-through">₹4,999</span>
              <span className="text-transparent bg-clip-text bg-yellow-400">
                ₹2,499 (Including GST)
              </span>
            </div>
          </motion.div>
          
          <EnrollmentForm />
        </div>
      </section>
    </div>
  )
}
