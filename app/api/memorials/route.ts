/**
 * Memorials API Route
 * 创建和查询纪念页
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { db } from '@/db'
import { memorials } from '@/db/schema'

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
    const {
      petName,
      petBreed,
      petSpecies,
      birthDate,
      deathDate,
      bio,
      memorialText,
      slug,
      privacy,
    } = body

    // 验证必填字段
    if (!petName || !petSpecies || !slug) {
      return NextResponse.json(
        { message: '缺少必填字段' },
        { status: 400 }
      )
    }

    // 使用 Drizzle ORM 插入数据
    const [memorial] = await db
      .insert(memorials)
      .values({
        userId: user.id,
        petName,
        petBreed: petBreed || null,
        petSpecies,
        birthDate: birthDate || null,
        deathDate: deathDate || null,
        bio: bio || null,
        memorialText: memorialText || null,
        slug,
        privacy: privacy || 'public',
      })
      .returning()

    return NextResponse.json(
      {
        message: '创建成功',
        memorial,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Create memorial error:', error)

    // 处理 slug 重复错误
    if (error.code === '23505') {
      return NextResponse.json(
        { message: 'Slug 已存在，请重试' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { message: error.message || '创建失败' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // 验证用户身份
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ message: '未登录' }, { status: 401 })
    }

    // 查询用户的所有纪念页
    const userMemorials = await db.query.memorials.findMany({
      where: (memorials, { eq }) => eq(memorials.userId, user.id),
      orderBy: (memorials, { desc }) => [desc(memorials.createdAt)],
    })

    return NextResponse.json({
      memorials: userMemorials,
    })
  } catch (error: any) {
    console.error('Get memorials error:', error)
    return NextResponse.json(
      { message: error.message || '查询失败' },
      { status: 500 }
    )
  }
}
