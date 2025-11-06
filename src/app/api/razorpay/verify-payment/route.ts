import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getBookingByOrderId, updateBookingByOrderId } from '@/lib/db-helpers'
import { generateCalendarInvite } from '@/lib/calendar'
import { generateMeetLink } from '@/lib/meet-link'
import { sendCalendarInviteEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Payment verification data missing' },
        { status: 400 }
      )
    }

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(text)
      .digest('hex')

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Get booking from database
    const booking = await getBookingByOrderId(razorpay_order_id)

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Update booking with payment details
    const meetLink = await generateMeetLink(booking)
    
    await updateBookingByOrderId(razorpay_order_id, {
      razorpay_payment_id,
      payment_status: 'paid',
      meet_link: meetLink,
    })

    // Generate calendar invite
    const calendarInvite = await generateCalendarInvite({
      id: booking.id,
      user_name: booking.user_name,
      user_email: booking.user_email,
      selected_date: booking.selected_date,
      selected_time: booking.selected_time,
      meet_link: meetLink,
    })

    // Send email with calendar invite
    await sendCalendarInviteEmail({
      to: booking.user_email,
      name: booking.user_name,
      date: booking.selected_date,
      time: booking.selected_time,
      meetLink: meetLink,
      calendarInvite: calendarInvite,
    })

    // Mark calendar invite as sent
    await updateBookingByOrderId(razorpay_order_id, {
      calendar_invite_sent: true,
    })

    return NextResponse.json({
      success: true,
      message: 'Payment verified and booking confirmed',
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to verify payment'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

