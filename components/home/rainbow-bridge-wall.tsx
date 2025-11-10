'use client'

/**
 * Rainbow Bridge Wall Component
 * 彩虹桥故事墙 - 瀑布流展示公开纪念页
 */

import { useState } from 'react'
import { MemorialCard } from './memorial-card'
import Masonry from 'react-masonry-css'
import { Button } from '@/components/ui/button'
import { Clock, TrendingUp } from 'lucide-react'

interface Memorial {
  id: string
  petName: string
  petBreed?: string | null
  petSpecies?: string | null
  birthDate?: string | null
  deathDate?: string | null
  bio?: string | null
  slug: string
  viewCount?: number | null
  candleCount?: number | null
  flowerCount?: number | null
  createdAt: Date
  photos?: { url: string }[]
}

interface RainbowBridgeWallProps {
  memorials: Memorial[]
}

type SortOption = 'latest' | 'popular'

export function RainbowBridgeWall({ memorials }: RainbowBridgeWallProps) {
  const [sortBy, setSortBy] = useState<SortOption>('latest')

  // 排序逻辑
  const sortedMemorials = [...memorials].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else {
      // 按照访问量排序
      const aScore = (a.viewCount || 0) + (a.candleCount || 0) + (a.flowerCount || 0)
      const bScore = (b.viewCount || 0) + (b.candleCount || 0) + (b.flowerCount || 0)
      return bScore - aScore
    }
  })

  // 响应式断点配置
  const breakpointColumns = {
    default: 3,
    1024: 2,
    640: 1,
  }

  if (memorials.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-neutral-300 bg-white p-12 text-center">
        <p className="text-neutral-600">暂无公开纪念页</p>
      </div>
    )
  }

  return (
    <div>
      {/* Sort Controls */}
      <div className="mb-8 flex justify-center gap-3">
        <Button
          variant={sortBy === 'latest' ? 'default' : 'outline'}
          onClick={() => setSortBy('latest')}
          className="gap-2"
        >
          <Clock className="h-4 w-4" />
          最新创建
        </Button>
        <Button
          variant={sortBy === 'popular' ? 'default' : 'outline'}
          onClick={() => setSortBy('popular')}
          className="gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          最多访问
        </Button>
      </div>

      {/* Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-6 w-auto"
        columnClassName="pl-6 bg-clip-padding"
      >
        {sortedMemorials.map((memorial) => (
          <MemorialCard key={memorial.id} memorial={memorial} />
        ))}
      </Masonry>
    </div>
  )
}
