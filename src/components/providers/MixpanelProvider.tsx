'use client'

import { useEffect } from 'react'
import mixpanel from 'mixpanel-browser'

export default function MixpanelProvider() {
    useEffect(() => {
        mixpanel.init('b3f3a3a620acd4f3efad507d349a534a', {
            autocapture: true,
            record_sessions_percent: 100,
            api_host: 'https://api-eu.mixpanel.com',
        })
    }, [])

    return null
}
