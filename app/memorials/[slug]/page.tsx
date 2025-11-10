/**
 * Memorial Display Page
 * 显示单个纪念页的详细信息
 */

import { notFound, redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { db } from '@/db'
import { memorials, photos } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { PhotoGallery } from '@/components/memorials/photo-gallery'
import { VirtualTribute } from '@/components/memorials/virtual-tribute'
import { Card } from '@/components/ui/card'
import { Heart, Calendar, Eye } from 'lucide-react'
import { Metadata } from 'next'

interface PageProps {
  params: {
    slug: string
  }
}

// 生成页面元数据
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const [memorial] = await db
    .select()
    .from(memorials)
    .where(eq(memorials.slug, params.slug))
    .limit(1)

  if (!memorial) {
    return {
      title: '纪念页不存在',
    }
  }

  return {
    title: `${memorial.petName}${memorial.petBreed ? ` (${memorial.petBreed})` : ''} 的纪念页 - 彩虹桥纪念`,
    description: memorial.bio?.slice(0, 160) || `纪念 ${memorial.petName}`,
    openGraph: {
      title: `纪念 ${memorial.petName}`,
      description: memorial.bio?.slice(0, 160) || `纪念 ${memorial.petName}`,
    },
  }
}

export default async function MemorialPage({ params }: PageProps) {
  const supabase = await createServerClient()

  // 获取当前用户
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 查询纪念页信息
  const [memorial] = await db
    .select()
    .from(memorials)
    .where(eq(memorials.slug, params.slug))
    .limit(1)

  if (!memorial) {
    notFound()
  }

  // 权限检查：私密页面只有所有者可以访问
  if (memorial.privacy === 'private' && memorial.userId !== user?.id) {
    redirect('/dashboard')
  }

  // 查询照片
  const memorialPhotos = await db
    .select()
    .from(photos)
    .where(eq(photos.memorialId, memorial.id))
    .orderBy(photos.displayOrder)

  // 增加访问计数（异步，不阻塞页面渲染）
  db.update(memorials)
    .set({ viewCount: (memorial.viewCount || 0) + 1 })
    .where(eq(memorials.id, memorial.id))
    .then()
    .catch((err) => console.error('Update view count error:', err))

  // 格式化日期
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const birthDateFormatted = formatDate(memorial.birthDate)
  const deathDateFormatted = formatDate(memorial.deathDate)

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-100 via-secondary-50 to-warm-50 py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4">
            <Heart className="mx-auto h-12 w-12 text-primary-600" fill="currentColor" />
          </div>
          <h1 className="text-4xl font-semibold text-neutral-800 sm:text-5xl">
            {memorial.petName}
          </h1>
          {memorial.petBreed && (
            <p className="mt-2 text-xl text-neutral-600">
              {memorial.petBreed}
            </p>
          )}
          {memorial.petSpecies && (
            <p className="mt-1 text-neutral-500">
              {getSpeciesLabel(memorial.petSpecies)}
            </p>
          )}

          {/* Dates */}
          {(birthDateFormatted || deathDateFormatted) && (
            <div className="mt-6 flex items-center justify-center gap-2 text-neutral-600">
              <Calendar className="h-5 w-5" />
              <p>
                {birthDateFormatted && <span>{birthDateFormatted}</span>}
                {birthDateFormatted && deathDateFormatted && <span> - </span>}
                {deathDateFormatted && <span>{deathDateFormatted}</span>}
              </p>
            </div>
          )}

          {/* View Count */}
          <div className="mt-4 flex items-center justify-center gap-1 text-sm text-neutral-500">
            <Eye className="h-4 w-4" />
            <span>{memorial.viewCount || 0} 次访问</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Photo Gallery */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-neutral-800">
            珍贵回忆
          </h2>
          <PhotoGallery photos={memorialPhotos} />
        </section>

        {/* Bio */}
        {memorial.bio && (
          <section className="mb-12">
            <Card className="p-8 shadow-md">
              <h2 className="mb-4 text-2xl font-semibold text-neutral-800">
                生平故事
              </h2>
              <div className="prose prose-lg max-w-none text-neutral-700">
                <p className="whitespace-pre-wrap">{memorial.bio}</p>
              </div>
            </Card>
          </section>
        )}

        {/* Memorial Text */}
        {memorial.memorialText && (
          <section className="mb-12">
            <Card className="border-2 border-primary-100 bg-gradient-to-br from-primary-50 to-secondary-50 p-8 shadow-md">
              <h2 className="mb-4 text-2xl font-semibold text-neutral-800">
                纪念文
              </h2>
              <div className="prose max-w-none italic text-neutral-700">
                <p className="whitespace-pre-wrap">{memorial.memorialText}</p>
              </div>
            </Card>
          </section>
        )}

        {/* Virtual Tributes */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-neutral-800">
            虚拟悼念
          </h2>
          <VirtualTribute
            memorialId={memorial.id}
            candleCount={memorial.candleCount}
            flowerCount={memorial.flowerCount}
          />
        </section>

        {/* Placeholder for Guestbook (Phase 3.5) */}
        <section>
          <Card className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-semibold text-neutral-800">
              留言板
            </h2>
            <p className="text-neutral-600">留言功能即将推出</p>
          </Card>
        </section>
      </div>
    </div>
  )
}

function getSpeciesLabel(species: string): string {
  const labels: Record<string, string> = {
    dog: '狗狗',
    cat: '猫咪',
    bird: '鸟类',
    rabbit: '兔子',
    hamster: '仓鼠',
    fish: '鱼类',
    other: '其他',
  }
  return labels[species] || species
}
