import { describe, it, expect } from 'vitest'
import {
  validateEmail,
  validateIndianPhone,
  normalizeIndianPhone,
  isValidEmailFormat,
  isValidIndianPhone,
} from './validators'

describe('validateEmail', () => {
  it('returns error when empty', () => {
    expect(validateEmail('').valid).toBe(false)
    expect(validateEmail('   ').valid).toBe(false)
    expect(validateEmail('').error).toContain('required')
  })

  it('returns error for invalid formats', () => {
    expect(validateEmail('a').valid).toBe(false)
    expect(validateEmail('a@').valid).toBe(false)
    expect(validateEmail('@b.com').valid).toBe(false)
    expect(validateEmail('a@b').valid).toBe(false)
  })

  it('returns valid for good emails', () => {
    expect(validateEmail('a@b.co').valid).toBe(true)
    expect(validateEmail('user@example.com').valid).toBe(true)
    expect(validateEmail('  user@example.com  ').valid).toBe(true)
  })
})

describe('normalizeIndianPhone', () => {
  it('strips non-digits', () => {
    expect(normalizeIndianPhone('98765 43210')).toBe('9876543210')
    expect(normalizeIndianPhone('98-765-43210')).toBe('9876543210')
  })

  it('removes leading 0', () => {
    expect(normalizeIndianPhone('09876543210')).toBe('9876543210')
  })

  it('removes country code 91', () => {
    expect(normalizeIndianPhone('919876543210')).toBe('9876543210')
  })
})

describe('validateIndianPhone', () => {
  it('allows empty when not required', () => {
    expect(validateIndianPhone('', false).valid).toBe(true)
    expect(validateIndianPhone('   ', false).valid).toBe(true)
  })

  it('rejects empty when required', () => {
    expect(validateIndianPhone('', true).valid).toBe(false)
  })

  it('rejects invalid numbers', () => {
    expect(validateIndianPhone('1234567890', false).valid).toBe(false) // doesn't start with 6-9
    expect(validateIndianPhone('987654321', false).valid).toBe(false) // 9 digits
    expect(validateIndianPhone('98765432101', false).valid).toBe(false) // 11 digits without 91
  })

  it('accepts valid 10-digit Indian mobile', () => {
    expect(validateIndianPhone('9876543210', false).valid).toBe(true)
    expect(validateIndianPhone('8765432109', false).valid).toBe(true)
    expect(validateIndianPhone('91 9876543210', false).valid).toBe(true)
  })
})

describe('isValidEmailFormat', () => {
  it('returns true for valid email', () => {
    expect(isValidEmailFormat('a@b.co')).toBe(true)
  })

  it('returns false for invalid email', () => {
    expect(isValidEmailFormat('')).toBe(false)
    expect(isValidEmailFormat('invalid')).toBe(false)
  })
})

describe('isValidIndianPhone', () => {
  it('returns true for empty or valid number', () => {
    expect(isValidIndianPhone('')).toBe(true)
    expect(isValidIndianPhone('9876543210')).toBe(true)
  })

  it('returns false for invalid number', () => {
    expect(isValidIndianPhone('1234567890')).toBe(false)
  })
})
