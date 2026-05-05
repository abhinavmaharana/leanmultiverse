import { NextRequest, NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import Razorpay from 'razorpay'
import { createAiMlWebinarBooking } from '@/lib/db-helpers'
import { isValidEmailFormat, isValidIndianPhone, normalizeIndianPhone } from '@/lib/validators'
import { checkRateLimit, DEFAULT_LIMIT } from '@/lib/rate-limit'
import { withRetry, withTimeout, HIGH_DEMAND_MESSAGE } from '@/lib/http-utils'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

export async function POST(request: NextRequest) {
  const rateLimitResponse = await checkRateLimit(request, DEFAULT_LIMIT)
  if (rateLimitResponse) return rateLimitResponse

  try {
    const body = await request.json()
    const { user_name, user_email, user_phone, hear_from, selected_date, selected_time, zoom_registration_link, utm } = body

    // Validate required fields
    if (!user_name || !user_email || !user_phone || !selected_date || !selected_time) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (!isValidEmailFormat(String(user_email))) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (!isValidIndianPhone(String(user_phone))) {
      return NextResponse.json(
        { error: 'Invalid phone number. Use a valid 10-digit Indian mobile number.' },
        { status: 400 }
      )
    }

    const cleanPhone = normalizeIndianPhone(String(user_phone))

    // Create Razorpay order
    const order = await withRetry(
      () =>
        withTimeout(
          razorpay.orders.create({
            amount: 9900, // ₹99
            currency: 'INR',
            receipt: `aiml_webinar_${Date.now()}`,
            notes: {
              user_name,
              user_email,
              user_phone: cleanPhone,
              ...(hear_from && { hear_from: String(hear_from) }),
              selected_date,
              selected_time,
              zoom_registration_link: zoom_registration_link || process.env.ZOOM_REGISTRATION_LINK,
              course_type: 'ai-ml',
              ...(utm && typeof utm === 'object' && Object.keys(utm).length > 0 && utm),
            },
          })
        ),
      { retries: 2 }
    )

    // Create enrollment in database
    let booking
    try {
      const orderNotes: Record<string, string> = {
        user_name,
        user_email,
        user_phone: cleanPhone,
        selected_date,
        selected_time,
        course_type: 'ai-ml',
        zoom_registration_link: zoom_registration_link || process.env.ZOOM_REGISTRATION_LINK || '',
      }
      if (hear_from) orderNotes.hear_from = String(hear_from)
      if (utm && typeof utm === 'object') {
        for (const [k, v] of Object.entries(utm)) {
          if (typeof v === 'string' && v.trim()) orderNotes[k] = v
        }
      }

      booking = await createAiMlWebinarBooking({
        user_name,
        user_email,
        user_phone: cleanPhone,
        selected_date,
        selected_time,
        razorpay_order_id: order.id,
        zoom_registration_link: zoom_registration_link || undefined,
        order_notes: orderNotes,
      })
    } catch (dbError) {
      console.error('Database error (continuing with order creation):', dbError)
      booking = null
    }

    return NextResponse.json({
      orderId: order.id,
      bookingId: booking?.id || `temp_${order.id}`,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error('Error creating AI/ML Razorpay order:', error)
    Sentry.captureException(error)
    return NextResponse.json(
      { error: HIGH_DEMAND_MESSAGE },
      { status: 503 }
    )
  }
}
