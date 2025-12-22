import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { supabase } from '@/lib/db'
import { generateCalendarInvite } from '@/lib/calendar'
import { sendCalendarInviteEmail } from '@/lib/email'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

// Generate meeting link for one-on-one sessions
function generateMeetingLink(email: string, date: string, time: string): string {
  // Use Outlook booking link for one-on-one sessions
  const outlookBookingLink = process.env.ONE_ON_ONE_OUTLOOK_LINK || 'https://outlook.office.com/book/FutureManagersProductProjectManagementSessions@leanmultiverse.com/s/Joc-_JMSnkuA8o9BCRBMiw2'
  return outlookBookingLink
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      booking_id,
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
        await razorpay.payments.capture(razorpay_payment_id, payment.amount, payment.currency || 'INR')
        console.log('Payment captured successfully:', razorpay_payment_id)
      } else if (payment.status === 'captured') {
        console.log('Payment already captured:', razorpay_payment_id)
      }
    } catch (error) {
      console.error('Error capturing payment:', error)
    }

    // Get booking from database
    let booking
    if (booking_id && !booking_id.startsWith('temp_')) {
      const { data: bookingData, error: bookingError } = await supabase
        .from('one_on_one_bookings')
        .select('*')
        .eq('id', booking_id)
        .single()

      if (!bookingError && bookingData) {
        booking = bookingData
      }
    }

    // If booking doesn't exist, try to get by order ID
    if (!booking) {
      const { data: bookingData, error: bookingError } = await supabase
        .from('one_on_one_bookings')
        .select('*')
        .eq('razorpay_order_id', razorpay_order_id)
        .single()

      if (!bookingError && bookingData) {
        booking = bookingData
      }
    }

    // If still no booking, create from Razorpay order notes
    let orderNotes: Record<string, string> | null = null
    if (!booking) {
      try {
        const order = await razorpay.orders.fetch(razorpay_order_id)
        orderNotes = (order.notes as Record<string, string>) || {}
        
        const bookingData = {
          user_name: orderNotes.user_name || '',
          user_email: orderNotes.user_email || '',
          user_phone: orderNotes.user_phone || '',
          selected_date: orderNotes.selected_date || '',
          selected_time: orderNotes.selected_time || '',
          razorpay_order_id,
          booking_type: 'one-on-one',
          payment_status: 'pending',
          meet_link: null,
          calendar_invite_sent: false,
        }

        const { data: newBooking, error: insertError } = await supabase
          .from('one_on_one_bookings')
          .insert([bookingData])
          .select()
          .single()

        if (!insertError && newBooking) {
          booking = newBooking
        }
      } catch (error) {
        console.error('Error fetching order or creating booking:', error)
      }
    }

    if (!booking && !orderNotes) {
      return NextResponse.json(
        { error: 'Booking not found and no order data available' },
        { status: 404 }
      )
    }

    // Generate meeting link
    const bookingData = booking || {
      user_email: orderNotes?.user_email || '',
      selected_date: orderNotes?.selected_date || '',
      selected_time: orderNotes?.selected_time || '',
    }
    
    const meetLink = generateMeetingLink(
      bookingData.user_email,
      bookingData.selected_date,
      bookingData.selected_time
    )

    // Update booking with payment details
    const updateData: {
      razorpay_payment_id: string
      payment_status: 'paid'
      meet_link: string
    } = {
      razorpay_payment_id,
      payment_status: 'paid',
      meet_link: meetLink,
    }

    let updatedBooking
    if (booking?.id) {
      const { data: updated, error: updateError } = await supabase
        .from('one_on_one_bookings')
        .update(updateData)
        .eq('id', booking.id)
        .select()
        .single()

      if (!updateError && updated) {
        updatedBooking = updated
      }
    } else if (razorpay_order_id) {
      const { data: updated, error: updateError } = await supabase
        .from('one_on_one_bookings')
        .update(updateData)
        .eq('razorpay_order_id', razorpay_order_id)
        .select()
        .single()

      if (!updateError && updated) {
        updatedBooking = updated
      }
    }

    // Send calendar invite email
    try {
      const finalBooking = updatedBooking || booking
      if (finalBooking && finalBooking.user_email && finalBooking.selected_date && finalBooking.selected_time) {
        const calendarInvite = await generateCalendarInvite({
          user_name: finalBooking.user_name,
          user_email: finalBooking.user_email,
          selected_date: finalBooking.selected_date,
          selected_time: finalBooking.selected_time,
          meet_link: meetLink,
          title: 'One-on-One Session - Lean Multiverse',
          description: 'Personalized career guidance session with our expert.',
          duration: 1, // 1 hour for one-on-one
          organizer: {
            name: 'Lean Multiverse',
            email: process.env.ORGANIZER_EMAIL || 'support@leanmultiverse.com',
          },
          attendee: {
            name: finalBooking.user_name,
            email: finalBooking.user_email,
          },
        })

        await sendCalendarInviteEmail({
          to: finalBooking.user_email,
          name: finalBooking.user_name,
          date: finalBooking.selected_date,
          time: finalBooking.selected_time,
          meetLink: meetLink,
          calendarInvite: calendarInvite,
          bookingType: 'one-on-one',
        })

        // Update calendar invite sent status
        if (finalBooking.id) {
          await supabase
            .from('one_on_one_bookings')
            .update({ calendar_invite_sent: true })
            .eq('id', finalBooking.id)
        }
      }
    } catch (emailError) {
      console.error('Error sending calendar invite email:', emailError)
      // Don't fail the payment verification if email fails
    }

    return NextResponse.json({
      success: true,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      booking: updatedBooking || booking,
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Payment verification failed'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

