import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// WhatsApp community link for webinar participants
export const WHATSAPP_COMMUNITY_LINK = 'https://chat.whatsapp.com/EGwzsvlQJoS4qjDraMraHG'

export interface PaymentConfirmationEmailData {
  to: string
  name: string
  date: string
  time: string
  whatsappLink?: string
}

function formatDateForEmail(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split('-').map(Number)
    const date = new Date(Date.UTC(year, month - 1, day, 18, 30, 0))
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  } catch {
    return dateStr
  }
}

function formatTimeForEmail(timeStr: string): string {
  try {
    const [h, m] = timeStr.split(':').map(Number)
    const d = new Date()
    d.setHours(h, m, 0, 0)
    return new Intl.DateTimeFormat('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(d) + ' IST'
  } catch {
    return timeStr
  }
}

export async function sendPaymentConfirmationEmail(
  data: PaymentConfirmationEmailData
): Promise<void> {
  const whatsappLink = data.whatsappLink || WHATSAPP_COMMUNITY_LINK
  const formattedDate = formatDateForEmail(data.date)
  const formattedTime = formatTimeForEmail(data.time)
  const fromEmail = 'onboarding@resend.dev'

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>You're In! 🎉 Webinar Booking Confirmed</title>
</head>
<body style="margin:0;padding:0;background:#0f0f14;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f14;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:linear-gradient(145deg,#1a1a2e 0%,#16213e 100%);border-radius:20px;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,0.5);">

          <!-- Top gradient bar -->
          <tr>
            <td style="background:linear-gradient(90deg,#f59e0b,#ef4444,#8b5cf6);height:4px;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td align="center" style="padding:40px 40px 30px;">
              <div style="background:linear-gradient(135deg,#f59e0b22,#ef444422);border:1px solid #f59e0b44;border-radius:50%;width:80px;height:80px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:20px;">
                <span style="font-size:36px;">🎉</span>
              </div>
              <h1 style="margin:0 0 8px;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                You're In!
              </h1>
              <p style="margin:0;font-size:16px;color:#94a3b8;">
                Your webinar seat is officially reserved
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:0 40px 24px;">
              <p style="margin:0;font-size:16px;color:#cbd5e1;line-height:1.6;">
                Hey <strong style="color:#f59e0b;">${data.name}</strong>, 👋
              </p>
              <p style="margin:12px 0 0;font-size:15px;color:#94a3b8;line-height:1.7;">
                Your payment was successful and your seat at the <strong style="color:#ffffff;">Product Manager | Project Manager | Program Management Career Roadmap Webinar</strong> is confirmed!
              </p>
            </td>
          </tr>

          <!-- Session Details Card -->
          <tr>
            <td style="padding:0 40px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1e293b,#1a2744);border:1px solid #334155;border-radius:16px;overflow:hidden;">
                <tr>
                  <td style="padding:6px 20px;background:linear-gradient(90deg,#f59e0b18,#ef444418);border-bottom:1px solid #334155;">
                    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2px;color:#f59e0b;text-transform:uppercase;">📅 Session Details</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="40" valign="top" style="padding-right:12px;">
                          <div style="width:36px;height:36px;background:#f59e0b22;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;">📆</div>
                        </td>
                        <td valign="top">
                          <p style="margin:0;font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Date</p>
                          <p style="margin:4px 0 0;font-size:15px;color:#e2e8f0;font-weight:700;">${formattedDate}</p>
                        </td>
                      </tr>
                      <tr><td colspan="2" style="height:14px;"></td></tr>
                      <tr>
                        <td width="40" valign="top" style="padding-right:12px;">
                          <div style="width:36px;height:36px;background:#6366f122;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;">⏰</div>
                        </td>
                        <td valign="top">
                          <p style="margin:0;font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Time</p>
                          <p style="margin:4px 0 0;font-size:15px;color:#e2e8f0;font-weight:700;">${formattedTime}</p>
                        </td>
                      </tr>
                      <tr><td colspan="2" style="height:14px;"></td></tr>
                      <tr>
                        <td width="40" valign="top" style="padding-right:12px;">
                          <div style="width:36px;height:36px;background:#25d36622;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font-size:18px;">📱</div>
                        </td>
                        <td valign="top">
                          <p style="margin:0;font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Join Link</p>
                          <p style="margin:4px 0 0;font-size:15px;color:#25d366;font-weight:700;">Sent via WhatsApp Community below 👇</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- WhatsApp CTA -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#128c7e18,#25d36618);border:1px solid #25d36644;border-radius:16px;">
                <tr>
                  <td style="padding:24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td valign="top">
                          <p style="margin:0 0 6px;font-size:18px;font-weight:800;color:#25d366;">📱 Join Our WhatsApp Community</p>
                          <p style="margin:0 0 18px;font-size:14px;color:#94a3b8;line-height:1.6;">
                            Get real-time updates, session reminders, and exclusive resources. Connect with 1000+ future managers — and receive the session link directly here!
                          </p>
                          <a href="${whatsappLink}"
                             style="display:inline-block;background:linear-gradient(135deg,#25d366,#128c7e);color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 28px;border-radius:12px;letter-spacing:0.3px;">
                            🔗 &nbsp;Join WhatsApp Community
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What to expect -->
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="margin:0 0 16px;font-size:14px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1.5px;">🚀 What to Expect</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${[
                  ['🗺️', 'Complete PM/PgM/PjM Career Roadmap from scratch'],
                  ['💰', 'Salary insights & how to negotiate your first offer'],
                  ['🛠️', 'Tools & frameworks top managers use daily'],
                  ['🎯', 'Live Q&A — your burning questions answered'],
                ].map(([icon, text]) => `
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:18px;padding-right:12px;">${icon}</td>
                        <td style="font-size:14px;color:#cbd5e1;line-height:1.5;">${text}</td>
                      </tr>
                    </table>
                  </td>
                </tr>`).join('')}
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;"><div style="height:1px;background:linear-gradient(90deg,transparent,#334155,transparent);"></div></td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 40px 36px;" align="center">
              <p style="margin:0 0 4px;font-size:13px;color:#475569;">Any questions? Reply to this email or WhatsApp us.</p>
              <p style="margin:0;font-size:12px;color:#334155;">
                © ${new Date().getFullYear()} Lean Multiverse &nbsp;|&nbsp;
                <a href="https://leanmultiverse.com" style="color:#f59e0b;text-decoration:none;">leanmultiverse.com</a>
              </p>
            </td>
          </tr>

          <!-- Bottom gradient bar -->
          <tr>
            <td style="background:linear-gradient(90deg,#f59e0b,#ef4444,#8b5cf6);height:3px;"></td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  const { error } = await resend.emails.send({
    from: `Lean Multiverse <${fromEmail}>`,
    to: [data.to],
    subject: `🎉 You're In! Webinar Confirmed — ${formattedDate}`,
    html,
  })

  if (error) {
    throw new Error(`Resend email failed: ${error.message}`)
  }

  console.log('✅ Payment confirmation email sent via Resend to:', data.to)
}
