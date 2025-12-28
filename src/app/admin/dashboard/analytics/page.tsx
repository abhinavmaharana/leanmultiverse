'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AnalyticsData {
  totalBookings: number
  paidBookings: number
  pendingBookings: number
  failedBookings: number
  totalRevenue: number
  bookingsByDate: Record<string, number>
  paymentStatusBreakdown: {
    paid: number
    pending: number
    failed: number
  }
  bookingsByType: {
    webinar: number
    'one-on-one': number
  }
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Bookings',
      value: analytics?.totalBookings ?? 0,
      color: 'from-blue-500 to-blue-600',
      icon: '📊',
    },
    {
      title: 'Paid Bookings',
      value: analytics?.paidBookings ?? 0,
      color: 'from-green-500 to-green-600',
      icon: '✅',
    },
    {
      title: 'Pending Bookings',
      value: analytics?.pendingBookings ?? 0,
      color: 'from-yellow-500 to-yellow-600',
      icon: '⏳',
    },
    {
      title: 'Failed Bookings',
      value: analytics?.failedBookings ?? 0,
      color: 'from-red-500 to-red-600',
      icon: '❌',
    },
    {
      title: 'Total Revenue',
      value: `₹${analytics?.totalRevenue ?? 0}`,
      color: 'from-purple-500 to-purple-600',
      icon: '💰',
    },
  ]

  const getPercentage = (value: number, total: number) => {
    if (total === 0) return 0
    return Math.round((value / total) * 100)
  }

  if (loading) {
    return (
      <div className="text-center text-white py-12">Loading analytics...</div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-gray-400">Overview of bookings and revenue</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className={`bg-gradient-to-br ${card.color} rounded-2xl p-6`}>
              <div className="text-3xl mb-2">{card.icon}</div>
              <h3 className="text-gray-200 text-sm font-medium mb-2">{card.title}</h3>
              <p className="text-3xl font-bold text-white">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Status Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Payment Status Breakdown</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Paid</span>
                <span className="text-white font-semibold">
                  {analytics?.paidBookings ?? 0} ({getPercentage(analytics?.paidBookings ?? 0, analytics?.totalBookings ?? 1)}%)
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all"
                  style={{
                    width: `${getPercentage(analytics?.paidBookings ?? 0, analytics?.totalBookings || 1)}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Pending</span>
                <span className="text-white font-semibold">
                  {analytics?.pendingBookings ?? 0} ({getPercentage(analytics?.pendingBookings ?? 0, analytics?.totalBookings ?? 1)}%)
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  className="bg-yellow-500 h-3 rounded-full transition-all"
                  style={{
                    width: `${getPercentage(analytics?.pendingBookings ?? 0, analytics?.totalBookings || 1)}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Failed</span>
                <span className="text-white font-semibold">
                  {analytics?.failedBookings ?? 0} ({getPercentage(analytics?.failedBookings ?? 0, analytics?.totalBookings ?? 1)}%)
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  className="bg-red-500 h-3 rounded-full transition-all"
                  style={{
                    width: `${getPercentage(analytics?.failedBookings ?? 0, analytics?.totalBookings || 1)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bookings by Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Bookings by Type</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Webinar</span>
                <span className="text-white font-semibold">
                  {analytics?.bookingsByType.webinar ?? 0} ({getPercentage(analytics?.bookingsByType.webinar ?? 0, analytics?.totalBookings ?? 1)}%)
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{
                    width: `${getPercentage(analytics?.bookingsByType.webinar ?? 0, analytics?.totalBookings || 1)}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">One-on-One</span>
                <span className="text-white font-semibold">
                  {analytics?.bookingsByType['one-on-one'] ?? 0} ({getPercentage(analytics?.bookingsByType['one-on-one'] ?? 0, analytics?.totalBookings ?? 1)}%)
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  className="bg-purple-500 h-3 rounded-full transition-all"
                  style={{
                    width: `${getPercentage(analytics?.bookingsByType['one-on-one'] ?? 0, analytics?.totalBookings || 1)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Bookings Trend */}
      {analytics && Object.keys(analytics.bookingsByDate).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Bookings Trend (Last 30 Days)</h2>
          <div className="space-y-2">
            {Object.entries(analytics.bookingsByDate)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([date, count]) => (
                <div key={date} className="flex items-center gap-4">
                  <span className="text-gray-400 text-sm w-32">
                    {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <div className="flex-1 bg-white/10 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-6 rounded-full flex items-center justify-end pr-2 text-black text-xs font-semibold transition-all"
                      style={{
                        width: `${Math.min((count / Math.max(...Object.values(analytics.bookingsByDate))) * 100, 100)}%`,
                      }}
                    >
                      {count > 0 && count}
                    </div>
                  </div>
                  <span className="text-white font-semibold w-12 text-right">{count}</span>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

