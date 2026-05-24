import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { getBookingByOrderId, updateBookingByOrderId } from '@/lib/db-helpers'
import { generateCalendarInvite } from '@/lib/calendar'
import { sendCalendarInviteEmail } from '@/lib/email'
import { sendMetaLeadEvent } from '@/lib/facebook-capi'
import { withTimeout } from '@/lib/http-utils'

const WHATSAPP_COMMUNITY_LINK = 'https://chat.whatsapp.com/EGwzsvlQJoS4qjDraMraHG'


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

export async function POST(request: NextRequest) {
  try {
    let body: any
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid or empty request body' },
        { status: 400 }
      )
    }

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
    let dbDown = false;
    try {
      booking = await withTimeout(getBookingByOrderId(razorpay_order_id), 2000)
    } catch (e) {
      console.warn("Database error (continuing with verification):", e);
      dbDown = true;
    }

    // If booking doesn't exist, create it from Razorpay order notes
    let orderNotes: Record<string, string> | null = null
    if (!booking) {
      try {
        // Fetch order details from Razorpay to get user information
        const order = await razorpay.orders.fetch(razorpay_order_id)
        orderNotes = order.notes as Record<string, string> | null
        
        if (orderNotes && orderNotes.user_name && orderNotes.user_email && orderNotes.user_phone && orderNotes.selected_date && orderNotes.selected_time) {
          if (!dbDown) {
            const { createBooking } = await import('@/lib/db-helpers')
            try {
              booking = await withTimeout(createBooking({
                user_name: orderNotes.user_name,
                user_email: orderNotes.user_email,
                user_phone: orderNotes.user_phone,
                selected_date: orderNotes.selected_date,
                selected_time: orderNotes.selected_time,
                razorpay_order_id: razorpay_order_id,
                zoom_registration_link: orderNotes.zoom_registration_link || undefined,
                order_notes: orderNotes,
              }), 2000)
              console.log('Created booking from Razorpay order notes:', booking.id)
            } catch (createError) {
              console.error('Error creating booking from order (will use order notes for email):', createError)
              booking = null
            }
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

    // Update booking with payment details (only if booking exists)
    if (booking && !dbDown) {
      try {
        await withTimeout(updateBookingByOrderId(razorpay_order_id, {
          razorpay_payment_id,
          payment_status: 'paid',
        }), 2000)
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

    // Send confirmation email via EmailJS with WhatsApp link as the join button (non-blocking)
    if (bookingData?.user_email && bookingData?.user_name && bookingData?.selected_date && bookingData?.selected_time) {
      ;(async () => {
        try {
          const calendarInvite = await generateCalendarInvite({
            id: bookingData.id,
            user_name: String(bookingData.user_name),
            user_email: String(bookingData.user_email),
            selected_date: String(bookingData.selected_date),
            selected_time: String(bookingData.selected_time),
            meet_link: WHATSAPP_COMMUNITY_LINK,
          })
          await sendCalendarInviteEmail({
            to: String(bookingData.user_email),
            name: String(bookingData.user_name),
            date: String(bookingData.selected_date),
            time: String(bookingData.selected_time),
            meetLink: WHATSAPP_COMMUNITY_LINK,
            calendarInvite,
          })
          console.log('✅ EmailJS confirmation sent to:', bookingData.user_email)
        } catch (err) {
          console.error('Failed to send EmailJS confirmation email:', err)
        }
      })()
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

