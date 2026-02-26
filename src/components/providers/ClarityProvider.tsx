'use client'

import { useEffect } from 'react'
import Clarity from '@microsoft/clarity'

const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

export default function ClarityProvider() {
  useEffect(() => {
    if (projectId && typeof window !== 'undefined') {
      Clarity.init(projectId)
    }
  }, [])

  return null
}
