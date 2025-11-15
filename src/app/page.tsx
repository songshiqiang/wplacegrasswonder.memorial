/**
 * Homepage
 * 彩虹桥纪念首页 - 展示公开纪念页
 */

import Link from 'next/link'
import { Hero } from '@/components/home/hero'
import { RainbowBridgeWall } from '@/components/home/rainbow-bridge-wall'
import { Button } from '@/components/ui/button'
import { db } from '@/db'
import { memorials, photos } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { Heart } from 'lucide-react'

export const revalidate = 300 // ISR: Revalidate every 5 minutes

export default async function HomePage() {
  // 查询公开的纪念页及其第一张照片
  const publicMemorials = await db
    .select({
      id: memorials.id,
      petName: memorials.petName,
      petBreed: memorials.petBreed,
      petSpecies: memorials.petSpecies,
      birthDate: memorials.birthDate,
      deathDate: memorials.deathDate,
      bio: memorials.bio,
      slug: memorials.slug,
      viewCount: memorials.viewCount,
      candleCount: memorials.candleCount,
      flowerCount: memorials.flowerCount,
      createdAt: memorials.createdAt,
    })
    .from(memorials)
    .where(eq(memorials.privacy, 'public'))
    .orderBy(desc(memorials.createdAt))
    .limit(30)

  // 为每个纪念页获取第一张照片
  const memorialsWithPhotos = await Promise.all(
    publicMemorials.map(async (memorial) => {
      const memorialPhotos = await db
        .select({ url: photos.url })
        .from(photos)
        .where(eq(photos.memorialId, memorial.id))
        .orderBy(photos.displayOrder)
        .limit(1)

      return {
        ...memorial,
        photos: memorialPhotos,
      }
    })
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Rainbow Bridge Wall */}
      <section id="story-wall" className="bg-gradient-to-b from-neutral-50 to-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold text-neutral-800 sm:text-4xl">
              彩虹桥故事墙
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              纪念那些陪伴我们的永远的朋友
            </p>
          </div>

          <RainbowBridgeWall memorials={memorialsWithPhotos} />

          {publicMemorials.length >= 30 && (
            <div className="mt-12 text-center">
              <Link href="/memorials">
                <Button size="lg" variant="outline">
                  查看更多纪念页
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-primary-100 via-secondary-50 to-warm-50 py-16 lg:py-20">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <div className="mb-6 flex justify-center">
            <Heart className="h-12 w-12 text-primary-600" fill="currentColor" />
          </div>

          <h2 className="text-3xl font-semibold text-neutral-800 sm:text-4xl">
            为您的宠物创建纪念页
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            建立一个温暖、永久的纪念空间，让爱与回忆永存
          </p>

          <div className="mt-8 space-y-4">
            <Link href="/memorials/create">
              <Button size="lg" className="px-8 py-6 text-lg shadow-lg">
                免费创建纪念页
              </Button>
            </Link>
            <p className="text-sm text-neutral-500">
              无需信用卡 · 永久免费 · 随时可用
            </p>
          </div>

          {/* Features */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg bg-white/80 p-6 backdrop-blur">
              <div className="text-2xl font-semibold text-primary-600">📸</div>
              <h3 className="mt-3 font-medium text-neutral-800">珍贵回忆</h3>
              <p className="mt-2 text-sm text-neutral-600">
                上传照片，保存美好时光
              </p>
            </div>
            <div className="rounded-lg bg-white/80 p-6 backdrop-blur">
              <div className="text-2xl font-semibold text-primary-600">🕯️</div>
              <h3 className="mt-3 font-medium text-neutral-800">虚拟悼念</h3>
              <p className="mt-2 text-sm text-neutral-600">
                蜡烛与鲜花，表达思念
              </p>
            </div>
            <div className="rounded-lg bg-white/80 p-6 backdrop-blur">
              <div className="text-2xl font-semibold text-primary-600">💬</div>
              <h3 className="mt-3 font-medium text-neutral-800">留言祝福</h3>
              <p className="mt-2 text-sm text-neutral-600">
                访客留言，共同怀念
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
