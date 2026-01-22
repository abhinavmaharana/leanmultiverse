import { Metadata } from 'next'
import SuccessClient from './SuccessClient'

export const metadata: Metadata = {
  title: 'Enrollment Successful | AI & ML Career Foundation | LeanMultiverse',
  description: 'Your enrollment in the AI & ML Career Foundation Program has been confirmed. Welcome aboard!',
}

export default function SuccessPage() {
  return <SuccessClient />
}
