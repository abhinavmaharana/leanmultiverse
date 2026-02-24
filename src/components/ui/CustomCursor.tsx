"use client"

import { useEffect, useState } from "react"

const cursorStyle = {
  transition: "transform 0.15s ease-out, opacity 0.2s ease-out",
} as const

function useHasFinePointer() {
  const [hasFinePointer, setHasFinePointer] = useState(false)
  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(pointer: fine)")
    const update = () => setHasFinePointer(mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [])
  return hasFinePointer
}

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

  const mainScale = isHovering ? 1.5 : 1
  const ringScale = isHovering ? 2 : 1
  const ringOpacity = isHovering ? 0.8 : 0.4
  const clickScale = isClicking ? 1.5 : 0
  const clickOpacity = isClicking ? 1 : 0

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed top-0 left-0 w-4 h-4 bg-yellow-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          ...cursorStyle,
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px) scale(${mainScale})`,
        }}
      />

      {/* Cursor ring */}
      <div
        className="fixed top-0 left-0 w-12 h-12 border-2 border-yellow-400/30 rounded-full pointer-events-none z-[9998]"
        style={{
          ...cursorStyle,
          transform: `translate(${mousePosition.x - 24}px, ${mousePosition.y - 24}px) scale(${ringScale})`,
          opacity: ringOpacity,
        }}
      />

      {/* Click effect */}
      <div
        className="fixed top-0 left-0 w-20 h-20 border border-yellow-400/20 rounded-full pointer-events-none z-[9997]"
        style={{
          transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          transform: `translate(${mousePosition.x - 40}px, ${mousePosition.y - 40}px) scale(${clickScale})`,
          opacity: clickOpacity,
        }}
      />

      {/* Hover text */}
      {isHovering && (
        <div
          className="fixed top-0 left-0 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium pointer-events-none z-[9999]"
          style={{
            transform: `translate(${mousePosition.x + 20}px, ${mousePosition.y - 10}px)`,
            transition: "opacity 0.2s ease-out",
          }}
        >
          Click me
        </div>
      )}
    </>
  )
}
