import { supabase, WebinarBooking, CreateBookingData } from './db'

export async function createBooking(data: CreateBookingData) {
  const { data: booking, error } = await supabase
    .from('webinar_bookings')
    .insert([data])
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create booking: ${error.message}`)
  }

  return booking as WebinarBooking
}

export async function getBookingById(id: string) {
  const { data, error } = await supabase
    .from('webinar_bookings')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to get booking: ${error.message}`)
  }

  return data as WebinarBooking | null
}

export async function getBookingByOrderId(orderId: string) {
  const { data, error } = await supabase
    .from('webinar_bookings')
    .select('*')
    .eq('razorpay_order_id', orderId)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to get booking: ${error.message}`)
  }

  return data as WebinarBooking | null
}

export async function updateBooking(id: string, updates: Partial<WebinarBooking>) {
  const { data, error } = await supabase
    .from('webinar_bookings')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update booking: ${error.message}`)
  }

  return data as WebinarBooking
}

export async function updateBookingByOrderId(orderId: string, updates: Partial<WebinarBooking>) {
  const { data, error } = await supabase
    .from('webinar_bookings')
    .update(updates)
    .eq('razorpay_order_id', orderId)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update booking: ${error.message}`)
  }

  return data as WebinarBooking
}

