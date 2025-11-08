import { format } from 'date-fns'
import { normalizeDateTime } from './date-utils'

const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID
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
}

export async function sendCalendarInviteEmail(data: EmailData) {
  try {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
      throw new Error('EmailJS configuration missing. Please set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, and EMAILJS_PRIVATE_KEY in your environment variables.')
    }

    const { startDate, dateStr, timeStr } = normalizeDateTime(data.date, data.time)
    const formattedDate = format(startDate, 'EEEE, MMMM d, yyyy')
    const formattedTime = format(startDate, 'h:mm a') + ' IST'

    const base64Calendar = Buffer.from(data.calendarInvite, 'utf-8').toString('base64')

    console.log('Sending email via EmailJS:', {
      to: data.to,
      subject: `Your Webinar Booking Confirmation - ${formattedDate}`,
    })

    const emailPayload = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
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

