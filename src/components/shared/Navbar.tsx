import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-3 mt-6">
      
      {/* Left: Logo */}
      <div className="flex items-center">
        <Image src="/logo.svg" alt="Lean Multiverse Logo" width={180} height={50} />
      </div>

      {/* Center: Navigation links */}
        <div className="flex space-x-8 text-sm font-medium px-6 py-2 rounded-full shadow-md hover:opacity-90 transition bg-gradient-to-r from-[#C69D44]/20 to-[#604C21]/20 backdrop-blur-md border border-white/20">
            <a href="#home" className="hover:opacity-90 transition text-white">Home</a>
            <a href="#courses" className="hover:opacity-90 transition text-white">Courses</a>
            <a href="#about" className="hover:opacity-90 transition text-white">About Us</a>
            <a href="#blogs" className="hover:opacity-90 transition text-white">Blogs</a>
        </div>


      {/* Right: Free Course Button with Glass Effect */}
      <div>
        <Button
          className="rounded-full px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-md hover:opacity-90 transition"
        >
          Free Course
        </Button>
      </div>
    </nav>
  )
}
