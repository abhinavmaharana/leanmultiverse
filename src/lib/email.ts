import { Resend } from 'resend'
import { format, parseISO } from 'date-fns'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailData {
  to: string
  name: string
  date: string
  time: string
  meetLink: string
  calendarInvite: string
}

export async function sendCalendarInviteEmail(data: EmailData) {
  try {
    // Format date and time for display
    const dateObj = parseISO(data.date)
    const formattedDate = format(dateObj, 'EEEE, MMMM d, yyyy')
    const formattedTime = format(parseISO(`2000-01-01T${data.time}:00`), 'h:mm a') + ' IST'

    // Convert calendar invite to buffer for attachment
    const calendarBuffer = Buffer.from(data.calendarInvite, 'utf-8')

    const emailContent = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Lean Multiverse <webinar@leanmultiverse.com>',
      to: data.to,
      subject: `Your Webinar Booking Confirmation - ${formattedDate}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Webinar Booking Confirmation</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #C69D44 0%, #604C21 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Webinar Booking Confirmed!</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
              <p style="font-size: 16px; margin-bottom: 20px;">Hello ${data.name},</p>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                Thank you for booking our webinar! Your payment has been confirmed and your spot is reserved.
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #C69D44;">
                <h2 style="color: #C69D44; margin-top: 0; font-size: 20px;">Webinar Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; width: 120px;">Date:</td>
                    <td style="padding: 8px 0;">${formattedDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Time:</td>
                    <td style="padding: 8px 0;">${formattedTime}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Duration:</td>
                    <td style="padding: 8px 0;">1 hour</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Platform:</td>
                    <td style="padding: 8px 0;">Zoom</td>
                  </tr>
                </table>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${data.meetLink}" 
                   style="display: inline-block; background: linear-gradient(135deg, #C69D44 0%, #604C21 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                  Join Webinar
                </a>
              </div>
              
              <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>Important:</strong> Please add the calendar invite (attached below) to your calendar. 
                  The meeting link is also included in the calendar event.
                </p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <h3 style="color: #333; font-size: 18px; margin-bottom: 15px;">What to Expect</h3>
                <ul style="padding-left: 20px; font-size: 14px; color: #666;">
                  <li>Enterprise Agility & Digital Transformation insights</li>
                  <li>Building in the Multiverse strategies</li>
                  <li>Collaborative Innovation practices</li>
                  <li>Q&A session with industry experts</li>
                </ul>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #666;">
                <p style="margin-bottom: 10px;">
                  <strong>Note:</strong> All times are in IST (Indian Standard Time). 
                  If you're in a different timezone, please adjust accordingly.
                </p>
                <p style="margin: 0;">
                  If you have any questions, please contact us at 
                  <a href="mailto:webinar@leanmultiverse.com" style="color: #C69D44;">webinar@leanmultiverse.com</a>
                </p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #999;">
                <p style="margin: 0;">© ${new Date().getFullYear()} Lean Multiverse. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: 'webinar-invite.ics',
          content: calendarBuffer,
        },
      ],
    })

    return emailContent
  } catch (error: any) {
    console.error('Error sending email:', error)
    throw new Error(`Failed to send email: ${error.message}`)
  }
}

