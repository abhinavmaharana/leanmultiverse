import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './admin-auth'

/**
 * Middleware to verify admin authentication
 * Returns the token payload if authenticated, null otherwise
 */
export function verifyAdminAuth(request: NextRequest): { userId: string; username: string } | null {
  const token = request.cookies.get('admin_token')?.value

  if (!token) {
    return null
  }

  const payload = verifyToken(token)

  if (!payload) {
    return null
  }

  return {
    userId: payload.userId,
    username: payload.username,
  }
}

/**
 * Middleware wrapper for protected admin API routes
 */
export function withAdminAuth(
  handler: (request: NextRequest, auth: { userId: string; username: string }) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const auth = verifyAdminAuth(request)

    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return handler(request, auth)
  }
}

