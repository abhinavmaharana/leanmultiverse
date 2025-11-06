import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to } = body

    if (!to) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      )
    }

    // Check if SMTP credentials are configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json(
        { 
          error: 'SMTP credentials are not configured',
          message: 'Please add SMTP_USER and SMTP_PASS to your environment variables. For Outlook, use your Outlook email address and password.'
        },
        { status: 500 }
      )
    }

    // Create SMTP transporter (Outlook or generic SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp-mail.outlook.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER || 'Lean Multiverse <webinar@leanmultiverse.com>'

    // Send a test email
    const result = await transporter.sendMail({
      from: fromEmail,
      to: to,
      subject: 'Test Email from Lean Multiverse',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Test Email</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #C69D44 0%, #604C21 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Test Email</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
              <p style="font-size: 16px; margin-bottom: 20px;">Hello,</p>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                This is a test email from Lean Multiverse. If you received this, your email configuration is working correctly!
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #C69D44;">
                <h2 style="color: #C69D44; margin-top: 0; font-size: 20px;">Configuration Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; width: 150px;">From Email:</td>
                    <td style="padding: 8px 0;">${fromEmail}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">To Email:</td>
                    <td style="padding: 8px 0;">${to}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Status:</td>
                    <td style="padding: 8px 0; color: green;">✅ Working</td>
                  </tr>
                </table>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #666;">
                <p style="margin: 0;">
                  If you received this email, your SMTP configuration is correct and emails should be sent automatically for webinar bookings.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      messageId: result.messageId,
      to: to,
      from: fromEmail,
      response: result.response,
      note: 'Check your spam/junk folder if you don\'t see it in your inbox.',
    })
  } catch (error) {
    console.error('Error sending test email:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to send test email'
    const errorDetails = error instanceof Error ? error.stack : JSON.stringify(error)
    
    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined,
        smtpUser: process.env.SMTP_USER ? '✅ Configured' : '❌ Missing',
        smtpPass: process.env.SMTP_PASS ? '✅ Configured' : '❌ Missing',
        fromEmail: process.env.FROM_EMAIL || process.env.SMTP_USER || 'Using default',
      },
      { status: 500 }
    )
  }
}

