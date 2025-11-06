# Webinar Booking System Setup Guide

This guide will help you set up the webinar booking automation system.

## Prerequisites

1. **Supabase Account** (or any PostgreSQL database)
2. **Razorpay Account** with API keys
3. **Resend Account** for email service

## Step 1: Database Setup (Supabase)

1. Create a new Supabase project at https://supabase.com
2. Go to SQL Editor and run the SQL from `src/lib/db-schema.sql`
3. Copy your project URL and API keys:
   - Project URL: `https://your-project.supabase.co`
   - Anon Key: Found in Settings > API
   - Service Role Key: Found in Settings > API (keep this secret!)

## Step 2: Razorpay Setup

1. Create a Razorpay account at https://razorpay.com
2. Go to Settings > API Keys
3. Generate test keys (for development) or live keys (for production)
4. Copy:
   - Key ID
   - Key Secret
5. Set up webhook (for production):
   - Webhook URL: `https://yourdomain.com/api/razorpay/webhook`
   - Events: `payment.captured`, `payment.failed`

## Step 3: Resend Setup

1. Create a Resend account at https://resend.com
2. Verify your domain (or use Resend's test domain)
3. Generate an API key
4. Copy the API key

## Step 4: Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=webinar@yourdomain.com

# Webinar
WEBINAR_ORGANIZER_EMAIL=webinar@yourdomain.com
GOOGLE_MEET_BASE_URL=https://meet.google.com

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Step 5: Install Dependencies

```bash
npm install
```

## Step 6: Run the Application

```bash
npm run dev
```

## Features

- ✅ Date picker (Saturdays and Sundays only)
- ✅ Time slot selection (10 AM, 2 PM, 6 PM IST)
- ✅ User information form
- ✅ Razorpay payment integration (₹99)
- ✅ Calendar invite generation (.ics file)
- ✅ Email with calendar invite attachment
- ✅ Google Meet link generation
- ✅ Automatic email sending after payment

## Testing

1. Navigate to `/book-webinar`
2. Select a date (Saturday or Sunday)
3. Select a time slot
4. Fill in your information
5. Click "Proceed to Payment"
6. Use Razorpay test cards:
   - Success: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date

## Production Deployment

1. Set up environment variables in your hosting platform (Vercel, etc.)
2. Update `NEXT_PUBLIC_BASE_URL` to your production URL
3. Use Razorpay live keys
4. Verify your domain in Resend
5. Set up Razorpay webhook with your production URL

## Notes

- All times are in IST (Indian Standard Time)
- Webinars are only available on weekends (Saturday and Sunday)
- Calendar invites are sent automatically after successful payment
- Google Meet links are generated automatically (you can integrate Google Calendar API for actual meeting creation)

## Support

For issues or questions, contact: webinar@leanmultiverse.com

