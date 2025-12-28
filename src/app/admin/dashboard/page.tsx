'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface DashboardStats {
  totalBookings: number
  paidBookings: number
  pendingBookings: number
  totalRevenue: number
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

  const statCards = [
    {
      title: 'Total Bookings',
      value: stats?.totalBookings ?? 0,
      color: 'from-blue-500 to-blue-600',
      href: '/admin/dashboard/bookings',
    },
    {
      title: 'Paid Bookings',
      value: stats?.paidBookings ?? 0,
      color: 'from-green-500 to-green-600',
      href: '/admin/dashboard/bookings?status=paid',
    },
    {
      title: 'Pending Bookings',
      value: stats?.pendingBookings ?? 0,
      color: 'from-yellow-500 to-yellow-600',
      href: '/admin/dashboard/bookings?status=pending',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats?.totalRevenue ?? 0}`,
      color: 'from-purple-500 to-purple-600',
      href: '/admin/dashboard/analytics',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Welcome to the admin panel</p>
      </div>

      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={card.href}>
                  <div className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 cursor-pointer hover:scale-105 transition-transform`}>
                    <h3 className="text-gray-200 text-sm font-medium mb-2">{card.title}</h3>
                    <p className="text-3xl font-bold text-white">{card.value}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/admin/dashboard/tracker">
                  <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600">
                    Add Tracker Entry
                  </Button>
                </Link>
                <Link href="/admin/dashboard/bookings">
                  <Button variant="outline" className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20">
                    View All Bookings
                  </Button>
                </Link>
                <Link href="/admin/dashboard/analytics">
                  <Button variant="outline" className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20">
                    View Analytics
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
              <p className="text-gray-400">Activity feed coming soon...</p>
            </motion.div>
          </div>
        </>
      )}
    </div>
  )
}

