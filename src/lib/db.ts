import { createClient } from '@supabase/supabase-js'
import { fetchWithTimeout } from '@/lib/http-utils'

/**
 * For production with high concurrency, use Supabase's connection pooler and set
 * NEXT_PUBLIC_SUPABASE_URL to the pooler URL (transaction or session mode) in your env.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

/** Request timeout for Supabase (ms). Keeps serverless from hanging on slow DB. */
const SUPABASE_TIMEOUT_MS = 15_000

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. Using fallback connection.')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    fetch: (input, init) => fetchWithTimeout(input, init, SUPABASE_TIMEOUT_MS),
  },
})

// Database types
export interface WebinarBooking {
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
  zoom_registration_link?: string | null
  order_notes?: Record<string, string> | null
  calendar_invite_sent: boolean
  created_at: string
  updated_at: string
}

export interface CreateBookingData {
  user_name: string
  user_email: string
  user_phone: string
  selected_date: string
  selected_time: string
  razorpay_order_id?: string
  zoom_registration_link?: string
  order_notes?: Record<string, string>
}

// AI/ML Course Enrollment types
export interface AiMlEnrollment {
  id: string
  user_name: string
  user_email: string
  user_phone: string
  razorpay_order_id: string | null
  razorpay_payment_id: string | null
  payment_status: 'pending' | 'paid' | 'failed'
  amount_paid: number
  email_sent: boolean
  created_at: string
  updated_at: string
}

export interface CreateAiMlEnrollmentData {
  user_name: string
  user_email: string
  user_phone?: string 
  razorpay_order_id?: string
  amount_paid?: number
}

// AI/ML Webinar Bookings
export interface AiMlWebinarBooking {
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
  zoom_registration_link?: string | null
  order_notes?: Record<string, string> | null
  calendar_invite_sent: boolean
  created_at: string
  updated_at: string
}

export interface CreateAiMlWebinarBookingData {
  user_name: string
  user_email: string
  user_phone: string
  selected_date: string
  selected_time: string
  razorpay_order_id?: string
  zoom_registration_link?: string
  order_notes?: Record<string, string>
}

// Generic Course Enrollment types
export interface CourseEnrollment {
  id: string
  course_id: string
  course_name: string
  course_slug: string
  user_name: string
  user_email: string
  user_phone?: string 
  razorpay_order_id: string | null
  razorpay_payment_id: string | null
  payment_status: 'pending' | 'paid' | 'failed'
  amount_paid: number
  email_sent: boolean
  created_at: string
  updated_at: string
}

export interface CreateCourseEnrollmentData {
  course_id: string
  course_name: string
  course_slug: string
  user_name: string
  user_email: string
  user_phone?: string 
  razorpay_order_id?: string
  amount_paid?: number
}

