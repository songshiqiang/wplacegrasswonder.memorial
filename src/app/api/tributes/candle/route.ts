/**
 * Candle Tribute API Route
 * 点亮蜡烛
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { memorials, tributes } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json()
    const { memorialId } = body

    if (!memorialId) {
      return NextResponse.json(
        { message: '缺少纪念页 ID' },
        { status: 400 }
      )
    }

    // 获取当前用户（可选，支持匿名）
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // 验证纪念页是否存在
    const [memorial] = await db
      .select()
      .from(memorials)
      .where(eq(memorials.id, memorialId))
      .limit(1)

    if (!memorial) {
      return NextResponse.json({ message: '纪念页不存在' }, { status: 404 })
    }

    // 创建蜡烛悼念记录
    await db.insert(tributes).values({
      memorialId,
      authorId: user?.id || null,
      message: '点亮了一支蜡烛',
      tributeType: 'candle',
      isApproved: true, // 蜡烛自动批准
    })

    // 更新纪念页的蜡烛计数
    await db
      .update(memorials)
      .set({ candleCount: (memorial.candleCount || 0) + 1 })
      .where(eq(memorials.id, memorialId))

    return NextResponse.json(
      {
        message: '蜡烛已点亮',
        candleCount: (memorial.candleCount || 0) + 1,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Light candle error:', error)
    return NextResponse.json(
      { message: error.message || '操作失败' },
      { status: 500 }
    )
  }
}
