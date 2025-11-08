'use client'

import { motion } from 'framer-motion'

const PHONE_DISPLAY = '080 6217 7938'
const PHONE_URI = '+918062177938'

export default function PerfectChatbot() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.span
        className="px-4 py-2 rounded-full bg-black/70 text-white text-sm font-semibold shadow-lg backdrop-blur-md border border-white/10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        Call us: {PHONE_DISPLAY}
      </motion.span>

      <motion.a
        href={`tel:${PHONE_URI}`}
        className="relative inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full px-6 py-3 shadow-2xl hover:shadow-yellow-400/40 border border-yellow-400/40 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <svg
          className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h1.28a2 2 0 011.94 1.515l.62 2.48a2 2 0 01-.72 2.07l-.92.77a16.001 16.001 0 007.18 7.18l.77-.92a2 2 0 012.07-.72l2.48.62A2 2 0 0121 17.72V19a2 2 0 01-2 2h-1C10.163 21 3 13.837 3 4V5z"
          />
                  </svg>
        Talk to Expert
      </motion.a>
          </motion.div>
  )
}
