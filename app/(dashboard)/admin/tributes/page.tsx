/**
 * Tribute Moderation Page
 * 管理员审核留言
 */

import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { db } from '@/db'
import { tributes, memorials } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { TributeModerationTable } from '@/components/admin/tribute-moderation-table'
import { Card } from '@/components/ui/card'
import { MessageSquare, CheckCircle, XCircle } from 'lucide-react'

export default async function TributeModerationPage() {
  const supabase = await createServerClient()

  // 验证管理员权限（简单实现，实际项目需要完善的角色系统）
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // TODO: 添加管理员角色检查
  // if (!user.app_metadata?.role === 'admin') {
  //   redirect('/dashboard')
  // }

  // 查询待审核的留言
  const pendingTributes = await db
    .select({
      id: tributes.id,
      memorialId: tributes.memorialId,
      authorName: tributes.authorName,
      authorEmail: tributes.authorEmail,
      message: tributes.message,
      tributeType: tributes.tributeType,
      createdAt: tributes.createdAt,
      isApproved: tributes.isApproved,
      petName: memorials.petName,
      slug: memorials.slug,
    })
    .from(tributes)
    .leftJoin(memorials, eq(tributes.memorialId, memorials.id))
    .where(eq(tributes.isApproved, false))
    .orderBy(desc(tributes.createdAt))

  // 查询已批准的留言（最近10条）
  const approvedTributes = await db
    .select({
      id: tributes.id,
      memorialId: tributes.memorialId,
      authorName: tributes.authorName,
      message: tributes.message,
      createdAt: tributes.createdAt,
      isApproved: tributes.isApproved,
      petName: memorials.petName,
    })
    .from(tributes)
    .leftJoin(memorials, eq(tributes.memorialId, memorials.id))
    .where(eq(tributes.isApproved, true))
    .orderBy(desc(tributes.createdAt))
    .limit(10)

  // 统计信息
  const stats = {
    pending: pendingTributes.length,
    approved: approvedTributes.length,
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-neutral-800">留言审核</h1>
        <p className="mt-2 text-neutral-600">审核和管理用户提交的悼念留言</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <MessageSquare className="h-10 w-10 text-primary-600" />
            <div>
              <p className="text-sm text-neutral-600">待审核</p>
              <p className="text-2xl font-semibold text-neutral-800">
                {stats.pending}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
            <div>
              <p className="text-sm text-neutral-600">最近已批准</p>
              <p className="text-2xl font-semibold text-neutral-800">
                {stats.approved}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <XCircle className="h-10 w-10 text-red-600" />
            <div>
              <p className="text-sm text-neutral-600">审核率</p>
              <p className="text-2xl font-semibold text-neutral-800">
                {stats.pending + stats.approved > 0
                  ? Math.round(
                      (stats.approved / (stats.pending + stats.approved)) * 100
                    )
                  : 0}
                %
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Moderation Table */}
      <TributeModerationTable tributes={pendingTributes} />
    </div>
  )
}
