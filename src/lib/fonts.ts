import { Caveat, JetBrains_Mono } from 'next/font/google'

// One shared declaration so the script font is downloaded once. (The top bar and the hero used to declare
// it separately with different weights, which produced two font files for the same typeface.)
export const caveat = Caveat({ subsets: ['latin'], weight: ['500'], display: 'swap' })

// Monospace accent font used by the book page and the homepage book section.
export const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' })
