/**
 * Hero Component
 * 首页英雄区 - 情感化的欢迎区域
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart, Sparkles, ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-100 via-secondary-50 to-warm-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative mx-auto px-4 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-4xl text-center">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Heart
                className="h-16 w-16 text-primary-600 sm:h-20 sm:w-20"
                fill="currentColor"
              />
              <Sparkles className="absolute -right-2 -top-2 h-8 w-8 text-warm-400 animate-pulse" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-neutral-800 sm:text-5xl lg:text-6xl">
            彩虹桥纪念
          </h1>
          <p className="mt-4 text-xl text-neutral-700 sm:text-2xl lg:text-3xl">
            为您的宠物建立永恒的纪念空间
          </p>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-600 sm:text-lg lg:text-xl">
            当我们挚爱的伴侣跨过彩虹桥，爱与回忆永存。
            在这里，为您的宠物创建一个温暖的纪念页，
            分享美好时光，让思念有处安放。
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/memorials/create">
              <Button size="lg" className="gap-2 px-8 py-6 text-lg shadow-lg">
                创建纪念页
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#story-wall">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 px-8 py-6 text-lg"
              >
                浏览纪念墙
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-neutral-200 pt-10">
            <div>
              <div className="text-3xl font-bold text-primary-600 sm:text-4xl">
                1000+
              </div>
              <div className="mt-2 text-sm text-neutral-600 sm:text-base">
                纪念页创建
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 sm:text-4xl">
                5000+
              </div>
              <div className="mt-2 text-sm text-neutral-600 sm:text-base">
                访客留言
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 sm:text-4xl">
                10000+
              </div>
              <div className="mt-2 text-sm text-neutral-600 sm:text-base">
                蜡烛点亮
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
