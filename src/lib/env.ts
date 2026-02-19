import { z } from 'zod'

/**
 * Schema for server-side environment variables.
 * All are optional so local dev works without every service.
 * In production, required keys are enforced when validateServerEnv() is called.
 */
const serverEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional().or(z.literal('')),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>

/** Required in production for the app to function (DB, payments). */
const REQUIRED_IN_PRODUCTION = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
] as const

/** At least one of these must be set when Supabase URL is set (for DB access). */
const SUPABASE_KEYS = ['SUPABASE_SERVICE_ROLE_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'] as const

/**
 * Validate server env. Use in health check with ?check=env or on first use in critical routes.
 * In production, returns { success: false, missing } when required vars are missing.
 */
export function validateServerEnv(): { success: true; env: ServerEnv } | { success: false; missing: string[] } {
  const parsed = serverEnvSchema.safeParse(process.env)
  if (!parsed.success) {
    return { success: false, missing: ['Invalid env shape'] }
  }
  const env = parsed.data
  if (process.env.NODE_ENV !== 'production') {
    return { success: true, env }
  }
  const missing: string[] = [
    ...REQUIRED_IN_PRODUCTION.filter((key) => {
      const v = env[key as keyof ServerEnv]
      return v === undefined || v === ''
    }),
  ]
  if (env.NEXT_PUBLIC_SUPABASE_URL) {
    const hasKey = SUPABASE_KEYS.some((k) => env[k as keyof ServerEnv])
    if (!hasKey) missing.push('SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
  if (missing.length > 0) {
    return { success: false, missing: [...missing] }
  }
  return { success: true, env }
}
