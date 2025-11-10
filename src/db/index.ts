/**
 * Drizzle ORM Database Client
 *
 * 连接到 Supabase PostgreSQL 数据库
 */

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// 确保环境变量存在
if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL is not defined. Please add it to your .env.local file.'
  )
}

// 创建 PostgreSQL 连接
const connectionString = process.env.DATABASE_URL

// 配置连接选项
const client = postgres(connectionString, {
  prepare: false, // Supabase 需要禁用 prepared statements
})

// 创建 Drizzle 实例
export const db = drizzle(client, { schema })

// 导出 schema 供查询使用
export { schema }

// 导出类型
export type * from './schema'
