import { NextRequest, NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import Razorpay from 'razorpay'
import { supabase } from '@/lib/db'
import { withRetry, withTimeout, HIGH_DEMAND_MESSAGE } from '@/lib/http-utils'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user_name, user_email, user_phone, selected_date, selected_time } = body

    // Validate required fields
    if (!user_name || !user_email || !user_phone || !selected_date || !selected_time) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Create Razorpay order (idempotent; timeout + retries)
    const order = await withRetry(
      () =>
        withTimeout(
          razorpay.orders.create({
            amount: 118000,
            currency: 'INR',
            receipt: `oneonone_${Date.now()}`,
            notes: {
              user_name,
              user_email,
              user_phone,
              selected_date,
              selected_time,
              booking_type: 'one-on-one',
            },
          })
        ),
      { retries: 2 }
    )

    // Create booking in database (with error handling)
    let booking
    try {
      const bookingData = {
        user_name,
        user_email,
        user_phone,
        selected_date,
        selected_time,
        razorpay_order_id: order.id,
        booking_type: 'one-on-one',
        payment_status: 'pending',
        meet_link: null,
        calendar_invite_sent: false,
      }
      
      const { data: bookingResult, error: dbError } = await supabase
        .from('one_on_one_bookings')
        .insert([bookingData])
        .select()
        .single()
      
      if (dbError) {
        console.error('Database error (continuing with order creation):', dbError)
        booking = null
      } else {
        booking = bookingResult
      }
    } catch (dbError) {
      console.error('Database error (continuing with order creation):', dbError)
      // Continue even if database save fails - we still have the Razorpay order
      // The booking will be created during payment verification using order notes
      booking = null
    }

    return NextResponse.json({
      orderId: order.id,
      bookingId: booking?.id || `temp_${order.id}`,
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

