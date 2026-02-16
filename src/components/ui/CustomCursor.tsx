"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useHasFinePointer } from "@/hooks/useHasFinePointer"

export default function CustomCursor() {
  const hasFinePointer = useHasFinePointer()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('button, a, [data-cursor-hover]')) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('button, a, [data-cursor-hover]')) {
        setIsHovering(false)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseenter', handleMouseEnter, true)
    window.addEventListener('mouseleave', handleMouseLeave, true)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseenter', handleMouseEnter, true)
      window.removeEventListener('mouseleave', handleMouseLeave, true)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  if (!hasFinePointer) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-yellow-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      />

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border-2 border-yellow-400/30 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20
        }}
      />

      {/* Click effect */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 border border-yellow-400/20 rounded-full pointer-events-none z-[9997]"
        animate={{
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
          scale: isClicking ? 1.5 : 0,
          opacity: isClicking ? 1 : 0,
        }}
        transition={{
          duration: 0.2
        }}
      />

      {/* Hover text */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium pointer-events-none z-[9999]"
          animate={{
            x: mousePosition.x + 20,
            y: mousePosition.y - 10,
            opacity: 1,
          }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          Click me
        </motion.div>
      )}
    </>
  )
}
