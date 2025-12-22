import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const orderId = searchParams.get('order_id')

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    const { data: booking, error } = await supabase
      .from('one_on_one_bookings')
      .select('*')
      .eq('razorpay_order_id', orderId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error('Error fetching booking:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch booking'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

