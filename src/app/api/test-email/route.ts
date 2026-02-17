import { NextRequest, NextResponse } from 'next/server'
import { requireProductionDisabled } from '@/lib/production-guard'

export async function POST(request: NextRequest) {
  const disabled = requireProductionDisabled()
  if (disabled) return disabled

  try {
    const body = await request.json()
    const { to } = body

    if (!to) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      )
    }

    if (!process.env.EMAILJS_SERVICE_ID || !process.env.EMAILJS_TEMPLATE_ID || !process.env.EMAILJS_PUBLIC_KEY || !process.env.EMAILJS_PRIVATE_KEY) {
      return NextResponse.json(
        {
          error: 'EmailJS is not fully configured',
          message: 'Please set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, and EMAILJS_PRIVATE_KEY in your environment variables.'
        },
        { status: 500 }
      )
    }

    const payload = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: {
        to_email: to,
        to_name: 'Test Recipient',
        formatted_date: 'Test Date',
        formatted_time: 'Test Time',
        meet_link: 'https://example.com',
        raw_calendar: Buffer.from('BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR').toString('base64'),
        raw_date: '2025-01-01',
        raw_time: '20:00',
      },
    }

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.EMAILJS_PRIVATE_KEY}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(errorBody)
    }

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully via EmailJS',
      to,
    })
  } catch (error) {
    console.error('Error sending test email:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to send test email'
    const errorDetails = error instanceof Error ? error.stack : JSON.stringify(error)

    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined,
        emailJsService: process.env.EMAILJS_SERVICE_ID ? '✅ Configured' : '❌ Missing',
        emailJsTemplate: process.env.EMAILJS_TEMPLATE_ID ? '✅ Configured' : '❌ Missing',
        emailJsPublicKey: process.env.EMAILJS_PUBLIC_KEY ? '✅ Configured' : '❌ Missing',
        emailJsPrivateKey: process.env.EMAILJS_PRIVATE_KEY ? '✅ Configured' : '❌ Missing',
      },
      { status: 500 }
    )
  }
}

