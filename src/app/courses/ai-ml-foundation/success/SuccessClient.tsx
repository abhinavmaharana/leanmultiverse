'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle2, Mail, Clock, BookOpen, ArrowRight, Home } from 'lucide-react'
import Link from 'next/link'

export default function SuccessClient() {
  const searchParams = useSearchParams()
  const enrollmentId = searchParams.get('enrollment_id')
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/30 rounded-full blur-3xl animate-pulse" />
        </div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full relative z-10"
      >
        <div className="bg-zinc-950 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center"
          >
            <CheckCircle2 className="w-12 h-12 text-black" />
          </motion.div>
          
          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Enrollment Successful! 🎉
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-300 mb-8"
          >
            Welcome to the AI & ML Career Foundation Program
          </motion.p>
          
          {/* Enrollment ID */}
          {enrollmentId && !enrollmentId.startsWith('temp_') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-zinc-900 border border-yellow-500/20 rounded-lg p-4 mb-8 inline-block"
            >
              <p className="text-slate-400 text-sm mb-1">Enrollment ID</p>
              <p className="text-yellow-400 font-mono font-semibold">{enrollmentId}</p>
            </motion.div>
          )}
          
          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8 text-left"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-yellow-400" />
              What Happens Next?
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Check Your Email</h3>
                  <p className="text-slate-300 text-sm">
                    A confirmation email with payment receipt has been sent to your registered email address.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Course Access</h3>
                  <p className="text-slate-300 text-sm">
                    You will receive your course login credentials and materials within 24 hours.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Get Ready</h3>
                  <p className="text-slate-300 text-sm">
                    Our team will contact you for onboarding and orientation. Start preparing for your AI journey!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              href="/courses/ai-ml-foundation"
              className="px-6 py-3 bg-zinc-900 backdrop-blur-sm border border-yellow-500/30 text-white rounded-lg font-semibold hover:bg-yellow-500/10 transition-all"
            >
              View Course Details
            </Link>
          </motion.div>
          
          {/* Support Info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-slate-400 text-sm mt-8"
          >
            Need help? Contact us at <a href="mailto:support@leanmultiverse.com" className="text-yellow-400 hover:underline">support@leanmultiverse.com</a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
