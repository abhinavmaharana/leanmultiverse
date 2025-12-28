'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import ProtectedRoute from '@/components/admin/ProtectedRoute'
import AdminNavbar from '@/components/admin/AdminNavbar'

export default function AdminLayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  // Don't wrap login page in ProtectedRoute or AdminNavbar
  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <AdminNavbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}

