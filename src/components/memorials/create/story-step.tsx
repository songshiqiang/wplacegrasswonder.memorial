/**
 * Story Step Component
 * 纪念页创建向导 - 步骤 3: 生平故事
 */

import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Lightbulb } from 'lucide-react'
import { useState } from 'react'

interface StoryStepProps {
  memorial: any
  onChange: (data: any) => void
}

const bioTemplates = [
  '它是我生命中最温暖的陪伴，给我带来了无数快乐的时光...',
  '从第一天见到它，我就知道这将是一段特别的缘分...',
  '它不仅是我的宠物，更是我最好的朋友和家人...',
]

const memorialTemplates = [
  '愿你在彩虹桥的那一边，自由奔跑，没有痛苦，只有快乐。',
  '谢谢你陪伴我走过这段美好的时光，你永远在我心中。',
  '我们的相遇是上天最好的安排，期待在彩虹桥重逢。',
]

export function StoryStep({ memorial, onChange }: StoryStepProps) {
  const [showBioTemplates, setShowBioTemplates] = useState(false)
  const [showMemorialTemplates, setShowMemorialTemplates] = useState(false)

  const handleChange = (field: string, value: any) => {
    onChange({ ...memorial, [field]: value })
  }

  const applyBioTemplate = (template: string) => {
    handleChange('bio', template)
    setShowBioTemplates(false)
  }

  const applyMemorialTemplate = (template: string) => {
    handleChange('memorialText', template)
    setShowMemorialTemplates(false)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-neutral-800">生平故事</h2>
        <p className="mt-2 text-neutral-600">
          记录您与宠物的美好回忆和想说的话
        </p>
      </div>

      {/* Bio / Life Story */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="bio" className="text-base">
            生平故事
          </Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowBioTemplates(!showBioTemplates)}
            className="gap-1 text-xs"
          >
            <Lightbulb className="h-3 w-3" />
            写作提示
          </Button>
        </div>

        {showBioTemplates && (
          <div className="rounded-lg border border-primary-200 bg-primary-50 p-4 space-y-2">
            <p className="text-xs font-medium text-neutral-700">
              点击使用模板：
            </p>
            {bioTemplates.map((template, index) => (
              <button
                key={index}
                type="button"
                onClick={() => applyBioTemplate(template)}
                className="block w-full rounded bg-white p-2 text-left text-sm text-neutral-700 hover:bg-primary-100 transition-colors"
              >
                {template}
              </button>
            ))}
          </div>
        )}

        <Textarea
          id="bio"
          value={memorial.bio || ''}
          onChange={(e) => handleChange('bio', e.target.value)}
          placeholder="分享您与宠物相处的美好时光、它的性格特点、难忘的回忆..."
          rows={8}
          className="resize-none text-base"
        />
        <p className="text-xs text-neutral-500">
          描述宠物的性格、习惯、与您相处的美好时光等
        </p>
      </div>

      {/* Memorial Text */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="memorialText" className="text-base">
            纪念文
          </Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowMemorialTemplates(!showMemorialTemplates)}
            className="gap-1 text-xs"
          >
            <Lightbulb className="h-3 w-3" />
            写作提示
          </Button>
        </div>

        {showMemorialTemplates && (
          <div className="rounded-lg border border-primary-200 bg-primary-50 p-4 space-y-2">
            <p className="text-xs font-medium text-neutral-700">
              点击使用模板：
            </p>
            {memorialTemplates.map((template, index) => (
              <button
                key={index}
                type="button"
                onClick={() => applyMemorialTemplate(template)}
                className="block w-full rounded bg-white p-2 text-left text-sm text-neutral-700 hover:bg-primary-100 transition-colors"
              >
                {template}
              </button>
            ))}
          </div>
        )}

        <Textarea
          id="memorialText"
          value={memorial.memorialText || ''}
          onChange={(e) => handleChange('memorialText', e.target.value)}
          placeholder="写下您想对宠物说的话，或者一段纪念的文字..."
          rows={6}
          className="resize-none text-base"
        />
        <p className="text-xs text-neutral-500">
          一段特别的话语，表达您对宠物的思念与祝福
        </p>
      </div>

      {/* Tips */}
      <div className="rounded-lg bg-blue-50 p-4">
        <div className="flex gap-2">
          <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">写作建议：</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>分享第一次见面的场景</li>
              <li>描述它独特的性格和习惯</li>
              <li>回忆一起度过的难忘时刻</li>
              <li>表达您的感谢和祝福</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
