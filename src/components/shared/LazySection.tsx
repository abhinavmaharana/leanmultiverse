'use client'

import { ReactNode } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import dynamic from 'next/dynamic'

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
  id?: string
}

export default function LazySection({ 
  children, 
  fallback = <div className="h-96 bg-black animate-pulse" />,
  className = '',
  id
}: LazySectionProps) {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true,
  })

  return (
    <div ref={ref} className={className} id={id}>
      {isIntersecting ? children : fallback}
    </div>
  )
}

