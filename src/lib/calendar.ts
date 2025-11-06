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
  const dateStr = booking.selected_date
  const timeStr = booking.selected_time
  
  // Combine date and time
  const dateTimeStr = `${dateStr}T${timeStr}:00`
  const startDate = parseISO(dateTimeStr)
  
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
        status: 'ACCEPTED',
      },
    ],
    method: 'REQUEST',
    status: 'CONFIRMED',
    busystatus: 'BUSY',
    alarms: [
      {
        type: 'display',
        trigger: 15 * 60, // 15 minutes before
        description: 'Webinar starts in 15 minutes',
      },
      {
        type: 'display',
        trigger: 24 * 60 * 60, // 1 day before
        description: 'Webinar reminder - Tomorrow',
      },
    ],
  })

  // Generate .ics file content
  return calendar.toString()
}

