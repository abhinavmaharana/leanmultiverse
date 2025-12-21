"use client"

import { motion } from "framer-motion"
import { memo } from "react"

function GradientMesh() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Primary gradient mesh - Optimized with will-change */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{ willChange: 'background' }}
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Secondary gradient mesh - Optimized */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{ willChange: 'background' }}
        animate={{
          background: [
            "radial-gradient(circle at 60% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)",
            "radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.08) 0%, transparent 40%)",
            "radial-gradient(circle at 60% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)"
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />

      {/* Animated orbs - Reduced complexity for better performance */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"
        style={{ willChange: 'transform, opacity' }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-400/3 rounded-full blur-3xl"
        style={{ willChange: 'transform, opacity' }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400/4 rounded-full blur-3xl"
        style={{ willChange: 'transform, opacity' }}
        animate={{
          x: [0, 60, 0],
          y: [0, -80, 0],
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8
        }}
      />
    </div>
  )
}

export default memo(GradientMesh)
