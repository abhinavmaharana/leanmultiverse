'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TrackerFormData {
  fields: string[]
}

export default function TrackerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [sheetData, setSheetData] = useState<(string | number)[][]>([])
  const [loading, setLoading] = useState(true)
  const [fieldCount, setFieldCount] = useState(5) // Default 5 fields, user can add more

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TrackerFormData>()

  useEffect(() => {
    fetchSheetData()
  }, [])

  const fetchSheetData = async () => {
    try {
      const response = await fetch('/api/admin/tracker/read')
      if (response.ok) {
        const result = await response.json()
        setSheetData(result.data || [])
      }
    } catch (error) {
      console.error('Error fetching sheet data:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: TrackerFormData) => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      // Extract field values
      const fieldValues: (string | number)[] = []
      for (let i = 0; i < fieldCount; i++) {
        const value = (data.fields as any)[i] || ''
        if (value) {
          fieldValues.push(value)
        }
      }

      if (fieldValues.length === 0) {
        throw new Error('At least one field must be filled')
      }

      const response = await fetch('/api/admin/tracker/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: fieldValues }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to write to Google Sheet')
      }

      setSuccess('Data written to Google Sheet successfully!')
      reset()
      // Refresh sheet data
      await fetchSheetData()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to write data'
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Tracker</h1>
        <p className="text-gray-400">Add entries to Google Sheets tracker</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Add New Entry</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {Array.from({ length: fieldCount }).map((_, index) => (
              <div key={index}>
                <Label htmlFor={`field-${index}`} className="text-white mb-2 block">
                  Field {index + 1}
                </Label>
                <Input
                  id={`field-${index}`}
                  {...register(`fields.${index}` as any)}
                  className="bg-white/10 border-2 border-white/20 text-white placeholder:text-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"
                  placeholder={`Enter value for field ${index + 1}`}
                />
              </div>
            ))}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFieldCount(fieldCount + 1)}
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                + Add Field
              </Button>
              {fieldCount > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFieldCount(Math.max(1, fieldCount - 1))}
                  className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  - Remove Field
                </Button>
              )}
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-200">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-200">
                {success}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-xl py-4 text-lg font-semibold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Writing...' : 'Write to Google Sheet'}
            </Button>
          </form>
        </motion.div>

        {/* Sheet Data Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Sheet Data Preview</h2>
            <Button
              onClick={fetchSheetData}
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              Refresh
            </Button>
          </div>

          {loading ? (
            <div className="text-gray-400">Loading...</div>
          ) : sheetData.length === 0 ? (
            <div className="text-gray-400">No data in sheet yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {sheetData[0]?.map((_, colIndex) => (
                      <th key={colIndex} className="text-left py-2 px-3 text-gray-400 font-medium">
                        Column {colIndex + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sheetData.slice(0, 10).map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-white/5">
                      {row.map((cell, colIndex) => (
                        <td key={colIndex} className="py-2 px-3 text-white">
                          {String(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {sheetData.length > 10 && (
                <p className="text-gray-400 text-sm mt-4">
                  Showing first 10 rows of {sheetData.length} total rows
                </p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

