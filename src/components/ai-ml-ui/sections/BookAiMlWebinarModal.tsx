'use client'

import '@/components/webinar/book-webinar.css'

const shimmerStyle = `
@keyframes aiml-shimmer {
  0% { transform: translateX(-150%) skewX(-20deg); }
  100% { transform: translateX(250%) skewX(-20deg); }
}
`

interface Props {
  source: 'hero' | 'sticky-bar' | 'mentors' | 'banner'
}

export default function BookAiMlWebinarModal({ source }: Props) {
  const handleRedirect = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
    window.location.href = 'https://learn.leanmultiverse.com/web/checkout/69e242dddf50f711ca7aebed?purchaseNow=true';
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: shimmerStyle }} />

      {source === 'sticky-bar' ? (
        <button
          onClick={handleRedirect}
          className="relative overflow-hidden bg-amber-400 hover:bg-amber-500 text-white text-[15px] font-black px-10 py-3 rounded-xl transition-all duration-200 shadow-md border border-transparent transform hover:scale-[1.02] h-auto"
        >
          <span className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent" style={{ animation: 'aiml-shimmer 2s infinite' }} />
          <span className="relative z-10">Claim Your Spot</span>
        </button>
      ) : source === 'hero' ? (
        <button
          onClick={handleRedirect}
          className="relative overflow-hidden inline-flex items-center justify-center transition-all duration-300 uppercase tracking-[0.1em] gap-3 bg-amber-400 hover:bg-amber-500 text-white border-none px-12 py-5 text-[15px] font-black min-w-[200px] rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95"
        >
          <span className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent" style={{ animation: 'aiml-shimmer 2s infinite' }} />
          <span className="relative z-10 flex items-center gap-3">
             <span className="w-3 h-3 border-2 border-white rounded-full" />
             BOOK AT RS 99
          </span>
        </button>
      ) : source === 'banner' ? (
        <button
          onClick={handleRedirect}
          className="bg-white text-amber-500 hover:bg-gray-50 px-6 py-2 text-xs md:text-sm inline-flex items-center justify-center transition-all duration-300 uppercase tracking-widest font-black rounded-lg shadow-sm hover:shadow transform hover:-translate-y-0.5"
        >
          Register Now
        </button>
      ) : (
        <button
          onClick={handleRedirect}
          className="bg-amber-400 hover:bg-amber-500 px-10 py-4 text-[13px] inline-flex items-center justify-center transition-all duration-300 uppercase tracking-[0.1em] text-white font-black rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          BOOK AT RS 99
        </button>
      )}

    </>
  )
}
