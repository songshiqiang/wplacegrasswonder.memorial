'use client'

/**
 * Account Settings Page
 * 用户账户设置和管理
 */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { User, Mail, Key, Trash2 } from 'lucide-react'

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setName(user.user_metadata?.name || '')
        setEmail(user.email || '')
      }
    } catch (error: any) {
      toast.error('加载用户信息失败', {
        description: error.message,
      })
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        data: { name },
      })

      if (error) throw error

      toast.success('个人资料更新成功')
    } catch (error: any) {
      toast.error('更新失败', {
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error('密码不匹配', {
        description: '新密码和确认密码必须相同',
      })
      return
    }

    if (newPassword.length < 6) {
      toast.error('密码太短', {
        description: '密码至少需要 6 个字符',
      })
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error

      toast.success('密码更新成功')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error: any) {
      toast.error('更新失败', {
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-neutral-800">账户设置</h1>
        <p className="mt-2 text-neutral-600">管理您的账户信息和安全设置</p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            个人资料
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Key className="h-4 w-4" />
            安全
          </TabsTrigger>
          <TabsTrigger value="account" className="gap-2">
            <Trash2 className="h-4 w-4" />
            账户
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="p-6">
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">姓名</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入您的姓名"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-neutral-50"
                />
                <p className="text-xs text-neutral-500">
                  邮箱地址暂不支持修改
                </p>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? '保存中...' : '保存更改'}
              </Button>
            </form>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="p-6">
            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-800">
                  修改密码
                </h3>
                <p className="mt-1 text-sm text-neutral-600">
                  请设置一个强密码来保护您的账户
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">新密码</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="至少 6 个字符"
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">确认密码</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="再次输入新密码"
                  minLength={6}
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? '更新中...' : '更新密码'}
              </Button>
            </form>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-800">
                  删除账户
                </h3>
                <p className="mt-1 text-sm text-neutral-600">
                  删除账户后，所有纪念页和数据将被永久删除，此操作无法撤销
                </p>
              </div>

              <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-800">
                  此功能暂未开放。如需删除账户，请联系客服。
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
