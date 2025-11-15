/**
 * Sitemap Generation
 * 动态生成网站地图用于 SEO
 */

import { MetadataRoute } from 'next'
import { db } from '@/db'
import { memorials } from '@/db/schema'
import { eq } from 'drizzle-orm'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wplacegrasswonder.memorial'

  // 获取所有公开纪念页
  const publicMemorials = await db
    .select({
      slug: memorials.slug,
      updatedAt: memorials.updatedAt,
    })
    .from(memorials)
    .where(eq(memorials.privacy, 'public'))

  // 纪念页 URLs
  const memorialUrls: MetadataRoute.Sitemap = publicMemorials.map((memorial) => ({
    url: `${baseUrl}/memorials/${memorial.slug}`,
    lastModified: memorial.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // 静态页面 URLs
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  return [...staticUrls, ...memorialUrls]
}
