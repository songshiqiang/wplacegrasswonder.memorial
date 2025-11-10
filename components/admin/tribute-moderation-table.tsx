'use client'

/**
 * Tribute Moderation Table Component
 * 留言审核表格
 */

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, ExternalLink, User, Calendar } from 'lucide-react'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface Tribute {
  id: string
  memorialId: string
  authorName: string | null
  authorEmail: string | null
  message: string
  tributeType: 'message' | 'candle' | 'flower' | null
  createdAt: Date
  isApproved: boolean
  petName: string | null
  slug: string | null
}

interface TributeModerationTableProps {
  tributes: Tribute[]
}

export function TributeModerationTable({
  tributes: initialTributes,
}: TributeModerationTableProps) {
  const [tributes, setTributes] = useState(initialTributes)
  const [loading, setLoading] = useState<string | null>(null)

  const handleApprove = async (tributeId: string) => {
    setLoading(tributeId)

    try {
      const response = await fetch('/api/admin/tributes/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tributeId }),
      })

      if (!response.ok) {
        throw new Error('批准失败')
      }

      // 从列表中移除已批准的留言
      setTributes(tributes.filter((t) => t.id !== tributeId))
      toast.success('留言已批准')
    } catch (error: any) {
      toast.error('操作失败', {
        description: error.message,
      })
    } finally {
      setLoading(null)
    }
  }

  const handleReject = async (tributeId: string) => {
    setLoading(tributeId)

    try {
      const response = await fetch('/api/admin/tributes/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tributeId }),
      })

      if (!response.ok) {
        throw new Error('拒绝失败')
      }

      // 从列表中移除已拒绝的留言
      setTributes(tributes.filter((t) => t.id !== tributeId))
      toast.success('留言已拒绝')
    } catch (error: any) {
      toast.error('操作失败', {
        description: error.message,
      })
    } finally {
      setLoading(null)
    }
  }

  if (tributes.length === 0) {
    return (
      <Card className="p-12 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-300" />
        <h3 className="mt-4 text-lg font-medium text-neutral-600">
          没有待审核的留言
        </h3>
        <p className="mt-2 text-sm text-neutral-500">
          所有留言都已审核完成
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {tributes.map((tribute) => (
        <Card key={tribute.id} className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {/* Content */}
            <div className="flex-1 space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                    <User className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800">
                      {tribute.authorName || '匿名访客'}
                    </p>
                    {tribute.authorEmail && (
                      <p className="text-xs text-neutral-500">
                        {tribute.authorEmail}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-neutral-500">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {formatDistanceToNow(new Date(tribute.createdAt), {
                      addSuffix: true,
                      locale: zhCN,
                    })}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div className="rounded-lg bg-neutral-50 p-4">
                <p className="whitespace-pre-wrap text-sm text-neutral-700">
                  {tribute.message}
                </p>
              </div>

              {/* Memorial Link */}
              {tribute.slug && (
                <Link
                  href={`/memorials/${tribute.slug}`}
                  className="inline-flex items-center gap-1 text-sm text-primary-600 hover:underline"
                  target="_blank"
                >
                  {tribute.petName} 的纪念页
                  <ExternalLink className="h-3 w-3" />
                </Link>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 sm:flex-col">
              <Button
                onClick={() => handleApprove(tribute.id)}
                disabled={loading === tribute.id}
                className="flex-1 gap-2 sm:flex-none"
                size="sm"
              >
                <CheckCircle className="h-4 w-4" />
                批准
              </Button>
              <Button
                onClick={() => handleReject(tribute.id)}
                disabled={loading === tribute.id}
                variant="destructive"
                className="flex-1 gap-2 sm:flex-none"
                size="sm"
              >
                <XCircle className="h-4 w-4" />
                拒绝
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
