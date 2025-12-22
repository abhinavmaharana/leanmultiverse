import { normalizeDateTime } from './date-utils'

const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID // For webinar bookings
const EMAILJS_ONE_ON_ONE_TEMPLATE_ID = process.env.EMAILJS_ONE_ON_ONE_TEMPLATE_ID || 'template_4cemnoc' // For one-on-one bookings
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY

if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
  console.warn('EmailJS environment variables (SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY, PRIVATE_KEY) are not fully configured.')
}

export interface EmailData {
  to: string
  name: string
  date: string
  time: string
  meetLink: string
  calendarInvite: string
  bookingType?: 'webinar' | 'one-on-one'
}

export async function sendCalendarInviteEmail(data: EmailData) {
  try {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
      throw new Error('EmailJS configuration missing. Please set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, and EMAILJS_PRIVATE_KEY in your environment variables.')
    }

    const { startDate, dateStr, timeStr } = normalizeDateTime(data.date, data.time)
    
    // Ensure we're formatting the date correctly in IST timezone
    // Parse the date string directly and create date at midnight IST to avoid timezone conversion issues
    const [year, month, day] = dateStr.split('-').map(Number)
    // Create date at midnight IST (UTC+5:30) = 18:30 previous day UTC
    // So for Dec 13 IST midnight, we need Dec 12 18:30 UTC
    const dateInIST = new Date(Date.UTC(year, month - 1, day - 1, 18, 30, 0))
    
    // Format using IST timezone to get the correct day of week
    const formattedDate = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(dateInIST)
    const formattedTime = `${new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(startDate)} IST`

    const base64Calendar = Buffer.from(data.calendarInvite, 'utf-8').toString('base64')

    const bookingType = data.bookingType || 'webinar'
    const templateId = bookingType === 'one-on-one' 
      ? EMAILJS_ONE_ON_ONE_TEMPLATE_ID 
      : EMAILJS_TEMPLATE_ID
    const subject = bookingType === 'one-on-one' 
      ? `Your One-on-One Session Confirmation - ${formattedDate}`
      : `Your Webinar Booking Confirmation - ${formattedDate}`
    
    console.log('Sending email via EmailJS:', {
      to: data.to,
      subject,
      bookingType,
      templateId,
    })

    const emailPayload = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: templateId,
      user_id: EMAILJS_PUBLIC_KEY,
      accessToken: EMAILJS_PRIVATE_KEY,
      template_params: {
        to_email: data.to,
        to_name: data.name,
        formatted_date: formattedDate,
        formatted_time: formattedTime,
        meet_link: data.meetLink,
        raw_calendar: base64Calendar,
        raw_date: dateStr,
        raw_time: timeStr,
      },
    }

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${EMAILJS_PRIVATE_KEY}`,
      },
      body: JSON.stringify(emailPayload),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`EmailJS request failed: ${errorBody}`)
    }

    console.log('Email sent successfully via EmailJS', {
      to: data.to,
      formattedDate,
      formattedTime,
    })

    return { status: 'sent' }
  } catch (error) {
    console.error('Error sending email:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to send email'
    const errorDetails = error instanceof Error ? error.stack : JSON.stringify(error)
    console.error('Email error details:', {
      message: errorMessage,
      details: errorDetails,
      to: data.to,
      emailJsConfigured:
        EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY && EMAILJS_PRIVATE_KEY
          ? '✅ Configured'
          : '❌ Missing',
    })
    throw new Error(`Failed to send email: ${errorMessage}`)
  }
}

