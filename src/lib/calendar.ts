import ical from 'ical-generator'
import { parseISO, addHours } from 'date-fns'

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
  // Parse date and time in IST
  const dateStr = booking.selected_date // Format: YYYY-MM-DD
  const timeStr = booking.selected_time // Format: HH:MM (24-hour)
  
  // Combine date and time with IST timezone (+05:30)
  // Format: YYYY-MM-DDTHH:MM:00+05:30
  const dateTimeStr = `${dateStr}T${timeStr}:00+05:30`
  const startDate = parseISO(dateTimeStr)
  
  // Validate the date
  if (isNaN(startDate.getTime())) {
    throw new Error(`Invalid date/time: ${dateStr} ${timeStr}. Please ensure date is in YYYY-MM-DD format and time is in HH:MM format.`)
  }
  
  // Webinar duration: 1 hour
  const endDate = addHours(startDate, 1)

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

