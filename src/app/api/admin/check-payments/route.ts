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


    // Analyze payment statuses
    const webinarStatusCounts = {
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

    // Find suspicious entries (paid but no payment ID, or payment ID but not paid)
    const suspiciousWebinars = (webinarBookings || []).filter(
      (b) =>
        (b.payment_status === 'paid' && !b.razorpay_payment_id) ||
        (b.razorpay_payment_id && b.payment_status !== 'paid')
    )

    return NextResponse.json({
      success: true,
      summary: {
        totalWebinars: webinarBookings?.length || 0,
      },
      webinarStatusCounts,
      suspiciousEntries: {
        webinars: suspiciousWebinars.length,
        details: {
          // Deduplicate by ID to avoid showing same entry multiple times
          webinars: Array.from(
            new Map(suspiciousWebinars.map((b) => [b.id, b])).values()
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
    })
  } catch (error) {
    console.error('Error checking payments:', error)
    return NextResponse.json({ error: 'Failed to check payments' }, { status: 500 })
  }
}

export const GET = withAdminAuth(handler)

