import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { getBookingByOrderId, updateBookingByOrderId } from '@/lib/db-helpers'
import { generateCalendarInvite } from '@/lib/calendar'
import { generateMeetLink } from '@/lib/meet-link'
import { sendCalendarInviteEmail } from '@/lib/email'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

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

    // Capture the payment (if not already captured)
    try {
      const payment = await razorpay.payments.fetch(razorpay_payment_id)
      if (payment.status === 'authorized') {
        // Payment is authorized but not captured, capture it now
        // Razorpay capture requires: payment_id, amount, currency
        await razorpay.payments.capture(razorpay_payment_id, payment.amount, payment.currency || 'INR')
        console.log('Payment captured successfully:', razorpay_payment_id)
      } else if (payment.status === 'captured') {
        console.log('Payment already captured:', razorpay_payment_id)
      }
    } catch (error) {
      console.error('Error capturing payment:', error)
      // Don't fail if capture fails, payment might already be captured
      // Continue with the verification process
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
    let meetLink: string
    try {
      meetLink = await generateMeetLink(booking)
    } catch (error) {
      console.error('Error generating meet link:', error)
      // Use fallback meeting URL if Zoom API fails
      meetLink = process.env.ZOOM_MEETING_URL || 'https://zoom.us/j/YOUR_MEETING_ID'
    }
    
    await updateBookingByOrderId(razorpay_order_id, {
      razorpay_payment_id,
      payment_status: 'paid',
      meet_link: meetLink,
    })

    // Generate calendar invite
    let calendarInvite: string
    try {
      calendarInvite = await generateCalendarInvite({
        id: booking.id,
        user_name: booking.user_name,
        user_email: booking.user_email,
        selected_date: booking.selected_date,
        selected_time: booking.selected_time,
        meet_link: meetLink,
      })
    } catch (error) {
      console.error('Error generating calendar invite:', error)
      throw new Error(`Failed to generate calendar invite: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // Send email with calendar invite
    try {
      console.log('Attempting to send email to:', booking.user_email)
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
      console.log('Email sent successfully and marked as sent in database')
    } catch (error) {
      console.error('Error sending email:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      const errorStack = error instanceof Error ? error.stack : undefined
      
      // Log detailed error for debugging
      console.error('Email sending error details:', {
        message: errorMessage,
        stack: errorStack,
        email: booking.user_email,
        timestamp: new Date().toISOString(),
      })
      
      // Don't fail the payment verification if email fails
      // Payment is already verified, email can be sent later
      console.warn('Payment verified but email sending failed. Booking is still confirmed.')
      console.warn('You can manually send the email later or check Resend dashboard for details.')
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and booking confirmed',
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to verify payment'
    const errorStack = error instanceof Error ? error.stack : undefined
    
    // Log detailed error for debugging
    console.error('Payment verification error details:', {
      message: errorMessage,
      stack: errorStack,
      timestamp: new Date().toISOString(),
    })
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? errorStack : undefined
      },
      { status: 500 }
    )
  }
}

