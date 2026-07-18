'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RefreshCcw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-4 sm:p-8 selection:bg-red-400 selection:text-white relative overflow-hidden">
      {/* Subtle Background Decorative Mesh Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-red-300/10 blur-[100px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] rounded-full bg-orange-400/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[40%] rounded-full bg-red-200/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-2xl mx-auto relative z-10">
        <div className="bg-white/70 backdrop-blur-2xl border border-white p-8 sm:p-14 rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] flex flex-col items-center text-center space-y-8 transition-all hover:shadow-[0_8px_50px_-12px_rgba(0,0,0,0.12)] duration-500">
          
          {/* Logo & Status Badge */}
          <div className="flex flex-col items-center gap-6 w-full">
            <div className="relative group cursor-default">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-200 to-orange-200 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition duration-700" />
              <Image
                src="/IMG_5963.PNG"
                alt="Lean Multiverse Logo"
                width={88}
                height={88}
                className="relative object-contain drop-shadow-sm transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50/80 border border-red-200/60 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-red-800">Error 500</span>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="space-y-5 max-w-lg mx-auto">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.1]">
              Something went <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Wrong</span>
            </h1>
            <p className="text-gray-500 text-base sm:text-lg font-medium leading-relaxed max-w-[90%] mx-auto">
              An unexpected error occurred. Our team has been notified and is working on a fix.
            </p>
          </div>

          {/* Action / Info Area */}
          <div className="w-full pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button 
              onClick={() => reset()}
              className="flex items-center gap-2.5 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 px-6 py-3.5 rounded-2xl transition-all w-full sm:w-auto justify-center shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
            >
              <RefreshCcw className="w-4.5 h-4.5 group-hover:-rotate-90 transition-transform duration-500" />
              <span>Try Again</span>
            </button>

            <Link 
              href="/" 
              className="flex items-center gap-2.5 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 px-6 py-3.5 rounded-2xl border border-gray-100 w-full sm:w-auto justify-center shadow-sm transition-colors group"
            >
              <Home className="w-4 h-4 text-gray-500" />
              <span>Back to Home</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
