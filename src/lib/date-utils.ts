import { parseISO, parse, format } from 'date-fns'

export interface NormalizedDateTime {
  dateStr: string
  timeStr: string
  isoWithOffset: string
  startDate: Date
}

function toTwoDigits(value: string) {
  return value.length === 1 ? `0${value}` : value
}

export function normalizeDateTime(rawDate: string, rawTime: string): NormalizedDateTime {
  let dateStr = String(rawDate || '').trim()
  let timeStr = String(rawTime || '').trim()

  if (!dateStr && timeStr) {
    const parts = timeStr.split(' ')
    if (parts.length >= 2) {
      dateStr = parts[0]
      timeStr = parts[1]
    }
  }

  if (dateStr.includes(' ') && (!timeStr || timeStr.length === 0)) {
    const parts = dateStr.split(' ')
    dateStr = parts[0] || ''
    timeStr = parts[1] || ''
  }

  if (dateStr.includes('T')) {
    dateStr = dateStr.split('T')[0]
  }
  if (dateStr.includes(' ')) {
    dateStr = dateStr.split(' ')[0]
  }

  if (!dateStr) {
    throw new Error('Date value is missing')
  }

  if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(dateStr)) {
    throw new Error(`Invalid date format: "${dateStr}"`) 
  }

  let sanitizedTime = timeStr.replace(/(IST|GMT|UTC|hrs|hours)/gi, '').trim()

  if (/^\d{1,2}:\d{2}:\d{2}$/.test(sanitizedTime)) {
    const [h, m] = sanitizedTime.split(':')
    sanitizedTime = `${toTwoDigits(h)}:${toTwoDigits(m)}`
  } else if (/^\d{1,2}:\d{2}$/.test(sanitizedTime)) {
    const [h, m] = sanitizedTime.split(':')
    sanitizedTime = `${toTwoDigits(h)}:${toTwoDigits(m)}`
  } else if (/^\d{1,2}\s?(am|pm)$/i.test(sanitizedTime)) {
    const parsed = parse(sanitizedTime.toUpperCase(), 'h a', new Date())
    sanitizedTime = format(parsed, 'HH:mm')
  } else if (/^\d{1,2}:\d{2}\s?(am|pm)$/i.test(sanitizedTime)) {
    const parsed = parse(sanitizedTime.toUpperCase(), 'h:mm a', new Date())
    sanitizedTime = format(parsed, 'HH:mm')
  } else if (!sanitizedTime) {
    throw new Error('Time value is missing')
  } else if (!/^\d{2}:\d{2}$/.test(sanitizedTime)) {
    throw new Error(`Invalid time format: "${sanitizedTime}"`)
  }

  const isoWithOffset = `${dateStr}T${sanitizedTime}:00+05:30`
  const startDate = parseISO(isoWithOffset)

  if (isNaN(startDate.getTime())) {
    throw new Error(`Invalid date/time combination: ${dateStr} ${sanitizedTime}`)
  }

  return {
    dateStr,
    timeStr: sanitizedTime,
    isoWithOffset,
    startDate,
  }
}
