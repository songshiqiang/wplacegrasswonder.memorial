/**
 * Robots.txt Configuration
 * 配置搜索引擎爬虫规则
 */

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wplacegrasswonder.memorial'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/api/', '/settings', '/_next/', '/admin'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
