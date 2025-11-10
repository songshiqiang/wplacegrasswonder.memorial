/**
 * Dashboard Main Page
 * 显示用户的纪念页列表
 */

import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'
import { db } from '@/db'
import { memorials } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PlusCircle, Heart } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 使用 Drizzle ORM 查询用户的纪念页
  const userMemorials = await db
    .select()
    .from(memorials)
    .where(eq(memorials.userId, user.id))
    .orderBy(desc(memorials.createdAt))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-800">
            我的纪念页
          </h1>
          <p className="mt-2 text-neutral-600">
            管理您为宠物创建的纪念空间
          </p>
        </div>
        <Link href="/memorials/create">
          <Button size="lg" className="gap-2">
            <PlusCircle className="h-5 w-5" />
            创建纪念页
          </Button>
        </Link>
      </div>

      {/* Memorial List */}
      {userMemorials && userMemorials.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {userMemorials.map((memorial) => (
            <Link
              key={memorial.id}
              href={`/memorials/${memorial.slug}`}
              className="group"
            >
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                {/* Placeholder for memorial image */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-primary-100 to-secondary-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="h-16 w-16 text-primary-300" />
                  </div>
                </div>

                {/* Memorial Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-neutral-800 group-hover:text-primary-600 transition-colors">
                    {memorial.petName}
                  </h3>
                  {memorial.petBreed && (
                    <p className="text-sm text-neutral-600">
                      {memorial.petBreed}
                    </p>
                  )}
                  {memorial.deathDate && (
                    <p className="mt-2 text-xs text-neutral-500">
                      {new Date(memorial.deathDate).toLocaleDateString('zh-CN')}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-2">
                    <span
                      className={`
                        inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${memorial.privacy === 'public'
                          ? 'bg-green-100 text-green-800'
                          : memorial.privacy === 'unlisted'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-neutral-100 text-neutral-800'
                        }
                      `}
                    >
                      {memorial.privacy === 'public'
                        ? '公开'
                        : memorial.privacy === 'unlisted'
                        ? '不公开索引'
                        : '私密'}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="p-12 text-center border-2 border-dashed">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
            <Heart className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-neutral-800">
            还没有纪念页
          </h3>
          <p className="mt-2 text-neutral-600">
            为您的宠物创建第一个纪念空间，让爱永远留存
          </p>
          <Link href="/memorials/create">
            <Button className="mt-6 gap-2">
              <PlusCircle className="h-5 w-5" />
              开始创建
            </Button>
          </Link>
        </Card>
      )}
    </div>
  )
}
