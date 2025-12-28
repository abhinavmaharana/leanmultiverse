import { NextResponse } from 'next/server'
import { initializeDefaultAdmin } from '@/lib/admin-auth'

/**
 * Initialize default admin user
 * This endpoint should be called once to create the default admin user
 * It's safe to call multiple times - it won't create duplicate users
 */
export async function POST() {
  try {
    await initializeDefaultAdmin()
    return NextResponse.json({
      success: true,
      message: 'Default admin user initialized (if it did not exist)',
    })
  } catch (error) {
    console.error('Error initializing admin:', error)
    return NextResponse.json(
      { error: 'Failed to initialize admin user' },
      { status: 500 }
    )
  }
}

