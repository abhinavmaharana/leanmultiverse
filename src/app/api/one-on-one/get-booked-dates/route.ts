import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db'

export async function GET() {
  try {
    // Get all paid bookings with date and time
    const { data: bookings, error } = await supabase
      .from('one_on_one_bookings')
      .select('selected_date, selected_time')
      .eq('payment_status', 'paid')

    if (error) {
      console.error('Error fetching booked slots:', error)
      return NextResponse.json(
        { error: 'Failed to fetch booked slots' },
        { status: 500 }
      )
    }

    // Create a map of booked date+time combinations
    // Format: { "2025-01-15": ["20:00", "21:00"] } means 8pm and 9pm are booked on Jan 15
    const bookedSlots: Record<string, string[]> = {}
    
    if (bookings) {
      bookings.forEach(booking => {
        const date = booking.selected_date
        let time = booking.selected_time
        if (date && time) {
          // Normalize time format: "20:00:00" -> "20:00" or "20:00" -> "20:00"
          if (time.includes(':')) {
            const timeParts = time.split(':')
            time = `${timeParts[0]}:${timeParts[1]}` // Keep only HH:MM
          }
          if (!bookedSlots[date]) {
            bookedSlots[date] = []
          }
          bookedSlots[date].push(time)
        }
      })
    }

    return NextResponse.json({ bookedSlots })
  } catch (error) {
    console.error('Error in get-booked-dates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch booked slots' },
      { status: 500 }
    )
  }
}

