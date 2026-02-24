import { supabase, WebinarBooking, CreateBookingData, AiMlEnrollment, CreateAiMlEnrollmentData, CourseEnrollment, CreateCourseEnrollmentData } from './db'

export type FreeWebinarBookingData = {
  user_name: string
  user_email: string
  user_phone: string
  selected_date: string
  selected_time: string
  zoom_registration_link?: string
}

export async function createFreeWebinarBooking(data: FreeWebinarBookingData) {
  const { data: booking, error } = await supabase
    .from('webinar_bookings')
    .insert([{
      ...data,
      payment_status: 'paid',
      razorpay_order_id: null,
      razorpay_payment_id: null,
      meet_link: data.zoom_registration_link || null,
    }])
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create free webinar booking: ${error.message}`)
  }

  return booking as WebinarBooking
}

export async function createBooking(data: CreateBookingData) {
  // Try to insert with all data first
  const { data: booking, error } = await supabase
    .from('webinar_bookings')
    .insert([data])
    .select()
    .single()

  if (error) {
    // Retry without optional columns if they don't exist
    const hasOptional = 'zoom_registration_link' in data || 'order_notes' in data
    if (hasOptional && (error.message?.includes('zoom_registration_link') || error.message?.includes('order_notes'))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { zoom_registration_link: _zoomLink, order_notes: _orderNotes, ...dataWithoutOptional } = data
      const { data: retryBooking, error: retryError } = await supabase
        .from('webinar_bookings')
        .insert([dataWithoutOptional])
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


// AI/ML Enrollment helpers
export async function createAiMlEnrollment(data: CreateAiMlEnrollmentData) {
  const { data: enrollment, error } = await supabase
    .from('ai_ml_enrollments')
    .insert([{
      ...data,
      payment_status: 'pending',
      email_sent: false
    }])
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create AI/ML enrollment: ${error.message}`)
  }

  return enrollment as AiMlEnrollment
}

export async function getAiMlEnrollmentById(id: string) {
  const { data, error } = await supabase
    .from('ai_ml_enrollments')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to get AI/ML enrollment: ${error.message}`)
  }

  return data as AiMlEnrollment | null
}

export async function getAiMlEnrollmentByOrderId(orderId: string) {
  const { data, error } = await supabase
    .from('ai_ml_enrollments')
    .select('*')
    .eq('razorpay_order_id', orderId)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to get AI/ML enrollment: ${error.message}`)
  }

  return data as AiMlEnrollment | null
}

export async function updateAiMlEnrollment(id: string, updates: Partial<AiMlEnrollment>) {
  const { data, error } = await supabase
    .from('ai_ml_enrollments')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update AI/ML enrollment: ${error.message}`)
  }

  return data as AiMlEnrollment
}

export async function updateAiMlEnrollmentByOrderId(orderId: string, updates: Partial<AiMlEnrollment>) {
  const { data, error } = await supabase
    .from('ai_ml_enrollments')
    .update(updates)
    .eq('razorpay_order_id', orderId)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update AI/ML enrollment: ${error.message}`)
  }

  return data as AiMlEnrollment

}

// Generic Course Enrollment helpers
export async function createCourseEnrollment(data: CreateCourseEnrollmentData) {
  const { data: enrollment, error } = await supabase
    .from('course_enrollments')
    .insert([{
      ...data,
      payment_status: 'pending',
      email_sent: false
    }])
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create course enrollment: ${error.message}`)
  }

  return enrollment as CourseEnrollment
}

export async function getCourseEnrollmentById(id: string) {
  const { data, error } = await supabase
    .from('course_enrollments')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to get course enrollment: ${error.message}`)
  }

  return data as CourseEnrollment | null
}

export async function getCourseEnrollmentByOrderId(orderId: string) {
  const { data, error } = await supabase
    .from('course_enrollments')
    .select('*')
    .eq('razorpay_order_id', orderId)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to get course enrollment: ${error.message}`)
  }

  return data as CourseEnrollment | null
}

export async function updateCourseEnrollment(id: string, updates: Partial<CourseEnrollment>) {
  const { data, error } = await supabase
    .from('course_enrollments')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update course enrollment: ${error.message}`)
  }

  return data as CourseEnrollment
}

export async function updateCourseEnrollmentByOrderId(orderId: string, updates: Partial<CourseEnrollment>) {
  const { data, error } = await supabase
    .from('course_enrollments')
    .update(updates)
    .eq('razorpay_order_id', orderId)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update course enrollment: ${error.message}`)
  }

  return data as CourseEnrollment
}

