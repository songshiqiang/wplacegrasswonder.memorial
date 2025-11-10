/**
 * Reject Tribute API Route
 * 拒绝留言（删除）
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

    // 删除留言（拒绝）
    await db.delete(tributes).where(eq(tributes.id, tributeId))

    return NextResponse.json({
      message: '留言已拒绝并删除',
    })
  } catch (error: any) {
    console.error('Reject tribute error:', error)
    return NextResponse.json(
      { message: error.message || '操作失败' },
      { status: 500 }
    )
  }
}
