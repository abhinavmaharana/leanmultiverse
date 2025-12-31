import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/admin-middleware'
import { getAdminByUsername, hashPassword } from '@/lib/admin-auth'
import { supabase } from '@/lib/db'

/**
 * Reset admin password
 * This endpoint allows resetting the admin password
 * It requires admin authentication OR can be called with a special reset token
 */
async function handler(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, newPassword, resetToken } = body

    // For security, you can add a reset token check here
    // For now, we'll allow reset if ADMIN_RESET_TOKEN matches
    const expectedResetToken = process.env.ADMIN_RESET_TOKEN

    if (resetToken && expectedResetToken && resetToken === expectedResetToken) {
      // Reset using token (for initial setup)
      if (!username || !newPassword) {
        return NextResponse.json(
          { error: 'Username and new password are required' },
          { status: 400 }
        )
      }

      const user = await getAdminByUsername(username)
      if (!user) {
        return NextResponse.json(
          { error: 'Admin user not found' },
          { status: 404 }
        )
      }

      const passwordHash = await hashPassword(newPassword)
      const { error } = await supabase
        .from('admin_users')
        .update({ password_hash: passwordHash })
        .eq('id', user.id)

      if (error) {
        return NextResponse.json(
          { error: 'Failed to update password' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Password reset successfully',
      })
    }

    // Otherwise, require admin authentication to change password
    return NextResponse.json(
      { error: 'Invalid reset token or unauthorized' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Error resetting password:', error)
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    )
  }
}

export const POST = handler

