import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. Using fallback connection.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

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
  user_phone: string
  razorpay_order_id?: string
  amount_paid?: number
}

