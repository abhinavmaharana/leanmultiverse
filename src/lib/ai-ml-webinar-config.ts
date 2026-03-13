import { format } from 'date-fns'
import { getTodayIST } from './webinar-config'

/** Shared time slots for AI/ML webinars */
export const AI_ML_WEBINAR_TIME_SLOTS = [
  { value: '20:00', label: '8:00 PM IST' },
] as const

// AI/ML Zoom links by month-day
const AI_ML_ZOOM_LINKS: Record<string, string> = {
  '3-22': 'https://us06web.zoom.us/meeting/register/C4kAMe3XTKmCYQOKo_eAAg#/registration',
  '3-29': 'https://us06web.zoom.us/meeting/register/RnjPqT0sQfyWSJED-LohWQ#/registration',
}
const AI_ML_ZOOM_FALLBACK = 'https://us06web.zoom.us/meeting/register/LPqnsJAdQ52TeBIT3iLtHQ'

function isWebinarTimePast(dateStr: string): boolean {
  const [year, month, day] = dateStr.split('-').map(Number)
  // 8:00 PM IST = 14:30 UTC
  const webinarAt = new Date(Date.UTC(year, month - 1, day, 14, 30, 0))
  return webinarAt.getTime() <= Date.now()
}

// Note: JS Date month is 0-indexed. March is 2.
const AI_ML_DATES_CONFIG = [
  { month: 2, day: 22 },
  { month: 2, day: 29 },
]

export function getAvailableDatesAiMl(): Date[] {
  const dates: Date[] = []
  const todayIST = getTodayIST()
  const currentYear = new Date().getFullYear()

  AI_ML_DATES_CONFIG.forEach(({ month, day }) => {
    const date = new Date(currentYear, month, day)
    const dateStr = format(date, 'yyyy-MM-dd')
    if (dateStr >= todayIST && !isWebinarTimePast(dateStr)) {
      dates.push(date)
    }
  })

  dates.sort((a, b) => a.getTime() - b.getTime())
  return dates.length > 0 ? [dates[0]] : []
}

export function getZoomLinkForDateAiMl(dateStr: string): string {
  try {
    const [, month, day] = dateStr.split('-').map(Number)
    return AI_ML_ZOOM_LINKS[`${month}-${day}`] ?? AI_ML_ZOOM_FALLBACK
  } catch {
    return AI_ML_ZOOM_FALLBACK
  }
}
