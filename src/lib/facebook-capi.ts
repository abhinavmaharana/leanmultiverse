import crypto from 'crypto'

/**
 * Normalizes and hashes an email address for Meta Conversions API
 */
function hashEmail(email: string): string {
  const normalized = email.trim().toLowerCase()
  return crypto.createHash('sha256').update(normalized).digest('hex')
}

/**
 * Normalizes and hashes a phone number for Meta Conversions API
 */
function hashPhone(phone: string): string {
  // Remove all non-numeric characters and leading zeros, then ensure country code is present (e.g., 91 for India)
  // Since we expect Indian numbers mostly, we append 91 if it's a 10 digit number
  let normalized = phone.replace(/\D/g, '')
  if (normalized.length === 10) {
    normalized = `91${normalized}`
  } else if (normalized.startsWith('0')) {
    normalized = `91${normalized.slice(1)}`
  }
  
  return crypto.createHash('sha256').update(normalized).digest('hex')
}

interface LeadEventParams {
  email: string
  phone: string
  lead_id: string | number
  event_name?: string
}

/**
 * Sends a server-side Conversions API event to Meta
 */
export async function sendMetaLeadEvent(params: LeadEventParams) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const accessToken = process.env.META_CAPI_TOKEN

  if (!pixelId || !accessToken) {
    console.warn('Meta CAPI: Missing NEXT_PUBLIC_META_PIXEL_ID or META_CAPI_TOKEN. Skipping event.')
    return false
  }

  const { email, phone, lead_id, event_name = 'Lead' } = params

  const payload = {
    data: [
      {
        action_source: "system_generated",
        custom_data: {
          event_source: "crm",
          lead_event_source: "Lean Multiverse CRM"
        },
        event_name,
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          em: [hashEmail(email)],
          ph: [hashPhone(phone)],
          lead_id: String(lead_id)
        }
      }
    ]
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Meta CAPI Error Response:', result)
      return false
    }

    console.log(`Meta CAPI: Successfully sent ${event_name} event for Lead ID: ${lead_id}`)
    return true
  } catch (error) {
    console.error('Meta CAPI Request Failed:', error)
    return false
  }
}
