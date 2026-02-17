import { NextRequest, NextResponse } from 'next/server'
import { initializeDefaultAdmin, getAdminByUsername, hashPassword } from '@/lib/admin-auth'
import { supabase } from '@/lib/db'
import { requireAdminInitSecret } from '@/lib/production-guard'

/**
 * Initialize default admin user
 * This endpoint should be called once to create the default admin user
 * It's safe to call multiple times - it won't create duplicate users
 *
 * If force=true, it will reset the password even if user exists
 * In production: set ADMIN_INIT_SECRET and send it in x-admin-init-secret header or body.adminInitSecret
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  const initGuard = requireAdminInitSecret(request, body)
  if (initGuard) return initGuard

  try {
    const force = body.force === true

    const defaultUsername = process.env.ADMIN_DEFAULT_USERNAME || 'admin'
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD

    if (!defaultPassword) {
      return NextResponse.json(
        { 
          error: 'ADMIN_DEFAULT_PASSWORD not set in environment variables',
          hint: 'Please set ADMIN_DEFAULT_PASSWORD in your .env.local file'
        },
        { status: 400 }
      )
    }

    const existingAdmin = await getAdminByUsername(defaultUsername)

    if (existingAdmin && force) {
      // Reset password if force=true
      const passwordHash = await hashPassword(defaultPassword)
      const { error } = await supabase
        .from('admin_users')
        .update({ password_hash: passwordHash })
        .eq('id', existingAdmin.id)

      if (error) {
        return NextResponse.json(
          { error: 'Failed to reset password', details: error.message },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: `Admin user "${defaultUsername}" password has been reset`,
        username: defaultUsername,
      })
    } else if (!existingAdmin) {
      // Create new admin user
      await initializeDefaultAdmin()
      return NextResponse.json({
        success: true,
        message: `Default admin user "${defaultUsername}" created successfully`,
        username: defaultUsername,
      })
    } else {
      return NextResponse.json({
        success: true,
        message: `Admin user "${defaultUsername}" already exists. Use force=true to reset password`,
        username: defaultUsername,
        hint: 'Send {"force": true} in the request body to reset the password',
      })
    }
  } catch (error) {
    console.error('Error initializing admin:', error)
    return NextResponse.json(
      { error: 'Failed to initialize admin user', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Also allow GET for convenience (production: requires x-admin-init-secret header)
export async function GET(request: NextRequest) {
  const initGuard = requireAdminInitSecret(request, {})
  if (initGuard) return initGuard

  try {
    const defaultUsername = process.env.ADMIN_DEFAULT_USERNAME || 'admin'
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD

    if (!defaultPassword) {
      return NextResponse.json(
        { 
          error: 'ADMIN_DEFAULT_PASSWORD not set in environment variables',
          hint: 'Please set ADMIN_DEFAULT_PASSWORD in your .env.local file'
        },
        { status: 400 }
      )
    }

    const existingAdmin = await getAdminByUsername(defaultUsername)

    if (!existingAdmin) {
      await initializeDefaultAdmin()
      return NextResponse.json({
        success: true,
        message: `Default admin user "${defaultUsername}" created successfully`,
        username: defaultUsername,
      })
    } else {
      return NextResponse.json({
        success: true,
        message: `Admin user "${defaultUsername}" already exists`,
        username: defaultUsername,
        hint: 'Use POST with {"force": true} to reset the password',
      })
    }
  } catch (error) {
    console.error('Error initializing admin:', error)
    return NextResponse.json(
      { error: 'Failed to initialize admin user' },
      { status: 500 }
    )
  }
}

