import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/admin-middleware'
import { supabase } from '@/lib/db'

/**
 * Check payment data in database
 * This endpoint helps verify what payment data exists
 */
async function handler(request: NextRequest) {
  try {
    // Fetch all webinar bookings with payment details
    const { data: webinarBookings, error: webinarError } = await supabase
      .from('webinar_bookings')
      .select('id, user_email, payment_status, razorpay_order_id, razorpay_payment_id, created_at')
      .order('created_at', { ascending: false })

    if (webinarError) {
      console.error('Error fetching webinar bookings:', webinarError)
    }

    // Fetch all one-on-one bookings with payment details
    const { data: oneOnOneBookings, error: oneOnOneError } = await supabase
      .from('one_on_one_bookings')
      .select('id, user_email, payment_status, razorpay_order_id, razorpay_payment_id, created_at')
      .order('created_at', { ascending: false })

    if (oneOnOneError) {
      console.error('Error fetching one-on-one bookings:', oneOnOneError)
    }

    // Analyze payment statuses
    const webinarStatusCounts = {
      paid: 0,
      pending: 0,
      failed: 0,
      withPaymentId: 0,
      withOrderId: 0,
    }

    const oneOnOneStatusCounts = {
      paid: 0,
      pending: 0,
      failed: 0,
      withPaymentId: 0,
      withOrderId: 0,
    }

    ;(webinarBookings || []).forEach((booking) => {
      if (booking.payment_status === 'paid') webinarStatusCounts.paid++
      if (booking.payment_status === 'pending') webinarStatusCounts.pending++
      if (booking.payment_status === 'failed') webinarStatusCounts.failed++
      if (booking.razorpay_payment_id) webinarStatusCounts.withPaymentId++
      if (booking.razorpay_order_id) webinarStatusCounts.withOrderId++
    })

    ;(oneOnOneBookings || []).forEach((booking) => {
      if (booking.payment_status === 'paid') oneOnOneStatusCounts.paid++
      if (booking.payment_status === 'pending') oneOnOneStatusCounts.pending++
      if (booking.payment_status === 'failed') oneOnOneStatusCounts.failed++
      if (booking.razorpay_payment_id) oneOnOneStatusCounts.withPaymentId++
      if (booking.razorpay_order_id) oneOnOneStatusCounts.withOrderId++
    })

    // Find suspicious entries (paid but no payment ID, or payment ID but not paid)
    const suspiciousWebinars = (webinarBookings || []).filter(
      (b) =>
        (b.payment_status === 'paid' && !b.razorpay_payment_id) ||
        (b.razorpay_payment_id && b.payment_status !== 'paid')
    )

    const suspiciousOneOnOne = (oneOnOneBookings || []).filter(
      (b) =>
        (b.payment_status === 'paid' && !b.razorpay_payment_id) ||
        (b.razorpay_payment_id && b.payment_status !== 'paid')
    )

    return NextResponse.json({
      success: true,
      summary: {
        totalWebinars: webinarBookings?.length || 0,
        totalOneOnOne: oneOnOneBookings?.length || 0,
      },
      webinarStatusCounts,
      oneOnOneStatusCounts,
      suspiciousEntries: {
        webinars: suspiciousWebinars.length,
        oneOnOne: suspiciousOneOnOne.length,
        details: {
          // Deduplicate by ID to avoid showing same entry multiple times
          webinars: Array.from(
            new Map(suspiciousWebinars.map((b) => [b.id, b])).values()
          ).slice(0, 10),
          oneOnOne: Array.from(
            new Map(suspiciousOneOnOne.map((b) => [b.id, b])).values()
          ).slice(0, 10),
        },
      },
      samplePaidWebinars: Array.from(
        new Map(
          (webinarBookings || [])
            .filter((b) => b.payment_status === 'paid')
            .map((b) => [b.id, b])
        ).values()
      ).slice(0, 5),
      samplePaidOneOnOne: Array.from(
        new Map(
          (oneOnOneBookings || [])
            .filter((b) => b.payment_status === 'paid')
            .map((b) => [b.id, b])
        ).values()
      ).slice(0, 5),
    })
  } catch (error) {
    console.error('Error checking payments:', error)
    return NextResponse.json({ error: 'Failed to check payments' }, { status: 500 })
  }
}

export const GET = withAdminAuth(handler)

