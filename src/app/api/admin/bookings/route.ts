import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/admin-middleware'
import { supabase, WebinarBooking } from '@/lib/db'

type Booking = (WebinarBooking & { type: 'webinar' })

async function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // Fetch webinar bookings
    let webinarQuery = supabase
      .from('webinar_bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      webinarQuery = webinarQuery.eq('payment_status', status)
    }

    if (search) {
      webinarQuery = webinarQuery.or(`user_name.ilike.%${search}%,user_email.ilike.%${search}%,user_phone.ilike.%${search}%`)
    }

    const { data: webinarBookings, error: webinarError } = await webinarQuery

    if (webinarError) {
      console.error('Error fetching webinar bookings:', webinarError)
    }

    // Combine and format bookings
    const allBookings: Booking[] = (webinarBookings || []).map((booking) => ({
      ...booking,
      type: 'webinar' as const,
    }))

    return NextResponse.json({
      success: true,
      bookings: allBookings,
      total: allBookings.length,
    })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

export const GET = withAdminAuth(handler)

