import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { supabase } from './db'

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_EXPIRES_IN = '24h'

export interface AdminUser {
  id: string
  username: string
  password_hash: string
  created_at: string
  updated_at: string
}

export interface TokenPayload {
  userId: string
  username: string
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

/**
 * Generate a JWT token for an admin user
 */
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload
    return decoded
  } catch (error) {
    return null
  }
}

/**
 * Get admin user by username
 */
export async function getAdminByUsername(username: string): Promise<AdminUser | null> {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('username', username)
    .single()

  if (error || !data) {
    return null
  }

  return data as AdminUser
}

/**
 * Create a new admin user
 */
export async function createAdminUser(username: string, password: string): Promise<AdminUser> {
  const passwordHash = await hashPassword(password)

  const { data, error } = await supabase
    .from('admin_users')
    .insert([{ username, password_hash: passwordHash }])
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create admin user: ${error.message}`)
  }

  return data as AdminUser
}

/**
 * Authenticate admin user with username and password
 */
export async function authenticateAdmin(username: string, password: string): Promise<{ user: AdminUser; token: string } | null> {
  const user = await getAdminByUsername(username)

  if (!user) {
    return null
  }

  const isValid = await verifyPassword(password, user.password_hash)

  if (!isValid) {
    return null
  }

  const token = generateToken({
    userId: user.id,
    username: user.username,
  })

  return { user, token }
}

/**
 * Initialize default admin user if it doesn't exist
 */
export async function initializeDefaultAdmin(): Promise<void> {
  const defaultUsername = process.env.ADMIN_DEFAULT_USERNAME || 'admin'
  const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD

  if (!defaultPassword) {
    console.warn('ADMIN_DEFAULT_PASSWORD not set. Skipping default admin creation.')
    return
  }

  const existingAdmin = await getAdminByUsername(defaultUsername)

  if (!existingAdmin) {
    try {
      await createAdminUser(defaultUsername, defaultPassword)
      console.log(`Default admin user "${defaultUsername}" created successfully.`)
    } catch (error) {
      console.error('Failed to create default admin user:', error)
    }
  }
}

