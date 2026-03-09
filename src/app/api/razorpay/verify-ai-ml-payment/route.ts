import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { getAiMlWebinarBookingByOrderId, updateAiMlWebinarBookingByOrderId, createAiMlWebinarBooking } from '@/lib/db-helpers'
import { generateCalendarInvite } from '@/lib/calendar'
import { sendCalendarInviteEmail } from '@/lib/email'
import { getZoomLinkForDateAiMl } from '@/lib/ai-ml-webinar-config'

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
        await razorpay.payments.capture(razorpay_payment_id, payment.amount, payment.currency || 'INR')
        console.log('AI/ML payment captured successfully:', razorpay_payment_id)
      } else if (payment.status === 'captured') {
        console.log('AI/ML payment already captured:', razorpay_payment_id)
      }
    } catch (error) {
      console.error('Error capturing AI/ML payment:', error)
    }

    // Get booking from database
    let booking = await getAiMlWebinarBookingByOrderId(razorpay_order_id)
    let orderNotes: Record<string, string> | null = null

    // If booking doesn't exist, create from Razorpay order notes
    if (!booking) {
      try {
        const order = await razorpay.orders.fetch(razorpay_order_id)
        orderNotes = order.notes as Record<string, string> | null

        if (orderNotes?.user_name && orderNotes?.user_email && orderNotes?.selected_date && orderNotes?.selected_time) {
          try {
            booking = await createAiMlWebinarBooking({
              user_name: orderNotes.user_name,
              user_email: orderNotes.user_email,
              user_phone: orderNotes.user_phone,
              selected_date: orderNotes.selected_date,
              selected_time: orderNotes.selected_time,
              razorpay_order_id: razorpay_order_id,
              zoom_registration_link: orderNotes.zoom_registration_link || undefined,
              order_notes: typeof order.notes === 'object' && order.notes !== null ? order.notes as Record<string, string> : undefined,
            })
            console.log('Created AI/ML booking from Razorpay order notes:', booking.id)
          } catch (createError) {
            console.error('Error creating AI/ML booking (will use order notes for email):', createError)
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

    // Fallback: use order notes if booking still missing
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

    // Determine Zoom registration link for this date
    const zoomRegistrationLink =
      (booking as any)?.zoom_registration_link ||
      orderNotes?.zoom_registration_link ||
      getZoomLinkForDateAiMl(bookingData.selected_date)

    // Update booking with payment details
    if (booking) {
      await updateAiMlWebinarBookingByOrderId(razorpay_order_id, {
        razorpay_payment_id,
        payment_status: 'paid',
        meet_link: zoomRegistrationLink,
        zoom_registration_link: zoomRegistrationLink,
      })
    }

    // Generate calendar invite (AI/ML specific title & description)
    let calendarInvite: string
    try {
      calendarInvite = await generateCalendarInvite({
        id: bookingData.id,
        user_name: bookingData.user_name,
        user_email: bookingData.user_email,
        selected_date: bookingData.selected_date,
        selected_time: bookingData.selected_time,
        meet_link: zoomRegistrationLink,
        title: 'Lean Multiverse — AI/ML Webinar',
        description: `Join us for an exclusive AI/ML Webinar led by industry experts from Deloitte, Google & more.

Topics Covered:
- Foundations of AI & Machine Learning
- Enterprise AI Systems in Production
- Azure AI & AWS ML Certification Pathways
- Agentic AI & Intelligent Automation

Zoom Registration Link: ${zoomRegistrationLink}

We look forward to seeing you there!`,
      })
    } catch (error) {
      console.error('Error generating AI/ML calendar invite:', error)
      throw new Error(`Failed to generate calendar invite: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // Send confirmation email with calendar invite
    try {
      console.log('Sending AI/ML confirmation email to:', bookingData.user_email)
      await sendCalendarInviteEmail({
        to: bookingData.user_email,
        name: bookingData.user_name,
        date: bookingData.selected_date,
        time: bookingData.selected_time,
        meetLink: zoomRegistrationLink,
        calendarInvite: calendarInvite,
      })

      // Mark calendar invite as sent
      if (booking) {
        await updateAiMlWebinarBookingByOrderId(razorpay_order_id, {
          calendar_invite_sent: true,
        })
      }
      console.log('AI/ML email sent and marked in database')
    } catch (error) {
      // Don't fail the payment verification if email fails
      console.error('Error sending AI/ML email:', error)
      console.warn('Payment verified but email sending failed. Booking is still confirmed.')
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and AI/ML booking confirmed',
      bookingId: bookingData.id,
    })
  } catch (error) {
    console.error('Error verifying AI/ML payment:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to verify payment'

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
