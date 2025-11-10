/**
 * Message Tribute API Route
 * 留言悼念
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
    const { memorialId, message, authorName, authorEmail } = body

    if (!memorialId || !message) {
      return NextResponse.json(
        { message: '缺少必填字段' },
        { status: 400 }
      )
    }

    // 验证留言长度
    if (message.length > 500) {
      return NextResponse.json(
        { message: '留言内容超过 500 字限制' },
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

    // 创建留言记录
    const [tribute] = await db
      .insert(tributes)
      .values({
        memorialId,
        authorId: user?.id || null,
        authorName: authorName || (user?.user_metadata?.name) || '匿名访客',
        authorEmail: authorEmail || user?.email || null,
        message: message.trim(),
        tributeType: 'message',
        isApproved: false, // 留言需要审核
      })
      .returning()

    return NextResponse.json(
      {
        message: '留言提交成功',
        tribute,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Create message tribute error:', error)
    return NextResponse.json(
      { message: error.message || '提交失败' },
      { status: 500 }
    )
  }
}
