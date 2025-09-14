'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import LoadingScreen to ensure it only renders on client
const LoadingScreen = dynamic(() => import('@/components/ui/LoadingScreen'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black" />
})

interface LoadingContextType {
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

interface LoadingProviderProps {
  children: ReactNode
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Ensure we're on the client side
    setIsMounted(true)
    
    // Reduce loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Reduced to 2 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setIsInitialLoad(false)
  }

  // Don't render anything until mounted to avoid hydration mismatch
  if (!isMounted) {
    return <div className="fixed inset-0 bg-black" />
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {isInitialLoad && isLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        children
      )}
    </LoadingContext.Provider>
  )
}
