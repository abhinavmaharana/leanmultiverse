import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

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

    // Append data to the "Quotations" tab in the same spreadsheet
    // If the tab doesn't exist, it will be created automatically on first write
    // Headers should be: Timestamp, Name, Email, Company, Country Code, Country, Phone Number, Full Phone, Project Type, Currency, Budget, Timeline, Description, Source
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Quotations!A:N', // Using "Quotations" tab instead of "Sheet1"
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Quotation request submitted successfully',
    })
  } catch (error) {
    console.error('Error submitting quotation form:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to submit quotation request'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

