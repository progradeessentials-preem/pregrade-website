import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PreGrade Essentials - Card Authentication Tools',
    short_name: 'PreGrade',
    description: 'Professional card authentication and grading tools for PSA, sports cards, and TCG collectors',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['shopping', 'utilities', 'business'],
    orientation: 'portrait-primary',
  }
}
