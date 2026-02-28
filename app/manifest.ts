import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RecXchange - Recruiter Collaboration Platform',
    short_name: 'RecXchange',
    description: 'Marketing website for RecXchange - the recruiter collaboration platform where 15,000+ recruiters partner on placements. Platform access at app.recxchange.io',
    start_url: '/',
    display: 'standalone',
    background_color: '#050508',
    theme_color: '#00FFFF',
    orientation: 'portrait-primary',
    scope: '/',
    categories: ['business', 'productivity', 'recruitment'],
    icons: [
      {
        src: 'https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: 'https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ],
    shortcuts: [
      {
        name: 'Login to Platform',
        short_name: 'Login',
        description: 'Access the RecXchange platform',
        url: 'https://app.recxchange.io/login',
        icons: [{ src: 'https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png', sizes: '96x96' }]
      },
      {
        name: 'Create Account',
        short_name: 'Register',
        description: 'Sign up for RecXchange',
        url: 'https://app.recxchange.io/register',
        icons: [{ src: 'https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png', sizes: '96x96' }]
      },
      {
        name: 'Pricing Plans',
        short_name: 'Pricing',
        description: 'View RecXchange pricing',
        url: '/pricing',
        icons: [{ src: 'https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png', sizes: '96x96' }]
      },
      {
        name: 'Browse Roles',
        short_name: 'Roles',
        description: 'Browse live recruitment roles',
        url: '/roles',
        icons: [{ src: 'https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png', sizes: '96x96' }]
      }
    ],
    related_applications: [
      {
        platform: 'web',
        url: 'https://app.recxchange.io',
        id: 'app.recxchange.io'
      }
    ],
    prefer_related_applications: false,
    lang: 'en-GB',
    dir: 'ltr',
    iarc_rating_id: '',
    screenshots: []
  }
}
