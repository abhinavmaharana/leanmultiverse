import { format } from 'date-fns'

/** Today as YYYY-MM-DD in IST */
export function getTodayIST(): string {
  if (typeof window !== 'undefined') {
    return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
  }
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
}

/** Shared time slots for all webinars */
export const WEBINAR_TIME_SLOTS = [
  { value: '20:00', label: '8:00 PM IST' },
] as const

// --- Paid webinar (Product Manager | Project Manager | Program Management Career Roadmap) ---
const PAID_ZOOM_LINKS: Record<string, string> = {
  '2-7': 'https://us06web.zoom.us/meeting/register/xSVaZSmIS6-k8D55Xc7ryA',
  '2-14': 'https://us06web.zoom.us/meeting/register/LG0BbP6yQsmLlwwAbJ85xg',
  '2-21': 'https://us06web.zoom.us/meeting/register/eX9-EdUBSWGcVSOU__voEg',
  '2-28': 'https://us06web.zoom.us/meeting/register/DbbY6tSjSh6Dq6gsR5eS-w',
  '3-7': 'https://us06web.zoom.us/meeting/register/swqMuabPQQSCOM5eF7j-IA',
  '3-14': 'https://us06web.zoom.us/meeting/register/uF8uYW9JST6m289r8mT2yQ',
  '3-21': 'https://us06web.zoom.us/meeting/register/4ZWJwZVSTYSPbpwh5au3BA',
}
const PAID_ZOOM_FALLBACK = 'https://us06web.zoom.us/meeting/register/xSVaZSmIS6-k8D55Xc7ryA'

function isWebinarTimePast(dateStr: string): boolean {
  const [year, month, day] = dateStr.split('-').map(Number)
  const webinarAt = new Date(Date.UTC(year, month - 1, day, 14, 30, 0))
  return webinarAt.getTime() <= Date.now()
}

const PAID_DATES_CONFIG = [
  { month: 1, day: 7 },
  { month: 1, day: 14 },
  { month: 1, day: 21 },
  { month: 1, day: 28 },
  { month: 2, day: 7 },
  { month: 2, day: 14 },
  { month: 2, day: 21 },
]

export function getAvailableDatesPaid(): Date[] {
  const dates: Date[] = []
  const todayIST = getTodayIST()
  const currentYear = new Date().getFullYear()

  PAID_DATES_CONFIG.forEach(({ month, day }) => {
    let date = new Date(currentYear, month, day)
    let dateStr = format(date, 'yyyy-MM-dd')
    if (dateStr < todayIST) {
      date = new Date(currentYear + 1, month, day)
      dateStr = format(date, 'yyyy-MM-dd')
    }
    if (dateStr >= todayIST && !isWebinarTimePast(dateStr)) {
      dates.push(date)
    }
  })

  dates.sort((a, b) => a.getTime() - b.getTime())
  return dates
}

export function getZoomLinkForDatePaid(dateStr: string): string {
  try {
    const [, month, day] = dateStr.split('-').map(Number)
    return PAID_ZOOM_LINKS[`${month}-${day}`] ?? PAID_ZOOM_FALLBACK
  } catch {
    return PAID_ZOOM_FALLBACK
  }
}

// --- Free webinar ---
const FREE_ZOOM_LINKS: Record<string, string> = {
  '31': 'https://us06web.zoom.us/meeting/register/8b3eEOuxSvaefhcK1vmWpQ',
  '7': 'https://us06web.zoom.us/meeting/register/xSVaZSmIS6-k8D55Xc7ryA',
}
const FREE_ZOOM_FALLBACK = 'https://us06web.zoom.us/meeting/register/8b3eEOuxSvaefhcK1vmWpQ'

const FREE_DATES_CONFIG = [
  { month: 0, day: 31 },
  { month: 1, day: 7 },
]

export function getAvailableDatesFree(): Date[] {
  const dates: Date[] = []
  const todayIST = getTodayIST()
  const currentYear = new Date().getFullYear()

  FREE_DATES_CONFIG.forEach(({ month, day }) => {
    let date = new Date(currentYear, month, day)
    let dateStr = format(date, 'yyyy-MM-dd')
    if (dateStr < todayIST) {
      date = new Date(currentYear + 1, month, day)
      dateStr = format(date, 'yyyy-MM-dd')
    }
    if (dateStr >= todayIST) {
      dates.push(date)
    }
  })

  dates.sort((a, b) => a.getTime() - b.getTime())
  return dates
}

export function getZoomLinkForDateFree(dateStr: string): string {
  try {
    const [, , day] = dateStr.split('-').map(Number)
    const dayStr = day.toString()
    return FREE_ZOOM_LINKS[dayStr] ?? FREE_ZOOM_FALLBACK
  } catch {
    return FREE_ZOOM_FALLBACK
  }
}
