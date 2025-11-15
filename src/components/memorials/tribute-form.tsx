'use client'

/**
 * Tribute Form Component
 * 留言表单 - 访客可以留下悼念留言
 */

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { MessageSquare, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface TributeFormProps {
  memorialId: string
  isAuthenticated?: boolean
  userName?: string | null
  userEmail?: string | null
}

export function TributeForm({
  memorialId,
  isAuthenticated = false,
  userName,
  userEmail,
}: TributeFormProps) {
  const [message, setMessage] = useState('')
  const [authorName, setAuthorName] = useState(userName || '')
  const [authorEmail, setAuthorEmail] = useState(userEmail || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) {
      toast.error('请输入留言内容')
      return
    }

    if (!isAuthenticated && !authorName.trim()) {
      toast.error('请输入您的姓名')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/tributes/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memorialId,
          message: message.trim(),
          authorName: authorName.trim() || null,
          authorEmail: authorEmail.trim() || null,
        }),
      })

      if (!response.ok) {
        throw new Error('提交失败')
      }

      toast.success('留言提交成功', {
        description: '您的留言正在审核中，审核通过后将显示',
      })

      // 清空表单
      setMessage('')
      if (!isAuthenticated) {
        setAuthorName('')
        setAuthorEmail('')
      }
    } catch (error: any) {
      toast.error('提交失败', {
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-base">
            您的留言 <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="写下您对TA的思念、回忆或祝福..."
            rows={6}
            className="resize-none"
            required
          />
          <p className="text-xs text-neutral-500">
            {message.length} / 500 字
          </p>
        </div>

        {/* Guest Info (only for non-authenticated users) */}
        {!isAuthenticated && (
          <>
            <div className="space-y-2">
              <Label htmlFor="authorName" className="text-base">
                您的姓名 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="authorName"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="请输入您的姓名"
                maxLength={100}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="authorEmail" className="text-base">
                邮箱（可选）
              </Label>
              <Input
                id="authorEmail"
                type="email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                placeholder="如需接收回复通知，请留下邮箱"
                maxLength={255}
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading || !message.trim()}
          className="w-full gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              提交中...
            </>
          ) : (
            <>
              <MessageSquare className="h-4 w-4" />
              提交留言
            </>
          )}
        </Button>

        {/* Notice */}
        <p className="text-xs text-neutral-500 text-center">
          留言需要审核后才会显示，请保持尊重和文明
        </p>
      </form>
    </Card>
  )
}
