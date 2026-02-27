'use client'

import { useEffect } from 'react'

export default function BookWebinarLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.classList.add('book-webinar-active')
    document.body.classList.add('book-webinar-active')
    return () => {
      document.documentElement.classList.remove('book-webinar-active')
      document.body.classList.remove('book-webinar-active')
    }
  }, [])

  return <>{children}</>
}
