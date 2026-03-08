import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { getAiMlEnrollmentByOrderId, updateAiMlEnrollmentByOrderId, createAiMlEnrollment } from '@/lib/db-helpers'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Payment verification data missing' },
        { status: 400 }
      )
    }

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(text)
      .digest('hex')

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Capture the payment (if not already captured)
    try {
      const payment = await razorpay.payments.fetch(razorpay_payment_id)
      if (payment.status === 'authorized') {
        await razorpay.payments.capture(razorpay_payment_id, payment.amount, payment.currency || 'INR')
        console.log('AI/ML payment captured successfully:', razorpay_payment_id)
      } else if (payment.status === 'captured') {
        console.log('AI/ML payment already captured:', razorpay_payment_id)
      }
    } catch (error) {
      console.error('Error capturing AI/ML payment:', error)
    }

    // Get enrollment from database
    let enrollment = await getAiMlEnrollmentByOrderId(razorpay_order_id)

    // If enrollment doesn't exist, create from Razorpay order notes
    if (!enrollment) {
      try {
        const order = await razorpay.orders.fetch(razorpay_order_id)
        const orderNotes = order.notes as Record<string, string> | null

        if (orderNotes?.user_name && orderNotes?.user_email) {
          enrollment = await createAiMlEnrollment({
            user_name: orderNotes.user_name,
            user_email: orderNotes.user_email,
            user_phone: orderNotes.user_phone,
            razorpay_order_id: razorpay_order_id,
            amount_paid: 9,
          })
          console.log('Created AI/ML enrollment from Razorpay order notes:', enrollment.id)
        } else {
          return NextResponse.json(
            { error: 'Enrollment not found and cannot be created from order data' },
            { status: 404 }
          )
        }
      } catch (fetchError) {
        console.error('Error fetching order from Razorpay:', fetchError)
        return NextResponse.json(
          { error: 'Enrollment not found and failed to fetch order data' },
          { status: 404 }
        )
      }
    }

    // Update enrollment with payment details
    await updateAiMlEnrollmentByOrderId(razorpay_order_id, {
      razorpay_payment_id,
      payment_status: 'paid',
      email_sent: true,
    })

    return NextResponse.json({
      success: true,
      message: 'Payment verified and AI/ML enrollment confirmed',
    })
  } catch (error) {
    console.error('Error verifying AI/ML payment:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to verify payment'

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
