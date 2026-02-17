import { NextResponse } from 'next/server'

const isProduction = process.env.NODE_ENV === 'production'

/**
 * Returns 404 when NODE_ENV is production. Use for debug/test endpoints
 * that must not be exposed in production (e.g. test-config, test-email).
 */
export function requireProductionDisabled(): NextResponse | null {
  if (isProduction) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }
  return null
}

/**
 * For POST /api/admin/init: in production, require ADMIN_INIT_SECRET to be set
 * and sent in header x-admin-init-secret or body.adminInitSecret.
 * Pass the already-parsed body from the route so the request body is not consumed twice.
 * Returns a 404 response if production and secret missing/invalid; otherwise null.
 */
export function requireAdminInitSecret(
  request: Request,
  parsedBody?: Record<string, unknown>
): NextResponse | null {
  if (!isProduction) return null

  const secret = process.env.ADMIN_INIT_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }

  const headerSecret = request.headers.get('x-admin-init-secret')
  if (headerSecret && headerSecret === secret) return null

  const bodySecret = parsedBody?.adminInitSecret
  if (typeof bodySecret === 'string' && bodySecret === secret) return null

  return NextResponse.json({ error: 'Not Found' }, { status: 404 })
}
