"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useShouldAnimate } from "@/hooks/useShouldAnimate"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const BUSINESS_PHONE_DISPLAY = "080 6217 7938"
const BUSINESS_PHONE_E164 = "+918062177938"

const contactMethods = [
  {
    id: "whatsapp",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
      </svg>
    ),
    title: "WhatsApp Chat",
    description: "Quick support via WhatsApp",
    contact: BUSINESS_PHONE_DISPLAY,
    hours: "Available 24/7",
    action: "Chat on WhatsApp",
    gradient: "from-yellow-400/80 to-yellow-600/80",
    bgGradient: "from-yellow-400/10 to-yellow-600/10"
  },
  {
    id: "phone",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h1.28a2 2 0 011.94 1.515l.62 2.48a2 2 0 01-.72 2.07l-.92.77a16.001 16.001 0 007.18 7.18l.77-.92a2 2 0 012.07-.72l2.48.62A2 2 0 0121 17.72V19a2 2 0 01-2 2h-1C10.163 21 3 13.837 3 4V5z" />
      </svg>
    ),
    title: "Call Our Team",
    description: "Speak directly with a course advisor",
    contact: BUSINESS_PHONE_DISPLAY,
    hours: "Available 9 AM – 9 PM IST",
    action: "Call Now",
    gradient: "from-yellow-500/80 to-yellow-600/80",
    bgGradient: "from-yellow-500/10 to-yellow-600/10"
  }
]

export default function ContactSupport() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const shouldAnimate = useShouldAnimate()
  
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

