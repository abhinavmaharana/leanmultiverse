'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertTriangle,
  DollarSign,
  Users,
  TrendingUp,
  FileText
} from 'lucide-react'

interface PaymentStats {
  summary: {
    totalWebinars: number
  }
  webinarStatusCounts: {
    paid: number
    pending: number
    failed: number
    withPaymentId: number
    withOrderId: number
  }
  suspiciousEntries: {
    webinars: number
    details: {
      webinars: Array<{
        id: string
        user_email: string
        payment_status: string
        razorpay_payment_id: string | null
        razorpay_order_id: string | null
      }>
    }
  }
  samplePaidWebinars: Array<{
    id: string
    user_email: string
    payment_status: string
    razorpay_payment_id: string | null
    razorpay_order_id: string | null
    created_at: string
  }>
}

export default function PaymentDiagnosticsPage() {
  const [stats, setStats] = useState<PaymentStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true
      fetchPaymentStats()
    }
  }, [])

  const fetchPaymentStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/admin/check-payments')
      
      if (!response.ok) {
        throw new Error('Failed to fetch payment stats')
      }

      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const totalPaid = stats?.webinarStatusCounts.paid || 0
  const totalPending = stats?.webinarStatusCounts.pending || 0
  const totalFailed = stats?.webinarStatusCounts.failed || 0
  const totalBookings = stats?.summary.totalWebinars || 0

  return (
    <div className="w-full">
        {loading ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading payment diagnostics...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-400 mb-4">Error: {error}</p>
              <button
                onClick={fetchPaymentStats}
                className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
                Payment Diagnostics
              </h1>
              <p className="text-gray-400">Comprehensive breakdown of payment statuses and verification</p>
            </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">{totalBookings}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Bookings</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-green-900/30 border border-green-700/50 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold text-green-400">{totalPaid}</span>
            </div>
            <p className="text-gray-400 text-sm">Paid Bookings</p>
            <p className="text-green-400 text-xs mt-1">
              {totalBookings > 0 ? ((totalPaid / totalBookings) * 100).toFixed(1) : 0}% of total
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-400">{totalPending}</span>
            </div>
            <p className="text-gray-400 text-sm">Pending Payments</p>
            <p className="text-yellow-400 text-xs mt-1">
              {totalBookings > 0 ? ((totalPending / totalBookings) * 100).toFixed(1) : 0}% of total
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-red-900/30 border border-red-700/50 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <XCircle className="h-8 w-8 text-red-400" />
              <span className="text-2xl font-bold text-red-400">{totalFailed}</span>
            </div>
            <p className="text-gray-400 text-sm">Failed Payments</p>
            <p className="text-red-400 text-xs mt-1">
              {totalBookings > 0 ? ((totalFailed / totalBookings) * 100).toFixed(1) : 0}% of total
            </p>
          </motion.div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* Webinar Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-400" />
              Webinar Bookings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg border border-green-700/30">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Paid</span>
                </div>
                <span className="text-xl font-bold text-green-400">
                  {stats?.webinarStatusCounts.paid ?? 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-900/20 rounded-lg border border-yellow-700/30">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  <span className="text-gray-300">Pending</span>
                </div>
                <span className="text-xl font-bold text-yellow-400">
                  {stats?.webinarStatusCounts.pending ?? 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg border border-red-700/30">
                <div className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-red-400" />
                  <span className="text-gray-300">Failed</span>
                </div>
                <span className="text-xl font-bold text-red-400">
                  {stats?.webinarStatusCounts.failed ?? 0}
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>With Payment ID</span>
                  <span className="text-white">{stats?.webinarStatusCounts.withPaymentId ?? 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400 mt-2">
                  <span>With Order ID</span>
                  <span className="text-white">{stats?.webinarStatusCounts.withOrderId ?? 0}</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Suspicious Entries */}
        {(stats?.suspiciousEntries.webinars ?? 0) > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/20 border border-red-700/50 rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              Suspicious Entries
            </h2>
            <p className="text-gray-400 mb-4">
              These entries have mismatched payment status and payment IDs. They may need manual review.
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-red-400 font-semibold mb-2">
                  Webinars: {stats?.suspiciousEntries.webinars ?? 0}
                </p>
                {(stats?.suspiciousEntries.details.webinars.length ?? 0) > 0 && (
                  <div className="space-y-2">
                    {stats?.suspiciousEntries.details.webinars.map((entry) => (
                      <div
                        key={entry.id}
                        className="bg-gray-800/50 p-3 rounded border border-red-700/30 text-sm"
                      >
                        <p className="text-gray-300">{entry.user_email}</p>
                        <p className="text-gray-500 text-xs">
                          Status: {entry.payment_status} | 
                          Payment ID: {entry.razorpay_payment_id || 'None'} |
                          Order ID: {entry.razorpay_order_id || 'None'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-900/20 border border-green-700/50 rounded-lg p-6 mb-8"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-400" />
              <div>
                <h3 className="text-lg font-bold text-green-400">All Clear!</h3>
                <p className="text-gray-400 text-sm">
                  No suspicious entries found. All payment statuses match their payment IDs.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Sample Paid Bookings */}
        <div className="grid grid-cols-1 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              Sample Paid Webinars (Recent)
            </h2>
            {(stats?.samplePaidWebinars.length ?? 0) > 0 ? (
              <div className="space-y-3">
                {stats?.samplePaidWebinars.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-gray-900/50 p-3 rounded border border-green-700/30"
                  >
                    <p className="text-white font-medium">{booking.user_email}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Payment ID: {booking.razorpay_payment_id || 'N/A'}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {new Date(booking.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No paid webinar bookings found</p>
            )}
          </motion.div>

        </div>

            {/* Refresh Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-center"
            >
              <button
                onClick={fetchPaymentStats}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg hover:shadow-yellow-400/40"
              >
                Refresh Data
              </button>
            </motion.div>
          </>
        )}
    </div>
  )
}

