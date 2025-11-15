/**
 * Flower Tribute API Route
 * 献上鲜花
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
    const { memorialId, flowerType } = body

    if (!memorialId || !flowerType) {
      return NextResponse.json(
        { message: '缺少必填字段' },
        { status: 400 }
      )
    }

    // 验证花类型
    const validFlowerTypes = ['rose', 'lily', 'chrysanthemum', 'tulip']
    if (!validFlowerTypes.includes(flowerType)) {
      return NextResponse.json(
        { message: '无效的花类型' },
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

    // 花语映射
    const flowerMeanings: Record<string, string> = {
      rose: '献上一朵玫瑰 - 永恒的爱',
      lily: '献上一朵百合 - 纯洁的心',
      chrysanthemum: '献上一朵菊花 - 深切怀念',
      tulip: '献上一朵郁金香 - 美好的回忆',
    }

    // 创建鲜花悼念记录
    await db.insert(tributes).values({
      memorialId,
      authorId: user?.id || null,
      message: flowerMeanings[flowerType],
      tributeType: 'flower',
      flowerType,
      isApproved: true, // 鲜花自动批准
    })

    // 更新纪念页的鲜花计数
    await db
      .update(memorials)
      .set({ flowerCount: (memorial.flowerCount || 0) + 1 })
      .where(eq(memorials.id, memorialId))

    return NextResponse.json(
      {
        message: '鲜花已献上',
        flowerCount: (memorial.flowerCount || 0) + 1,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Offer flower error:', error)
    return NextResponse.json(
      { message: error.message || '操作失败' },
      { status: 500 }
    )
  }
}
