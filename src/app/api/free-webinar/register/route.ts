import { NextRequest, NextResponse } from 'next/server'
import { createFreeWebinarBooking, updateBooking } from '@/lib/db-helpers'
import { generateCalendarInvite } from '@/lib/calendar'
import { sendCalendarInviteEmail } from '@/lib/email'

// Zoom registration links by day (must match BookFreeWebinarClient)
const ZOOM_LINKS: Record<string, string> = {
  '31': 'https://us06web.zoom.us/meeting/register/8b3eEOuxSvaefhcK1vmWpQ',
  '7': 'https://us06web.zoom.us/meeting/register/xSVaZSmIS6-k8D55Xc7ryA',
}

function getZoomLinkForDate(dateStr: string): string {
  try {
    const [, , day] = dateStr.split('-').map(Number)
    const dayStr = day.toString()
    return ZOOM_LINKS[dayStr] || ZOOM_LINKS['31'] || 'https://us06web.zoom.us/meeting/register/8b3eEOuxSvaefhcK1vmWpQ'
  } catch {
    return ZOOM_LINKS['31'] || 'https://us06web.zoom.us/meeting/register/8b3eEOuxSvaefhcK1vmWpQ'
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user_name, user_email, user_phone, selected_date, selected_time, zoom_registration_link: zoomFromClient } = body

    if (!user_name || !user_email || !user_phone || !selected_date || !selected_time) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const zoom_registration_link = zoomFromClient || getZoomLinkForDate(selected_date)

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
