/**
 * Basic Info Step Component
 * 纪念页创建向导 - 步骤 1: 基本信息
 */

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface BasicInfoStepProps {
  memorial: any
  onChange: (data: any) => void
}

export function BasicInfoStep({ memorial, onChange }: BasicInfoStepProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...memorial, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-neutral-800">基本信息</h2>
        <p className="mt-2 text-neutral-600">
          告诉我们关于您宠物的基本信息
        </p>
      </div>

      {/* Pet Name */}
      <div className="space-y-2">
        <Label htmlFor="petName" className="text-base">
          宠物名字 <span className="text-red-500">*</span>
        </Label>
        <Input
          id="petName"
          type="text"
          value={memorial.petName || ''}
          onChange={(e) => handleChange('petName', e.target.value)}
          placeholder="例如：小白、毛球、Lucky"
          required
          className="text-base"
        />
      </div>

      {/* Pet Species */}
      <div className="space-y-2">
        <Label htmlFor="petSpecies" className="text-base">
          宠物种类 <span className="text-red-500">*</span>
        </Label>
        <Select
          value={memorial.petSpecies || ''}
          onValueChange={(value) => handleChange('petSpecies', value)}
        >
          <SelectTrigger id="petSpecies" className="text-base">
            <SelectValue placeholder="请选择宠物种类" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dog">狗狗</SelectItem>
            <SelectItem value="cat">猫咪</SelectItem>
            <SelectItem value="bird">鸟类</SelectItem>
            <SelectItem value="rabbit">兔子</SelectItem>
            <SelectItem value="hamster">仓鼠</SelectItem>
            <SelectItem value="fish">鱼类</SelectItem>
            <SelectItem value="other">其他</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pet Breed */}
      <div className="space-y-2">
        <Label htmlFor="petBreed" className="text-base">
          品种
        </Label>
        <Input
          id="petBreed"
          type="text"
          value={memorial.petBreed || ''}
          onChange={(e) => handleChange('petBreed', e.target.value)}
          placeholder="例如：金毛、英短、虎皮鹦鹉"
          className="text-base"
        />
      </div>

      {/* Birth Date */}
      <div className="space-y-2">
        <Label htmlFor="birthDate" className="text-base">
          出生日期
        </Label>
        <Input
          id="birthDate"
          type="date"
          value={memorial.birthDate || ''}
          onChange={(e) => handleChange('birthDate', e.target.value)}
          className="text-base"
        />
      </div>

      {/* Death Date */}
      <div className="space-y-2">
        <Label htmlFor="deathDate" className="text-base">
          离世日期
        </Label>
        <Input
          id="deathDate"
          type="date"
          value={memorial.deathDate || ''}
          onChange={(e) => handleChange('deathDate', e.target.value)}
          className="text-base"
        />
      </div>

      {/* Privacy */}
      <div className="space-y-2">
        <Label htmlFor="privacy" className="text-base">
          隐私设置 <span className="text-red-500">*</span>
        </Label>
        <Select
          value={memorial.privacy || 'public'}
          onValueChange={(value) => handleChange('privacy', value)}
        >
          <SelectTrigger id="privacy" className="text-base">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">
              <div className="flex flex-col items-start">
                <span className="font-medium">公开</span>
                <span className="text-xs text-neutral-500">
                  任何人都可以搜索和访问
                </span>
              </div>
            </SelectItem>
            <SelectItem value="unlisted">
              <div className="flex flex-col items-start">
                <span className="font-medium">不公开索引</span>
                <span className="text-xs text-neutral-500">
                  仅通过链接访问，不出现在搜索中
                </span>
              </div>
            </SelectItem>
            <SelectItem value="private">
              <div className="flex flex-col items-start">
                <span className="font-medium">私密</span>
                <span className="text-xs text-neutral-500">
                  仅您本人可以访问
                </span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
