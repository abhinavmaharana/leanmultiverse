import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getBookingByOrderId, updateBookingByOrderId } from '@/lib/db-helpers'
import { generateCalendarInvite } from '@/lib/calendar'
import { generateMeetLink } from '@/lib/meet-link'
import { sendCalendarInviteEmail } from '@/lib/email'

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
    
    console.log(`Webhook: Getting Zoom link for date: ${dateStr}, extracted day: ${dayStr}`)
    
    if (ZOOM_LINKS[dayStr]) {
      console.log(`Webhook: Found Zoom link for day ${dayStr}: ${ZOOM_LINKS[dayStr]}`)
      return ZOOM_LINKS[dayStr]
    }
    
    // Default fallback to December 20th
    console.log(`Webhook: No Zoom link found for day ${dayStr}, using default`)
    return ZOOM_LINKS['20'] || 'https://us06web.zoom.us/meeting/register/7_BwX278QL6XL0DFIdRCBA'
  } catch (error) {
    console.error('Webhook: Error parsing date for Zoom link:', error, 'dateStr:', dateStr)
    return ZOOM_LINKS['20'] || 'https://us06web.zoom.us/meeting/register/7_BwX278QL6XL0DFIdRCBA'
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
                   'https://us06web.zoom.us/meeting/register/oc2syBDwTkWNTu0dhVd4qA'
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

