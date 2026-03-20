import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/admin-middleware'
import { supabase } from '@/lib/db'

interface CustomerPurchase {
  email: string
  name: string
  phone: string
  webinarCount: number
  totalSpent: number
  lastPurchaseDate: string
  purchaseTypes: ('webinar')[]
  bookings: Array<{
    id: string
    type: 'webinar'
    date: string
    time: string
    status: string
    amount: number
  }>
}

async function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') // 'webinar', 'all'
    const search = searchParams.get('search')

    // Fetch all webinar bookings (only paid ones for revenue calculation)
    const { data: webinarBookings, error: webinarError } = await supabase
      .from('webinar_bookings')
      .select('*')
      .eq('payment_status', 'paid')
      .order('created_at', { ascending: false })

    if (webinarError) {
      console.error('Error fetching webinar bookings:', webinarError)
    }

    // Group bookings by customer email
    const customerMap = new Map<string, CustomerPurchase>()

    // Process webinar bookings
    ; (webinarBookings || []).forEach((booking) => {
      const email = booking.user_email.toLowerCase()
      const existing = customerMap.get(email)

      if (existing) {
        existing.webinarCount += 1
        existing.totalSpent += 9 // ₹9 per webinar
        existing.bookings.push({
          id: booking.id,
          type: 'webinar',
          date: booking.selected_date,
          time: booking.selected_time,
          status: booking.payment_status,
          amount: 9,
        })
        if (!existing.purchaseTypes.includes('webinar')) {
          existing.purchaseTypes.push('webinar')
        }
        if (new Date(booking.created_at) > new Date(existing.lastPurchaseDate)) {
          existing.lastPurchaseDate = booking.created_at
        }
      } else {
        customerMap.set(email, {
          email: booking.user_email,
          name: booking.user_name,
          phone: booking.user_phone,
          webinarCount: 1,
          totalSpent: 9,
          lastPurchaseDate: booking.created_at,
          purchaseTypes: ['webinar'],
          bookings: [
            {
              id: booking.id,
              type: 'webinar',
              date: booking.selected_date,
              time: booking.selected_time,
              status: booking.payment_status,
              amount: 9,
            },
          ],
        })
      }
    })

    // Convert map to array
    let customers = Array.from(customerMap.values())

    // Apply filters
    if (filter === 'webinar') {
      customers = customers.filter((c) => c.purchaseTypes.includes('webinar'))
    }
    // 'all' or no filter shows everyone

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      customers = customers.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.email.toLowerCase().includes(searchLower) ||
          c.phone.includes(search)
      )
    }

    // Sort by total spent (descending) then by last purchase date
    customers.sort((a, b) => {
      if (b.totalSpent !== a.totalSpent) {
        return b.totalSpent - a.totalSpent
      }
      return new Date(b.lastPurchaseDate).getTime() - new Date(a.lastPurchaseDate).getTime()
    })

    // Calculate summary stats
    const stats = {
      totalCustomers: customers.length,
      webinarOnly: customers.filter((c) => c.purchaseTypes.includes('webinar')).length,
      totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    }

    return NextResponse.json({
      success: true,
      customers,
      stats,
    })
  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 })
  }
}

export const GET = withAdminAuth(handler)

