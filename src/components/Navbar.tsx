"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="px-6 py-3 mt-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Lean Multiverse Logo"
            width={160}
            height={45}
            priority
          />
        </div>

        {/* Center: Nav links (desktop only) */}
        <div className="hidden md:flex space-x-8 text-sm font-medium px-6 py-2 rounded-full shadow-md bg-gradient-to-r from-[#C69D44]/20 to-[#604C21]/20 backdrop-blur-md border border-white/20">
          <a href="#home" className="hover:opacity-90 transition text-white">
            Home
          </a>
          <a href="#courses" className="hover:opacity-90 transition text-white">
            Courses
          </a>
          <a href="#about" className="hover:opacity-90 transition text-white">
            About Us
          </a>
          <a href="#blogs" className="hover:opacity-90 transition text-white">
            Blogs
          </a>
        </div>

        {/* Right: Free Course Button (desktop) */}
        <div className="hidden md:block">
          <Button className="rounded-full px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-md hover:opacity-90 transition">
            Free Course
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col items-center space-y-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#C69D44]/20 to-[#604C21]/20 backdrop-blur-md border border-white/20 shadow-lg">
          <a
            href="#home"
            className="block text-white hover:opacity-90 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="#courses"
            className="block text-white hover:opacity-90 transition"
            onClick={() => setIsOpen(false)}
          >
            Courses
          </a>
          <a
            href="#about"
            className="block text-white hover:opacity-90 transition"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </a>
          <a
            href="#blogs"
            className="block text-white hover:opacity-90 transition"
            onClick={() => setIsOpen(false)}
          >
            Blogs
          </a>
          <Button
            className="w-full rounded-full px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-md hover:opacity-90 transition"
            onClick={() => setIsOpen(false)}
          >
            Free Course
          </Button>
        </div>
      )}
    </nav>
  )
}
