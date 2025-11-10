# Drizzle ORM 集成方案

> 使用 Drizzle ORM 替代 Supabase 客户端进行数据库操作
>
> 日期：2025-11-10

---

## 技术栈更新

### 原方案
- Supabase PostgreSQL + Supabase Client

### 新方案
- **Supabase PostgreSQL** (数据库托管)
- **Drizzle ORM** (数据库操作)
- **Supabase Auth** (用户认证)
- **Supabase Storage** (文件存储)

### 为什么选择 Drizzle？

**优势**:
1. **完全类型安全** - TypeScript first，自动类型推导
2. **性能优秀** - 零成本抽象，接近原生 SQL 性能
3. **轻量级** - 比 Prisma 小很多
4. **灵活** - 可以写原生 SQL，也可以用查询构建器
5. **迁移简单** - 内置迁移工具
6. **与 Supabase 完美配合** - 原生支持 PostgreSQL

---

## 安装和配置

### 1. 安装依赖

```bash
# 安装 Drizzle ORM
npm install drizzle-orm postgres
npm install -D drizzle-kit

# 保留 Supabase 用于 Auth 和 Storage
npm install @supabase/supabase-js @supabase/ssr
```

### 2. 配置 Drizzle

```typescript
// drizzle.config.ts
import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config
```

### 3. 环境变量

```bash
# .env.local

# Supabase (用于 Auth 和 Storage)
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Database (用于 Drizzle)
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

**获取 DATABASE_URL**:
1. 登录 Supabase Dashboard
2. 进入 Project Settings > Database
3. 复制 Connection String (URI)
4. 将 `[YOUR-PASSWORD]` 替换为数据库密码

---

## 数据库 Schema 定义

### Schema 文件结构

```
src/db/
├── schema.ts          # 所有表定义
├── index.ts           # 数据库客户端
└── migrations/        # 迁移文件
```

### 完整 Schema 定义

```typescript
// src/db/schema.ts
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

// 枚举类型
export const subscriptionTierEnum = pgEnum('subscription_tier', [
  'free',
  'personal',
  'lifetime',
])

export const privacyEnum = pgEnum('privacy', ['public', 'private', 'unlisted'])

export const tributeTypeEnum = pgEnum('tribute_type', ['message', 'candle', 'flower'])

export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'active',
  'cancelled',
  'expired',
])

// 用户表
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 100 }),
  avatarUrl: text('avatar_url'),
  subscriptionTier: subscriptionTierEnum('subscription_tier').default('free'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// 纪念页表
export const memorials = pgTable('memorials', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  petName: varchar('pet_name', { length: 100 }).notNull(),
  petBreed: varchar('pet_breed', { length: 100 }),
  petSpecies: varchar('pet_species', { length: 50 }),
  birthDate: date('birth_date'),
  deathDate: date('death_date'),
  bio: text('bio'),
  memorialText: text('memorial_text'),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  privacy: privacyEnum('privacy').default('public'),
  templateId: integer('template_id').default(1),
  viewCount: integer('view_count').default(0),
  candleCount: integer('candle_count').default(0),
  flowerCount: integer('flower_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// 照片表
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

// 留言表
export const tributes = pgTable('tributes', {
  id: uuid('id').primaryKey().defaultRandom(),
  memorialId: uuid('memorial_id')
    .notNull()
    .references(() => memorials.id, { onDelete: 'cascade' }),
  authorName: varchar('author_name', { length: 100 }),
  authorEmail: varchar('author_email', { length: 255 }),
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'set null' }),
  message: text('message').notNull(),
  tributeType: tributeTypeEnum('tribute_type').default('message'),
  flowerType: varchar('flower_type', { length: 50 }),
  isApproved: boolean('is_approved').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// 订阅表
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  plan: varchar('plan', { length: 20 }),
  status: subscriptionStatusEnum('status').default('active'),
  startedAt: timestamp('started_at').defaultNow(),
  expiresAt: timestamp('expires_at'),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// 定义关系
export const usersRelations = relations(users, ({ many }) => ({
  memorials: many(memorials),
  subscriptions: many(subscriptions),
  tributes: many(tributes),
}))

export const memorialsRelations = relations(memorials, ({ one, many }) => ({
  user: one(users, {
    fields: [memorials.userId],
    references: [users.id],
  }),
  photos: many(photos),
  tributes: many(tributes),
}))

export const photosRelations = relations(photos, ({ one }) => ({
  memorial: one(memorials, {
    fields: [photos.memorialId],
    references: [memorials.id],
  }),
}))

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

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}))

