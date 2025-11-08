import { WebinarBooking } from './db'
import { normalizeDateTime } from './date-utils'

/**
 * Generate a Zoom meeting link
 * Option 1: Use Zoom API to create actual meetings (recommended for production)
 * Option 2: Use a pre-configured Zoom meeting link
 */
export async function generateMeetLink(booking: WebinarBooking): Promise<string> {
  // Check if Zoom OAuth credentials are configured (Server-to-Server OAuth)
  if (process.env.ZOOM_CLIENT_ID && process.env.ZOOM_CLIENT_SECRET && process.env.ZOOM_ACCOUNT_ID) {
    try {
      return await createZoomMeeting(booking)
    } catch (error) {
      console.error('Error creating Zoom meeting via API:', error)
      // Fallback to default meeting URL if API fails
    }
  }
  
  // Fallback: Use a pre-configured Zoom meeting link
  const zoomMeetingUrl = process.env.ZOOM_MEETING_URL || process.env.ZOOM_DEFAULT_MEETING_URL
  
  if (zoomMeetingUrl) {
    return zoomMeetingUrl
  }
  
  // If no Zoom configuration, return a placeholder
  // In production, you should always configure either Zoom API or a default meeting URL
  console.warn('No Zoom configuration found. Please set ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET, and ZOOM_ACCOUNT_ID, or ZOOM_MEETING_URL')
  return 'https://zoom.us/j/YOUR_MEETING_ID'
}

/**
 * Create a Zoom meeting using Zoom API (Server-to-Server OAuth)
 * Requires: ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET, and ZOOM_ACCOUNT_ID
 * Get these from: https://marketplace.zoom.us/develop/create (create a Server-to-Server OAuth app)
 */
async function createZoomMeeting(booking: WebinarBooking): Promise<string> {
  if (!process.env.ZOOM_CLIENT_ID || !process.env.ZOOM_CLIENT_SECRET || !process.env.ZOOM_ACCOUNT_ID) {
    throw new Error('Zoom API credentials not configured')
  }
  
  // Step 1: Get OAuth access token
  const token = await getZoomAccessToken()
  
  // Step 2: Create the meeting
  // Combine date and time
  const { startDate } = normalizeDateTime(booking.selected_date, booking.selected_time)
  
  // Format for Zoom API (ISO 8601 format)
  const startTime = startDate.toISOString()
  const duration = 60 // 1 hour in minutes
  
  // Create Zoom meeting
  const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic: 'Lean Multiverse Webinar - Enterprise Agility & Digital Transformation',
      type: 2, // Scheduled meeting
      start_time: startTime,
      duration: duration,
      timezone: 'Asia/Kolkata',
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        mute_upon_entry: true,
        waiting_room: false,
        auto_recording: 'none',
        watermark: false,
      },
    }),
  })
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`Zoom API error: ${response.statusText} - ${JSON.stringify(errorData)}`)
  }
  
  const data = await response.json()
  
  // Return the join URL (participants use this) or start URL (host uses this)
  return data.join_url || data.start_url || ''
}

/**
 * Get OAuth access token for Server-to-Server OAuth
 * This exchanges the Client ID and Secret for an access token
 */
async function getZoomAccessToken(): Promise<string> {
  const accountId = process.env.ZOOM_ACCOUNT_ID
  const clientId = process.env.ZOOM_CLIENT_ID
  const clientSecret = process.env.ZOOM_CLIENT_SECRET
  
  if (!accountId || !clientId || !clientSecret) {
    throw new Error('Zoom OAuth credentials not configured')
  }
  
  // Create Basic Auth token (base64 encoded clientId:clientSecret)
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  
  // Request access token
  const response = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`Failed to get Zoom access token: ${response.statusText} - ${JSON.stringify(errorData)}`)
  }
  
  const data = await response.json()
  return data.access_token
}

