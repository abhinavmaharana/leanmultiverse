'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

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
  meet_link: string | null
  zoom_registration_link?: string | null
  order_notes?: Record<string, string> | null
  calendar_invite_sent: boolean
  created_at: string
  updated_at: string
}

export default function BookingDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const bookingId = params.id as string
  const type = 'webinar'

  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchBooking()
  }, [bookingId, type])

  const fetchBooking = async () => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}?type=${type}`)
      if (response.ok) {
        const result = await response.json()
        setBooking(result.booking)
      }
    } catch (error) {
      console.error('Error fetching booking:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (newStatus: 'pending' | 'paid' | 'failed') => {
    if (!booking) return

    setUpdating(true)
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}?type=${type}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_status: newStatus }),
      })

      if (response.ok) {
        const result = await response.json()
        setBooking(result.booking)
      }
    } catch (error) {
      console.error('Error updating booking:', error)
    } finally {
      setUpdating(false)
    }
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

  if (loading) {
    return (
      <div className="text-center text-white py-12">Loading...</div>
    )
  }

  if (!booking) {
    return (
      <div className="text-center text-white py-12">Booking not found</div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="border-white/20 bg-white/10 text-white hover:bg-white/20 mb-4"
          >
            ← Back
          </Button>
          <h1 className="text-4xl font-bold text-white mb-2">Booking Details</h1>
          <p className="text-gray-400">Booking ID: {booking.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Booking Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm">Name</label>
              <p className="text-white text-lg">{booking.user_name}</p>
            </div>
            <div>
              <label className="text-gray-400 text-sm">Email</label>
              <p className="text-white text-lg">{booking.user_email}</p>
            </div>
            <div>
              <label className="text-gray-400 text-sm">Phone</label>
              <p className="text-white text-lg">{booking.user_phone}</p>
            </div>
            <div>
              <label className="text-gray-400 text-sm">Date</label>
              <p className="text-white text-lg">
                {new Date(booking.selected_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div>
              <label className="text-gray-400 text-sm">Time</label>
              <p className="text-white text-lg">{booking.selected_time}</p>
            </div>
          </div>
        </motion.div>

        {/* Payment & Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Payment & Status</h2>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm">Payment Status</label>
              <div className="mt-2">
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(booking.payment_status)}`}>
                  {booking.payment_status.toUpperCase()}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  onClick={() => updateStatus('paid')}
                  disabled={updating || booking.payment_status === 'paid'}
                  className="bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30"
                >
                  Mark Paid
                </Button>
                <Button
                  onClick={() => updateStatus('pending')}
                  disabled={updating || booking.payment_status === 'pending'}
                  className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 hover:bg-yellow-500/30"
                >
                  Mark Pending
                </Button>
                <Button
                  onClick={() => updateStatus('failed')}
                  disabled={updating || booking.payment_status === 'failed'}
                  className="bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30"
                >
                  Mark Failed
                </Button>
              </div>
            </div>
            {booking.razorpay_order_id && (
              <div>
                <label className="text-gray-400 text-sm">Razorpay Order ID</label>
                <p className="text-white text-sm font-mono">{booking.razorpay_order_id}</p>
              </div>
            )}
            {booking.razorpay_payment_id && (
              <div>
                <label className="text-gray-400 text-sm">Razorpay Payment ID</label>
                <p className="text-white text-sm font-mono">{booking.razorpay_payment_id}</p>
              </div>
            )}
            {booking.meet_link && (
              <div>
                <label className="text-gray-400 text-sm">Meet Link</label>
                <a
                  href={booking.meet_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 underline break-all"
                >
                  {booking.meet_link}
                </a>
              </div>
            )}
            {booking.zoom_registration_link && (
              <div>
                <label className="text-gray-400 text-sm">Zoom Registration Link</label>
                <a
                  href={booking.zoom_registration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 underline break-all"
                >
                  {booking.zoom_registration_link}
                </a>
              </div>
            )}
            {booking.order_notes && Object.keys(booking.order_notes).length > 0 && (
              <div>
                <label className="text-gray-400 text-sm">Order notes (Razorpay)</label>
                <div className="mt-2 rounded-lg bg-white/5 border border-white/10 p-4 space-y-2">
                  {Object.entries(booking.order_notes).map(([key, value]) => (
                    <div key={key} className="flex gap-2 text-sm">
                      <span className="text-gray-500 font-medium min-w-[140px]">{key.replace(/_/g, ' ')}</span>
                      <span className="text-white break-all">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <label className="text-gray-400 text-sm">Calendar Invite Sent</label>
              <p className="text-white">{booking.calendar_invite_sent ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <label className="text-gray-400 text-sm">Created At</label>
              <p className="text-white text-sm">
                {new Date(booking.created_at).toLocaleString()}
              </p>
            </div>
            <div>
              <label className="text-gray-400 text-sm">Last Updated</label>
              <p className="text-white text-sm">
                {new Date(booking.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

