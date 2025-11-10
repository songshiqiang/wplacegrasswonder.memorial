'use client'

/**
 * Register Page
 * 用户注册页面
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Mail, Lock, User, UserPlus } from 'lucide-react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    // 验证密码
    if (password !== confirmPassword) {
      toast.error('密码不匹配', {
        description: '两次输入的密码不一致',
      })
      return
    }

    if (password.length < 6) {
      toast.error('密码太短', {
        description: '密码至少需要 6 个字符',
      })
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      toast.success('注册成功', {
        description: '请检查您的邮箱以验证账户',
      })

      // 跳转到登录页
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (error: any) {
      toast.error('注册失败', {
        description: error.message || '请稍后重试',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error: any) {
      toast.error('Google 注册失败', {
        description: error.message,
      })
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold">创建账户</CardTitle>
        <CardDescription>
          为您的宠物建立永恒的纪念空间
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* 姓名 */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              您的姓名
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="张三"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              className="h-11"
            />
          </div>

          {/* 邮箱 */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              邮箱地址
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="h-11"
            />
          </div>

          {/* 密码 */}
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              密码
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="至少 6 个字符"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
              className="h-11"
            />
          </div>

          {/* 确认密码 */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              确认密码
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="再次输入密码"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
              className="h-11"
            />
          </div>

          {/* 注册按钮 */}
          <Button
            type="submit"
            className="w-full h-11"
            disabled={loading}
          >
            {loading ? (
              <>注册中...</>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                注册
              </>
            )}
          </Button>
        </form>

        {/* 分隔线 */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-neutral-600">或</span>
          </div>
        </div>

        {/* Google 注册 */}
        <Button
          type="button"
          variant="outline"
          className="w-full h-11"
          onClick={handleGoogleRegister}
          disabled={loading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          使用 Google 注册
        </Button>

        {/* 服务条款 */}
        <p className="mt-4 text-xs text-center text-neutral-600">
          注册即表示您同意我们的{' '}
          <Link href="/terms" className="text-primary-600 hover:underline">
            服务条款
          </Link>
          {' '}和{' '}
          <Link href="/privacy" className="text-primary-600 hover:underline">
            隐私政策
          </Link>
        </p>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-sm text-neutral-600">
          已有账户？{' '}
          <Link
            href="/login"
            className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
          >
            立即登录
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
