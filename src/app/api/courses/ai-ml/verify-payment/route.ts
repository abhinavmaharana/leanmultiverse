import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { 
  getAiMlEnrollmentByOrderId, 
  updateAiMlEnrollmentByOrderId,
  createAiMlEnrollment 
} from '@/lib/db-helpers'
import { Resend } from 'resend'
import { sendMetaLeadEvent } from '@/lib/facebook-capi'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

const resend = new Resend(process.env.RESEND_API_KEY)

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    razorpay_configured: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET),
    resend_configured: !!process.env.RESEND_API_KEY
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body

    console.log('Payment verification request:', {
      razorpay_order_id,
      razorpay_payment_id,
      has_signature: !!razorpay_signature
    })

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error('Missing payment verification data:', { razorpay_order_id, razorpay_payment_id, has_signature: !!razorpay_signature })
      return NextResponse.json(
        { error: 'Payment verification data missing' },
        { status: 400 }
      )
    }

    // Check if Razorpay credentials are configured
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error('RAZORPAY_KEY_SECRET not configured')
      return NextResponse.json(
        { error: 'Payment gateway not configured. Please contact support.' },
        { status: 500 }
      )
    }

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(text)
      .digest('hex')

    console.log('Signature verification:', {
      received: razorpay_signature,
      generated: generatedSignature,
      match: generatedSignature === razorpay_signature
    })

    if (generatedSignature !== razorpay_signature) {
      console.error('Invalid payment signature')
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Capture the payment (if not already captured)
    try {
      const payment = await razorpay.payments.fetch(razorpay_payment_id)
      console.log('Payment details:', {
        id: payment.id,
        status: payment.status,
        amount: payment.amount
      })
      
      if (payment.status === 'authorized') {
        await razorpay.payments.capture(razorpay_payment_id, payment.amount, payment.currency || 'INR')
        console.log('Payment captured successfully:', razorpay_payment_id)
      } else if (payment.status === 'captured') {
        console.log('Payment already captured:', razorpay_payment_id)
      }
    } catch (error) {
      console.error('Error capturing payment:', error)
      // Don't fail if capture fails - might already be captured
    }

    // Get enrollment from database
    let enrollment = await getAiMlEnrollmentByOrderId(razorpay_order_id)
    console.log('Enrollment lookup:', {
      order_id: razorpay_order_id,
      found: !!enrollment,
      enrollment_id: enrollment?.id
    })

    // If enrollment doesn't exist, create it from Razorpay order notes
    let orderNotes: Record<string, string> | null = null
    if (!enrollment) {
      try {
        const order = await razorpay.orders.fetch(razorpay_order_id)
        orderNotes = order.notes as Record<string, string> | null
        
        if (orderNotes && orderNotes.user_name && orderNotes.user_email && orderNotes.user_phone) {
          try {
            enrollment = await createAiMlEnrollment({
              user_name: orderNotes.user_name,
              user_email: orderNotes.user_email,
              user_phone: orderNotes.user_phone,
              razorpay_order_id: razorpay_order_id,
              amount_paid: 2499,
            })
            console.log('Created enrollment from Razorpay order notes:', enrollment.id)
          } catch (createError) {
            console.error('Error creating enrollment from order (will use order notes for email):', createError)
            enrollment = null
          }
        } else {
          return NextResponse.json(
            { error: 'Enrollment not found and cannot be created from order data' },
            { status: 404 }
          )
        }
      } catch (fetchError) {
        console.error('Error fetching order from Razorpay:', fetchError)
        return NextResponse.json(
          { error: 'Enrollment not found and failed to fetch order data' },
          { status: 404 }
        )
      }
    }
    
    // If we still don't have an enrollment but have order notes, use order notes for email
    const enrollmentData = enrollment || (orderNotes ? {
      user_name: orderNotes.user_name,
      user_email: orderNotes.user_email,
      user_phone: orderNotes.user_phone,
      id: `temp_${razorpay_order_id}`,
      amount_paid: 2499,
    } : null)
    
    if (!enrollmentData) {
      return NextResponse.json(
        { error: 'Enrollment not found and no order data available' },
        { status: 404 }
      )
    }

    if (enrollment) {
      await updateAiMlEnrollmentByOrderId(razorpay_order_id, {
        razorpay_payment_id,
        payment_status: 'paid',
      })
    }

    // Send server-side CRM Lead event to Meta (non-blocking)
    if (enrollmentData?.user_email && enrollmentData?.user_phone) {
      sendMetaLeadEvent({
        email: String(enrollmentData.user_email),
        phone: String(enrollmentData.user_phone),
        lead_id: enrollmentData.id,
        event_name: 'Purchase' // or Lead, using Purchase since they paid
      }).catch(err => console.error('Failed to send Meta CAPI Purchase Event:', err))
    }

    // Send confirmation email
    try {
      console.log('Attempting to send email to:', enrollmentData.user_email)
      
      // Check if Resend is configured
      if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY not configured, skipping email')
      } else {
      
      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI & ML Course Enrollment Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">LeanMultiverse</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 0;">
        <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 20px 40px;">
              <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px;">Enrollment Confirmed! 🎉</h2>
              <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                Dear ${enrollmentData.user_name},
              </p>
              <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                Thank you for enrolling in the <strong>AI & Machine Learning – Career Foundation Program</strong>! We're excited to have you on this transformative learning journey.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 10px 20px;">
                    <h3 style="margin: 0 0 15px 0; color: #667eea; font-size: 18px;">Payment Details</h3>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px;">Transaction ID:</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px; text-align: right; font-weight: bold;">${razorpay_payment_id}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px;">Order ID:</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px; text-align: right; font-weight: bold;">${razorpay_order_id}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px;">Amount Paid:</td>
                        <td style="padding: 8px 0; color: #22c55e; font-size: 16px; text-align: right; font-weight: bold;">₹2,499</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px;">Course:</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px; text-align: right; font-weight: bold;">AI & ML Career Foundation</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px 20px 40px;">
              <h3 style="margin: 0 0 15px 0; color: #333333; font-size: 18px;">What's Next?</h3>
              <ul style="margin: 0; padding: 0 0 0 20px; color: #666666; font-size: 15px; line-height: 1.8;">
                <li style="margin-bottom: 10px;">Course access will be provided shortly via email</li>
                <li style="margin-bottom: 10px;">You'll receive login credentials and course materials within 24 hours</li>
                <li style="margin-bottom: 10px;">Our team will contact you for onboarding and orientation</li>
                <li style="margin-bottom: 10px;">Keep an eye on your email for important updates</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; padding: 25px;">
                <tr>
                  <td style="text-align: center;">
                    <h3 style="margin: 0 0 10px 0; color: #ffffff; font-size: 20px;">Course Highlights</h3>
                    <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.6; opacity: 0.9;">
                      ✨ 4 Weeks of Comprehensive Training<br>
                      📚 12 Modules with Real-World Applications<br>
                      🎯 Career-Focused Learning Path<br>
                      🏆 LeanMultiverse Certification<br>
                      ♾️ Lifetime Access to Resources
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px 40px 40px;">
              <p style="margin: 0 0 20px 0; color: #666666; font-size: 15px; line-height: 1.6;">
                If you have any questions or need assistance, feel free to reach out to our support team.
              </p>
              <p style="margin: 0 0 10px 0; color: #666666; font-size: 15px;">
                Best regards,<br>
                <strong style="color: #667eea;">LeanMultiverse Team</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; color: #999999; font-size: 12px;">
                © 2025 LeanMultiverse. All rights reserved.<br>
                This is an automated email. Please do not reply to this message.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `

      await resend.emails.send({
        from: 'LeanMultiverse <noreply@leanmultiverse.com>',
        to: enrollmentData.user_email,
        subject: 'Welcome to AI & ML Career Foundation Program! 🎉',
        html: emailHtml,
      })
      
      console.log('Email sent successfully')
      
      // Mark email as sent (only if enrollment exists)
      if (enrollment) {
        await updateAiMlEnrollmentByOrderId(razorpay_order_id, {
          email_sent: true,
        })
        console.log('Email marked as sent in database')
      }
      }
    } catch (error) {
      console.error('Error sending email:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      console.error('Email sending error details:', {
        message: errorMessage,
        email: enrollmentData.user_email,
        timestamp: new Date().toISOString(),
      })
      
      // Don't fail the payment verification if email fails
      console.warn('Payment verified but email sending failed. Enrollment is still confirmed.')
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and enrollment confirmed',
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to verify payment'
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
