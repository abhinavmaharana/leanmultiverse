// Everything on the /corporate-cheatcode page comes from here.
// Facts were taken from the book's Amazon.in listing and its printed cover (Oct 2026).

export const BOOK = {
  title: 'Corporate Cheatcode',
  subtitle: 'The Real Survival Guide Nobody Gave You',
  tagline: 'The Corporate Guy Who Chose Freedom Over Rs 2 Crores',
  author: 'Nitesh',
  amazonUrl: 'https://www.amazon.in/Corporate-Cheatcode-Survival-Guide-Nobody/dp/8168543297',
  // Amazon.in prices change — update these two if they do.
  price: 179,
  mrp: 199,
  pages: 160,
  language: 'English',
  format: 'Paperback',
  publisher: 'Nu Voice Press',
  publishedOn: '1 April 2026',
  isbn10: '8168543297',
  isbn13: '978-8168543294',
  dimensions: '19.8 x 12.5 x 2 cm',
  weight: '200 g',
  instagramHandle: 'corporate.wala.youtuber',
  youtubeChannel: 'Corporate Wala Youtuber',
  followers: '680K+',
} as const

export const DISCOUNT_PERCENT = Math.round(((BOOK.mrp - BOOK.price) / BOOK.mrp) * 100)

// The eight cheatcodes printed on the cover.
export const CHEATCODES = [
  { name: 'Set Boundaries', rule: 'Protect your peace' },
  { name: 'Build Visibility', rule: 'Show your work' },
  { name: 'Stay Neutral', rule: 'Avoid unnecessary politics' },
  { name: 'Keep Learning', rule: 'Skills = leverage' },
  { name: 'Document Everything', rule: 'Proof > words' },
  { name: 'Switch Strategically', rule: 'Loyalty ≠ growth' },
  { name: 'Prioritize Mental Health', rule: 'Peace > paycheck' },
  { name: 'Choose Yourself', rule: 'Always' },
] as const

// "Here's what they never told you" — from the book's back cover.
export const NEVER_TOLD = [
  "Why your manager's behavior has little to do with you",
  'Why visibility matters more than silent hard work',
  'Why loyalty can slow your salary growth',
  'Why burnout is mental overload, not weakness',
  'Why strategic exits protect your future',
] as const
