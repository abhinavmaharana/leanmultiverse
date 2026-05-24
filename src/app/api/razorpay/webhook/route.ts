import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getBookingByOrderId, updateBookingByOrderId } from '@/lib/db-helpers'
import { generateCalendarInvite } from '@/lib/calendar'
import { sendCalendarInviteEmail } from '@/lib/email'

const WHATSAPP_COMMUNITY_LINK = 'https://chat.whatsapp.com/EGwzsvlQJoS4qjDraMraHG'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-razorpay-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || ''
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex')

    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    const event = JSON.parse(body)
    const { event: eventType, payload } = event

    // Handle payment.captured event
    if (eventType === 'payment.captured') {
      const payment = payload.payment.entity
      const orderId = payment.order_id

      // Get booking from database
      const booking = await getBookingByOrderId(orderId)

      if (!booking) {
        console.error(`Booking not found for order: ${orderId}`)
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        )
      }

      // Skip if already processed
      if (booking.payment_status === 'paid') {
        return NextResponse.json({ success: true, message: 'Already processed' })
      }

      // Mark payment as paid in DB
      await updateBookingByOrderId(orderId, {
        razorpay_payment_id: payment.id,
        payment_status: 'paid',
      })

      // Send confirmation email via EmailJS with WhatsApp link as the join button
      try {
        const calendarInvite = await generateCalendarInvite({
          id: booking.id,
          user_name: booking.user_name,
          user_email: booking.user_email,
          selected_date: booking.selected_date,
          selected_time: booking.selected_time,
          meet_link: WHATSAPP_COMMUNITY_LINK,
        })
        await sendCalendarInviteEmail({
          to: booking.user_email,
          name: booking.user_name,
          date: booking.selected_date,
          time: booking.selected_time,
          meetLink: WHATSAPP_COMMUNITY_LINK,
          calendarInvite,
        })
        console.log('✅ EmailJS confirmation sent to:', booking.user_email)
      } catch (emailErr) {
        console.error('Failed to send EmailJS email (payment still confirmed):', emailErr)
      }

      return NextResponse.json({ success: true })
    }

    // Handle payment.failed event
    if (eventType === 'payment.failed') {
      const payment = payload.payment.entity
      const orderId = payment.order_id

      const booking = await getBookingByOrderId(orderId)
      if (booking) {
        await updateBookingByOrderId(orderId, {
          payment_status: 'failed',
        })
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: true, message: 'Event not handled' })
  } catch (error) {
    console.error('Webhook error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Webhook processing failed'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

