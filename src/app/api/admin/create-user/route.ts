import { NextRequest, NextResponse } from 'next/server'
import { createAdminUser, getAdminByUsername, getAdminByEmail, hashPassword } from '@/lib/admin-auth'
import { supabase } from '@/lib/db'

/**
 * Create or update admin user
 * This is a utility endpoint to help set up admin users
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password, email } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Use username as email if email is not provided and username looks like an email
    const userEmail = email || (username.includes('@') ? username : `${username}@leanmultiverse.com`)

    // Check if user exists by username or email
    const existingUserByUsername = await getAdminByUsername(username)
    const existingUserByEmail = await getAdminByEmail(userEmail)
    const existingUser = existingUserByUsername || existingUserByEmail

    if (existingUser) {
      // Update password, email, and username (in case username changed)
      const passwordHash = await hashPassword(password)
      const { error } = await supabase
        .from('admin_users')
        .update({ username, password_hash: passwordHash, email: userEmail })
        .eq('id', existingUser.id)

      if (error) {
        return NextResponse.json(
          { error: 'Failed to update password', details: error.message },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: `Admin user "${username}" password updated successfully`,
        username,
        email: userEmail,
      })
    } else {
      // Create new user
      await createAdminUser(username, password, userEmail)
      return NextResponse.json({
        success: true,
        message: `Admin user "${username}" created successfully`,
        username,
        email: userEmail,
      })
    }
  } catch (error) {
    console.error('Error creating/updating admin user:', error)
    return NextResponse.json(
      { error: 'Failed to create/update admin user', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

