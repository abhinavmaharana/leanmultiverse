import { supabase, WebinarBooking, CreateBookingData } from './db'

export async function createBooking(data: CreateBookingData) {
  // Try to insert with all data first
  const { data: booking, error } = await supabase
    .from('webinar_bookings')
    .insert([data])
    .select()
    .single()

  if (error) {
    // If error is about missing zoom_registration_link column, retry without it
    if (error.message?.includes('zoom_registration_link') && 'zoom_registration_link' in data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { zoom_registration_link: _zoomLink, ...dataWithoutZoom } = data
      const { data: retryBooking, error: retryError } = await supabase
        .from('webinar_bookings')
        .insert([dataWithoutZoom])
        .select()
        .single()
      
      if (retryError) {
        throw new Error(`Failed to create booking: ${retryError.message}`)
      }
      
      return retryBooking as WebinarBooking
    }
    
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
  // Remove zoom_registration_link if column doesn't exist to avoid errors
  const safeUpdates = { ...updates }
  
  // Try to update, and if it fails due to missing column, retry without zoom_registration_link
  const { data, error } = await supabase
    .from('webinar_bookings')
    .update(safeUpdates)
    .eq('razorpay_order_id', orderId)
    .select()
    .single()

  if (error) {
    // If error is about missing column, try again without zoom_registration_link
    if (error.message?.includes('zoom_registration_link') && safeUpdates.zoom_registration_link) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { zoom_registration_link: _zoomLink, ...updatesWithoutZoom } = safeUpdates
      const { data: retryData, error: retryError } = await supabase
        .from('webinar_bookings')
        .update(updatesWithoutZoom)
        .eq('razorpay_order_id', orderId)
        .select()
        .single()
      
      if (retryError) {
        throw new Error(`Failed to update booking: ${retryError.message}`)
      }
      
      return retryData as WebinarBooking
    }
    
    throw new Error(`Failed to update booking: ${error.message}`)
  }

  return data as WebinarBooking
}

