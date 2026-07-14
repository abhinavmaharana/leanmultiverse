'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TrackerFormData {
  name: string
  email: string

  popm_payment: string
  popm_training: string
  popm_exam: string
  popm_cert: string

  scrum_payment: string
  scrum_training: string
  scrum_exam: string
  scrum_cert: string

  pmp_application: string
  pmp_training: string
  pmp_exam: string
  pmp_cert: string
}

const STATUS = [
  "Not Started",
  "In Progress",
  "Completed",
  "Passed",
  "Certified",
  "Done"
]

const mapProgress = (v: string) => {
  if (!v) return 0
  const s = v.toLowerCase()

  if (s.includes("not")) return 0
  if (s.includes("in progress")) return 40
  if (s.includes("completed")) return 80
  if (s.includes("passed") || s.includes("cert")) return 100

  return 0
}

const card =
  "bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4"

const select =
  "bg-black/60 border border-white/25 rounded-xl px-3 py-2 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 outline-none"

export default function TrackerPage() {

  const { register, handleSubmit, reset } = useForm<TrackerFormData>()

  const [sheetData, setSheetData] = useState<(string | number)[][]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [openSection, setOpenSection] = useState<string | null>("popm")

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

  const latest = sheetData[sheetData.length - 1] || []

  const popmProgress = mapProgress(String(latest[5]))
  const scrumProgress = mapProgress(String(latest[10]))
  const pmpProgress   = mapProgress(String(latest[15]))

  const overall = Math.round(
    (popmProgress + scrumProgress + pmpProgress) / 3
  )

  const onSubmit = async (data: TrackerFormData) => {
    setIsSubmitting(true)

    await fetch('/api/admin/tracker/write', {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ data: Object.values(data) })
    })

    reset()
    fetchSheetData()
    setIsSubmitting(false)
  }

  const Section = ({
    id,
    title,
    children
  }: {
    id: string
    title: string
    children: React.ReactNode
  }) => (
    <div className="space-y-3">
      <button
        onClick={() => setOpenSection(openSection === id ? null : id)}
        className="flex justify-between w-full text-left text-white font-semibold"
      >
        <span>{title}</span>
        <span className="text-gray-400">
          {openSection === id ? "▾" : "▸"}
        </span>
      </button>

      {openSection === id && (
        <div className="grid grid-cols-2 gap-3">{children}</div>
      )}
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto space-y-12">

      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-semibold text-white">
          Certification Tracker
        </h1>
        <p className="text-gray-400 text-sm">
          Minimal dark — POPM • Scrum • PMP
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">

        {[
          { label: "POPM", value: popmProgress },
          { label: "Scrum", value: scrumProgress },
          { label: "PMP", value: pmpProgress }
        ].map(cardData => (
          <div key={cardData.label} className={card}>
            <div className="flex justify-between text-white">
              <span>{cardData.label}</span>
              <span>{cardData.value}%</span>
            </div>

            <div className="h-2 bg-white/20 rounded-lg">
              <div
                className="h-2 bg-yellow-400 rounded-lg"
                style={{ width: `${cardData.value}%` }}
              />
            </div>
          </div>
        ))}

      </div>

      {/* Overall Progress */}
      <div className={card}>
        <h3 className="text-white font-semibold">Overall</h3>

        <div className="h-3 bg-white/20 rounded-xl">
          <div
            className="h-3 bg-yellow-400 rounded-xl"
            style={{ width: `${overall}%` }}
          />
        </div>

        <p className="text-gray-300 text-sm">{overall}% Complete</p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-2 gap-8">

        {/* Form Panel */}
        <div className={card}>
          <h2 className="text-white font-semibold">
            Update Entry
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Name"
              {...register("name")}
              className="bg-black/60 border border-white/25 text-white"
            />
            <Input
              placeholder="Email"
              {...register("email")}
              className="bg-black/60 border border-white/25 text-white"
            />
          </div>

          {/* POPM */}
          <Section id="popm" title="POPM">
            <select {...register("popm_payment")} className={select}>
              <option value="">Payment</option>
              {STATUS.map(s => <option key={s}>{s}</option>)}
            </select>

            <select {...register("popm_training")} className={select}>
              <option value="">Training</option>
              {STATUS.map(s => <option key={s}>{s}</option>)}
            </select>

            <select {...register("popm_exam")} className={select}>
              <option value="">Exam</option>
              {STATUS.map(s => <option key={s}>{s}</option>)}
            </select>

            <select {...register("popm_cert")} className={select}>
              <option value="">Certification</option>
              {STATUS.map(s => <option key={s}>{s}</option>)}
            </select>
          </Section>

          {/* Scrum */}
          <Section id="scrum" title="Scrum">
            <select {...register("scrum_payment")} className={select}>
              <option value="">Payment</option>
              {STATUS.map(s => <option key={s}>{s}</option>)}
            </select>

            <select {...register("scrum_training")} className={select}>
              <option value="">Training</option>
              {STATUS.map(s => <option key={s}>{s}</option>)}
            </select>

            <select {...register("scrum_exam")} className={select}>
              <option value="">Exam</option>
              {STATUS.map(s => <option key={s}>{s}</option>)}
            </select>

            <select {...register("scrum_cert")} className={select}>
              <option value="">Certification</option>
              {STATUS.map(s => <option key={s}>{s}</option>)}
            </select>
          </Section>

          {/* PMP */}
          <Section id="pmp" title="PMP">
            <select {...register("pmp_application")} className={select}>
              <option value="">Application</option>
              {STATUS.map(s => <option key={s}>{s}</option>)}
            </select>

            <select {...register("pmp_training")} className={select}>
              <option value="">Training</option>
              {STATUS.map(s => <option key={s}>{s}</option>)}
            </select>

            <select {...register("pmp_exam")} className={select}>
              <option value="">Exam</option>
              {STATUS.map(s => <option key={s}>{s}</option>)}
            </select>

            <select {...register("pmp_cert")} className={select}>
              <option value="">Certification</option>
              {STATUS.map(s => <option key={s}>{s}</option>)}
            </select>
          </Section>

          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full bg-yellow-400 text-black font-semibold rounded-xl py-3"
          >
            {isSubmitting ? "Saving..." : "Save Update"}
          </Button>
        </div>

        {/* Progress Panel */}
        <div className={card}>

          <div className="flex justify-between items-center">
            <h2 className="text-white font-semibold">Progress Analysis</h2>

            <Button
              onClick={fetchSheetData}
              className="bg-white/10 text-white border border-white/20"
            >
              Refresh
            </Button>
          </div>

          {!sheetData.length ? (
            <p className="text-gray-400 text-sm">
              No entries yet
            </p>
          ) : (
            <div className="space-y-4">

              <div className="bg-black/40 rounded-xl p-4">
                <div className="flex justify-between text-white">
                  <span>Latest Entry</span>
                  <span>{overall}%</span>
                </div>

                <div className="h-2 bg-white/20 rounded-lg mt-2">
                  <div
                    className="h-2 bg-yellow-400 rounded-lg"
                    style={{ width: `${overall}%` }}
                  />
                </div>
              </div>

              <div className="text-gray-200 text-sm space-y-1">
                <p><b>Name:</b> {latest[1]}</p>
                <p><b>Email:</b> {latest[2]}</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
