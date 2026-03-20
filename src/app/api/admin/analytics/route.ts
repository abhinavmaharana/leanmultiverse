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

    // Calculate statistics
    const totalBookings = webinarBookings?.length || 0
    const paidBookings = (webinarBookings || []).filter((b) => b.payment_status === 'paid').length
    const pendingBookings = (webinarBookings || []).filter((b) => b.payment_status === 'pending').length
    const failedBookings = (webinarBookings || []).filter((b) => b.payment_status === 'failed').length

    // Calculate revenue (₹9 for webinar)
    const webinarPrice = 9 // ₹9 for webinar
    const paidWebinarCount = paidBookings
    const webinarRevenue = paidWebinarCount * webinarPrice
    const totalRevenue = webinarRevenue

    // Calculate bookings by date (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentBookings = (webinarBookings || []).filter((b) => {
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
    }

    return NextResponse.json({
      success: true,
      totalBookings,
      paidBookings,
      pendingBookings,
      failedBookings,
      totalRevenue,
      webinarRevenue,
      paidWebinarCount,
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

