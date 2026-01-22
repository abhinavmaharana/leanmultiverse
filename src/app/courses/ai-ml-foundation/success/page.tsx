import { Metadata } from 'next'
import { Suspense } from 'react'
import SuccessClient from './SuccessClient'

export const metadata: Metadata = {
  title: 'Enrollment Successful | AI & ML Career Foundation | LeanMultiverse',
  description: 'Your enrollment in the AI & ML Career Foundation Program has been confirmed. Welcome aboard!',
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <SuccessClient />
    </Suspense>
  )
}