const handleContactAction = (action: string) => {
    if (action === "Chat on WhatsApp") {
    const phoneNumber = BUSINESS_PHONE_E164.replace('+', '')
      const message = "Hi! I'm interested in learning more about your courses."
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      window.open(url, '_blank')
  } else if (action === "Call Now") {
    window.location.href = `tel:${BUSINESS_PHONE_E164}`
    } else if (action === "Start Chat") {
      // This will trigger the chat widget
      const chatButton = document.querySelector('[data-chat-button]') as HTMLElement
      if (chatButton) {
        chatButton.click()
      }
    }
  }

  // GSAP Animations
  useEffect(() => {
    if (typeof window === 'undefined' || !shouldAnimate) return

    const ctx = gsap.context(() => {
      // Create floating particles
      if (particlesRef.current) {
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div')
          particle.className = 'absolute w-1 h-1 bg-yellow-400/30 rounded-full'
          particle.style.left = Math.random() * 100 + '%'
          particle.style.top = Math.random() * 100 + '%'
          particlesRef.current.appendChild(particle)
        }

        // Animate particles
        gsap.to(particlesRef.current.children, {
          y: -20,
          x: () => Math.random() * 40 - 20,
          opacity: () => Math.random() * 0.5 + 0.2,
          duration: () => Math.random() * 3 + 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.1
        })
      }

      // Enhanced header animation with text reveal
      const titleElement = headerRef.current?.querySelector('.support-title')
      if (titleElement) {
        gsap.fromTo(titleElement, 
          { y: 50, opacity: 0, rotationX: 90 },
          { 
            y: 0, 
            opacity: 1, 
            rotationX: 0,
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
      }

      const descriptionElement = headerRef.current?.querySelector('.support-description')
      if (descriptionElement) {
        gsap.fromTo(descriptionElement, 
          { y: 30, opacity: 0, scale: 0.9 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Enhanced cards animation with 3D effects
      if (cardsRef.current?.children) {
        gsap.fromTo(cardsRef.current.children, 
          { y: 150, opacity: 0, scale: 0.7, rotationY: 45 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            rotationY: 0,
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.4,
            delay: 0.6,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )

        // Add hover animations for cards
        Array.from(cardsRef.current.children).forEach((card: Element) => {
          const cardElement = card as HTMLElement
          
          cardElement.addEventListener('mouseenter', () => {
            gsap.to(cardElement, {
              scale: 1.05,
              y: -10,
              rotationY: 5,
              duration: 0.4,
              ease: "power2.out"
            })
          })

          cardElement.addEventListener('mouseleave', () => {
            gsap.to(cardElement, {
              scale: 1,
              y: 0,
              rotationY: 0,
              duration: 0.4,
              ease: "power2.out"
            })
          })
        })
      }

      // Enhanced CTA section with wave animation
      gsap.fromTo(ctaRef.current, 
        { y: 100, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          delay: 1.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Floating animation for icons with more dynamic movement
      gsap.to(".contact-icon", {
        y: -15,
        rotation: 5,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          amount: 1.5,
          from: "random"
        }
      })

      // Pulsing glow effect for buttons
      gsap.to(".contact-button", {
        boxShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      })

    }, sectionRef)

    const currentParticles = particlesRef.current

    return () => {
      ctx.revert()
      if (currentParticles) {
        currentParticles.innerHTML = ''
      }
    }
  }, [shouldAnimate])

  return (
    <motion.section 
      ref={sectionRef}
      className="py-20 bg-black relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none" />
      
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
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400/4 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 30, 0],
            y: [0, -50, 0]
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
        {/* Enhanced Header */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-12"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
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
                Get Support
              </p>
            </div>
          </motion.div>
          
          <motion.h2 
            className="support-title text-[30px] md:text-[46.13px] font-bold mb-6 text-white"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            We&apos;re Here to Help
          </motion.h2>
          
          <motion.p 
            className="support-description text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true }}
          >
            Our dedicated support team is available 24/7 to help you with any questions 
            about our courses, admissions, or career guidance.
          </motion.p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div 
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Contact Methods - Left Side */}
          <div className="lg:col-span-5 space-y-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.id}
                className="group relative"
                initial={{ y: 120, opacity: 0, scale: 0.8 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 1.2, 
                  ease: "easeOut", 
                  delay: 0.4 + index * 0.3 
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredCard(method.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* Animated background glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${method.bgGradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  animate={{ 
                    scale: hoveredCard === method.id ? [1, 1.1, 1] : 1,
                    opacity: hoveredCard === method.id ? [0, 0.3, 0] : 0
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <motion.div
                  className="contact-card relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 h-full overflow-hidden"
                  whileHover={{ 
                    borderColor: "rgba(255, 255, 255, 0.4)",
                    backgroundColor: "rgba(255, 255, 255, 0.08)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1.5 h-1.5 bg-gradient-to-r ${method.gradient} rounded-full opacity-20`}
                        style={{
                          left: `${20 + i * 20}%`,
                          top: `${30 + i * 15}%`,
                        }}
                        animate={{
                          y: [0, -15, 0],
                          opacity: [0.2, 0.6, 0.2],
                          scale: [1, 1.3, 1]
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10 flex items-center space-x-4">
                    {/* Icon */}
                    <motion.div 
                      className="flex-shrink-0"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.3 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center text-white shadow-2xl contact-icon`}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: 5,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {method.icon}
                      </motion.div>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <motion.h3 
                        className="text-xl font-bold text-white mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.3 }}
                        viewport={{ once: true }}
                      >
                        {method.title}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-gray-300 text-sm mb-3 leading-relaxed"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1 + index * 0.3 }}
                        viewport={{ once: true }}
                      >
                        {method.description}
                      </motion.p>

                      <motion.div 
                        className="space-y-1 mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 + index * 0.3 }}
                        viewport={{ once: true }}
                      >
                        <p className="text-yellow-400 font-medium text-sm">{method.contact}</p>
                        <p className="text-gray-400 text-xs">{method.hours}</p>
                      </motion.div>

                      {/* Button */}
                      <motion.div className="relative group">
                        <Button 
                          onClick={() => handleContactAction(method.action)}
                          className={`contact-button relative w-full bg-gradient-to-r ${method.gradient} text-white hover:opacity-90 rounded-xl py-3 text-sm font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20`}
                          data-cursor-hover
                        >
                          <motion.span
                            className="relative z-10"
                            whileHover={{ y: -1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {method.action}
                          </motion.span>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section - Right Side */}
          <motion.div 
            ref={ctaRef}
            className="lg:col-span-7 relative"
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 1.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Background glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/5 rounded-3xl blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-full flex flex-col justify-center">
              <motion.h3 
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                viewport={{ once: true }}
              >
                Still Have Questions?
              </motion.h3>
              
              <motion.p 
                className="text-gray-300 mb-8 text-lg leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                viewport={{ once: true }}
              >
                Our education consultants are here to help you choose the right program 
                and answer any questions about your learning journey.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    y: 0
                  }}
                  className="relative group"
                >
                  <motion.div
                    className="absolute inset-0 bg-yellow-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.2, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <Button 
                    className="contact-button relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-2xl px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 border border-yellow-400/20"
                    data-cursor-hover
                  >
                    <motion.span
                      className="relative z-10"
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.2 }}
                    >
                      Schedule a Call
                    </motion.span>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    y: 0
                  }}
                  className="relative group"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.2, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                  <Button 
                    className="contact-button relative bg-white/10 text-white hover:bg-white/20 rounded-2xl px-10 py-4 text-lg font-semibold border border-white/20 backdrop-blur-md hover:border-white/40 transition-all duration-300 hover:shadow-xl"
                    data-cursor-hover
                  >
                    <motion.span
                      className="relative z-10"
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.2 }}
                    >
                      Download Brochure
                    </motion.span>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Additional info */}
              <motion.div 
                className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-400"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>24/7 Support Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Call us at {BUSINESS_PHONE_DISPLAY}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Instant Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Expert Guidance</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}