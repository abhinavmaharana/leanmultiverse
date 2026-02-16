import { NextRequest, NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import { google } from 'googleapis'
import { isValidEmailFormat, isValidIndianPhone } from '@/lib/validators'
import { checkRateLimit, STRICT_LIMIT } from '@/lib/rate-limit'
import { withRetry, withTimeout, HIGH_DEMAND_MESSAGE } from '@/lib/http-utils'

interface QuotationFormData {
  name: string
  email: string
  company: string
  countryCode: string
  country: string
  phoneNumber: string
  projectType: string
  budget: string
  timeline: string
  description: string
  currency: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = await checkRateLimit(request, STRICT_LIMIT)
  if (rateLimitResponse) return rateLimitResponse

  try {
    const body: QuotationFormData = await request.json()
    const { 
      name, 
      email, 
      company, 
      countryCode, 
      country, 
      phoneNumber, 
      projectType, 
      budget, 
      timeline, 
      description, 
      currency,
      timestamp 
    } = body

    // Validate required fields
    if (!name || !email || !countryCode || !country || !phoneNumber || !projectType || !description) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      )
    }

    if (!isValidEmailFormat(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const digits = (String(phoneNumber ?? '')).replace(/\D/g, '')
    if (countryCode === '+91') {
      if (!isValidIndianPhone(phoneNumber)) {
        return NextResponse.json(
          { error: 'Invalid Indian phone number' },
          { status: 400 }
        )
      }
    } else if (digits.length < 6 || digits.length > 15) {
      return NextResponse.json(
        { error: 'Invalid phone number (must be 6–15 digits)' },
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
    // Columns: Timestamp, Name, Email, Company, Country Code, Country, Phone Number, Full Phone, Project Type, Currency, Budget, Timeline, Description, Source
    const rowData = [
      timestamp || new Date().toISOString(),
      name,
      email,
      company || '',
      countryCode,
      country,
      phoneNumber,
      `${countryCode}${phoneNumber}`,
      projectType,
      currency || 'USD',
      budget || 'Not specified',
      timeline || 'Not specified',
      description,
      'quotation-request',
    ]

    // Append to Quotations tab (idempotent; timeout + retries for resilience)
    await withRetry(
      () =>
        withTimeout(
          sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Quotations!A:N',
            valueInputOption: 'USER_ENTERED',
            requestBody: { values: [rowData] },
          })
        ),
      { retries: 2 }
    )

    return NextResponse.json({
      success: true,
      message: 'Quotation request submitted successfully',
    })
  } catch (error) {
    console.error('Error submitting quotation form:', error)
    Sentry.captureException(error)
    return NextResponse.json(
      { error: HIGH_DEMAND_MESSAGE },
      { status: 503 }
    )
  }
}

