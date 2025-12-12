import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { getBookingByOrderId, updateBookingByOrderId } from '@/lib/db-helpers'
import { generateCalendarInvite } from '@/lib/calendar'
import { sendCalendarInviteEmail } from '@/lib/email'
import { WebinarBooking } from '@/lib/db'

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
    let booking = await getBookingByOrderId(razorpay_order_id)

    // If booking doesn't exist, create it from Razorpay order notes
    if (!booking) {
      try {
        // Fetch order details from Razorpay to get user information
        const order = await razorpay.orders.fetch(razorpay_order_id)
        const notes = order.notes as Record<string, string> | null
        
        if (notes && notes.user_name && notes.user_email && notes.user_phone && notes.selected_date && notes.selected_time) {
          const { createBooking } = await import('@/lib/db-helpers')
          booking = await createBooking({
            user_name: notes.user_name,
            user_email: notes.user_email,
            user_phone: notes.user_phone,
            selected_date: notes.selected_date,
            selected_time: notes.selected_time,
            razorpay_order_id: razorpay_order_id,
            zoom_registration_link: notes.zoom_registration_link || undefined,
          })
          console.log('Created booking from Razorpay order notes:', booking.id)
        } else {
          return NextResponse.json(
            { error: 'Booking not found and cannot be created from order data' },
            { status: 404 }
          )
        }
      } catch (createError) {
        console.error('Error creating booking from order:', createError)
        return NextResponse.json(
          { error: 'Booking not found and failed to create from order data' },
          { status: 404 }
        )
      }
    }

    // Update booking with payment details
    // Use Zoom registration link (always use the registration link)
    // First check booking, then Razorpay order notes, then env, then default
    let zoomRegistrationLink: string
    
    const bookingWithZoom = booking as WebinarBooking & { zoom_registration_link?: string | null }
    
    if (bookingWithZoom.zoom_registration_link) {
      zoomRegistrationLink = bookingWithZoom.zoom_registration_link
    } else {
      // Try to get from Razorpay order notes if not in booking
      try {
        const order = await razorpay.orders.fetch(razorpay_order_id)
        const notes = order.notes as Record<string, string> | null
        if (notes?.zoom_registration_link) {
          zoomRegistrationLink = notes.zoom_registration_link
        } else {
          zoomRegistrationLink = process.env.ZOOM_REGISTRATION_LINK || 
                                 'https://us06web.zoom.us/meeting/register/oc2syBDwTkWNTu0dhVd4qA'
        }
      } catch (error) {
        console.error('Error fetching order notes for Zoom link:', error)
        zoomRegistrationLink = process.env.ZOOM_REGISTRATION_LINK || 
                               'https://us06web.zoom.us/meeting/register/oc2syBDwTkWNTu0dhVd4qA'
      }
    }
    
    const meetLink = zoomRegistrationLink
    
    // Update booking with payment details (try to include zoom_registration_link if column exists)
    const updateData: Partial<WebinarBooking & { zoom_registration_link?: string }> = {
      razorpay_payment_id,
      payment_status: 'paid',
      meet_link: meetLink,
    }
    
    // Store the Zoom link in the booking for future reference
    updateData.zoom_registration_link = zoomRegistrationLink
    
    await updateBookingByOrderId(razorpay_order_id, updateData)

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

