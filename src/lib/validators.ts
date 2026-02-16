const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/

export function validateEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = email?.trim() ?? ''
  if (!trimmed) return { valid: false, error: 'Email is required' }
  if (!EMAIL_REGEX.test(trimmed)) return { valid: false, error: 'Invalid email address' }
  return { valid: true }
}

/**
 * Normalize Indian mobile: strip non-digits, remove leading 0 or country code 91.
 */
export function normalizeIndianPhone(value: string): string {
  let digits = (value ?? '').replace(/\D/g, '')
  if (digits.startsWith('0')) digits = digits.slice(1)
  if (digits.length > 10 && digits.startsWith('91')) digits = digits.slice(2)
  return digits
}

/**
 * Validate Indian 10-digit mobile. Optional field: pass empty string to skip.
 */
export function validateIndianPhone(phone: string, required = false): { valid: boolean; error?: string } {
  const trimmed = (phone ?? '').trim()
  if (!trimmed) return required ? { valid: false, error: 'Phone is required' } : { valid: true }
  const digits = normalizeIndianPhone(trimmed)
  if (!INDIAN_MOBILE_REGEX.test(digits)) {
    return { valid: false, error: 'Enter a valid Indian mobile number (10 digits)' }
  }
  return { valid: true }
}

/** Options for generic phone validation (length only). */
export function validatePhone(
  phone: string,
  options: { required?: boolean; min?: number; max?: number } = {}
): { valid: boolean; error?: string } {
  const { required = true, min = 6, max = 15 } = options
  const digits = (phone ?? '').replace(/\D/g, '').trim()
  if (!digits) return required ? { valid: false, error: 'Phone is required' } : { valid: true }
  if (digits.length < min || digits.length > max) {
    return { valid: false, error: `Enter a valid phone number (${min}-${max} digits)` }
  }
  return { valid: true }
}

/** Server-side: check email format only (no required check). */
export function isValidEmailFormat(email: string): boolean {
  return typeof email === 'string' && EMAIL_REGEX.test(email.trim())
}

/** Server-side: check Indian phone after normalizing. */
export function isValidIndianPhone(phone: string): boolean {
  const digits = normalizeIndianPhone(String(phone ?? ''))
  return digits.length === 0 || INDIAN_MOBILE_REGEX.test(digits)
}
