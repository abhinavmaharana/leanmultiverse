'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Booking {
  id: string
  type: 'webinar'
  user_name: string
  user_email: string
  user_phone: string
  selected_date: string
  selected_time: string
  payment_status: 'pending' | 'paid' | 'failed'
  razorpay_order_id: string | null
  razorpay_payment_id: string | null
  order_notes?: Record<string, string> | null
  created_at: string
}

export default function BookingsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || 'all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  useEffect(() => {
    fetchBookings()
  }, [statusFilter, typeFilter])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') {
        params.append('status', statusFilter)
      }
      if (typeFilter !== 'all') {
        params.append('type', typeFilter)
      }
      if (searchTerm) {
        params.append('search', searchTerm)
      }

      const response = await fetch(`/api/admin/bookings?${params.toString()}`)
      if (response.ok) {
        const result = await response.json()
        setBookings(result.bookings || [])
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchBookings()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/50'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Bookings Management</h1>
        <p className="text-gray-400">View and manage all bookings</p>
      </div>

      {/* Filters */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-white text-sm mb-2 block">Search</label>
            <div className="flex gap-2">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Name, email, phone..."
                className="bg-white/10 border-2 border-white/20 text-white placeholder:text-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400"
              />
              <Button
                onClick={handleSearch}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600"
              >
                Search
              </Button>
            </div>
          </div>

          <div>
            <label className="text-white text-sm mb-2 block">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-white/10 border-2 border-white/20 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div>
            <label className="text-white text-sm mb-2 block">Type</label>
            <select
              disabled
              className="w-full bg-white/10 border-2 border-white/20 text-gray-500 rounded-xl px-4 py-3 focus:outline-none"
            >
              <option value="webinar">Webinar Only</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={fetchBookings}
              variant="outline"
              className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No bookings found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Name</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Email</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Phone</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Date</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Time</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Hear from</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="py-4 px-6 text-white">{booking.user_name}</td>
                    <td className="py-4 px-6 text-gray-300">{booking.user_email}</td>
                    <td className="py-4 px-6 text-gray-300">{booking.user_phone}</td>
                    <td className="py-4 px-6 text-gray-300">
                      {new Date(booking.selected_date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-gray-300">{booking.selected_time}</td>
                    <td className="py-4 px-6 text-gray-300">
                      {booking.order_notes?.hear_from ?? '—'}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.payment_status)}`}>
                        {booking.payment_status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <Link href={`/admin/dashboard/bookings/${booking.id}?type=${booking.type}`}>
                        <Button
                          variant="outline"
                          className="border-white/20 bg-white/10 text-white hover:bg-white/20 text-sm"
                        >
                          View
                        </Button>
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && bookings.length > 0 && (
        <div className="text-center text-gray-400">
          Showing {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}

