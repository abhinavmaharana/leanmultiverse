import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getBookingByOrderId, updateBookingByOrderId } from '@/lib/db-helpers'
import { generateCalendarInvite } from '@/lib/calendar'
import { generateMeetLink } from '@/lib/meet-link'
import { sendCalendarInviteEmail } from '@/lib/email'

// Must match BookWebinarClient – Zoom links by month-day (YYYY-MM-DD → month 1–12, day 1–31)
const ZOOM_LINKS: Record<string, string> = {
  '2-7': 'https://us06web.zoom.us/meeting/register/xSVaZSmIS6-k8D55Xc7ryA',
  '2-14': 'https://us06web.zoom.us/meeting/register/LG0BbP6yQsmLlwwAbJ85xg',
  '2-21': 'https://us06web.zoom.us/meeting/register/eX9-EdUBSWGcVSOU__voEg',
  '2-28': 'https://us06web.zoom.us/meeting/register/DbbY6tSjSh6Dq6gsR5eS-w',
  '3-7': 'https://us06web.zoom.us/meeting/register/swqMuabPQQSCOM5eF7j-IA',
  '3-14': 'https://us06web.zoom.us/meeting/register/uF8uYW9JST6m289r8mT2yQ',
  '3-21': 'https://us06web.zoom.us/meeting/register/4ZWJwZVSTYSPbpwh5au3BA',
}
const ZOOM_LINK_FALLBACK = 'https://us06web.zoom.us/meeting/register/xSVaZSmIS6-k8D55Xc7ryA'

function getZoomLinkForDate(dateStr: string): string {
  try {
    const [, month, day] = dateStr.split('-').map(Number)
    const key = `${month}-${day}`
    return ZOOM_LINKS[key] ?? ZOOM_LINK_FALLBACK
  } catch {
    return ZOOM_LINK_FALLBACK
  }
}

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

      // Get Zoom registration link from booking, calculate from date, or fallback
      // Priority: booking -> calculate from date -> generateMeetLink -> env -> default
      const bookingWithZoom = booking as typeof booking & { zoom_registration_link?: string | null }
      let meetLink: string
      
      if (bookingWithZoom.zoom_registration_link) {
        meetLink = bookingWithZoom.zoom_registration_link
      } else if (booking.selected_date) {
        // Calculate Zoom link based on selected date
        meetLink = getZoomLinkForDate(booking.selected_date)
        console.log(`Webhook: Calculated Zoom link for date ${booking.selected_date}: ${meetLink}`)
      } else {
        meetLink = await generateMeetLink(booking) ||
                   process.env.ZOOM_REGISTRATION_LINK ||
                   ZOOM_LINK_FALLBACK
      }

      await updateBookingByOrderId(orderId, {
        razorpay_payment_id: payment.id,
        payment_status: 'paid',
        meet_link: meetLink,
        zoom_registration_link: bookingWithZoom.zoom_registration_link || meetLink,
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
      await updateBookingByOrderId(orderId, {
        calendar_invite_sent: true,
      })

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

