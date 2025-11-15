/**
 * Photos API Route
 * 创建和查询纪念页照片
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { db } from '@/db'
import { photos, memorials } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    // 验证用户身份
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ message: '未登录' }, { status: 401 })
    }

    // 解析请求体
    const body = await request.json()
    const { memorialId, url, thumbnailUrl, caption, displayOrder } = body

    // 验证必填字段
    if (!memorialId || !url) {
      return NextResponse.json(
        { message: '缺少必填字段' },
        { status: 400 }
      )
    }

    // 验证纪念页所有权
    const [memorial] = await db
      .select()
      .from(memorials)
      .where(eq(memorials.id, memorialId))
      .limit(1)

    if (!memorial) {
      return NextResponse.json({ message: '纪念页不存在' }, { status: 404 })
    }

    if (memorial.userId !== user.id) {
      return NextResponse.json({ message: '无权限' }, { status: 403 })
    }

    // 使用 Drizzle ORM 插入照片数据
    const [photo] = await db
      .insert(photos)
      .values({
        memorialId,
        url,
        thumbnailUrl: thumbnailUrl || null,
        caption: caption || null,
        displayOrder: displayOrder || 0,
      })
      .returning()

    return NextResponse.json(
      {
        message: '照片上传成功',
        photo,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Create photo error:', error)
    return NextResponse.json(
      { message: error.message || '上传失败' },
      { status: 500 }
    )
  }
}
