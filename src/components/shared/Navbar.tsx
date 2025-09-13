import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="relative flex items-center justify-between px-6 md:px-8 py-3 mt-6">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Image src="/logo.svg" alt="Lean Multiverse Logo" width={160} height={44} className="h-11 w-auto" />
      </div>

      {/* Center: Navigation links (desktop) */}
      <div className="hidden md:flex md:w-[506px] md:h-[53px] items-center justify-center space-x-8 text-[14.75px] font-semibold font-[Raleway] px-[28px] py-[16px] rounded-full shadow-md hover:opacity-90 transition bg-gradient-to-r from-[#C69D44]/20 to-[#604C21]/20 backdrop-blur-md border border-white/20">
        <a href="#home" className="hover:opacity-90 transition text-white">Home</a>
        <a href="#courses" className="hover:opacity-90 transition text-white">Courses</a>
        <a href="#about" className="hover:opacity-90 transition text-white">About Us</a>
        <a href="#blogs" className="hover:opacity-90 transition text-white">Blogs</a>
      </div>

      {/* Right: CTA + Mobile menu button */}
      <div className="flex items-center gap-3">
        <Button
          className="hidden sm:inline-flex rounded-full text-[14.75px] w-[160px] h-[53px] bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-md hover:opacity-90 transition"
        >
          Free Course
        </Button>
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className="inline-flex md:hidden items-center justify-center h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/15 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            {open ? (
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            ) : (
              <path stroke="currentColor" strokeWidth="1.5" d="M3.75 7.5h16.5M3.75 12h16.5M3.75 16.5h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute left-0 right-0 top-full mt-3 px-6 md:hidden">
          <div className="flex flex-col gap-2 text-sm font-medium rounded-2xl shadow-lg bg-gradient-to-b from-[#0b0b0b]/90 to-[#1a1a1a]/90 backdrop-blur-md border border-white/10 p-4">
            <a onClick={() => setOpen(false)} href="#home" className="px-3 py-2 rounded-lg hover:bg-white/5 text-white">Home</a>
            <a onClick={() => setOpen(false)} href="#courses" className="px-3 py-2 rounded-lg hover:bg-white/5 text-white">Courses</a>
            <a onClick={() => setOpen(false)} href="#about" className="px-3 py-2 rounded-lg hover:bg-white/5 text-white">About Us</a>
            <a onClick={() => setOpen(false)} href="#blogs" className="px-3 py-2 rounded-lg hover:bg-white/5 text-white">Blogs</a>
            <Button
              className="mt-2 w-full rounded-full px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-md hover:opacity-90 transition"
              onClick={() => setOpen(false)}
            >
              Free Course
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
