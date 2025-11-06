import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { createBooking } from '@/lib/db-helpers'

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

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: 9900, // ₹99 in paise
      currency: 'INR',
      receipt: `webinar_${Date.now()}`,
      notes: {
        user_name,
        user_email,
        user_phone,
        selected_date,
        selected_time,
      },
    })

    // Create booking in database
    const booking = await createBooking({
      user_name,
      user_email,
      user_phone,
      selected_date,
      selected_time,
      razorpay_order_id: order.id,
    })

    return NextResponse.json({
      orderId: order.id,
      bookingId: booking.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to create order'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

