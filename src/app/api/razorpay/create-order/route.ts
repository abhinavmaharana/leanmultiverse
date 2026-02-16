import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { createBooking } from '@/lib/db-helpers'
import { isValidEmailFormat, isValidIndianPhone, normalizeIndianPhone } from '@/lib/validators'
import { checkRateLimit, DEFAULT_LIMIT } from '@/lib/rate-limit'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

export async function POST(request: NextRequest) {
  const rateLimitResponse = checkRateLimit(request, DEFAULT_LIMIT)
  if (rateLimitResponse) return rateLimitResponse

  try {
    const body = await request.json()
    const { user_name, user_email, user_phone, selected_date, selected_time, zoom_registration_link } = body

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
    const order = await razorpay.orders.create({
      amount: 5782, // ₹49 + 18% GST in paise
      currency: 'INR',
      receipt: `webinar_${Date.now()}`,
      notes: {
        user_name,
        user_email,
        user_phone: cleanPhone,
        selected_date,
        selected_time,
        zoom_registration_link: zoom_registration_link || process.env.ZOOM_REGISTRATION_LINK,
      },
    })

    // Create booking in database (with error handling)
    let booking
    try {
      const bookingData: {
        user_name: string
        user_email: string
        user_phone: string
        selected_date: string
        selected_time: string
        razorpay_order_id: string
        zoom_registration_link?: string
      } = {
        user_name,
        user_email,
        user_phone: cleanPhone,
        selected_date,
        selected_time,
        razorpay_order_id: order.id,
      }
      
      // Include zoom_registration_link if provided
      if (zoom_registration_link) {
        bookingData.zoom_registration_link = zoom_registration_link
      }
      
      booking = await createBooking(bookingData)
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
    const errorMessage = error instanceof Error ? error.message : 'Failed to create order'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

