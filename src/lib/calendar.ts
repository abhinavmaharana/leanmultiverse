import ical from 'ical-generator'
import { addHours } from 'date-fns'
import { normalizeDateTime } from './date-utils'

export interface CalendarInviteData {
  id?: string
  user_name: string
  user_email: string
  selected_date: string
  selected_time: string
  meet_link: string
  title?: string
  description?: string
  duration?: number // Duration in hours
  organizer?: {
    name: string
    email: string
  }
  attendee?: {
    name: string
    email: string
  }
}

export async function generateCalendarInvite(
  booking: CalendarInviteData
): Promise<string> {
  const { startDate } = normalizeDateTime(
    booking.selected_date,
    booking.selected_time
  )

  // Duration: 4 hours for webinar
  const duration = booking.duration || 4
  const endDate = addHours(startDate, duration)

  const eventTitle = booking.title || 'Lean Multiverse Webinar - Enterprise Agility & Digital Transformation'
  const eventDescription = booking.description || `Join us for an exclusive webinar on Enterprise Agility and Digital Transformation.

Topics Covered:
- Building in the Multiverse
- Collaborative Innovation
- Digital Transformation Strategies
- Enterprise Agility Best Practices

Meeting Link: ${booking.meet_link}

We look forward to seeing you there!`

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
    summary: eventTitle,
    description: eventDescription,
    location: 'Online - Zoom',
    url: booking.meet_link,
    organizer: booking.organizer || {
      name: 'Lean Multiverse',
      email: process.env.WEBINAR_ORGANIZER_EMAIL || 'webinar@leanmultiverse.com',
    },
    attendees: [
      {
        name: booking.attendee?.name || booking.user_name,
        email: booking.attendee?.email || booking.user_email,
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

