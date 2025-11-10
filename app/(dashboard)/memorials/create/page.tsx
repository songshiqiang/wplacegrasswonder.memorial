'use client'

/**
 * Memorial Creation Page
 * 创建纪念页的三步向导
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { StepIndicator } from '@/components/memorials/step-indicator'
import { BasicInfoStep } from '@/components/memorials/create/basic-info-step'
import { PhotoUploadStep } from '@/components/memorials/create/photo-upload-step'
import { StoryStep } from '@/components/memorials/create/story-step'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { generateSlug } from '@/lib/utils/slug'

interface MemorialFormData {
  petName: string
  petBreed?: string
  petSpecies: string
  birthDate?: string
  deathDate?: string
  photos: File[]
  bio?: string
  memorialText?: string
  privacy: 'public' | 'private' | 'unlisted'
}

export default function CreateMemorialPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [memorial, setMemorial] = useState<Partial<MemorialFormData>>({
    privacy: 'public',
    photos: [],
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const steps = [
    { number: 1, name: '基本信息', component: BasicInfoStep },
    { number: 2, name: '照片上传', component: PhotoUploadStep },
    { number: 3, name: '生平故事', component: StoryStep },
  ]

  const CurrentStepComponent = steps[currentStep - 1].component

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!memorial.petName?.trim()) {
        toast.error('请输入宠物名字')
        return false
      }
      if (!memorial.petSpecies) {
        toast.error('请选择宠物种类')
        return false
      }
    }

    if (step === 2) {
      if (!memorial.photos || memorial.photos.length === 0) {
        toast.error('请至少上传 1 张照片')
        return false
      }
    }

    return true
  }

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      return
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return
    }

    setLoading(true)

    try {
      // 1. 获取当前用户
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('请先登录')
      }

      // 2. 生成 slug
      const slug = generateSlug(memorial.petName!, memorial.petBreed)

      // 3. 创建纪念页记录（使用 API route）
      const response = await fetch('/api/memorials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          petName: memorial.petName,
          petBreed: memorial.petBreed || null,
          petSpecies: memorial.petSpecies,
          birthDate: memorial.birthDate || null,
          deathDate: memorial.deathDate || null,
          bio: memorial.bio || null,
          memorialText: memorial.memorialText || null,
          slug,
          privacy: memorial.privacy,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || '创建失败')
      }

      const { memorial: createdMemorial } = await response.json()

      // 4. 上传照片
      if (memorial.photos && memorial.photos.length > 0) {
        for (let i = 0; i < memorial.photos.length; i++) {
          const file = memorial.photos[i]
          const fileExt = file.name.split('.').pop()
          const fileName = `${createdMemorial.id}/${Date.now()}-${i}.${fileExt}`

          // 上传到 Supabase Storage
          const { error: uploadError } = await supabase.storage
            .from('memorial-photos')
            .upload(fileName, file, {
              cacheControl: '3600',
              upsert: false,
            })

          if (uploadError) {
            console.error('Photo upload error:', uploadError)
            // 继续上传其他照片，不中断流程
            continue
          }

          // 获取公开 URL
          const {
            data: { publicUrl },
          } = supabase.storage.from('memorial-photos').getPublicUrl(fileName)

          // 保存照片记录
          await fetch('/api/photos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              memorialId: createdMemorial.id,
              url: publicUrl,
              displayOrder: i,
            }),
          })
        }
      }

      toast.success('纪念页创建成功', {
        description: '已为您的宠物创建永恒的纪念空间',
      })

      // 跳转到纪念页
      router.push(`/memorials/${slug}`)
    } catch (error: any) {
      console.error('Create memorial error:', error)
      toast.error('创建失败', {
        description: error.message || '请稍后重试',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-warm-50 py-12">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-neutral-800">
            创建纪念页
          </h1>
          <p className="mt-2 text-neutral-600">
            为您的宠物建立永恒的纪念空间
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator steps={steps} currentStep={currentStep} />

        {/* Step Content */}
        <Card className="mt-8 p-8 shadow-lg">
          <CurrentStepComponent memorial={memorial} onChange={setMemorial} />

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1 || loading}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              上一步
            </Button>

            {currentStep < 3 ? (
              <Button onClick={handleNext} disabled={loading} className="gap-2">
                下一步
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="gap-2"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? '创建中...' : '创建纪念页'}
              </Button>
            )}
          </div>
        </Card>

        {/* Progress Tips */}
        <div className="mt-6 text-center text-sm text-neutral-600">
          步骤 {currentStep} / {steps.length}
        </div>
      </div>
    </div>
  )
}
