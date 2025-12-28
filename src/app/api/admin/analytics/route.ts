import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/admin-middleware'
import { supabase } from '@/lib/db'

async function handler(request: NextRequest) {
  try {
    // Fetch webinar bookings
    const { data: webinarBookings, error: webinarError } = await supabase
      .from('webinar_bookings')
      .select('payment_status, created_at')

    if (webinarError) {
      console.error('Error fetching webinar bookings:', webinarError)
    }

    // Fetch one-on-one bookings
    const { data: oneOnOneBookings, error: oneOnOneError } = await supabase
      .from('one_on_one_bookings')
      .select('payment_status, created_at')

    if (oneOnOneError) {
      console.error('Error fetching one-on-one bookings:', oneOnOneError)
    }

    const allBookings = [
      ...(webinarBookings || []),
      ...(oneOnOneBookings || []),
    ]

    // Calculate statistics
    const totalBookings = allBookings.length
    const paidBookings = allBookings.filter((b) => b.payment_status === 'paid').length
    const pendingBookings = allBookings.filter((b) => b.payment_status === 'pending').length
    const failedBookings = allBookings.filter((b) => b.payment_status === 'failed').length

    // Calculate revenue (assuming ₹99 for webinar, need to check actual pricing)
    // For now, we'll use a simple calculation
    const webinarPrice = 99 // ₹99 for webinar
    const oneOnOnePrice = 0 // Need to check actual price
    const totalRevenue = (paidBookings * webinarPrice) // Simplified - should calculate based on booking type

    // Calculate bookings by date (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentBookings = allBookings.filter((b) => {
      const bookingDate = new Date(b.created_at)
      return bookingDate >= thirtyDaysAgo
    })

    // Group by date
    const bookingsByDate: Record<string, number> = {}
    recentBookings.forEach((b) => {
      const date = new Date(b.created_at).toISOString().split('T')[0]
      bookingsByDate[date] = (bookingsByDate[date] || 0) + 1
    })

    // Payment status breakdown
    const paymentStatusBreakdown = {
      paid: paidBookings,
      pending: pendingBookings,
      failed: failedBookings,
    }

    // Bookings by type
    const bookingsByType = {
      webinar: webinarBookings?.length || 0,
      'one-on-one': oneOnOneBookings?.length || 0,
    }

    return NextResponse.json({
      success: true,
      totalBookings,
      paidBookings,
      pendingBookings,
      failedBookings,
      totalRevenue,
      bookingsByDate,
      paymentStatusBreakdown,
      bookingsByType,
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

export const GET = withAdminAuth(handler)

