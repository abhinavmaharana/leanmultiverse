import ical from 'ical-generator'
import { addHours } from 'date-fns'
import { normalizeDateTime } from './date-utils'

export interface CalendarInviteData {
  id: string
  user_name: string
  user_email: string
  selected_date: string
  selected_time: string
  meet_link: string
}

export async function generateCalendarInvite(
  booking: CalendarInviteData
): Promise<string> {
  const { startDate } = normalizeDateTime(
    booking.selected_date,
    booking.selected_time
  )

  // Webinar duration: 4 hours
  const endDate = addHours(startDate, 4)

  // Create calendar
  const calendar = ical({
    prodId: {
      company: 'Lean Multiverse',
      product: 'Webinar Booking',
      language: 'EN',
    },
    name: 'Lean Multiverse Webinar',
    timezone: 'Asia/Kolkata', // IST
  })

  // Create event
  calendar.createEvent({
    start: startDate,
    end: endDate,
    summary: 'Lean Multiverse Webinar - Enterprise Agility & Digital Transformation',
    description: `Join us for an exclusive webinar on Enterprise Agility and Digital Transformation.

Topics Covered:
- Building in the Multiverse
- Collaborative Innovation
- Digital Transformation Strategies
- Enterprise Agility Best Practices

Meeting Link: ${booking.meet_link}

We look forward to seeing you there!`,
    location: 'Online - Zoom',
    url: booking.meet_link,
    organizer: {
      name: 'Lean Multiverse',
      email: process.env.WEBINAR_ORGANIZER_EMAIL || 'webinar@leanmultiverse.com',
    },
    attendees: [
      {
        name: booking.user_name,
        email: booking.user_email,
        rsvp: true,
      },
    ],
    alarms: [
      {
        trigger: 15 * 60, // 15 minutes before
        description: 'Webinar starts in 15 minutes',
      },
      {
        trigger: 24 * 60 * 60, // 1 day before
        description: 'Webinar reminder - Tomorrow',
      },
    ],
  })

  // Generate .ics file content
  return calendar.toString()
}

