-- Execute this entire query in your Supabase SQL Editor to create the table and enable basic RLS

CREATE TABLE ai_ml_webinar_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  selected_date TEXT NOT NULL,
  selected_time TEXT NOT NULL,
  razorpay_order_id TEXT UNIQUE,
  razorpay_payment_id TEXT UNIQUE,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  meet_link TEXT,
  zoom_registration_link TEXT,
  order_notes JSONB,
  calendar_invite_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE ai_ml_webinar_bookings ENABLE ROW LEVEL SECURITY;

-- Create basic policies (Allowing service key to bypass RLS, which Next.js will use for inserts via API)
-- Enable public inserting (so the unauthenticated frontend user can trigger the API route locally)
CREATE POLICY "Enable insert access for all users" 
  ON ai_ml_webinar_bookings FOR INSERT 
  WITH CHECK (true);

-- Usually reading is restricted to admins/service role, but if they want to view records:
CREATE POLICY "Enable select access for authenticated users" 
  ON ai_ml_webinar_bookings FOR SELECT 
  USING (true);

-- Adding an update trigger for the updated_at column
CREATE OR REPLACE FUNCTION update_ai_ml_webinar_bookings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ai_ml_webinar_bookings_updated_at_trigger
BEFORE UPDATE ON ai_ml_webinar_bookings
FOR EACH ROW
EXECUTE FUNCTION update_ai_ml_webinar_bookings_updated_at();
