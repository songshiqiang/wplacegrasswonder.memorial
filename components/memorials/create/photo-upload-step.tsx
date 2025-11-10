'use client'

/**
 * Photo Upload Step Component
 * 纪念页创建向导 - 步骤 2: 照片上传
 */

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

interface PhotoUploadStepProps {
  memorial: any
  onChange: (data: any) => void
}

export function PhotoUploadStep({ memorial, onChange }: PhotoUploadStepProps) {
  const [previews, setPreviews] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const fileArray = Array.from(files)
    const validFiles = fileArray.filter((file) => {
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        toast.error('只能上传图片文件')
        return false
      }
      // 验证文件大小 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} 超过 5MB 限制`)
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    // 更新 memorial 数据
    const existingPhotos = memorial.photos || []
    const newPhotos = [...existingPhotos, ...validFiles]
    onChange({ ...memorial, photos: newPhotos })

    // 生成预览
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file))
    setPreviews([...previews, ...newPreviews])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...(memorial.photos || [])]
    newPhotos.splice(index, 1)
    onChange({ ...memorial, photos: newPhotos })

    const newPreviews = [...previews]
    URL.revokeObjectURL(newPreviews[index])
    newPreviews.splice(index, 1)
    setPreviews(newPreviews)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-neutral-800">上传照片</h2>
        <p className="mt-2 text-neutral-600">
          分享您与宠物的美好回忆（至少上传 1 张照片）
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`
          relative cursor-pointer rounded-lg border-2 border-dashed p-12 text-center transition-all
          ${
            isDragging
              ? 'border-primary-600 bg-primary-50'
              : 'border-neutral-300 bg-neutral-50 hover:border-primary-400 hover:bg-primary-50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
          <Upload className="h-8 w-8 text-primary-600" />
        </div>

        <h3 className="mt-4 text-lg font-medium text-neutral-800">
          点击上传或拖拽图片到此处
        </h3>
        <p className="mt-2 text-sm text-neutral-600">
          支持 JPG、PNG、WEBP 格式，单个文件不超过 5MB
        </p>
      </div>

      {/* Photo Previews */}
      {previews.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-neutral-800">
            已上传照片 ({previews.length})
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {previews.map((preview, index) => (
              <Card key={index} className="group relative overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={preview}
                    alt={`预览 ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemovePhoto(index)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {previews.length === 0 && (
        <div className="rounded-lg bg-yellow-50 p-4 text-center">
          <ImageIcon className="mx-auto h-8 w-8 text-yellow-600" />
          <p className="mt-2 text-sm text-yellow-800">
            您还没有上传任何照片，请至少上传 1 张照片
          </p>
        </div>
      )}
    </div>
  )
}
