'use client'

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function About() {
  const [activeTab, setActiveTab] = useState(0)
  
  const sectionRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(heroRef.current, 
        { y: 100, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
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

      // Mission section with stagger
      if (missionRef.current?.children) {
        gsap.fromTo(missionRef.current.children, 
          { y: 80, opacity: 0, rotationX: 15 },
          { 
            y: 0, 
            opacity: 1, 
            rotationX: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.2,
            delay: 0.3,
            scrollTrigger: {
              trigger: missionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Stats counter animation
      gsap.fromTo(statsRef.current, 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power3.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Tabs section
      gsap.fromTo(tabsRef.current, 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power3.out",
          delay: 0.7,
          scrollTrigger: {
            trigger: tabsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Content section
      gsap.fromTo(contentRef.current, 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power3.out",
          delay: 0.9,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // CTA section
      gsap.fromTo(ctaRef.current, 
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 1.1,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    { number: "50,000+", label: "Professionals Trained", icon: "👥" },
    { number: "50+", label: "Countries Served", icon: "🌍" },
    { number: "40%", label: "Productivity Increase", icon: "📈" },
    { number: "85%", label: "Career Promotions", icon: "🚀" }
  ]

  const tabs = [
    {
      id: 0,
      title: "Our Mission",
      content: {
        title: "Empowering Boundless Creation",
        subtitle: "Catalysts for Your Success",
        description: "We transform ambitious teams and professionals into industry leaders through innovative, impactful learning experiences that drive real-world results.",
        features: [
          "Transform careers with cutting-edge methodologies",
          "Bridge the gap between theory and practice",
          "Foster innovation and continuous improvement",
          "Build lasting professional networks"
        ]
      }
    },
    {
      id: 1,
      title: "Why Choose Us",
      content: {
        title: "Globally Recognized Excellence",
        subtitle: "Your Success is Our Mission",
        description: "Join thousands of professionals who've accelerated their success with our proven approach to enterprise agility and digital transformation.",
        features: [
          "Globally Accredited by PMI, Scrum Alliance, Kanban University",
          "40% higher productivity in 90 days across 50+ countries",
          "Real-world skills that you can apply immediately",
          "Personalized programs with expert coaching and ongoing support"
        ]
      }
    },
    {
      id: 2,
      title: "What We Deliver",
      content: {
        title: "Comprehensive Learning Solutions",
        subtitle: "Training That Transforms",
        description: "From individual career advancement to organizational transformation, we provide the expertise, credentials, and commitment to get you there.",
        features: [
          "Top Certification Programs: PMP, Scrum, Leadership, Agile, Lean, Kanban",
          "Strategic Training: Enterprise, C-suite, team acceleration, tech upskilling",
          "Measurable Impact: 85% get promotions, 30% salary boost, stronger networks",
          "Custom Solutions: Tailored programs for your specific needs"
        ]
      }
    }
  ]

  return (
    <motion.section 
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-yellow-400/3 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, 40, 0],
            y: [0, -40, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400/3 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <motion.div 
          ref={heroRef}
          className="text-center py-20 mb-16"
        >
          <motion.div
            className="inline-block mb-8"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 backdrop-blur-xl border border-yellow-400/30 rounded-full px-8 py-4">
              <p className="uppercase tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium">
                About Lean Multiverse
              </p>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            Empowering Boundless
            <br />
            <span className="text-yellow-400">Creation</span>
          </motion.h1>
          
          <motion.p 
            className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true }}
          >
            Catalysts for Your Success - Transforming ambitious teams and professionals 
            into industry leaders with innovative, impactful learning.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ y: 60, opacity: 0, scale: 0.9 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.1 * index,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div
                className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.div>
              <p className="text-gray-300 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Tabs Section */}
        <motion.div 
          ref={tabsRef}
          className="mb-20"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/25"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * tab.id }}
                viewport={{ once: true }}
              >
                {tab.title}
              </motion.button>
            ))}
          </div>

          <motion.div 
            ref={contentRef}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12"
            whileHover={{ 
              borderColor: "rgba(251, 191, 36, 0.4)",
              backgroundColor: "rgba(255, 255, 255, 0.08)"
            }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {tabs[activeTab].content.title}
                </motion.h3>
                
                <motion.p 
                  className="text-yellow-400 text-lg font-semibold mb-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {tabs[activeTab].content.subtitle}
                </motion.p>
                
                <motion.p 
                  className="text-gray-300 text-lg leading-relaxed mb-8"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {tabs[activeTab].content.description}
                </motion.p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tabs[activeTab].content.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                      <p className="text-gray-300">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          ref={ctaRef}
          className="text-center"
        >
          <motion.div
            className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-12 max-w-4xl mx-auto"
            whileHover={{ 
              borderColor: "rgba(251, 191, 36, 0.6)",
              backgroundColor: "rgba(251, 191, 36, 0.05)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Career?
            </motion.h3>
            
            <motion.p 
              className="text-gray-300 text-lg leading-relaxed mb-8"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Join thousands of professionals who&apos;ve already accelerated their success with Lean Multiverse. 
              Whether you&apos;re an individual looking to advance your career or an organization seeking competitive advantage, 
              we have the expertise, credentials, and commitment to get you there.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Our Courses
              </motion.button>
              <motion.button
                className="px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
 