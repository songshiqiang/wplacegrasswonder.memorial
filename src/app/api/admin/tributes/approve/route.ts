/**
 * Approve Tribute API Route
 * 批准留言
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { db } from '@/db'
import { tributes } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    // 验证管理员权限
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ message: '未登录' }, { status: 401 })
    }

    // TODO: 添加管理员角色检查
    // if (user.app_metadata?.role !== 'admin') {
    //   return NextResponse.json({ message: '无权限' }, { status: 403 })
    // }

    // 解析请求体
    const body = await request.json()
    const { tributeId } = body

    if (!tributeId) {
      return NextResponse.json(
        { message: '缺少留言 ID' },
        { status: 400 }
      )
    }

    // 更新留言状态为已批准
    await db
      .update(tributes)
      .set({ isApproved: true })
      .where(eq(tributes.id, tributeId))

    return NextResponse.json({
      message: '留言已批准',
    })
  } catch (error: any) {
    console.error('Approve tribute error:', error)
    return NextResponse.json(
      { message: error.message || '操作失败' },
      { status: 500 }
    )
  }
}
