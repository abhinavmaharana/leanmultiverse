import { NextRequest, NextResponse } from 'next/server'
import { createFreeWebinarBooking, updateBooking } from '@/lib/db-helpers'
import { generateCalendarInvite } from '@/lib/calendar'
import { sendCalendarInviteEmail } from '@/lib/email'
import { getZoomLinkForDateFree } from '@/lib/webinar-config'
import { isValidEmailFormat, isValidIndianPhone, normalizeIndianPhone } from '@/lib/validators'
import { checkRateLimit, DEFAULT_LIMIT } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  const rateLimitResponse = checkRateLimit(request, DEFAULT_LIMIT)
  if (rateLimitResponse) return rateLimitResponse

  try {
    const body = await request.json()
    const { user_name, user_email, user_phone, selected_date, selected_time, zoom_registration_link: zoomFromClient } = body

    if (!user_name || !user_email || !user_phone || !selected_date || !selected_time) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (!isValidEmailFormat(String(user_email))) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (!isValidIndianPhone(String(user_phone))) {
      return NextResponse.json(
        { error: 'Invalid phone number. Use a valid 10-digit Indian mobile number.' },
        { status: 400 }
      )
    }

    const zoom_registration_link = zoomFromClient || getZoomLinkForDateFree(selected_date)

    const booking = await createFreeWebinarBooking({
      user_name,
      user_email,
      user_phone,
      selected_date,
      selected_time,
      zoom_registration_link,
    })

    const meetLink = zoom_registration_link

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
      console.error('Error generating calendar invite for free webinar:', error)
      return NextResponse.json(
        { error: 'Failed to generate calendar invite' },
        { status: 500 }
      )
    }

    try {
      await sendCalendarInviteEmail({
        to: booking.user_email,
        name: booking.user_name,
        date: booking.selected_date,
        time: booking.selected_time,
        meetLink,
        calendarInvite,
        bookingType: 'webinar',
      })
      await updateBooking(booking.id, { calendar_invite_sent: true })
    } catch (error) {
      console.error('Error sending calendar email for free webinar:', error)
      // Don't fail the request - booking is already created
    }

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      zoom_registration_link: meetLink,
    })
  } catch (error) {
    console.error('Free webinar registration error:', error)
    const message = error instanceof Error ? error.message : 'Registration failed'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
