import type { MetadataRoute } from 'next'
 
export default function icon(): MetadataRoute.Icons {
  return {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/logo.svg',
  }
}

