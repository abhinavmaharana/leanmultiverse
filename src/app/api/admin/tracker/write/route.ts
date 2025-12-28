import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/admin-middleware'
import { writeToGoogleSheet, getTrackerConfig } from '@/lib/google-sheets-tracker'
import { z } from 'zod'

// Flexible schema - can be extended based on user's requirements
const trackerSchema = z.object({
  data: z.array(z.union([z.string(), z.number()])).min(1, 'At least one field is required'),
})

async function handler(request: NextRequest) {
  try {
    const body = await request.json()
    const { data } = trackerSchema.parse(body)

    const config = getTrackerConfig()

    // Add timestamp as first column
    const rowData = [new Date().toISOString(), ...data]

    await writeToGoogleSheet([rowData], config)

    return NextResponse.json({
      success: true,
      message: 'Data written to Google Sheet successfully',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Tracker write error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to write to Google Sheet'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

export const POST = withAdminAuth(handler)

