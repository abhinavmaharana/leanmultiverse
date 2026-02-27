'use client'

import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const DynamicCustomCursor = dynamic(() => import('@/components/DynamicCustomCursor'), {
  ssr: false,
})

export default function ConditionalCustomCursor() {
  const pathname = usePathname()
  if (pathname?.startsWith('/book-webinar')) return null
  return <DynamicCustomCursor />
}
