'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Login failed')
      }

      // Use window.location for a hard redirect to ensure cookie is set
      // Small delay to ensure cookie is set before redirect
      setTimeout(() => {
        window.location.href = '/admin/dashboard'
      }, 100)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.'
      setError(errorMessage)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-400">Enter your credentials to access the admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-white mb-2 block">
                Username
              </Label>
              <Input
                id="username"
                {...register('username')}
                className="bg-white/10 border-2 border-white/20 text-white placeholder:text-gray-400 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"
                placeholder="Enter your username"
                autoComplete="username"
              />
              {errors.username && (
                <p className="text-red-400 text-sm mt-2">{errors.username.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-white mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                className="bg-white/10 border-2 border-white/20 text-white placeholder:text-gray-400 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-2">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-200">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-xl py-4 text-lg font-semibold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

