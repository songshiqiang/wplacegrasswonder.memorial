/**
 * Supabase Client (Browser)
 *
 * 用于客户端组件的 Supabase 客户端
 * 主要用于：Auth 和 Storage
 */

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // 确保环境变量存在
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
