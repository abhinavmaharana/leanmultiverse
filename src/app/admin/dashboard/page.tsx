'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface DashboardStats {
  totalBookings: number
  paidBookings: number
  pendingBookings: number
  failedBookings: number
  totalRevenue: number
  webinarRevenue: number
  oneOnOneRevenue: number
  paidWebinarCount: number
  paidOneOnOneCount: number
  bookingsByType: {
    webinar: number
    'one-on-one': number
  }
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/analytics')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-yellow-400 border-t-transparent mb-4"></div>
          <p className="text-gray-400 text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-800"
      >
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            Monitor your bookings, revenue, and customer insights
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/dashboard/bookings">
            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-semibold shadow-lg shadow-yellow-500/20 transition-all">
              View All Bookings
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Main Stats Grid - Enhanced Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Bookings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link href="/admin/dashboard/bookings">
            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/30 border border-blue-400/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span className="text-white/70 text-xs font-medium uppercase tracking-wider">Total</span>
                </div>
                <h3 className="text-white/90 text-sm font-medium mb-3">Total Bookings</h3>
                <p className="text-4xl sm:text-5xl font-bold text-white mb-1">{stats?.totalBookings ?? 0}</p>
                <p className="text-white/60 text-xs">All time bookings</p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Paid Bookings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/admin/dashboard/bookings?status=paid">
            <div className="group relative overflow-hidden bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 rounded-2xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/30 border border-green-400/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-white/70 text-xs font-medium uppercase tracking-wider">Paid</span>
                </div>
                <h3 className="text-white/90 text-sm font-medium mb-3">Paid Bookings</h3>
                <p className="text-4xl sm:text-5xl font-bold text-white mb-1">{stats?.paidBookings ?? 0}</p>
                <p className="text-white/60 text-xs">
                  {stats?.totalBookings ? Math.round((stats.paidBookings / stats.totalBookings) * 100) : 0}% of total
                </p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Pending Bookings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/admin/dashboard/bookings?status=pending">
            <div className="group relative overflow-hidden bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-600 rounded-2xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-500/30 border border-yellow-400/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-white/70 text-xs font-medium uppercase tracking-wider">Pending</span>
                </div>
                <h3 className="text-white/90 text-sm font-medium mb-3">Pending Bookings</h3>
                <p className="text-4xl sm:text-5xl font-bold text-white mb-1">{stats?.pendingBookings ?? 0}</p>
                <p className="text-white/60 text-xs">Awaiting payment</p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Total Revenue Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/admin/dashboard/analytics">
            <div className="group relative overflow-hidden bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 rounded-2xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30 border border-purple-400/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-white/70 text-xs font-medium uppercase tracking-wider">Revenue</span>
                </div>
                <h3 className="text-white/90 text-sm font-medium mb-3">Total Revenue</h3>
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{formatCurrency(stats?.totalRevenue ?? 0)}</p>
                <p className="text-white/60 text-xs">From paid bookings</p>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Revenue Breakdown & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 sm:p-8 shadow-xl"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Revenue Breakdown</h2>
              <p className="text-gray-400 text-sm">Amount paid by booking type</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-xl flex items-center justify-center border border-yellow-400/30">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>

          <div className="space-y-5">
            {/* Webinar Revenue */}
            <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl p-5 border border-blue-500/20 hover:border-blue-500/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-xl flex items-center justify-center border border-blue-400/30">
                    <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-base">Webinar Revenue</p>
                    <p className="text-gray-400 text-sm">{stats?.paidWebinarCount ?? 0} paid bookings × ₹9</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-blue-400">{formatCurrency(stats?.webinarRevenue ?? 0)}</p>
                  {stats?.totalRevenue && (
                    <p className="text-gray-500 text-xs mt-1">
                      {Math.round((stats.webinarRevenue / stats.totalRevenue) * 100)}%
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats?.totalRevenue ? ((stats.webinarRevenue / stats.totalRevenue) * 100) : 0}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full shadow-lg shadow-blue-500/50"
                ></motion.div>
              </div>
            </div>

            {/* One-on-One Revenue */}
            <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-xl p-5 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-xl flex items-center justify-center border border-purple-400/30">
                    <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-base">One-on-One Revenue</p>
                    <p className="text-gray-400 text-sm">{stats?.paidOneOnOneCount ?? 0} paid bookings × ₹1,000</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-purple-400">{formatCurrency(stats?.oneOnOneRevenue ?? 0)}</p>
                  {stats?.totalRevenue && (
                    <p className="text-gray-500 text-xs mt-1">
                      {Math.round((stats.oneOnOneRevenue / stats.totalRevenue) * 100)}%
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats?.totalRevenue ? ((stats.oneOnOneRevenue / stats.totalRevenue) * 100) : 0}%` }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2.5 rounded-full shadow-lg shadow-purple-500/50"
                ></motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 sm:p-8 shadow-xl"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Quick Actions</h2>
              <p className="text-gray-400 text-sm">Navigate to key sections</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-xl flex items-center justify-center border border-yellow-400/30">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/admin/dashboard/bookings">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 h-14 font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all group">
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                All Bookings
              </Button>
            </Link>

            <Link href="/admin/dashboard/customers">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 h-14 font-semibold rounded-xl shadow-lg shadow-purple-500/20 transition-all group">
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Customers
              </Button>
            </Link>

            <Link href="/admin/dashboard/analytics">
              <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0 h-14 font-semibold rounded-xl shadow-lg shadow-green-500/20 transition-all group">
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analytics
              </Button>
            </Link>

            <Link href="/admin/dashboard/payments">
              <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white border-0 h-14 font-semibold rounded-xl shadow-lg shadow-orange-500/20 transition-all group">
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Payment Diagnostics
              </Button>
            </Link>

            <Link href="/admin/dashboard/tracker">
              <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black border-0 h-14 font-semibold rounded-xl shadow-lg shadow-yellow-500/20 transition-all group">
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Tracker
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bookings by Type */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 sm:p-8 shadow-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Bookings by Type</h2>
            <p className="text-gray-400 text-sm">Distribution of webinar vs one-on-one bookings</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="group bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-xl flex items-center justify-center border border-blue-400/30 shadow-lg">
                <svg className="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-300 text-sm font-medium mb-1">Webinar Bookings</p>
                <p className="text-3xl sm:text-4xl font-bold text-white">{stats?.bookingsByType?.webinar ?? 0}</p>
                {stats?.totalBookings && (
                  <p className="text-blue-300 text-xs mt-1">
                    {Math.round((stats.bookingsByType.webinar / stats.totalBookings) * 100)}% of total
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-xl flex items-center justify-center border border-purple-400/30 shadow-lg">
                <svg className="w-7 h-7 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-300 text-sm font-medium mb-1">One-on-One Bookings</p>
                <p className="text-3xl sm:text-4xl font-bold text-white">{stats?.bookingsByType?.['one-on-one'] ?? 0}</p>
                {stats?.totalBookings && (
                  <p className="text-purple-300 text-xs mt-1">
                    {Math.round((stats.bookingsByType['one-on-one'] / stats.totalBookings) * 100)}% of total
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
