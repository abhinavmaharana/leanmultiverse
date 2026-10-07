import { Caveat } from 'next/font/google'

// One shared declaration so the script font is downloaded once. (The top bar and the hero used to declare
// it separately with different weights, which produced two font files for the same typeface.)
export const caveat = Caveat({ subsets: ['latin'], weight: ['500'], display: 'swap' })