// 导出类型
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Memorial = typeof memorials.$inferSelect
export type NewMemorial = typeof memorials.$inferInsert

export type Photo = typeof photos.$inferSelect
export type NewPhoto = typeof photos.$inferInsert

export type Tribute = typeof tributes.$inferSelect
export type NewTribute = typeof tributes.$inferInsert

export type Subscription = typeof subscriptions.$inferSelect
export type NewSubscription = typeof subscriptions.$inferInsert
```

---

## 数据库客户端配置

### 创建 Drizzle 客户端

```typescript
// src/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// 创建连接
const connectionString = process.env.DATABASE_URL!

// 用于查询
const client = postgres(connectionString)

// 创建 Drizzle 实例
export const db = drizzle(client, { schema })

// 导出 schema 供查询使用
export { schema }
```

### Supabase Auth 配置（保持不变）

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.delete({ name, ...options })
        },
      },
    }
  )
}
```

---

## 数据库迁移

### 生成迁移文件

```bash
# 生成迁移
npm run db:generate

# 执行迁移
npm run db:migrate

# 查看数据库
npm run db:studio
```

### package.json 脚本

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  }
}
```

### 初始化数据库

```bash
# 1. 生成迁移文件
npm run db:generate

# 2. 执行迁移
npm run db:push
```

---

## 使用示例

### 查询示例

```typescript
// src/app/(dashboard)/dashboard/page.tsx
import { db } from '@/db'
import { memorials } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  // 1. 从 Supabase Auth 获取用户
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 2. 使用 Drizzle 查询数据库
  const userMemorials = await db
    .select()
    .from(memorials)
    .where(eq(memorials.userId, user.id))
    .orderBy(desc(memorials.createdAt))

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">我的纪念页</h1>

      {userMemorials.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {userMemorials.map((memorial) => (
            <MemorialCard key={memorial.id} memorial={memorial} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}
```

### 创建纪念页示例

```typescript
// src/app/api/memorials/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { memorials } from '@/db/schema'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    // 1. 验证用户
    const supabase = await createServerSupabaseClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. 解析请求数据
    const body = await request.json()

    // 3. 使用 Drizzle 插入数据
    const [memorial] = await db
      .insert(memorials)
      .values({
        userId: user.id,
        petName: body.petName,
        petBreed: body.petBreed,
        petSpecies: body.petSpecies,
        birthDate: body.birthDate,
        deathDate: body.deathDate,
        bio: body.bio,
        memorialText: body.memorialText,
        slug: generateSlug(body.petName, body.petBreed),
        privacy: body.privacy,
      })
      .returning()

    return NextResponse.json(memorial)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

### 关联查询示例

```typescript
// 查询纪念页及其照片
import { db } from '@/db'
import { memorials, photos } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getMemorialWithPhotos(slug: string) {
  const result = await db.query.memorials.findFirst({
    where: eq(memorials.slug, slug),
    with: {
      photos: {
        orderBy: (photos, { asc }) => [asc(photos.displayOrder)],
      },
      user: {
        columns: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
    },
  })

  return result
}
```

### 更新数据示例

```typescript
import { db } from '@/db'
import { memorials } from '@/db/schema'
import { eq } from 'drizzle-orm'

// 增加访问计数
export async function incrementViewCount(memorialId: string) {
  await db
    .update(memorials)
    .set({
      viewCount: sql`${memorials.viewCount} + 1`,
    })
    .where(eq(memorials.id, memorialId))
}
```

---

## Row Level Security (RLS)

### Supabase RLS 策略

虽然使用 Drizzle ORM，但仍需在 Supabase 中配置 RLS 策略以确保数据安全。

```sql
-- 启用 RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE memorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE tributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- 用户表策略
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- 纪念页策略
CREATE POLICY "Public memorials are viewable" ON memorials
  FOR SELECT USING (privacy = 'public');

CREATE POLICY "Users can view own memorials" ON memorials
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own memorials" ON memorials
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own memorials" ON memorials
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own memorials" ON memorials
  FOR DELETE USING (auth.uid() = user_id);

-- 照片策略
CREATE POLICY "Photos viewable if memorial viewable" ON photos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM memorials
      WHERE memorials.id = photos.memorial_id
      AND (memorials.privacy = 'public' OR memorials.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage own memorial photos" ON photos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM memorials
      WHERE memorials.id = photos.memorial_id
      AND memorials.user_id = auth.uid()
    )
  );

-- 留言策略
CREATE POLICY "Approved tributes are viewable" ON tributes
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Memorial owners can view all tributes" ON tributes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM memorials
      WHERE memorials.id = tributes.memorial_id
      AND memorials.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can create tributes" ON tributes
  FOR INSERT WITH CHECK (true);

-- 订阅策略
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);
```

### 在 Drizzle 中使用 RLS

```typescript
// 服务端组件中，Drizzle 会自动应用 RLS 策略
// 前提是使用正确的数据库连接（带有用户 JWT）

import { db } from '@/db'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function getAuthenticatedDb() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 使用带有 JWT 的连接
  // 这样 RLS 策略会自动应用
  return db
}
```

---

## 更新后的项目结构

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── memorials/
│   ├── api/
│   ├── layout.tsx
│   └── page.tsx
├── components/               # React 组件
├── db/                      # 数据库相关 (新增)
│   ├── schema.ts           # Drizzle Schema
│   ├── index.ts            # DB 客户端
│   └── migrations/         # 迁移文件
├── lib/                     # 工具库
│   ├── supabase/           # Supabase 客户端 (Auth & Storage)
│   ├── utils.ts
│   ├── design-tokens.ts
│   └── validations.ts
├── types/                   # TypeScript 类型
└── hooks/                   # React Hooks
```

---

## 迁移步骤

### 从执行计划更新

原执行计划中所有使用 Supabase 客户端查询数据库的代码，都需要改为使用 Drizzle：

**之前（Supabase 客户端）**:
```typescript
const { data, error } = await supabase
  .from('memorials')
  .select('*')
  .eq('user_id', user.id)
```

**之后（Drizzle ORM）**:
```typescript
const memorials = await db
  .select()
  .from(memorials)
  .where(eq(memorials.userId, user.id))
```

### 保留 Supabase 的部分

- ✅ **Supabase Auth** - 用户认证
- ✅ **Supabase Storage** - 文件上传
- ✅ **Supabase Dashboard** - 数据库管理
- ❌ **Supabase Client 数据库查询** - 改用 Drizzle

---

## 开发工作流

1. **定义 Schema** - 在 `src/db/schema.ts` 修改
2. **生成迁移** - `npm run db:generate`
3. **应用迁移** - `npm run db:push`
4. **使用 Drizzle Studio 查看** - `npm run db:studio`
5. **在代码中使用** - 导入 `db` 和 schema

---

## 总结

### 技术栈组合

| 功能 | 技术 | 说明 |
|------|------|------|
| 数据库 | PostgreSQL (Supabase) | 托管的 PostgreSQL |
| ORM | Drizzle | 类型安全的查询 |
| 认证 | Supabase Auth | 邮箱/OAuth 登录 |
| 存储 | Supabase Storage | 图片上传 |
| 前端 | Next.js 16 | React 框架 |
| 样式 | Tailwind CSS 4 | 样式框架 |
| 组件 | Shadcn UI | UI 组件库 |

### 优势总结

1. **类型安全** - Drizzle 提供完整的 TypeScript 支持
2. **性能优秀** - 接近原生 SQL 性能
3. **开发体验好** - 自动补全、类型推导
4. **灵活性高** - 可以写原生 SQL
5. **与 Supabase 完美配合** - 充分利用 PostgreSQL 特性

---

下一步：请确认此方案，我将更新执行计划中的所有代码示例。
