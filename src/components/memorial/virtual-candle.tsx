'use client'

/**
 * Virtual Candle Component
 * 虚拟蜡烛 - 情感化的纪念互动元素
 */

import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { useState } from 'react'

interface VirtualCandleProps {
  isLit?: boolean
  onLight?: () => void
}

export function VirtualCandle({ isLit = false, onLight }: VirtualCandleProps) {
  const [lit, setLit] = useState(isLit)

  const handleClick = () => {
    if (!lit) {
      setLit(true)
      onLight?.()
    }
  }

  return (
    <button
      onClick={handleClick}
      className="group relative flex flex-col items-center gap-2"
      aria-label={lit ? '已点亮蜡烛' : '点亮蜡烛'}
      disabled={lit}
    >
      {/* 火焰 */}
      {lit && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-8"
        >
          <Flame
            className="w-6 h-6 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]"
            fill="currentColor"
          />
        </motion.div>
      )}

      {/* 蜡烛本体 */}
      <motion.div
        className={`
          w-16 h-20 rounded-t-lg relative overflow-hidden
          ${lit
            ? 'bg-gradient-to-b from-amber-100 to-amber-200'
            : 'bg-gradient-to-b from-neutral-100 to-neutral-200'
          }
        `}
        whileHover={!lit ? { scale: 1.05 } : {}}
        whileTap={!lit ? { scale: 0.95 } : {}}
      >
        {/* 蜡烛芯 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-neutral-800" />

        {/* 蜡油效果 */}
        {lit && (
          <motion.div
            className="absolute top-4 left-2 right-2 h-1 bg-amber-300/30 rounded-full"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        )}
      </motion.div>

      {/* 蜡烛底座 */}
      <div className="w-20 h-2 bg-neutral-300 rounded-full" />

      {/* 文字提示 */}
      <span className={`
        text-sm transition-colors
        ${lit
          ? 'text-neutral-600'
          : 'text-primary-600 group-hover:text-primary-700'
        }
      `}>
        {lit ? '已点亮' : '点亮蜡烛'}
      </span>
    </button>
  )
}
