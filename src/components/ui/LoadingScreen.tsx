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
  const [loadingText, setLoadingText] = useState('Loading...')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const loadingSteps = [
      { text: 'Loading...', progress: 30 },
      { text: 'Preparing...', progress: 60 },
      { text: 'Almost Ready...', progress: 90 },
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
        }, 500)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Simplified GSAP animations for better performance
    const tl = gsap.timeline()

    // Animate background particles (simplified)
    tl.fromTo('.loading-particle', 
      { 
        scale: 0, 
        opacity: 0
      },
      { 
        scale: 1, 
        opacity: 0.3,
        duration: 1,
        ease: "power2.out",
        stagger: 0.05
      }
    )

    // Animate logo entrance (simplified)
    tl.fromTo('.loading-logo', 
      { 
        scale: 0.8, 
        opacity: 0
      },
      { 
        scale: 1, 
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, 
      "-=0.8"
    )

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
            transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
        >
          {/* Simplified Background */}
          <div className="absolute inset-0">
            {/* Fixed particles to prevent hydration issues */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="loading-particle absolute w-2 h-2 bg-yellow-400/20 rounded-full"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            {/* Logo */}
            <motion.div
              className="loading-logo mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-6">
                <Image
                  src="/logo.svg"
                  alt="LeanMultiverse Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              className="loading-text mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">LeanMultiverse</h2>
              <p className="text-gray-300 text-sm">{loadingText}</p>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-64 sm:w-80 h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </div>

            {/* Progress Percentage */}
            <motion.div
              className="mt-4 text-yellow-400 text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              {progress}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}