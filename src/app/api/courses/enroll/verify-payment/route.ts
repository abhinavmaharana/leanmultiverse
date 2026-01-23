import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { 
  getCourseEnrollmentByOrderId, 
  updateCourseEnrollmentByOrderId,
  createCourseEnrollment 
} from '@/lib/db-helpers'
import { Resend } from 'resend'

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
      console.error('Missing payment verification data')
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

    // Capture the payment
    try {
      const payment = await razorpay.payments.fetch(razorpay_payment_id)
      console.log('Payment details:', {
        id: payment.id,
        status: payment.status,
        amount: payment.amount
      })
      
      if (payment.status === 'authorized') {
        await razorpay.payments.capture(razorpay_payment_id, payment.amount, payment.currency || 'INR')
        console.log('Payment captured successfully')
      }
    } catch (error) {
      console.error('Error capturing payment:', error)
    }

    // Get enrollment from database
    let enrollment = await getCourseEnrollmentByOrderId(razorpay_order_id)
    console.log('Enrollment lookup:', {
      order_id: razorpay_order_id,
      found: !!enrollment
    })

    // If enrollment doesn't exist, create it from Razorpay order notes
    let orderNotes: Record<string, string> | null = null
    if (!enrollment) {
      try {
        const order = await razorpay.orders.fetch(razorpay_order_id)
        orderNotes = order.notes as Record<string, string> | null
        
        if (orderNotes && orderNotes.course_id && orderNotes.user_name && orderNotes.user_email) {
          try {
            enrollment = await createCourseEnrollment({
              course_id: orderNotes.course_id,
              course_name: orderNotes.course_title || 'Career Starter Course',
              course_slug: orderNotes.course_slug || '',
              user_name: orderNotes.user_name,
              user_email: orderNotes.user_email,
              user_phone: orderNotes.user_phone,
              razorpay_order_id: razorpay_order_id,
              amount_paid: 2499,
            })
            console.log('Created enrollment from order notes')
          } catch (createError) {
            console.error('Error creating enrollment:', createError)
          }
        }
      } catch (fetchError) {
        console.error('Error fetching order:', fetchError)
      }
    }
    
    const enrollmentData = enrollment || (orderNotes ? {
      user_name: orderNotes.user_name,
      user_email: orderNotes.user_email,
      user_phone: orderNotes.user_phone,
      course_name: orderNotes.course_title || 'Career Starter Course',
      id: `temp_${razorpay_order_id}`,
      amount_paid: 2499,
    } : null)
    
    if (!enrollmentData) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      )
    }

    // Update enrollment with payment details
    if (enrollment) {
      await updateCourseEnrollmentByOrderId(razorpay_order_id, {
        razorpay_payment_id,
        payment_status: 'paid',
      })
    }

    // Send confirmation email
    try {
      if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY not configured, skipping email')
      } else {
        console.log('Attempting to send email to:', enrollmentData.user_email)
        
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Course Enrollment Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #000000;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #eab308 0%, #f59e0b 100%);">
        <h1 style="margin: 0; color: #000000; font-size: 32px; font-weight: bold;">LeanMultiverse</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 0;">
        <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #18181b; border-radius: 8px;">
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 24px;">Enrollment Confirmed! 🎉</h2>
              <p style="margin: 0 0 20px 0; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                Dear ${enrollmentData.user_name},
              </p>
              <p style="margin: 0 0 20px 0; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                Thank you for enrolling in <strong style="color: #eab308;">${enrollmentData.course_name}</strong>! We're excited to have you on this transformative learning journey.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <table role="presentation" style="width: 100%; background-color: #27272a; border-radius: 8px; padding: 20px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 15px 0; color: #eab308; font-size: 18px;">Payment Details</h3>
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Transaction ID:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right; font-weight: bold;">${razorpay_payment_id}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Order ID:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right; font-weight: bold;">${razorpay_order_id}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Amount Paid:</td>
                        <td style="padding: 8px 0; color: #22c55e; font-size: 16px; text-align: right; font-weight: bold;">₹2,499</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Course:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right; font-weight: bold;">${enrollmentData.course_name}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <h3 style="margin: 0 0 15px 0; color: #ffffff; font-size: 18px;">What's Next?</h3>
              <ul style="margin: 0; padding: 0 0 0 20px; color: #d1d5db; font-size: 15px; line-height: 1.8;">
                <li style="margin-bottom: 10px;">Course access will be provided shortly via email</li>
                <li style="margin-bottom: 10px;">You'll receive login credentials and course materials within 24 hours</li>
                <li style="margin-bottom: 10px;">Our team will contact you for onboarding and orientation</li>
                <li>Keep an eye on your email for important updates</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #eab308 0%, #f59e0b 100%); border-radius: 8px; padding: 25px;">
                <tr>
                  <td style="text-align: center;">
                    <h3 style="margin: 0 0 10px 0; color: #000000; font-size: 20px;">Course Highlights</h3>
                    <p style="margin: 0; color: #000000; font-size: 14px; line-height: 1.6;">
                      ✨ 4 Weeks of Comprehensive Training<br>
                      📚 Structured Learning Modules<br>
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
            <td style="padding: 0 40px 40px 40px;">
              <p style="margin: 0; color: #9ca3af; font-size: 15px;">
                Best regards,<br>
                <strong style="color: #eab308;">LeanMultiverse Team</strong>
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
          subject: `Welcome to ${enrollmentData.course_name}! 🎉`,
          html: emailHtml,
        })
        
        console.log('Email sent successfully')
        
        if (enrollment) {
          await updateCourseEnrollmentByOrderId(razorpay_order_id, {
            email_sent: true,
          })
          console.log('Email marked as sent')
        }
      }
    } catch (error) {
      console.error('Error sending email:', error)
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
