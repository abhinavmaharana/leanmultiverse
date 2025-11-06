import { WebinarBooking } from './db'
import { parseISO, addHours } from 'date-fns'
import jwt from 'jsonwebtoken'

/**
 * Generate a Zoom meeting link
 * Option 1: Use Zoom API to create actual meetings (recommended for production)
 * Option 2: Use a pre-configured Zoom meeting link
 */
export async function generateMeetLink(booking: WebinarBooking): Promise<string> {
  // Check if Zoom API credentials are configured
  if (process.env.ZOOM_API_KEY && process.env.ZOOM_API_SECRET) {
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
  console.warn('No Zoom configuration found. Please set ZOOM_API_KEY and ZOOM_API_SECRET, or ZOOM_MEETING_URL')
  return 'https://zoom.us/j/YOUR_MEETING_ID'
}

/**
 * Create a Zoom meeting using Zoom API (JWT)
 * Requires: ZOOM_API_KEY and ZOOM_API_SECRET
 * Get these from: https://marketplace.zoom.us/develop/create (create a JWT app)
 */
async function createZoomMeeting(booking: WebinarBooking): Promise<string> {
  if (!process.env.ZOOM_API_KEY || !process.env.ZOOM_API_SECRET) {
    throw new Error('Zoom API credentials not configured')
  }
  
  // Combine date and time
  const dateTimeStr = `${booking.selected_date}T${booking.selected_time}:00`
  const startDate = parseISO(dateTimeStr)
  
  // Format for Zoom API (ISO 8601 format)
  const startTime = startDate.toISOString()
  const duration = 60 // 1 hour in minutes
  
  // Generate JWT token for Zoom API
  const payload = {
    iss: process.env.ZOOM_API_KEY,
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiry
  }
  
  const token = jwt.sign(payload, process.env.ZOOM_API_SECRET)
  
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

