'use client'

/**
 * Memorial Card Component
 * 纪念页卡片 - 用于首页故事墙展示
 */

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Heart, Eye, Flame, Flower2, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

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
  photos?: { url: string }[]
}

interface MemorialCardProps {
  memorial: Memorial
}

export function MemorialCard({ memorial }: MemorialCardProps) {
  const [imageError, setImageError] = useState(false)

  // 获取第一张照片，如果没有则使用占位符
  const firstPhoto = memorial.photos?.[0]?.url
  const photoUrl = firstPhoto && !imageError ? firstPhoto : null

  // 格式化日期
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return `${date.getFullYear()}`
  }

  const birthYear = formatDate(memorial.birthDate)
  const deathYear = formatDate(memorial.deathDate)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <Link href={`/memorials/${memorial.slug}`}>
        <Card className="group overflow-hidden transition-all hover:shadow-xl">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={memorial.petName}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Heart className="h-16 w-16 text-primary-300" />
              </div>
            )}

            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            {/* Stats on Hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex items-center gap-4 text-white">
                {memorial.viewCount !== null && memorial.viewCount !== undefined && (
                  <div className="flex items-center gap-1 text-sm">
                    <Eye className="h-4 w-4" />
                    <span>{memorial.viewCount}</span>
                  </div>
                )}
                {memorial.candleCount !== null && memorial.candleCount !== undefined && memorial.candleCount > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <Flame className="h-4 w-4" />
                    <span>{memorial.candleCount}</span>
                  </div>
                )}
                {memorial.flowerCount !== null && memorial.flowerCount !== undefined && memorial.flowerCount > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <Flower2 className="h-4 w-4" />
                    <span>{memorial.flowerCount}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Name */}
            <h3 className="text-lg font-semibold text-neutral-800 transition-colors group-hover:text-primary-600">
              {memorial.petName}
            </h3>

            {/* Breed */}
            {memorial.petBreed && (
              <p className="mt-1 text-sm text-neutral-600">{memorial.petBreed}</p>
            )}

            {/* Dates */}
            {(birthYear || deathYear) && (
              <div className="mt-2 flex items-center gap-1 text-xs text-neutral-500">
                <Calendar className="h-3 w-3" />
                <span>
                  {birthYear && <span>{birthYear}</span>}
                  {birthYear && deathYear && <span> - </span>}
                  {deathYear && <span>{deathYear}</span>}
                </span>
              </div>
            )}

            {/* Bio Excerpt */}
            {memorial.bio && (
              <p className="mt-3 line-clamp-3 text-sm text-neutral-600">
                {memorial.bio}
              </p>
            )}
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}
