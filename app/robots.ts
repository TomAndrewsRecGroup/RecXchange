import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/account-management/'],
      },
    ],
    sitemap: 'https://recxchange.io/sitemap.xml',
  }
}
