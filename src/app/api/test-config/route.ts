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
      emailJsService: process.env.EMAILJS_SERVICE_ID ? '✅ Configured' : '❌ Missing',
      emailJsTemplate: process.env.EMAILJS_TEMPLATE_ID ? '✅ Configured' : '❌ Missing',
      emailJsPublicKey: process.env.EMAILJS_PUBLIC_KEY ? '✅ Configured' : '❌ Missing',
      emailJsPrivateKey: process.env.EMAILJS_PRIVATE_KEY ? '✅ Configured' : '❌ Missing',
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

