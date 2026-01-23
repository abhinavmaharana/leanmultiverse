import { Metadata } from 'next'
import { Suspense } from 'react'
import EnrollmentSuccessClient from './EnrollmentSuccessClient'

export const metadata: Metadata = {
  title: 'Enrollment Successful | LeanMultiverse',
  description: 'Your course enrollment has been confirmed. Welcome aboard!',
}

export default function EnrollmentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <EnrollmentSuccessClient />
    </Suspense>
  )
}
