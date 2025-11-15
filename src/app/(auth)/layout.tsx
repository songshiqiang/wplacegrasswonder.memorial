/**
 * Auth Layout
 * 认证页面的布局（登录、注册、忘记密码）
 */

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '用户认证 - wplacegrasswonder.memorial',
  description: '登录或注册以创建宠物纪念页',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-warm-50">
      {/* 装饰性元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl" />
      </div>

      {/* 内容区域 */}
      <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-neutral-800">
            wplacegrasswonder.memorial
          </h1>
          <p className="mt-2 text-neutral-600">
            为您的宠物创建永恒的纪念空间
          </p>
        </div>

        {/* 认证卡片 */}
        {children}
      </div>
    </div>
  )
}
