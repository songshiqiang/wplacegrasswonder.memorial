'use client'

/**
 * Photo Gallery Component
 * 纪念页照片画廊，支持轮播和网格查看
 */

import { useState } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Photo {
  id: string
  url: string
  caption?: string | null
  displayOrder: number | null
}

interface PhotoGalleryProps {
  photos: Photo[]
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  if (!photos || photos.length === 0) {
    return (
      <Card className="p-12 text-center">
        <ImageIcon className="mx-auto h-16 w-16 text-neutral-300" />
        <p className="mt-4 text-neutral-600">暂无照片</p>
      </Card>
    )
  }

  // 按照 displayOrder 排序
  const sortedPhotos = [...photos].sort(
    (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
  )

  const handlePrevious = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(
        selectedPhoto > 0 ? selectedPhoto - 1 : sortedPhotos.length - 1
      )
    }
  }

  const handleNext = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(
        selectedPhoto < sortedPhotos.length - 1 ? selectedPhoto + 1 : 0
      )
    }
  }

  return (
    <>
      {/* Grid View */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {sortedPhotos.map((photo, index) => (
          <Card
            key={photo.id}
            className="group relative aspect-square cursor-pointer overflow-hidden transition-all hover:shadow-lg"
            onClick={() => setSelectedPhoto(index)}
          >
            <Image
              src={photo.url}
              alt={photo.caption || `照片 ${index + 1}`}
              fill
              className="object-cover transition-transform group-hover:scale-110"
            />
            {photo.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-xs text-white">{photo.caption}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close Button */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-4 top-4 text-white hover:bg-white/20"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Previous Button */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            {/* Image */}
            <motion.div
              key={selectedPhoto}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[80vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={sortedPhotos[selectedPhoto].url}
                alt={
                  sortedPhotos[selectedPhoto].caption || `照片 ${selectedPhoto + 1}`
                }
                width={1200}
                height={800}
                className="h-auto max-h-[80vh] w-auto object-contain"
              />
              {sortedPhotos[selectedPhoto].caption && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-white/90">
                    {sortedPhotos[selectedPhoto].caption}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Next Button */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2">
              <p className="text-sm text-white">
                {selectedPhoto + 1} / {sortedPhotos.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
