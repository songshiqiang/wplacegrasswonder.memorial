'use client'

/**
 * Virtual Tribute Component
 * 虚拟悼念 - 蜡烛和鲜花
 */

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { VirtualCandle } from '@/components/memorial/virtual-candle'
import { FlowerPicker } from '@/components/memorial/virtual-flower'
import { Flame, Flower2 } from 'lucide-react'
import { toast } from 'sonner'

interface VirtualTributeProps {
  memorialId: string
  candleCount: number | null
  flowerCount: number | null
}

type FlowerType = 'rose' | 'lily' | 'chrysanthemum' | 'tulip'

export function VirtualTribute({
  memorialId,
  candleCount,
  flowerCount,
}: VirtualTributeProps) {
  const [candles, setCandles] = useState(candleCount || 0)
  const [flowers, setFlowers] = useState(flowerCount || 0)
  const [hasLitCandle, setHasLitCandle] = useState(false)

  const handleLightCandle = async () => {
    try {
      const response = await fetch('/api/tributes/candle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memorialId,
        }),
      })

      if (!response.ok) {
        throw new Error('发送失败')
      }

      setCandles(candles + 1)
      setHasLitCandle(true)
      toast.success('已为TA点亮蜡烛', {
        description: '愿这微光照亮TA在彩虹桥的路',
      })
    } catch (error: any) {
      toast.error('操作失败', {
        description: error.message,
      })
    }
  }

  const handleOfferFlower = async (type: FlowerType) => {
    try {
      const response = await fetch('/api/tributes/flower', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memorialId,
          flowerType: type,
        }),
      })

      if (!response.ok) {
        throw new Error('发送失败')
      }

      setFlowers(flowers + 1)

      const flowerNames: Record<FlowerType, string> = {
        rose: '玫瑰',
        lily: '百合',
        chrysanthemum: '菊花',
        tulip: '郁金香',
      }

      toast.success(`已献上${flowerNames[type]}`, {
        description: '您的心意已送达',
      })
    } catch (error: any) {
      toast.error('操作失败', {
        description: error.message,
      })
    }
  }

  return (
    <Card className="overflow-hidden shadow-md">
      <Tabs defaultValue="candle" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="candle" className="gap-2">
            <Flame className="h-4 w-4" />
            点亮蜡烛
            {candles > 0 && (
              <span className="ml-1 text-xs text-neutral-500">({candles})</span>
            )}
          </TabsTrigger>
          <TabsTrigger value="flower" className="gap-2">
            <Flower2 className="h-4 w-4" />
            献上鲜花
            {flowers > 0 && (
              <span className="ml-1 text-xs text-neutral-500">({flowers})</span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="candle" className="p-8">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-neutral-800">
                点亮一支蜡烛
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                用烛光照亮TA在彩虹桥的路
              </p>
            </div>

            <VirtualCandle isLit={hasLitCandle} onLight={handleLightCandle} />

            {candles > 0 && (
              <div className="text-center">
                <p className="text-sm text-neutral-600">
                  已有 <span className="font-semibold text-primary-600">{candles}</span> 支蜡烛为TA点亮
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="flower" className="p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-neutral-800">
                献上一束鲜花
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                用花语表达您的思念
              </p>
            </div>

            <FlowerPicker onOffer={handleOfferFlower} />

            {flowers > 0 && (
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-neutral-600">
                  已有 <span className="font-semibold text-primary-600">{flowers}</span> 朵鲜花献给TA
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
