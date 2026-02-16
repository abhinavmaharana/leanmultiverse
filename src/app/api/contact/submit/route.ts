import { NextRequest, NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import { google } from 'googleapis'
import { isValidEmailFormat } from '@/lib/validators'
import { checkRateLimit, STRICT_LIMIT } from '@/lib/rate-limit'
import { withRetry, withTimeout, HIGH_DEMAND_MESSAGE } from '@/lib/http-utils'

interface ContactFormData {
  name: string
  email: string
  countryCode: string
  country: string
  phoneNumber: string
  source: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = await checkRateLimit(request, STRICT_LIMIT)
  if (rateLimitResponse) return rateLimitResponse

  try {
    const body: ContactFormData = await request.json()
    const { name, email, countryCode, country, phoneNumber, source, timestamp } = body

    // Validate required fields
    if (!name || !email || !countryCode || !country || !phoneNumber) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (!isValidEmailFormat(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Get Google Sheets credentials from environment variables
    const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID

    if (!credentials || !spreadsheetId) {
      console.error('Google Sheets credentials not configured')
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    // Parse credentials
    let auth
    try {
      const credentialsJson = JSON.parse(credentials)
      auth = new google.auth.GoogleAuth({
        credentials: credentialsJson,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      })
    } catch (error) {
      console.error('Error parsing Google Sheets credentials:', error)
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    // Create Google Sheets client
    const sheets = google.sheets({ version: 'v4', auth })

    // Prepare the row data
    const rowData = [
      timestamp || new Date().toISOString(),
      name,
      email,
      countryCode,
      country,
      phoneNumber,
      `${countryCode}${phoneNumber}`,
      source || 'general',
    ]

    // Append data to the sheet (idempotent; timeout + retries for resilience)
    await withRetry(
      () =>
        withTimeout(
          sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!A:H',
            valueInputOption: 'USER_ENTERED',
            requestBody: { values: [rowData] },
          })
        ),
      { retries: 2 }
    )

    return NextResponse.json({
      success: true,
      message: 'Contact information submitted successfully',
    })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    Sentry.captureException(error)
    return NextResponse.json(
      { error: HIGH_DEMAND_MESSAGE },
      { status: 503 }
    )
  }
}

