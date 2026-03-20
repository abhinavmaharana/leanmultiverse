import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/admin-middleware'
import { supabase } from '@/lib/db'
import { z } from 'zod'

const updateSchema = z.object({
  payment_status: z.enum(['pending', 'paid', 'failed']).optional(),
  calendar_invite_sent: z.boolean().optional(),
})

async function handler(
  request: NextRequest,
  auth: { userId: string; username: string }
) {
  try {
    const url = new URL(request.url)
    const { searchParams, pathname } = url
    const type = searchParams.get('type') || 'webinar'
    
    // Extract booking ID from pathname: /api/admin/bookings/[id]
    const pathParts = pathname.split('/')
    const bookingId = pathParts[pathParts.length - 1]
    
    if (!bookingId || bookingId === 'bookings') {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      )
    }

    if (request.method === 'GET') {
      // Get booking
      const tableName = 'webinar_bookings'

      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', bookingId)
        .single()

      if (error || !data) {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        booking: { ...data, type },
      })
    } else if (request.method === 'PATCH') {
      // Update booking
      const body = await request.json()
      const updates = updateSchema.parse(body)

      const tableName = 'webinar_bookings'

      const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq('id', bookingId)
        .select()
        .single()

      if (error) {
        console.error('Error updating booking:', error)
        return NextResponse.json(
          { error: 'Failed to update booking' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        booking: { ...data, type },
      })
    } else {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
      )
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    console.error('Error in booking route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const GET = withAdminAuth(handler)
export const PATCH = withAdminAuth(handler)

