'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface MenuItemProps {
  link: string
  text: string
  image: string
}

interface FlowingMenuProps {
  items?: MenuItemProps[]
}

const FlowingMenuSimple: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Simple entrance animation
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "power2.out" 
        }
      )
    }
  }, [items])

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden bg-black">
      <nav className="flex flex-col h-full">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  )
}

const MenuItem: React.FC<MenuItemProps> = ({ link, text, image }) => {
  const itemRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  const handleMouseLeave = () => {
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  return (
    <div 
      ref={itemRef}
      className="flex-1 relative overflow-hidden border-b border-gray-800 hover:border-yellow-400 transition-colors duration-300"
    >
      <a
        className="flex items-center justify-center h-full relative cursor-pointer group"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity duration-300"
          style={{ backgroundImage: `url(${image})` }}
        />
        
        {/* Content */}
        <div className="relative z-10 text-center">
          <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 group-hover:text-yellow-400 transition-colors duration-300">
            {text}
          </h3>
          <div className="w-16 h-1 bg-yellow-400 mx-auto group-hover:w-24 transition-all duration-300" />
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </a>
    </div>
  )
}

export default FlowingMenuSimple
