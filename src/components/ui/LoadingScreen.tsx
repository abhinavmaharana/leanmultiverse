'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import Image from 'next/image'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing...')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const loadingSteps = [
      { text: 'Initializing...', progress: 20 },
      { text: 'Loading Assets...', progress: 40 },
      { text: 'Preparing Experience...', progress: 60 },
      { text: 'Optimizing Performance...', progress: 80 },
      { text: 'Almost Ready...', progress: 95 },
      { text: 'Welcome!', progress: 100 }
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep]
        setLoadingText(step.text)
        setProgress(step.progress)
        currentStep++
      } else {
        clearInterval(interval)
        setIsComplete(true)
        setTimeout(() => {
          onComplete()
        }, 1000)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // GSAP animations for the loading screen
    const tl = gsap.timeline()

    // Animate background particles
    tl.fromTo('.loading-particle', 
      { 
        scale: 0, 
        opacity: 0,
        rotation: 0
      },
      { 
        scale: 1, 
        opacity: 0.6,
        rotation: 360,
        duration: 2,
        ease: "power2.out",
        stagger: 0.1
      }
    )

    // Animate logo entrance
    tl.fromTo('.loading-logo', 
      { 
        scale: 0.5, 
        opacity: 0,
        y: 50
      },
      { 
        scale: 1, 
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
      }, 
      "-=1"
    )

    // Animate progress bar
    tl.fromTo('.progress-bar', 
      { 
        scaleX: 0,
        opacity: 0
      },
      { 
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, 
      "-=0.5"
    )

    // Animate loading text
    tl.fromTo('.loading-text', 
      { 
        y: 30,
        opacity: 0
      },
      { 
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, 
      "-=0.3"
    )

    // Continuous floating animation for particles
    gsap.to('.loading-particle', {
      y: -20,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.2
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            {/* Gradient Mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-yellow-600/10" />
            
            {/* Floating Particles - Fixed positions to avoid hydration mismatch */}
            {[
              { left: 10, top: 20 },
              { left: 25, top: 15 },
              { left: 40, top: 30 },
              { left: 60, top: 25 },
              { left: 80, top: 35 },
              { left: 15, top: 50 },
              { left: 35, top: 45 },
              { left: 55, top: 60 },
              { left: 75, top: 55 },
              { left: 90, top: 70 },
              { left: 20, top: 75 },
              { left: 45, top: 80 },
              { left: 65, top: 85 },
              { left: 85, top: 90 },
              { left: 5, top: 40 },
              { left: 30, top: 65 },
              { left: 50, top: 10 },
              { left: 70, top: 15 },
              { left: 95, top: 25 },
              { left: 12, top: 85 }
            ].map((position, i) => (
              <motion.div
                key={i}
                className="loading-particle absolute w-2 h-2 bg-yellow-400/30 rounded-full"
                style={{
                  left: `${position.left}%`,
                  top: `${position.top}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0.5],
                  opacity: [0, 0.6, 0.3],
                  rotate: 360
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Geometric Shapes */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32 border border-yellow-400/20 rounded-full"
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-yellow-400/20"
              animate={{ 
                rotate: -360,
                scale: [1, 0.8, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center space-y-8 max-w-md mx-auto px-6">
            {/* Logo */}
            <motion.div
              className="loading-logo relative"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <Image 
                src="/logo.svg" 
                alt="Lean Multiverse Logo" 
                width={200} 
                height={55} 
                className="h-14 w-auto"
                priority
              />
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-yellow-400/20 rounded-lg blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Progress Bar */}
            <div className="w-full max-w-xs">
              <motion.div
                className="loading-text text-center mb-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <h2 className="text-2xl font-bold text-white mb-2">
                  {loadingText}
                </h2>
                <p className="text-gray-400 text-sm">
                  {progress}% Complete
                </p>
              </motion.div>

              {/* Progress Bar Container */}
              <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="progress-bar absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                  style={{ 
                    width: `${progress}%`,
                    boxShadow: '0 0 20px rgba(234, 179, 8, 0.5)'
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                />
                
                {/* Animated shine effect */}
                <motion.div
                  className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </div>

            {/* Loading Dots */}
            <motion.div 
              className="flex space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-yellow-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            {/* Brand Tagline */}
            <motion.div
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <p className="text-gray-300 text-sm font-medium">
                Transforming Enterprise Agility
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Powered by Lean Methodologies
              </p>
            </motion.div>
          </div>

          {/* Bottom Wave Animation */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-400/5 to-transparent"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
