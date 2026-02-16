// ✅ MUST be the first line
export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import Razorpay from 'razorpay'
import { createCourseEnrollment } from '@/lib/db-helpers'
import { isValidEmailFormat, normalizeIndianPhone, isValidIndianPhone } from '@/lib/validators'
import { checkRateLimit, DEFAULT_LIMIT } from '@/lib/rate-limit'
import { withRetry, withTimeout, HIGH_DEMAND_MESSAGE } from '@/lib/http-utils'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || ''
})

/* -------------------- Health Check -------------------- */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    configured: Boolean(
      process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    )
  })
}

/* -------------------- Create Order -------------------- */
export async function POST(request: NextRequest) {
  const rateLimitResponse = await checkRateLimit(request, DEFAULT_LIMIT)
  if (rateLimitResponse) return rateLimitResponse

  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Payment gateway not configured' },
        { status: 500 }
      )
    }

    const { name, email, phone, courseTitle, courseSlug } =
      await request.json()

      const courseId = courseSlug.replace('-career-starter', '')

    /* ---------- Required fields ---------- */
    if (!name || !email || !courseId || !courseTitle || !courseSlug) {
      return NextResponse.json(
        { error: 'Name, email and course details are required' },
        { status: 400 }
      )
    }

    /* ---------- Email validation ---------- */
    if (!isValidEmailFormat(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    /* ---------- Phone (optional) ---------- */
    let cleanPhone: string | undefined
    if (phone) {
      if (!isValidIndianPhone(phone)) {
        return NextResponse.json(
          { error: 'Invalid phone number' },
          { status: 400 }
        )
      }
      cleanPhone = normalizeIndianPhone(phone)
    }

    /* ---------- 🔴 FIX: SHORT RECEIPT ---------- */
    // Razorpay receipt max length = 40 chars
    const receipt = `crs_${courseId.slice(0, 10)}_${Date.now()
      .toString()
      .slice(-6)}`

    /* ---------- Create Razorpay order (idempotent; timeout + retries) ---------- */
    const order = await withRetry(
      () =>
        withTimeout(
          razorpay.orders.create({
            amount: 249900,
            currency: 'INR',
            receipt,
            notes: {
              course_id: courseId,
              course_title: courseTitle,
              course_slug: courseSlug,
              user_name: name,
              user_email: email,
              ...(cleanPhone ? { user_phone: cleanPhone } : {}),
            },
          })
        ),
      { retries: 2 }
    )

    /* ---------- DB insert (non-blocking) ---------- */
    let enrollment = null
    try {
      enrollment = await createCourseEnrollment({
        course_id: courseId,
        course_name: courseTitle,
        course_slug: courseSlug,
        user_name: name,
        user_email: email,
        ...(cleanPhone ? { user_phone: cleanPhone } : {}),
        razorpay_order_id: order.id,
        amount_paid: 2499
      })
    } catch (dbError) {
      console.error('Database error (non-blocking):', dbError)
    }

    /* ---------- Response ---------- */
    return NextResponse.json({
      orderId: order.id,
      enrollmentId: enrollment?.id || `temp_${order.id}`,
      amount: order.amount,
      currency: order.currency
    })
  } catch (error) {
    console.error('Create order error:', error)
    Sentry.captureException(error)
    return NextResponse.json(
      { error: HIGH_DEMAND_MESSAGE },
      { status: 503 }
    )
  }
}
