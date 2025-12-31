'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

interface CustomerPurchase {
  email: string
  name: string
  phone: string
  webinarCount: number
  oneOnOneCount: number
  totalSpent: number
  lastPurchaseDate: string
  purchaseTypes: ('webinar' | 'one-on-one')[]
  bookings: Array<{
    id: string
    type: 'webinar' | 'one-on-one'
    date: string
    time: string
    status: string
    amount: number
  }>
}

interface CustomerStats {
  totalCustomers: number
  webinarOnly: number
  oneOnOneOnly: number
  bothTypes: number
  totalRevenue: number
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerPurchase[]>([])
  const [stats, setStats] = useState<CustomerStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<string>('all')
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null)

  useEffect(() => {
    fetchCustomers()
  }, [filter])

  const fetchCustomers = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filter !== 'all') {
        params.append('filter', filter)
      }
      if (searchTerm) {
        params.append('search', searchTerm)
      }

      const response = await fetch(`/api/admin/customers?${params.toString()}`)
      if (response.ok) {
        const result = await response.json()
        setCustomers(result.customers || [])
        setStats(result.stats || null)
      }
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchCustomers()
  }

  const getPurchaseTypeBadge = (types: string[]) => {
    if (types.length === 2) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/50">
          Both
        </span>
      )
    } else if (types.includes('webinar')) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/50">
          Webinar Only
        </span>
      )
    } else {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/50">
          One-on-One Only
        </span>
      )
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Customer Purchase Dashboard</h1>
        <p className="text-gray-400">View customers who purchased webinars, one-on-one sessions, or both</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6"
          >
            <h3 className="text-gray-200 text-sm font-medium mb-2">Total Customers</h3>
            <p className="text-3xl font-bold text-white">{stats.totalCustomers}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6"
          >
            <h3 className="text-gray-200 text-sm font-medium mb-2">Webinar Only</h3>
            <p className="text-3xl font-bold text-white">{stats.webinarOnly}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6"
          >
            <h3 className="text-gray-200 text-sm font-medium mb-2">One-on-One Only</h3>
            <p className="text-3xl font-bold text-white">{stats.oneOnOneOnly}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6"
          >
            <h3 className="text-gray-200 text-sm font-medium mb-2">Both Types</h3>
            <p className="text-3xl font-bold text-white">{stats.bothTypes}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6"
          >
            <h3 className="text-gray-200 text-sm font-medium mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-white">₹{stats.totalRevenue}</p>
          </motion.div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-white text-sm mb-2 block">Search</label>
            <div className="flex gap-2">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Name, email, phone..."
                className="bg-white/10 border-2 border-white/20 text-white placeholder:text-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400"
              />
              <Button
                onClick={handleSearch}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600"
              >
                Search
              </Button>
            </div>
          </div>

          <div>
            <label className="text-white text-sm mb-2 block">Filter by Purchase Type</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-white/10 border-2 border-white/20 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400"
            >
              <option value="all">All Customers</option>
              <option value="webinar">Webinar Only</option>
              <option value="one-on-one">One-on-One Only</option>
              <option value="both">Both Types</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={fetchCustomers}
              variant="outline"
              className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : customers.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No customers found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Customer</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Purchase Type</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Webinars</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">One-on-One</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Total Spent</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Last Purchase</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <>
                    <motion.tr
                      key={customer.email}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 cursor-pointer"
                      onClick={() => setExpandedCustomer(expandedCustomer === customer.email ? null : customer.email)}
                    >
                      <td className="py-4 px-6">
                        <div>
                          <div className="text-white font-semibold">{customer.name}</div>
                          <div className="text-gray-400 text-sm">{customer.email}</div>
                          <div className="text-gray-500 text-xs">{customer.phone}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">{getPurchaseTypeBadge(customer.purchaseTypes)}</td>
                      <td className="py-4 px-6 text-white">{customer.webinarCount}</td>
                      <td className="py-4 px-6 text-white">{customer.oneOnOneCount}</td>
                      <td className="py-4 px-6 text-white font-semibold">₹{customer.totalSpent}</td>
                      <td className="py-4 px-6 text-gray-300">
                        {new Date(customer.lastPurchaseDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-yellow-400 text-sm">Click to view details</span>
                      </td>
                    </motion.tr>
                    {expandedCustomer === customer.email && (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 bg-white/5">
                          <div className="space-y-4">
                            <h4 className="text-white font-semibold mb-3">Booking History</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {customer.bookings.map((booking) => (
                                <div
                                  key={booking.id}
                                  className="bg-white/5 border border-white/10 rounded-lg p-4"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span
                                      className={`px-2 py-1 rounded text-xs font-medium ${
                                        booking.type === 'webinar'
                                          ? 'bg-blue-500/20 text-blue-400'
                                          : 'bg-purple-500/20 text-purple-400'
                                      }`}
                                    >
                                      {booking.type === 'webinar' ? 'Webinar' : 'One-on-One'}
                                    </span>
                                    <span className="text-white font-semibold">₹{booking.amount}</span>
                                  </div>
                                  <div className="text-gray-300 text-sm">
                                    <div>Date: {new Date(booking.date).toLocaleDateString()}</div>
                                    <div>Time: {booking.time}</div>
                                    <div className="mt-2">
                                      <Link
                                        href={`/admin/dashboard/bookings/${booking.id}?type=${booking.type}`}
                                      >
                                        <Button
                                          variant="outline"
                                          className="border-white/20 bg-white/10 text-white hover:bg-white/20 text-xs"
                                        >
                                          View Details
                                        </Button>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && customers.length > 0 && (
        <div className="text-center text-gray-400">
          Showing {customers.length} customer{customers.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}

