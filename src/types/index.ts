/**
 * Common TypeScript Types
 *
 * 通用类型定义
 */

// ============================================
// 数据库类型（从 schema 重新导出）
// ============================================

export type {
  User,
  NewUser,
  Memorial,
  NewMemorial,
  Photo,
  NewPhoto,
  Tribute,
  NewTribute,
  Subscription,
  NewSubscription,
  SubscriptionTier,
  Privacy,
  TributeType,
  SubscriptionStatus,
} from '@/db/schema'

// ============================================
// UI 相关类型
// ============================================

/**
 * 通用响应类型
 */
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

/**
 * 分页参数
 */
export interface PaginationParams {
  page: number
  limit: number
  offset?: number
}

/**
 * 分页响应
 */
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

/**
 * 排序参数
 */
export interface SortParams {
  field: string
  order: 'asc' | 'desc'
}

// ============================================
// 表单类型
// ============================================

/**
 * 创建纪念页表单数据
 */
export interface CreateMemorialFormData {
  petName: string
  petBreed?: string
  petSpecies?: string
  birthDate?: string
  deathDate?: string
  bio?: string
  memorialText?: string
  privacy: 'public' | 'private' | 'unlisted'
  photos: File[]
}

/**
 * 留言表单数据
 */
export interface TributeFormData {
  authorName?: string
  authorEmail?: string
  message: string
  tributeType: 'message' | 'candle' | 'flower'
  flowerType?: 'rose' | 'lily' | 'chrysanthemum' | 'tulip'
}

// ============================================
// 扩展类型
// ============================================

/**
 * 带照片的纪念页
 */
export interface MemorialWithPhotos extends Memorial {
  photos: Photo[]
}

/**
 * 带关系的纪念页
 */
export interface MemorialWithRelations extends Memorial {
  photos: Photo[]
  tributes: Tribute[]
  user: Pick<User, 'id' | 'name' | 'avatarUrl'>
}

/**
 * 带作者的留言
 */
export interface TributeWithAuthor extends Tribute {
  author?: Pick<User, 'id' | 'name' | 'avatarUrl'>
}

// ============================================
// 实用工具类型
// ============================================

/**
 * 使字段可选
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 使字段必需
 */
export type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] }

/**
 * ID 类型
 */
export type ID = string

/**
 * 时间戳类型
 */
export type Timestamp = Date | string
