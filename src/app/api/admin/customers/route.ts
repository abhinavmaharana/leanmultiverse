import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/admin-middleware'
import { supabase } from '@/lib/db'

interface CustomerPurchase {
  email: string
  name: string
  phone: string
  webinarCount: number
  oneOnOneCount: number
  totalSpent: number
  lastPurchaseDate: string
  purchaseTypes: ('webinar' | 'one-on-one')[]
  bookings: Array<{
    id: string
    type: 'webinar' | 'one-on-one'
    date: string
    time: string
    status: string
    amount: number
  }>
}

async function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') // 'webinar', 'one-on-one', 'both', 'all'
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

    // Fetch all one-on-one bookings (only paid ones)
    const { data: oneOnOneBookings, error: oneOnOneError } = await supabase
      .from('one_on_one_bookings')
      .select('*')
      .eq('payment_status', 'paid')
      .order('created_at', { ascending: false })

    if (oneOnOneError) {
      console.error('Error fetching one-on-one bookings:', oneOnOneError)
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
            oneOnOneCount: 0,
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

      // Process one-on-one bookings
      ; (oneOnOneBookings || []).forEach((booking) => {
        const email = booking.user_email.toLowerCase()
        const existing = customerMap.get(email)

        if (existing) {
          existing.oneOnOneCount += 1
          existing.totalSpent += 1000 // ₹1000 per one-on-one
          existing.bookings.push({
            id: booking.id,
            type: 'one-on-one',
            date: booking.selected_date,
            time: booking.selected_time,
            status: booking.payment_status,
            amount: 1000,
          })
          if (!existing.purchaseTypes.includes('one-on-one')) {
            existing.purchaseTypes.push('one-on-one')
          }
          if (new Date(booking.created_at) > new Date(existing.lastPurchaseDate)) {
            existing.lastPurchaseDate = booking.created_at
          }
        } else {
          customerMap.set(email, {
            email: booking.user_email,
            name: booking.user_name,
            phone: booking.user_phone,
            webinarCount: 0,
            oneOnOneCount: 1,
            totalSpent: 1000,
            lastPurchaseDate: booking.created_at,
            purchaseTypes: ['one-on-one'],
            bookings: [
              {
                id: booking.id,
                type: 'one-on-one',
                date: booking.selected_date,
                time: booking.selected_time,
                status: booking.payment_status,
                amount: 1000,
              },
            ],
          })
        }
      })

    // Convert map to array
    let customers = Array.from(customerMap.values())

    // Apply filters
    if (filter === 'webinar') {
      customers = customers.filter((c) => c.purchaseTypes.includes('webinar') && !c.purchaseTypes.includes('one-on-one'))
    } else if (filter === 'one-on-one') {
      customers = customers.filter((c) => c.purchaseTypes.includes('one-on-one') && !c.purchaseTypes.includes('webinar'))
    } else if (filter === 'both') {
      customers = customers.filter((c) => c.purchaseTypes.length === 2)
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
      webinarOnly: customers.filter((c) => c.purchaseTypes.includes('webinar') && !c.purchaseTypes.includes('one-on-one')).length,
      oneOnOneOnly: customers.filter((c) => c.purchaseTypes.includes('one-on-one') && !c.purchaseTypes.includes('webinar')).length,
      bothTypes: customers.filter((c) => c.purchaseTypes.length === 2).length,
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

