'use client'

/**
 * Forgot Password Page
 * 忘记密码页面
 */

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Mail, ArrowLeft, Send } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const supabase = createClient()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      })

      if (error) throw error

      setSent(true)
      toast.success('重置邮件已发送', {
        description: '请检查您的邮箱以重置密码',
      })
    } catch (error: any) {
      toast.error('发送失败', {
        description: error.message || '请检查您的邮箱地址',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold">忘记密码</CardTitle>
        <CardDescription>
          {sent
            ? '我们已向您发送了重置密码的链接'
            : '输入您的邮箱地址以重置密码'
          }
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!sent ? (
          <form onSubmit={handleResetPassword} className="space-y-4">
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

            {/* 提示信息 */}
            <div className="rounded-lg bg-primary-50 p-4 text-sm text-neutral-700">
              <p>我们将向这个邮箱发送密码重置链接。</p>
              <p className="mt-2">如果您没有收到邮件，请检查垃圾邮件文件夹。</p>
            </div>

            {/* 发送按钮 */}
            <Button
              type="submit"
              className="w-full h-11"
              disabled={loading}
            >
              {loading ? (
                <>发送中...</>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  发送重置链接
                </>
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            {/* 成功提示 */}
            <div className="rounded-lg bg-success/10 p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
                <Mail className="h-6 w-6 text-success" />
              </div>
              <p className="font-medium text-neutral-800">邮件已发送</p>
              <p className="mt-2 text-sm text-neutral-600">
                请检查 <span className="font-medium">{email}</span> 的收件箱
              </p>
            </div>

            {/* 重新发送 */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-11"
              onClick={() => {
                setSent(false)
                setEmail('')
              }}
            >
              使用其他邮箱
            </Button>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center">
        <Link
          href="/login"
          className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-800"
        >
          <ArrowLeft className="w-4 h-4" />
          返回登录
        </Link>
      </CardFooter>
    </Card>
  )
}
