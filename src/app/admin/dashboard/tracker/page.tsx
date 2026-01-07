'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TrackerFormData {
  name: string
  email: string
  popm_status: string
  scrum_status: string
  pmp_status: string
  profile_status: string
}

const STATUS_OPTIONS = [
  "Not Started",
  "In Progress",
  "Scheduled",
  "Completed",
  "Passed",
  "Certified",
  "Done"
]

// Convert text status → % progress
const mapStatusToPercent = (value: string) => {
  if (!value) return 0
  const v = value.toLowerCase()

  if (v.includes("not")) return 0
  if (v.includes("in progress")) return 40
  if (v.includes("scheduled")) return 60
  if (v.includes("completed") || v.includes("done")) return 100
  if (v.includes("passed") || v.includes("certified")) return 100

  return 0
}

export default function TrackerPage() {

  const { register, handleSubmit, reset } = useForm<TrackerFormData>()

  const [sheetData, setSheetData] = useState<(string | number)[][]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ===== READ GOOGLE SHEET =====
  useEffect(() => { fetchSheetData() }, [])

  const fetchSheetData = async () => {
    try {
      const res = await fetch('/api/admin/tracker/read')
      const json = await res.json()
      setSheetData(json.data || [])
    } finally {
      setLoading(false)
    }
  }

  // ===== USE LATEST ENTRY IN SHEET =====
  const latest = sheetData[sheetData.length - 1] || []

  // Column index mapping
  const popmStatus  = latest[2] as string
  const scrumStatus = latest[3] as string
  const pmpStatus   = latest[4] as string

  const popmProgress  = mapStatusToPercent(popmStatus)
  const scrumProgress = mapStatusToPercent(scrumStatus)
  const pmpProgress   = mapStatusToPercent(pmpStatus)

  const overall = Math.round(
    (popmProgress + scrumProgress + pmpProgress) / 3
  )

  // ===== EXPORT CSV =====
  const exportCsv = (rows: (string | number)[][]) => {
    const csv = rows.map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "tracker.csv"
    a.click()
  }

  // ===== EXPORT PDF (simple) =====
  const exportPdf = (rows: (string | number)[][]) => {
    const text = rows.map(r => r.join(" | ")).join("\n")
    const blob = new Blob([text], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "tracker.pdf"
    a.click()
  }

  // ===== WRITE TO SHEET =====
  const onSubmit = async (data: TrackerFormData) => {
    setIsSubmitting(true)

    const values = Object.values(data)

    await fetch('/api/admin/tracker/write', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: values })
    })

    reset()
    fetchSheetData()
    setIsSubmitting(false)
  }

  // ===== PROGRESS CARD DATA =====
  const progressCards = [
    { label: "POPM",  value: popmProgress },
    { label: "Scrum", value: scrumProgress },
    { label: "PMP",   value: pmpProgress }
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-10">

      {/* ================= HEADER ================= */}
      <div className="text-center space-y-1">
        <h1 className="text-4xl font-bold text-white">
          Certification Progress Dashboard
        </h1>
        <p className="text-gray-400">
          POPM • Scrum • PMP • Profile Optimization
        </p>
      </div>

      {/* ================= PROGRESS SECTION ================= */}
      {!sheetData.length ? (
        <div className="text-center text-gray-400">
          No progress yet — submit your first update below.
        </div>
      ) : (
        <div className="space-y-6">

          {/* Overall % */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <h3 className="text-gray-300 text-sm mb-2">
              Overall Journey Score
            </h3>

            <div className="text-5xl font-bold text-yellow-300">
              {overall}%
            </div>

            <p className="text-gray-400 mt-2 text-sm">
              Based on latest tracker entry
            </p>
          </div>

          {/* Per-Certification Progress */}
          <div className="grid grid-cols-3 gap-4">
            {progressCards.map(card => (
              <div
                key={card.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-4"
              >
                <div className="flex justify-between text-white">
                  <span className="font-medium">{card.label}</span>
                  <span>{card.value}%</span>
                </div>

                <div className="h-2 bg-white/20 rounded-lg mt-2">
                  <div
                    className="h-2 bg-yellow-400 rounded-lg"
                    style={{ width: `${card.value}%` }}
                  />
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  {String(latest[2])}
                </p>
              </div>
            ))}
          </div>

          {/* Export Buttons */}
          <div className="flex gap-2 justify-center">
            <Button
              className="bg-white/10 text-white border border-white/20"
              onClick={() => exportCsv(sheetData)}
            >
              Export CSV
            </Button>

            <Button
              className="bg-yellow-400 text-black"
              onClick={() => exportPdf(sheetData)}
            >
              Export PDF
            </Button>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-white/10" />

      {/* ================= FORM ================= */}
      <div className="space-y-5">

        <h2 className="text-2xl font-semibold text-white">
          Update Progress
        </h2>

        {/* User Info */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Name"
            {...register("name")}
            className="bg-white/10 border-white/20 text-white"
          />
          <Input
            placeholder="Email"
            {...register("email")}
            className="bg-white/10 border-white/20 text-white"
          />
        </div>

        {/* Status Inputs */}
        <div className="grid grid-cols-4 gap-4">

          <select {...register("popm_status")}
            className="bg-black/60 border border-white/20 text-white rounded-xl px-3 py-2"
          >
            <option>POPM</option>
            {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
          </select>

          <select {...register("scrum_status")}
            className="bg-black/60 border border-white/20 text-white rounded-xl px-3 py-2"
          >
            <option>Scrum</option>
            {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
          </select>

          <select {...register("pmp_status")}
            className="bg-black/60 border border-white/20 text-white rounded-xl px-3 py-2"
          >
            <option>PMP</option>
            {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
          </select>

          <select {...register("profile_status")}
            className="bg-black/60 border border-white/20 text-white rounded-xl px-3 py-2"
          >
            <option>Profile</option>
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>

        {/* Save */}
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full bg-yellow-400 text-black font-semibold rounded-xl py-3"
        >
          {isSubmitting ? "Saving..." : "Save Update"}
        </Button>
      </div>
    </div>
  )
}
