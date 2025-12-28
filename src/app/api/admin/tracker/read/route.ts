import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/admin-middleware'
import { readFromGoogleSheet, getTrackerConfig } from '@/lib/google-sheets-tracker'

async function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || undefined

    const config = getTrackerConfig()
    const data = await readFromGoogleSheet(config, range)

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error('Tracker read error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to read from Google Sheet'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

export const GET = withAdminAuth(handler)

