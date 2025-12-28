import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/admin-middleware'
import { supabase, WebinarBooking } from '@/lib/db'

interface OneOnOneBooking {
  id: string
  user_name: string
  user_email: string
  user_phone: string
  selected_date: string
  selected_time: string
  razorpay_order_id: string | null
  razorpay_payment_id: string | null
  payment_status: 'pending' | 'paid' | 'failed'
  meet_link: string | null
  booking_type: string
  calendar_invite_sent: boolean
  created_at: string
  updated_at: string
}

type Booking = (WebinarBooking & { type: 'webinar' }) | (OneOnOneBooking & { type: 'one-on-one' })

async function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')
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

    // Fetch one-on-one bookings
    let oneOnOneQuery = supabase
      .from('one_on_one_bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      oneOnOneQuery = oneOnOneQuery.eq('payment_status', status)
    }

    if (search) {
      oneOnOneQuery = oneOnOneQuery.or(`user_name.ilike.%${search}%,user_email.ilike.%${search}%,user_phone.ilike.%${search}%`)
    }

    const { data: oneOnOneBookings, error: oneOnOneError } = await oneOnOneQuery

    if (oneOnOneError) {
      console.error('Error fetching one-on-one bookings:', oneOnOneError)
    }

    // Combine and format bookings
    let allBookings: Booking[] = []

    if (type !== 'one-on-one') {
      const webinar = (webinarBookings || []).map((booking) => ({
        ...booking,
        type: 'webinar' as const,
      }))
      allBookings = [...allBookings, ...webinar]
    }

    if (type !== 'webinar') {
      const oneOnOne = (oneOnOneBookings || []).map((booking) => ({
        ...booking,
        type: 'one-on-one' as const,
      }))
      allBookings = [...allBookings, ...oneOnOne]
    }

    // Sort by created_at descending
    allBookings.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

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

