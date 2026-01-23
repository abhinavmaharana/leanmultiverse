import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { createCourseEnrollment } from '@/lib/db-helpers'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || ''
})

/* -------------------- Health Check -------------------- */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    configured: !!(
      process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    )
  })
}

/* -------------------- Create Order -------------------- */
export async function POST(request: NextRequest) {
  try {
    /* -------------------- Env Check -------------------- */
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Payment gateway not configured' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, email, phone, courseId, courseTitle, courseSlug } = body

    /* -------------------- Required Fields -------------------- */
    if (!name || !email || !courseId || !courseTitle || !courseSlug) {
      return NextResponse.json(
        { error: 'Name, email and course details are required' },
        { status: 400 }
      )
    }

    /* -------------------- Email Validation -------------------- */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    /* -------------------- Phone (OPTIONAL) -------------------- */
    let cleanPhone: string | undefined

    if (phone) {
      let digits = phone.replace(/\D/g, '')

      if (digits.startsWith('91') && digits.length > 10) {
        digits = digits.slice(2)
      }
      if (digits.startsWith('0')) {
        digits = digits.slice(1)
      }

      const phoneRegex = /^[6-9]\d{9}$/
      if (!phoneRegex.test(digits)) {
        return NextResponse.json(
          { error: 'Invalid phone number' },
          { status: 400 }
        )
      }

      cleanPhone = digits
    }

    /* -------------------- Razorpay Order -------------------- */
    const order = await razorpay.orders.create({
      amount: 249900, // ₹2499 in paise
      currency: 'INR',
      receipt: `course_${courseId}_${Date.now()}`,
      notes: {
        course_id: courseId,
        course_title: courseTitle,
        course_slug: courseSlug,
        user_name: name,
        user_email: email,
        ...(cleanPhone ? { user_phone: cleanPhone } : {})
      }
    })

    /* -------------------- DB Insert (Non-blocking) -------------------- */
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

    /* -------------------- Response -------------------- */
    return NextResponse.json({
      orderId: order.id,
      enrollmentId: enrollment?.id || `temp_${order.id}`,
      amount: order.amount,
      currency: order.currency
    })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
