import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { getBookingByOrderId, updateBookingByOrderId } from '@/lib/db-helpers'
import { generateCalendarInvite } from '@/lib/calendar'
import { sendCalendarInviteEmail } from '@/lib/email'
import { WebinarBooking } from '@/lib/db'

// Zoom registration links mapped by date
const ZOOM_LINKS: Record<string, string> = {
  '20': 'https://us06web.zoom.us/meeting/register/7_BwX278QL6XL0DFIdRCBA',
  '27': 'https://us06web.zoom.us/meeting/register/4uacbLXgTTO0ZVf80rn84g',
  '3': 'https://us06web.zoom.us/meeting/register/RVGi4wsHSO6sMUVLQ3kOAA',
  '10': 'https://us06web.zoom.us/meeting/register/PgEF0RlUT5uHSfiZcIkS2w',
  '17': 'https://us06web.zoom.us/meeting/register/PQcno5-aQFCXfiiU_UEGTA',
  '24': 'https://us06web.zoom.us/meeting/register/1_8YK9pZRqi7jShOgQtx4w',
}

// Get Zoom link for a specific date
function getZoomLinkForDate(dateStr: string): string {
  try {
    // Parse date string (format: YYYY-MM-DD) - extract day directly to avoid timezone issues
    const [year, month, day] = dateStr.split('-').map(Number)
    const dayStr = day.toString()
    
    console.log(`Verify-payment: Getting Zoom link for date: ${dateStr}, extracted day: ${dayStr}`)
    
    // Check if we have a link for this day
    if (ZOOM_LINKS[dayStr]) {
      console.log(`Verify-payment: Found Zoom link for day ${dayStr}: ${ZOOM_LINKS[dayStr]}`)
      return ZOOM_LINKS[dayStr]
    }
    
    // Default fallback to December 20th
    console.log(`Verify-payment: No Zoom link found for day ${dayStr}, using default`)
    return ZOOM_LINKS['20'] || 'https://us06web.zoom.us/meeting/register/7_BwX278QL6XL0DFIdRCBA'
  } catch (error) {
    console.error('Verify-payment: Error parsing date for Zoom link:', error, 'dateStr:', dateStr)
    return ZOOM_LINKS['20'] || 'https://us06web.zoom.us/meeting/register/7_BwX278QL6XL0DFIdRCBA'
  }
}

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
    let orderNotes: Record<string, string> | null = null
    if (!booking) {
      try {
        // Fetch order details from Razorpay to get user information
        const order = await razorpay.orders.fetch(razorpay_order_id)
        orderNotes = order.notes as Record<string, string> | null
        
        if (orderNotes && orderNotes.user_name && orderNotes.user_email && orderNotes.user_phone && orderNotes.selected_date && orderNotes.selected_time) {
          const { createBooking } = await import('@/lib/db-helpers')
          try {
            booking = await createBooking({
              user_name: orderNotes.user_name,
              user_email: orderNotes.user_email,
              user_phone: orderNotes.user_phone,
              selected_date: orderNotes.selected_date,
              selected_time: orderNotes.selected_time,
              razorpay_order_id: razorpay_order_id,
              zoom_registration_link: orderNotes.zoom_registration_link || undefined,
            })
            console.log('Created booking from Razorpay order notes:', booking.id)
          } catch (createError) {
            console.error('Error creating booking from order (will use order notes for email):', createError)
            // Continue with order notes - we can still send the email
            booking = null
          }
        } else {
          return NextResponse.json(
            { error: 'Booking not found and cannot be created from order data' },
            { status: 404 }
          )
        }
      } catch (fetchError) {
        console.error('Error fetching order from Razorpay:', fetchError)
        return NextResponse.json(
          { error: 'Booking not found and failed to fetch order data' },
          { status: 404 }
        )
      }
    }
    
    // If we still don't have a booking but have order notes, use order notes for email
    const bookingData = booking || (orderNotes ? {
      user_name: orderNotes.user_name,
      user_email: orderNotes.user_email,
      user_phone: orderNotes.user_phone,
      selected_date: orderNotes.selected_date,
      selected_time: orderNotes.selected_time,
      id: `temp_${razorpay_order_id}`,
    } : null)
    
    if (!bookingData) {
      return NextResponse.json(
        { error: 'Booking not found and no order data available' },
        { status: 404 }
      )
    }

    // Update booking with payment details
    // Use Zoom registration link (always use the registration link)
    // Priority: booking -> order notes -> calculate from date -> env -> default
    let zoomRegistrationLink: string
    
    const bookingWithZoom = booking as (WebinarBooking & { zoom_registration_link?: string | null }) | null
    
    if (bookingWithZoom?.zoom_registration_link) {
      zoomRegistrationLink = bookingWithZoom.zoom_registration_link
    } else if (orderNotes?.zoom_registration_link) {
      zoomRegistrationLink = orderNotes.zoom_registration_link
    } else if (bookingData.selected_date) {
      // Calculate Zoom link based on selected date
      zoomRegistrationLink = getZoomLinkForDate(bookingData.selected_date)
      console.log(`Calculated Zoom link for date ${bookingData.selected_date}: ${zoomRegistrationLink}`)
    } else {
      zoomRegistrationLink = process.env.ZOOM_REGISTRATION_LINK || 
                             'https://us06web.zoom.us/meeting/register/oc2syBDwTkWNTu0dhVd4qA'
    }
    
    const meetLink = zoomRegistrationLink
    
    // Update booking with payment details (only if booking exists)
    if (booking) {
      const updateData: Partial<WebinarBooking & { zoom_registration_link?: string }> = {
        razorpay_payment_id,
        payment_status: 'paid',
        meet_link: meetLink,
      }
      
      // Store the Zoom link in the booking for future reference
      updateData.zoom_registration_link = zoomRegistrationLink
      
      await updateBookingByOrderId(razorpay_order_id, updateData)
    }

    // Generate calendar invite
    let calendarInvite: string
    try {
      calendarInvite = await generateCalendarInvite({
        id: bookingData.id,
        user_name: bookingData.user_name,
        user_email: bookingData.user_email,
        selected_date: bookingData.selected_date,
        selected_time: bookingData.selected_time,
        meet_link: meetLink,
      })
    } catch (error) {
      console.error('Error generating calendar invite:', error)
      throw new Error(`Failed to generate calendar invite: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // Send email with calendar invite
    try {
      console.log('Attempting to send email to:', bookingData.user_email)
      await sendCalendarInviteEmail({
        to: bookingData.user_email,
        name: bookingData.user_name,
        date: bookingData.selected_date,
        time: bookingData.selected_time,
        meetLink: meetLink,
        calendarInvite: calendarInvite,
      })
      
      // Mark calendar invite as sent (only if booking exists)
      if (booking) {
        await updateBookingByOrderId(razorpay_order_id, {
          calendar_invite_sent: true,
        })
      }
      console.log('Email sent successfully and marked as sent in database')
    } catch (error) {
      console.error('Error sending email:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      const errorStack = error instanceof Error ? error.stack : undefined
      
      // Log detailed error for debugging
      console.error('Email sending error details:', {
        message: errorMessage,
        stack: errorStack,
        email: bookingData.user_email,
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

