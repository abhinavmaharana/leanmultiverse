'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface NavItem {
  label: string
  href: string
  icon?: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Tracker', href: '/admin/dashboard/tracker' },
  { label: 'Bookings', href: '/admin/dashboard/bookings' },
  { label: 'Customers', href: '/admin/dashboard/customers' },
  { label: 'Analytics', href: '/admin/dashboard/analytics' },
  { label: 'Payments', href: '/admin/dashboard/payments' },
]

export default function AdminNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/admin/auth/verify')
        const data = await response.json()
        if (data.authenticated) {
          setUsername(data.user.username)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="bg-black/95 border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/admin/dashboard" className="text-xl font-bold text-yellow-400">
              Admin Panel
            </Link>
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-yellow-400/20 text-yellow-400'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400 hidden sm:block">Welcome, {username}</span>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="md:hidden border-t border-white/10">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-yellow-400/20 text-yellow-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

