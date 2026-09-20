import type { Metadata } from 'next'
import Image from 'next/image'
import { Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Under Maintenance',
  robots: { index: false, follow: false },
}

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-4 sm:p-8 selection:bg-amber-400 selection:text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-amber-300/10 blur-[100px]" />
        <div className="absolute -bottom-[10%] right-[10%] w-[50%] h-[40%] rounded-full bg-yellow-300/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-2xl mx-auto relative z-10">
        <div className="bg-white/70 backdrop-blur-2xl border border-white p-8 sm:p-14 rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] flex flex-col items-center text-center space-y-8">
          <Image
            src="/IMG_5963.PNG"
            alt="Lean Multiverse Logo"
            width={88}
            height={88}
            className="object-contain drop-shadow-sm"
            priority
          />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50/80 border border-amber-200/60 shadow-sm">
            <Wrench className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800">Under Maintenance</span>
          </div>

          <div className="space-y-5 max-w-lg mx-auto">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.1]">
              We&apos;ll be back <span className="text-amber-500">soon.</span>
            </h1>
            <p className="text-gray-500 text-base sm:text-lg font-medium leading-relaxed">
              Lean Multiverse is currently undergoing maintenance. Thank you for your patience.
            </p>
          </div>

          <p className="text-sm text-gray-400 font-medium">
            Need help? Write to{' '}
            <a href="mailto:operations@leanmultiverse.com" className="text-amber-600 font-bold hover:underline">
              operations@leanmultiverse.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
