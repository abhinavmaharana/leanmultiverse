import { format } from 'date-fns'
import { getTodayIST } from './webinar-config'

/** Shared time slots for AI/ML webinars */
export const AI_ML_WEBINAR_TIME_SLOTS = [
  { value: '20:00', label: '8:00 PM IST' },
] as const

// AI/ML Zoom links by month-day
const AI_ML_ZOOM_LINKS: Record<string, string> = {
  '3-14': 'https://us06web.zoom.us/meeting/register/uF8uYW9JST6m289r8mT2yQ',
  '3-21': 'https://us06web.zoom.us/meeting/register/4ZWJwZVSTYSPbpwh5au3BA',
}
const AI_ML_ZOOM_FALLBACK = 'https://us06web.zoom.us/meeting/register/uF8uYW9JST6m289r8mT2yQ'

function isWebinarTimePast(dateStr: string): boolean {
  const [year, month, day] = dateStr.split('-').map(Number)
  const webinarAt = new Date(Date.UTC(year, month - 1, day, 14, 30, 0))
  return webinarAt.getTime() <= Date.now()
}

const AI_ML_DATES_CONFIG = [
  { month: 2, day: 14 },
  { month: 2, day: 21 },
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
