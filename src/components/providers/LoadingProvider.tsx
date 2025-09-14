'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import LoadingScreen from '@/components/ui/LoadingScreen'

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

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000) // 4 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setIsInitialLoad(false)
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
