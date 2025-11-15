/**
 * Tribute List Component
 * 留言列表 - 显示已批准的留言
 */

import { Card } from '@/components/ui/card'
import { MessageSquare, User, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface Tribute {
  id: string
  authorName: string | null
  message: string
  createdAt: Date
  tributeType: 'message' | 'candle' | 'flower' | null
  flowerType?: string | null
}

interface TributeListProps {
  tributes: Tribute[]
}

export function TributeList({ tributes }: TributeListProps) {
  if (!tributes || tributes.length === 0) {
    return (
      <Card className="p-12 text-center">
        <MessageSquare className="mx-auto h-16 w-16 text-neutral-300" />
        <h3 className="mt-4 text-lg font-medium text-neutral-600">
          还没有留言
        </h3>
        <p className="mt-2 text-sm text-neutral-500">
          成为第一个留言的人
        </p>
      </Card>
    )
  }

  // 只显示文字留言（message 类型）
  const textTributes = tributes.filter(
    (tribute) => tribute.tributeType === 'message'
  )

  if (textTributes.length === 0) {
    return (
      <Card className="p-12 text-center">
        <MessageSquare className="mx-auto h-16 w-16 text-neutral-300" />
        <h3 className="mt-4 text-lg font-medium text-neutral-600">
          还没有留言
        </h3>
        <p className="mt-2 text-sm text-neutral-500">
          成为第一个留言的人
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {textTributes.map((tribute) => (
        <Card key={tribute.id} className="p-6 shadow-sm hover:shadow-md transition-shadow">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-neutral-800">
                  {tribute.authorName || '匿名访客'}
                </p>
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
            </div>
          </div>

          {/* Message */}
          <div className="pl-12">
            <p className="text-neutral-700 whitespace-pre-wrap leading-relaxed">
              {tribute.message}
            </p>
          </div>
        </Card>
      ))}
    </div>
  )
}
