import { NextRequest, NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import Razorpay from 'razorpay'
import { createAiMlEnrollment } from '@/lib/db-helpers'
import { withRetry, withTimeout, HIGH_DEMAND_MESSAGE } from '@/lib/http-utils'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    configured: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
  })
}

export async function POST(request: NextRequest) {
  try {
    // Check if Razorpay credentials are configured
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Razorpay credentials not configured')
      return NextResponse.json(
        { error: 'Payment gateway not configured. Please contact support.' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, email, phone } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate phone format (Indian phone number)
    const phoneRegex = /^[6-9]\d{9}$/
    const cleanPhone = phone.replace(/[\s-]/g, '')
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      )
    }

    // Create Razorpay order (idempotent; timeout + retries)
    let order
    try {
      order = await withRetry(
        () =>
          withTimeout(
            razorpay.orders.create({
              amount: 249900,
              currency: 'INR',
              receipt: `ai_ml_${Date.now()}`,
              notes: {
                course: 'AI & ML Career Foundation Program',
                user_name: name,
                user_email: email,
                user_phone: cleanPhone,
              },
            })
          ),
        { retries: 2 }
      )
    } catch (razorpayError) {
      console.error('Razorpay order creation error:', razorpayError)
      Sentry.captureException(razorpayError)
      return NextResponse.json(
        { error: HIGH_DEMAND_MESSAGE },
        { status: 503 }
      )
    }

    // Create enrollment in database
    let enrollment
    try {
      enrollment = await createAiMlEnrollment({
        user_name: name,
        user_email: email,
        user_phone: cleanPhone,
        razorpay_order_id: order.id,
        amount_paid: 2499,
      })
    } catch (dbError) {
      console.error('Database error (continuing with order creation):', dbError)
      // Continue even if database save fails - we still have the Razorpay order
      // The enrollment will be created during payment verification using order notes
      enrollment = null
    }

    return NextResponse.json({
      orderId: order.id,
      enrollmentId: enrollment?.id || `temp_${order.id}`,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    Sentry.captureException(error)
    return NextResponse.json(
      { error: HIGH_DEMAND_MESSAGE },
      { status: 503 }
    )
  }
}
