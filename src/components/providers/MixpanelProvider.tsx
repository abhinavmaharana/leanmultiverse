'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import mixpanel from 'mixpanel-browser'

let initialized = false

export function initMixpanel() {
    if (initialized) return
    mixpanel.init('b3f3a3a620acd4f3efad507d349a534a', {
        autocapture: true,
        record_sessions_percent: 100,
        api_host: 'https://api-eu.mixpanel.com',
        persistence: 'localStorage',
        track_pageview: 'full-url',
    })
    initialized = true
}

/** Call after a form submission to identify the user in Mixpanel */
export function identifyUser(email: string, properties?: Record<string, string | number | boolean>) {
    if (!initialized) initMixpanel()
    mixpanel.identify(email)
    mixpanel.people.set({
        $email: email,
        ...properties,
    })
}

/** Track a custom event */
export function trackEvent(name: string, properties?: Record<string, string | number | boolean>) {
    if (!initialized) initMixpanel()
    mixpanel.track(name, properties)
}

export default function MixpanelProvider() {
    const pathname = usePathname()

    useEffect(() => {
        initMixpanel()
    }, [])

    // Track page views on route change
    useEffect(() => {
        if (!initialized || !pathname) return
        mixpanel.track('Page View', {
            page: pathname,
            url: window.location.href,
        })
    }, [pathname])

    return null
}
