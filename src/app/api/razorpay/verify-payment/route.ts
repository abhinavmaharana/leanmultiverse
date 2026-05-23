import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { getBookingByOrderId, updateBookingByOrderId } from '@/lib/db-helpers'
import { generateCalendarInvite } from '@/lib/calendar'
import { sendCalendarInviteEmail } from '@/lib/email'
import { WebinarBooking } from '@/lib/db'
import { getZoomLinkForDatePaid } from '@/lib/webinar-config'
import { sendMetaLeadEvent } from '@/lib/facebook-capi'


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
    let booking: any = null;
    try {
      booking = await getBookingByOrderId(razorpay_order_id)
    } catch (e) {
      console.warn("Database error (continuing with verification):", e);
    }

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
              order_notes: orderNotes,
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
      zoomRegistrationLink = getZoomLinkForDatePaid(bookingData.selected_date)
      console.log(`Calculated Zoom link for date ${bookingData.selected_date}: ${zoomRegistrationLink}`)
    } else {
      zoomRegistrationLink = process.env.ZOOM_REGISTRATION_LINK || 'https://us06web.zoom.us/meeting/register/xSVaZSmIS6-k8D55Xc7ryA'
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
      
      try {
        await updateBookingByOrderId(razorpay_order_id, updateData)
      } catch (updateError) {
        console.warn('Database error updating booking (continuing):', updateError)
      }
    }

    // Send server-side CRM Lead event to Meta (non-blocking)
    if (bookingData?.user_email && bookingData?.user_phone) {
      sendMetaLeadEvent({
        email: String(bookingData.user_email),
        phone: String(bookingData.user_phone),
        lead_id: bookingData.id,
        event_name: 'Purchase' // or Lead, using Purchase since they paid
      }).catch(err => console.error('Failed to send Meta CAPI Purchase Event:', err))
    }

    // Email sending has been disabled as per requirements.
    // We only rely on the WhatsApp community redirect on the success page.

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

