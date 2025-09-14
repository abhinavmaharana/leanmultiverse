'use client'

import { useEffect, useState } from 'react'
import FlowingMenu from './FlowingMenuSimple'

interface FlowingMenuWrapperProps {
  items: Array<{
    link: string
    text: string
    image: string
  }>
}

export default function FlowingMenuWrapper({ items }: FlowingMenuWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="h-full bg-gray-900 animate-pulse flex items-center justify-center">
        <p className="text-white">Loading Success Stories...</p>
      </div>
    )
  }

  return <FlowingMenu items={items} />
}
