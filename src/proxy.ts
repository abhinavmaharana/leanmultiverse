import { NextRequest, NextResponse } from 'next/server'
import { MAINTENANCE_MODE } from '@/config/maintenance'

export function proxy(request: NextRequest) {
  if (!MAINTENANCE_MODE) return NextResponse.next()

  const { pathname } = request.nextUrl

  // Already on the maintenance page (direct hit or the rewrite target).
  if (pathname === '/maintenance') return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = '/maintenance'
  url.search = ''

  // 503 + Retry-After tells search engines the outage is temporary, so rankings are kept.
  const response = NextResponse.rewrite(url, { status: 503 })
  response.headers.set('Retry-After', '3600')
  response.headers.set('Cache-Control', 'no-store')
  return response
}

export const config = {
  // Skip API routes (Razorpay webhook, health check), Next internals, and any file with an
  // extension (images, robots.txt, sitemap.xml, favicon, etc.).
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
