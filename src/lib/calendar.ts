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
  // Handle different formats from database
  let dateStr = String(booking.selected_date || '').trim()
  let timeStr = String(booking.selected_time || '').trim()
  
  // If date/time comes as combined string (e.g., "2025-11-09 18:00:00")
  if (dateStr.includes(' ') && (!timeStr || timeStr === '')) {
    const parts = dateStr.split(' ')
    dateStr = parts[0] || '' // "2025-11-09"
    timeStr = parts[1] || '' // "18:00:00"
  }
  
  // If time comes with seconds (e.g., "18:00:00"), extract just HH:MM
  if (timeStr && timeStr.includes(':')) {
    const timeParts = timeStr.split(':')
    if (timeParts.length >= 2) {
      timeStr = `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}` // Extract HH:MM
    }
  }
  
  // Ensure date is in YYYY-MM-DD format (remove time if present)
  if (dateStr.includes('T')) {
    dateStr = dateStr.split('T')[0]
  }
  if (dateStr.includes(' ')) {
    dateStr = dateStr.split(' ')[0]
  }
  
  // Validate formats
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error(`Invalid date format: "${dateStr}". Expected YYYY-MM-DD format. Received: ${JSON.stringify(booking.selected_date)}`)
  }
  
  if (!/^\d{2}:\d{2}$/.test(timeStr)) {
    throw new Error(`Invalid time format: "${timeStr}". Expected HH:MM format. Received: ${JSON.stringify(booking.selected_time)}`)
  }
  
  // Combine date and time with IST timezone (+05:30)
  // Format: YYYY-MM-DDTHH:MM:00+05:30
  const dateTimeStr = `${dateStr}T${timeStr}:00+05:30`
  const startDate = parseISO(dateTimeStr)
  
  // Validate the date
  if (isNaN(startDate.getTime())) {
    throw new Error(`Invalid date/time: ${dateStr} ${timeStr}. Could not parse as valid date.`)
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

