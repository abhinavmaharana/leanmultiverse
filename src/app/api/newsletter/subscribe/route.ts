import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { isValidEmailFormat } from '@/lib/validators'
import { checkRateLimit, DEFAULT_LIMIT } from '@/lib/rate-limit'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const rateLimitResponse = checkRateLimit(request, DEFAULT_LIMIT)
  if (rateLimitResponse) return rateLimitResponse

  try {
    const body = await request.json()
    const email = typeof body?.email === 'string' ? body.email.trim() : ''

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!isValidEmailFormat(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json(
        { error: 'Newsletter signup is temporarily unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    const { data, error } = await resend.contacts.create({
      email,
      unsubscribed: false,
    })

    if (error) {
      if (error.message?.toLowerCase().includes('already exists') || (error as { statusCode?: number }).statusCode === 409) {
        return NextResponse.json(
          { success: true, message: 'You are already subscribed.' },
          { status: 200 }
        )
      }
      console.error('Resend newsletter subscribe error:', error)
      return NextResponse.json(
        { error: 'Unable to subscribe. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Thank you for subscribing!', id: data?.id },
      { status: 200 }
    )
  } catch (err) {
    console.error('Newsletter subscribe error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}
