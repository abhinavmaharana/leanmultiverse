import { NextResponse } from 'next/server'

export async function GET() {
  const config = {
    database: {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Configured' : '❌ Missing',
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Configured' : '❌ Missing',
    },
    razorpay: {
      keyId: process.env.RAZORPAY_KEY_ID ? '✅ Configured' : '❌ Missing',
      keySecret: process.env.RAZORPAY_KEY_SECRET ? '✅ Configured' : '❌ Missing',
      webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET ? '✅ Configured' : '❌ Missing',
    },
    email: {
      sendgridApiKey: process.env.SENDGRID_API_KEY ? '✅ Configured' : '❌ Missing',
      fromEmail: process.env.SENDGRID_FROM_EMAIL || process.env.FROM_EMAIL ? '✅ Configured' : '❌ Missing',
    },
    zoom: {
      accountId: process.env.ZOOM_ACCOUNT_ID ? '✅ Configured' : '❌ Missing',
      clientId: process.env.ZOOM_CLIENT_ID ? '✅ Configured' : '❌ Missing',
      clientSecret: process.env.ZOOM_CLIENT_SECRET ? '✅ Configured' : '❌ Missing',
      meetingUrl: process.env.ZOOM_MEETING_URL ? '✅ Configured (fallback)' : '❌ Not set',
    },
  }

  return NextResponse.json(config, { status: 200 })
}

