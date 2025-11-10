/**
 * Database Schema
 *
 * 使用 Drizzle ORM 定义数据库表结构
 * 核心表：users, memorials, photos, tributes, subscriptions
 */

import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  date,
  pgEnum,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// ============================================
// 枚举类型定义
// ============================================

/**
 * 订阅等级
 * - free: 免费版
 * - personal: 个人版 ($9.99/月)
 * - lifetime: 永久版 ($199 一次性)
 */
export const subscriptionTierEnum = pgEnum('subscription_tier', [
  'free',
  'personal',
  'lifetime',
])

/**
 * 隐私设置
 * - public: 公开（搜索引擎可见）
 * - private: 私密（仅自己可见）
 * - unlisted: 链接可见（知道链接的人可见）
 */
export const privacyEnum = pgEnum('privacy', ['public', 'private', 'unlisted'])

/**
 * 留言类型
 * - message: 文字留言
 * - candle: 点亮蜡烛
 * - flower: 献花
 */
export const tributeTypeEnum = pgEnum('tribute_type', [
  'message',
  'candle',
  'flower',
])

/**
 * 订阅状态
 * - active: 激活中
 * - cancelled: 已取消
 * - expired: 已过期
 */
export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'active',
  'cancelled',
  'expired',
])

// ============================================
// 表定义
// ============================================

/**
 * 用户表
 * 存储用户基本信息和订阅状态
 */
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 100 }),
  avatarUrl: text('avatar_url'),
  subscriptionTier: subscriptionTierEnum('subscription_tier').default('free'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

/**
 * 纪念页表
 * 存储宠物纪念页的核心信息
 */
export const memorials = pgTable('memorials', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  petName: varchar('pet_name', { length: 100 }).notNull(),
  petBreed: varchar('pet_breed', { length: 100 }),
  petSpecies: varchar('pet_species', { length: 50 }), // dog/cat/bird/other
  birthDate: date('birth_date'),
  deathDate: date('death_date'),
  bio: text('bio'), // 生平故事
  memorialText: text('memorial_text'), // 纪念文
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  privacy: privacyEnum('privacy').default('public'),
  templateId: integer('template_id').default(1),
  viewCount: integer('view_count').default(0),
  candleCount: integer('candle_count').default(0),
  flowerCount: integer('flower_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

/**
 * 照片表
 * 存储纪念页的照片
 */
export const photos = pgTable('photos', {
  id: uuid('id').primaryKey().defaultRandom(),
  memorialId: uuid('memorial_id')
    .notNull()
    .references(() => memorials.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  caption: text('caption'),
  displayOrder: integer('display_order').default(0),
  uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
})

/**
 * 留言表
 * 存储访客的留言、蜡烛和鲜花
 */
export const tributes = pgTable('tributes', {
  id: uuid('id').primaryKey().defaultRandom(),
  memorialId: uuid('memorial_id')
    .notNull()
    .references(() => memorials.id, { onDelete: 'cascade' }),
  authorName: varchar('author_name', { length: 100 }),
  authorEmail: varchar('author_email', { length: 255 }),
  authorId: uuid('author_id').references(() => users.id, {
    onDelete: 'set null',
  }), // 如果是注册用户
  message: text('message').notNull(),
  tributeType: tributeTypeEnum('tribute_type').default('message'),
  flowerType: varchar('flower_type', { length: 50 }), // rose/lily/chrysanthemum/tulip
  isApproved: boolean('is_approved').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

/**
 * 订阅表
 * 存储用户的付费订阅信息
 */
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  plan: varchar('plan', { length: 20 }), // personal/lifetime
  status: subscriptionStatusEnum('status').default('active'),
  startedAt: timestamp('started_at').defaultNow(),
  expiresAt: timestamp('expires_at'),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ============================================
// 关系定义
// ============================================

/**
 * 用户关系
 */
export const usersRelations = relations(users, ({ many }) => ({
  memorials: many(memorials),
  subscriptions: many(subscriptions),
  tributes: many(tributes),
}))

/**
 * 纪念页关系
 */
export const memorialsRelations = relations(memorials, ({ one, many }) => ({
  user: one(users, {
    fields: [memorials.userId],
    references: [users.id],
  }),
  photos: many(photos),
  tributes: many(tributes),
}))

/**
 * 照片关系
 */
export const photosRelations = relations(photos, ({ one }) => ({
  memorial: one(memorials, {
    fields: [photos.memorialId],
    references: [memorials.id],
  }),
}))

/**
 * 留言关系
 */
export const tributesRelations = relations(tributes, ({ one }) => ({
  memorial: one(memorials, {
    fields: [tributes.memorialId],
    references: [memorials.id],
  }),
  author: one(users, {
    fields: [tributes.authorId],
    references: [users.id],
  }),
}))

/**
 * 订阅关系
 */
export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}))

// ============================================
// 类型导出
// ============================================

// 查询类型（从数据库读取）
export type User = typeof users.$inferSelect
export type Memorial = typeof memorials.$inferSelect
export type Photo = typeof photos.$inferSelect
export type Tribute = typeof tributes.$inferSelect
export type Subscription = typeof subscriptions.$inferSelect

// 插入类型（写入数据库）
export type NewUser = typeof users.$inferInsert
export type NewMemorial = typeof memorials.$inferInsert
export type NewPhoto = typeof photos.$inferInsert
export type NewTribute = typeof tributes.$inferInsert
export type NewSubscription = typeof subscriptions.$inferInsert

// 枚举类型导出
export type SubscriptionTier = (typeof subscriptionTierEnum.enumValues)[number]
export type Privacy = (typeof privacyEnum.enumValues)[number]
export type TributeType = (typeof tributeTypeEnum.enumValues)[number]
export type SubscriptionStatus = (typeof subscriptionStatusEnum.enumValues)[number]
