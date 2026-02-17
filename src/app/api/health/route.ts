import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/db'
import { validateServerEnv } from '@/lib/env'

/**
 * Lightweight health check for load balancers and monitoring.
 * Returns 200; optionally pings Supabase. Kept fast — no heavy checks.
 * Query ?check=env: in production, validates required env vars; returns 503 if missing.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  if (searchParams.get('check') === 'env') {
    const result = validateServerEnv()
    if (!result.success) {
      return NextResponse.json(
        { status: 'error', message: 'Missing required env', missing: result.missing },
        { status: 503 }
      )
    }
    return NextResponse.json({ status: 'ok', env: 'valid' }, { status: 200 })
  }

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (url && key) {
      const { error } = await supabase.from('one_on_one_bookings').select('id').limit(1).maybeSingle()
      if (error) {
        return NextResponse.json(
          { status: 'degraded', dependency: 'supabase', error: error.message },
          { status: 200 }
        )
      }
    }
    return NextResponse.json({ status: 'ok' }, { status: 200 })
  } catch (e) {
    return NextResponse.json(
      { status: 'error', message: e instanceof Error ? e.message : 'Health check failed' },
      { status: 200 }
    )
  }
}
