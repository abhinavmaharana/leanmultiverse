-- Webinar Bookings Table Schema
-- Run this SQL in your Supabase SQL Editor or PostgreSQL database

CREATE TABLE IF NOT EXISTS webinar_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_phone VARCHAR(20) NOT NULL,
  selected_date DATE NOT NULL,
  selected_time TIME NOT NULL,
  razorpay_order_id VARCHAR(255),
  razorpay_payment_id VARCHAR(255),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  meet_link TEXT,
  calendar_invite_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_webinar_bookings_email ON webinar_bookings(user_email);

-- Create index on payment status
CREATE INDEX IF NOT EXISTS idx_webinar_bookings_payment_status ON webinar_bookings(payment_status);

-- Create index on selected_date for date queries
CREATE INDEX IF NOT EXISTS idx_webinar_bookings_date ON webinar_bookings(selected_date);

-- Create index on razorpay_order_id for payment lookups
CREATE INDEX IF NOT EXISTS idx_webinar_bookings_order_id ON webinar_bookings(razorpay_order_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_webinar_bookings_updated_at
  BEFORE UPDATE ON webinar_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

