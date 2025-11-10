'use client'

/**
 * Virtual Flower Component
 * 虚拟鲜花 - 情感化的献花互动元素
 */

import { motion } from 'framer-motion'

type FlowerType = 'rose' | 'lily' | 'chrysanthemum' | 'tulip'

interface FlowerInfo {
  emoji: string
  name: string
  meaning: string
  color: string
}

const flowers: Record<FlowerType, FlowerInfo> = {
  rose: {
    emoji: '🌹',
    name: '玫瑰',
    meaning: '永恒的爱',
    color: 'text-red-500',
  },
  lily: {
    emoji: '🌸',
    name: '百合',
    meaning: '纯洁的心',
    color: 'text-pink-400',
  },
  chrysanthemum: {
    emoji: '🌼',
    name: '菊花',
    meaning: '深切怀念',
    color: 'text-yellow-500',
  },
  tulip: {
    emoji: '🌷',
    name: '郁金香',
    meaning: '美好的回忆',
    color: 'text-purple-400',
  },
}

interface VirtualFlowerProps {
  type: FlowerType
  onOffer?: (type: FlowerType) => void
  count?: number
}

export function VirtualFlower({ type, onOffer, count = 0 }: VirtualFlowerProps) {
  const flower = flowers[type]

  const handleClick = () => {
    onOffer?.(type)
  }

  return (
    <motion.button
      onClick={handleClick}
      className="group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-neutral-50 transition-colors"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9, rotate: -5 }}
      aria-label={`献上${flower.name} - ${flower.meaning}`}
    >
      {/* 花朵图标 */}
      <span className={`text-5xl transition-all ${flower.color}`}>
        {flower.emoji}
      </span>

      {/* 花语 */}
      <div className="text-center">
        <p className="text-sm font-medium text-neutral-800">{flower.name}</p>
        <p className="text-xs text-neutral-600">{flower.meaning}</p>
      </div>

      {/* 计数 */}
      {count > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
        >
          {count} 朵
        </motion.div>
      )}
    </motion.button>
  )
}

/**
 * 献花选择器组件
 */
interface FlowerPickerProps {
  onOffer: (type: FlowerType) => void
  counts?: Record<FlowerType, number>
}

export function FlowerPicker({ onOffer, counts }: FlowerPickerProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {(Object.keys(flowers) as FlowerType[]).map((type) => (
        <VirtualFlower
          key={type}
          type={type}
          onOffer={onOffer}
          count={counts?.[type] || 0}
        />
      ))}
    </div>
  )
}
