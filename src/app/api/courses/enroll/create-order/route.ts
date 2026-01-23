import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { createCourseEnrollment } from '@/lib/db-helpers'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    configured: !!(
      process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    )
  })
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Payment gateway not configured' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, email, phone, courseId, courseTitle, courseSlug } = body

    /* -------------------- REQUIRED FIELDS -------------------- */
    if (!name || !email || !courseId || !courseTitle || !courseSlug) {
      return NextResponse.json(
        { error: 'Name, email and course details are required' },
        { status: 400 }
      )
    }

    /* -------------------- EMAIL VALIDATION -------------------- */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    /* -------------------- PHONE (OPTIONAL) -------------------- */
    let cleanPhone: string | null = null

    if (phone) {
      const digits = phone.replace(/\D/g, '')

      // Remove country code if present
      let normalized = digits
      if (normalized.startsWith('91') && normalized.length > 10) {
        normalized = normalized.slice(2)
      }
      if (normalized.startsWith('0')) {
        normalized = normalized.slice(1)
      }

      const phoneRegex = /^[6-9]\d{9}$/
      if (!phoneRegex.test(normalized)) {
        return NextResponse.json(
          { error: 'Invalid phone number' },
          { status: 400 }
        )
      }

      cleanPhone = normalized
    }

    /* -------------------- RAZORPAY ORDER -------------------- */
    const order = await razorpay.orders.create({
      amount: 249900, // ₹2499
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

    /* -------------------- DATABASE -------------------- */
    let enrollment = null
    try {
      enrollment = await createCourseEnrollment({
        course_id: courseId,
        course_name: courseTitle,
        course_slug: courseSlug,
        user_name: name,
        user_email: email,
        user_phone: cleanPhone, // can be null
        razorpay_order_id: order.id,
        amount_paid: 2499
      })
    } catch (dbError) {
      console.error('Database error (non-blocking):', dbError)
    }

    return NextResponse.json({
      orderId: order.id,
      enrollmentId: enrollment?.id || `temp_${order.id}`,
      amount: order.amount,
      currency: order.currency
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
