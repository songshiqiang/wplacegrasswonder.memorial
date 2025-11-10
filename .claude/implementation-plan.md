# wplacegrasswonder.memorial Web 实施计划

> 基于 plan.md 的分阶段详细执行方案
>
> 生成日期：2025-11-10

---

## 目录

- [项目概述](#项目概览)
- [当前状态分析](#当前状态分析)
- [阶段划分总览](#阶段划分总览)
- [阶段 1: 基础设施搭建](#阶段-1-基础设施搭建)
- [阶段 2: 用户系统](#阶段-2-用户系统)
- [阶段 3: 纪念页核心功能](#阶段-3-纪念页核心功能)
- [阶段 4: 彩虹桥故事墙](#阶段-4-彩虹桥故事墙)
- [阶段 5: 内容管理与优化](#阶段-5-内容管理与优化)
- [每个阶段的检查清单](#检查清单)

---

## 项目概览

**项目名称**: wplacegrasswonder.memorial
**项目类型**: 宠物纪念网站平台
**技术栈**: Next.js 16 + TypeScript + Tailwind CSS + Supabase
**目标**: 为失去宠物的主人提供温暖、尊重、永久的纪念空间

**核心价值**:
- 情感化设计 - 共情至上
- 专业的纪念平台 - 比社交媒体更有针对性
- 社区支持 - 渐进式构建

---

## 当前状态分析

**已完成**:
- ✅ Next.js 16 项目初始化
- ✅ TypeScript 配置
- ✅ Tailwind CSS 4.0 配置
- ✅ 基础项目结构
- ✅ Git 仓库和分支设置

**待完成**:
- ❌ 数据库设计与配置
- ❌ 认证系统
- ❌ UI 组件库
- ❌ 核心功能开发
- ❌ SEO 优化

**技术债务/注意事项**:
- 需要配置 Supabase 后端服务
- 需要设计情感化的 UI/UX 系统
- 需要考虑媒体文件存储方案

---

## 阶段划分总览

```
阶段 1: 基础设施搭建 (3-5 天)
  ├── 设计系统定义
  ├── Supabase 配置
  ├── 数据库 Schema
  └── UI 组件库搭建

阶段 2: 用户系统 (5-7 天)
  ├── 认证功能
  ├── 用户 Dashboard
  └── 账户管理

阶段 3: 纪念页核心功能 (10-14 天)
  ├── 纪念页创建流程
  ├── 照片上传
  ├── 纪念页展示
  ├── 虚拟悼念互动
  └── 留言功能

阶段 4: 彩虹桥故事墙 (5-7 天)
  ├── 首页设计
  ├── 瀑布流布局
  ├── 排序过滤
  └── 无限滚动

阶段 5: 内容管理与优化 (5-7 天)
  ├── SEO 优化
  ├── 性能优化
  ├── 内容审核
  └── 测试部署
```

**总预计时间**: 28-40 天 (约 6-8 周)

---

## 阶段 1: 基础设施搭建

**目标**: 建立项目基础架构，定义设计系统，配置后端服务

**时间估算**: 3-5 天

### 1.1 设计系统定义

#### 任务清单

**色彩系统定义**:
```typescript
// src/lib/design-tokens.ts
export const colors = {
  // 主色调 - 温暖柔和
  primary: {
    50: '#E3F2FD',   // 浅蓝 - 平静
    100: '#F3E5F5',  // 淡紫 - 温柔
    200: '#FCE4EC',  // 柔粉 - 温暖
    300: '#FFF3E0',  // 米白 - 纯净
  },
  // 中性色
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    800: '#333333',  // 深灰（避免纯黑）
    900: '#1A1A1A',
  },
  // 功能色
  success: '#81C784',
  warning: '#FFB74D',
  error: '#E57373',   // 柔和的红色（非刺眼）
}
```

**字体系统**:
```typescript
export const typography = {
  fonts: {
    sans: 'Inter, system-ui, sans-serif',
    display: 'Inter, sans-serif',
  },
  sizes: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    base: '1.125rem', // 18px (基准 - 易读)
    lg: '1.25rem',   // 20px
    xl: '1.5rem',    // 24px
    '2xl': '2rem',   // 32px
    '3xl': '2.5rem', // 40px
  },
  lineHeight: {
    tight: '1.4',
    normal: '1.6',  // 默认
    relaxed: '1.8', // 易读
  }
}
```

**间距系统**:
```typescript
export const spacing = {
  xs: '0.5rem',   // 8px
  sm: '1rem',     // 16px
  md: '1.5rem',   // 24px
  lg: '2rem',     // 32px
  xl: '3rem',     // 48px
  '2xl': '4rem',  // 64px
}

export const borderRadius = {
  sm: '0.5rem',   // 8px
  md: '0.75rem',  // 12px - 默认柔和感
  lg: '1rem',     // 16px
  full: '9999px',
}
```

**产出文件**:
- [ ] `src/lib/design-tokens.ts` - 设计 Token
- [ ] `tailwind.config.ts` - 更新配置使用自定义 Token
- [ ] `.claude/design-system.md` - 设计系统文档

---

### 1.2 Supabase 配置

#### 任务清单

**Supabase 项目设置**:
- [ ] 在 Supabase 创建新项目
- [ ] 获取项目 URL 和 anon key
- [ ] 配置环境变量

**环境变量配置**:
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Supabase 客户端配置**:
- [ ] 安装依赖: `npm install @supabase/supabase-js @supabase/ssr`
- [ ] 创建 Supabase 客户端工具文件

**产出文件**:
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
      },
    }
  )
}
```

---

### 1.3 数据库 Schema 设计

#### 数据库表结构

**核心表设计**:

```sql
-- 用户表
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  avatar_url TEXT,
  subscription_tier VARCHAR(20) DEFAULT 'free', -- free/personal/lifetime
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用 RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 用户只能读取自己的数据
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- 纪念页表
CREATE TABLE memorials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  pet_name VARCHAR(100) NOT NULL,
  pet_breed VARCHAR(100),
  pet_species VARCHAR(50), -- dog/cat/bird/other
  birth_date DATE,
  death_date DATE,
  bio TEXT, -- 生平故事
  memorial_text TEXT, -- 纪念文
  slug VARCHAR(255) UNIQUE, -- URL slug
  privacy VARCHAR(20) DEFAULT 'public', -- public/private/unlisted
  template_id INT DEFAULT 1,
  view_count INT DEFAULT 0,
  candle_count INT DEFAULT 0,
  flower_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE memorials ENABLE ROW LEVEL SECURITY;

-- 公开纪念页任何人可见
CREATE POLICY "Public memorials are viewable by everyone" ON memorials
  FOR SELECT USING (privacy = 'public');

-- 私密纪念页仅创建者可见
CREATE POLICY "Users can view own memorials" ON memorials
  FOR SELECT USING (auth.uid() = user_id);

-- 用户可以创建、更新、删除自己的纪念页
CREATE POLICY "Users can insert own memorials" ON memorials
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own memorials" ON memorials
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own memorials" ON memorials
  FOR DELETE USING (auth.uid() = user_id);

-- 照片表
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  memorial_id UUID REFERENCES memorials(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  display_order INT DEFAULT 0,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- 照片随纪念页权限
CREATE POLICY "Photos are viewable if memorial is viewable" ON photos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM memorials
      WHERE memorials.id = photos.memorial_id
      AND (memorials.privacy = 'public' OR memorials.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage photos in own memorials" ON photos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM memorials
      WHERE memorials.id = photos.memorial_id
      AND memorials.user_id = auth.uid()
    )
  );

-- 留言表
CREATE TABLE tributes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  memorial_id UUID REFERENCES memorials(id) ON DELETE CASCADE,
  author_name VARCHAR(100),
  author_email VARCHAR(255),
  author_id UUID REFERENCES users(id) ON DELETE SET NULL, -- 如果是注册用户
  message TEXT NOT NULL,
  tribute_type VARCHAR(20) DEFAULT 'message', -- message/candle/flower
  flower_type VARCHAR(50), -- rose/lily/chrysanthemum/tulip
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE tributes ENABLE ROW LEVEL SECURITY;

-- 已批准的留言任何人可见
CREATE POLICY "Approved tributes are viewable by everyone" ON tributes
  FOR SELECT USING (is_approved = true);

-- 纪念页创建者可以查看所有留言（包括待审核）
CREATE POLICY "Memorial owners can view all tributes" ON tributes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM memorials
      WHERE memorials.id = tributes.memorial_id
      AND memorials.user_id = auth.uid()
    )
  );

-- 任何人可以创建留言（但默认未批准）
CREATE POLICY "Anyone can create tributes" ON tributes
  FOR INSERT WITH CHECK (true);

-- 订阅表
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan VARCHAR(20), -- personal/lifetime
  status VARCHAR(20) DEFAULT 'active', -- active/cancelled/expired
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  stripe_subscription_id VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- 创建索引提高查询性能
CREATE INDEX idx_memorials_user_id ON memorials(user_id);
CREATE INDEX idx_memorials_slug ON memorials(slug);
CREATE INDEX idx_memorials_privacy ON memorials(privacy);
CREATE INDEX idx_memorials_created_at ON memorials(created_at DESC);
CREATE INDEX idx_photos_memorial_id ON photos(memorial_id);
CREATE INDEX idx_tributes_memorial_id ON tributes(memorial_id);
CREATE INDEX idx_tributes_is_approved ON tributes(is_approved);

-- 自动更新 updated_at 的触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_memorials_updated_at BEFORE UPDATE ON memorials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

**任务清单**:
- [ ] 在 Supabase SQL Editor 中执行 Schema
- [ ] 验证表创建成功
- [ ] 验证 RLS 策略生效
- [ ] 测试基本的 CRUD 操作

**产出文件**:
- [ ] `.claude/database-schema.sql` - 完整的数据库 Schema
- [ ] `.claude/database-documentation.md` - 数据库文档

---

### 1.4 UI 组件库搭建

#### 安装 Shadcn UI

```bash
npx shadcn@latest init
```

**配置选项**:
- Style: Default
- Base color: Slate
- CSS variables: Yes

#### 安装核心组件

```bash
# 安装常用组件
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add avatar
npx shadcn@latest add tabs
npx shadcn@latest add toast
npx shadcn@latest add form
npx shadcn@latest add skeleton
```

#### 安装动画库

```bash
npm install framer-motion
```

#### 自定义组件

**创建情感化组件**:

```typescript
// src/components/ui/candle.tsx
'use client'

import { motion } from 'framer-motion'

export function VirtualCandle({ onLight }: { onLight: () => void }) {
  return (
    <button
      onClick={onLight}
      className="relative group"
      aria-label="点亮蜡烛"
    >
      <motion.div
        className="w-16 h-20 bg-amber-100 rounded-t-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-8 bg-gradient-to-t from-amber-400 via-orange-400 to-yellow-300 rounded-full blur-sm" />
        </motion.div>
      </motion.div>
    </button>
  )
}

// src/components/ui/flower.tsx
'use client'

import { motion } from 'framer-motion'

type FlowerType = 'rose' | 'lily' | 'chrysanthemum' | 'tulip'

const flowerEmojis: Record<FlowerType, string> = {
  rose: '🌹',
  lily: '🌸',
  chrysanthemum: '🌼',
  tulip: '🌷',
}

export function VirtualFlower({
  type,
  onOffer
}: {
  type: FlowerType
  onOffer: (type: FlowerType) => void
}) {
  return (
    <motion.button
      onClick={() => onOffer(type)}
      className="text-4xl"
      whileHover={{ scale: 1.2, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`献上${type}`}
    >
      {flowerEmojis[type]}
    </motion.button>
  )
}
```

**任务清单**:
- [ ] 配置 Shadcn UI
- [ ] 安装核心组件
- [ ] 创建自定义情感化组件
- [ ] 创建布局组件（Header, Footer, Container）
- [ ] 创建加载状态组件

**产出文件**:
- [ ] `src/components/ui/*` - UI 组件库
- [ ] `src/components/layout/*` - 布局组件
- [ ] `.claude/component-library.md` - 组件使用文档

---

### 1.5 项目结构优化

#### 创建推荐的目录结构

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # 认证相关路由组
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── (dashboard)/         # Dashboard 路由组
│   │   ├── dashboard/
│   │   └── layout.tsx
│   ├── memorials/           # 纪念页路由
│   │   └── [slug]/
│   ├── api/                 # API 路由
│   │   ├── auth/
│   │   └── memorials/
│   ├── layout.tsx
│   └── page.tsx
├── components/              # React 组件
│   ├── ui/                 # UI 组件（Shadcn）
│   ├── layout/             # 布局组件
│   ├── memorials/          # 纪念页相关组件
│   └── auth/               # 认证相关组件
├── lib/                     # 工具库
│   ├── supabase/           # Supabase 客户端
│   ├── utils.ts            # 工具函数
│   ├── design-tokens.ts    # 设计 Token
│   └── validations.ts      # 数据验证
├── types/                   # TypeScript 类型定义
│   ├── database.ts         # 数据库类型
│   └── index.ts            # 通用类型
└── hooks/                   # 自定义 React Hooks
    ├── use-auth.ts
    └── use-memorial.ts
```

**任务清单**:
- [ ] 创建目录结构
- [ ] 创建类型定义文件
- [ ] 创建工具函数文件
- [ ] 更新 tsconfig.json 的 path 别名

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/hooks/*": ["./src/hooks/*"]
    }
  }
}
```

---

### 阶段 1 验收标准

**完成标准**:
- ✅ 设计系统文档完整，色彩/字体/间距已定义
- ✅ Supabase 项目配置完成，可以连接数据库
- ✅ 数据库 Schema 创建成功，RLS 策略生效
- ✅ UI 组件库安装完成，自定义组件可用
- ✅ 项目结构清晰，类型定义完整

**产出文件清单**:
- [ ] `.claude/design-system.md`
- [ ] `.claude/database-schema.sql`
- [ ] `.claude/database-documentation.md`
- [ ] `.claude/component-library.md`
- [ ] `src/lib/design-tokens.ts`
- [ ] `src/lib/supabase/client.ts`
- [ ] `src/lib/supabase/server.ts`
- [ ] `src/types/database.ts`

**Git Commit**:
```bash
git add .
git commit -m "feat: complete phase 1 - infrastructure setup

- Define design system with emotional color palette
- Configure Supabase backend
- Create database schema with RLS policies
- Set up Shadcn UI component library
- Establish project structure"
```

---

## 阶段 2: 用户系统

**目标**: 实现用户注册、登录、Dashboard 和账户管理功能

**时间估算**: 5-7 天

### 2.1 认证系统

#### 2.1.1 Supabase Auth 配置

**配置 Supabase Auth**:
- [ ] 在 Supabase Dashboard 启用 Email Provider
- [ ] 配置邮件模板（注册确认、密码重置）
- [ ] 启用 Google OAuth（可选）
- [ ] 配置重定向 URLs

**环境变量**:
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

#### 2.1.2 认证页面实现

**注册页面**:

```typescript
// src/app/(auth)/register/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      toast({
        title: '注册成功',
        description: '请检查您的邮箱以验证账户',
      })

      router.push('/login')
    } catch (error) {
      toast({
        title: '注册失败',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-neutral-800">
            创建账户
          </h1>
          <p className="mt-2 text-neutral-600">
            为您的宠物建立永恒的纪念空间
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <Label htmlFor="name">姓名</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? '注册中...' : '注册'}
          </Button>
        </form>

        <p className="text-center text-sm text-neutral-600">
          已有账户？{' '}
          <a href="/login" className="text-primary-600 hover:underline">
            立即登录
          </a>
        </p>
      </div>
    </div>
  )
}
```

**登录页面**:

```typescript
// src/app/(auth)/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      toast({
        title: '登录失败',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      toast({
        title: '登录失败',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-neutral-800">
            欢迎回来
          </h1>
          <p className="mt-2 text-neutral-600">
            登录访问您的纪念空间
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm text-primary-600 hover:underline"
            >
              忘记密码？
            </a>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? '登录中...' : '登录'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-neutral-600">或</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
        >
          使用 Google 登录
        </Button>

        <p className="text-center text-sm text-neutral-600">
          还没有账户？{' '}
          <a href="/register" className="text-primary-600 hover:underline">
            立即注册
          </a>
        </p>
      </div>
    </div>
  )
}
```

**Auth Callback 处理**:

```typescript
// src/app/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
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

    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
}
```

**任务清单**:
- [ ] 配置 Supabase Auth
- [ ] 实现注册页面
- [ ] 实现登录页面
- [ ] 实现 Google OAuth（可选）
- [ ] 实现密码重置页面
- [ ] 实现 Auth Callback 处理
- [ ] 创建受保护路由中间件

---

### 2.2 用户 Dashboard

#### 2.2.1 Dashboard 布局

```typescript
// src/app/(dashboard)/layout.tsx
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { DashboardNav } from '@/components/dashboard/nav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <DashboardNav user={user} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
```

#### 2.2.2 Dashboard 主页

```typescript
// src/app/(dashboard)/dashboard/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { MemorialCard } from '@/components/memorials/memorial-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: memorials } = await supabase
    .from('memorials')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-800">
            我的纪念页
          </h1>
          <p className="mt-2 text-neutral-600">
            管理您为宠物创建的纪念空间
          </p>
        </div>
        <Link href="/memorials/create">
          <Button size="lg">
            创建纪念页
          </Button>
        </Link>
      </div>

      {memorials && memorials.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {memorials.map((memorial) => (
            <MemorialCard key={memorial.id} memorial={memorial} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border-2 border-dashed border-neutral-300 p-12 text-center">
          <h3 className="text-lg font-medium text-neutral-800">
            还没有纪念页
          </h3>
          <p className="mt-2 text-neutral-600">
            为您的宠物创建第一个纪念空间
          </p>
          <Link href="/memorials/create">
            <Button className="mt-4">
              开始创建
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
```

**任务清单**:
- [ ] 创建 Dashboard 布局
- [ ] 创建 Dashboard 导航组件
- [ ] 实现 Dashboard 主页
- [ ] 创建纪念页卡片组件
- [ ] 实现账户设置页面

---

### 阶段 2 验收标准

**完成标准**:
- ✅ 用户可以注册并收到验证邮件
- ✅ 用户可以登录和登出
- ✅ Google OAuth 登录可用（可选）
- ✅ Dashboard 可以显示用户的纪念页列表
- ✅ 受保护路由正常工作

**测试清单**:
- [ ] 测试注册流程
- [ ] 测试登录流程
- [ ] 测试密码重置
- [ ] 测试受保护路由重定向
- [ ] 测试 Dashboard 数据加载

**Git Commit**:
```bash
git add .
git commit -m "feat: complete phase 2 - user authentication system

- Implement email registration and login
- Add Google OAuth integration
- Create user dashboard with memorial list
- Set up protected routes with middleware
- Add account management pages"
```

---

## 阶段 3: 纪念页核心功能

**目标**: 实现纪念页创建、展示、照片上传、虚拟悼念和留言功能

**时间估算**: 10-14 天

### 3.1 纪念页创建流程

#### 3.1.1 三步向导设计

**步骤 1: 基本信息**
- 宠物名字
- 品种
- 物种（狗/猫/鸟/其他）
- 生日和离世日期

**步骤 2: 照片上传**
- 拖拽上传
- 多选上传
- 照片预览和排序
- 最少 1 张照片

**步骤 3: 生平故事**
- 富文本编辑器
- 生平故事
- 纪念文
- 提供写作模板

#### 3.1.2 实现代码

```typescript
// src/app/memorials/create/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { StepIndicator } from '@/components/memorials/step-indicator'
import { BasicInfoStep } from '@/components/memorials/create/basic-info-step'
import { PhotoUploadStep } from '@/components/memorials/create/photo-upload-step'
import { StoryStep } from '@/components/memorials/create/story-step'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

type Memorial = {
  petName: string
  petBreed: string
  petSpecies: string
  birthDate: string
  deathDate: string
  photos: File[]
  bio: string
  memorialText: string
  privacy: 'public' | 'private' | 'unlisted'
}

export default function CreateMemorialPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [memorial, setMemorial] = useState<Partial<Memorial>>({
    privacy: 'public',
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const steps = [
    { number: 1, name: '基本信息', component: BasicInfoStep },
    { number: 2, name: '照片上传', component: PhotoUploadStep },
    { number: 3, name: '生平故事', component: StoryStep },
  ]

  const CurrentStepComponent = steps[currentStep - 1].component

  const handleNext = () => {
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
    setLoading(true)

    try {
      // 1. 生成 slug
      const slug = generateSlug(memorial.petName!, memorial.petBreed!)

      // 2. 创建纪念页记录
      const { data: memorialData, error: memorialError } = await supabase
        .from('memorials')
        .insert({
          pet_name: memorial.petName,
          pet_breed: memorial.petBreed,
          pet_species: memorial.petSpecies,
          birth_date: memorial.birthDate,
          death_date: memorial.deathDate,
          bio: memorial.bio,
          memorial_text: memorial.memorialText,
          slug,
          privacy: memorial.privacy,
        })
        .select()
        .single()

      if (memorialError) throw memorialError

      // 3. 上传照片
      if (memorial.photos && memorial.photos.length > 0) {
        for (let i = 0; i < memorial.photos.length; i++) {
          const file = memorial.photos[i]
          const fileExt = file.name.split('.').pop()
          const fileName = `${memorialData.id}/${Date.now()}-${i}.${fileExt}`

          // 上传到 Supabase Storage
          const { error: uploadError } = await supabase.storage
            .from('memorial-photos')
            .upload(fileName, file)

          if (uploadError) throw uploadError

          // 获取公开 URL
          const { data: urlData } = supabase.storage
            .from('memorial-photos')
            .getPublicUrl(fileName)

          // 保存照片记录
          await supabase.from('photos').insert({
            memorial_id: memorialData.id,
            url: urlData.publicUrl,
            display_order: i,
          })
        }
      }

      toast({
        title: '纪念页创建成功',
        description: '您已为宠物创建了永恒的纪念空间',
      })

      router.push(`/memorials/${slug}`)
    } catch (error) {
      toast({
        title: '创建失败',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary-50 py-12">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-neutral-800">
            创建纪念页
          </h1>
          <p className="mt-2 text-neutral-600">
            为您的宠物建立永恒的纪念空间
          </p>
        </div>

        <StepIndicator steps={steps} currentStep={currentStep} />

        <div className="mt-8 rounded-lg bg-white p-8 shadow-lg">
          <CurrentStepComponent
            memorial={memorial}
            onChange={setMemorial}
          />

          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              上一步
            </Button>

            {currentStep < 3 ? (
              <Button onClick={handleNext}>
                下一步
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? '创建中...' : '创建纪念页'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function generateSlug(petName: string, petBreed: string): string {
  const date = new Date().getFullYear()
  const slug = `${petName}-${petBreed}-${date}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return slug
}
```

**各步骤组件实现省略（太长），文档中会列出完整的代码**

**任务清单**:
- [ ] 实现步骤指示器组件
- [ ] 实现基本信息表单
- [ ] 实现照片上传组件（支持拖拽）
- [ ] 实现富文本编辑器
- [ ] 实现 Slug 生成逻辑
- [ ] 配置 Supabase Storage
- [ ] 实现照片上传到 Storage
- [ ] 添加表单验证

---

### 3.2 纪念页展示

#### 3.2.1 纪念页布局设计

```typescript
// src/app/memorials/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { PhotoGallery } from '@/components/memorials/photo-gallery'
import { VirtualTribute } from '@/components/memorials/virtual-tribute'
import { TributeList } from '@/components/memorials/tribute-list'
import { TributeForm } from '@/components/memorials/tribute-form'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = await createServerSupabaseClient()

  const { data: memorial } = await supabase
    .from('memorials')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!memorial) return {}

  return {
    title: `${memorial.pet_name} (${memorial.pet_breed}) 的纪念页`,
    description: memorial.bio?.slice(0, 160),
    openGraph: {
      title: `纪念 ${memorial.pet_name}`,
      description: memorial.bio?.slice(0, 160),
    },
  }
}

export default async function MemorialPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = await createServerSupabaseClient()

  // 获取纪念页信息
  const { data: memorial } = await supabase
    .from('memorials')
    .select(`
      *,
      photos (*)
    `)
    .eq('slug', params.slug)
    .single()

  if (!memorial) {
    notFound()
  }

  // 获取已批准的留言
  const { data: tributes } = await supabase
    .from('tributes')
    .select('*')
    .eq('memorial_id', memorial.id)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  // 增加访问计数
  await supabase
    .from('memorials')
    .update({ view_count: memorial.view_count + 1 })
    .eq('id', memorial.id)

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-100 to-primary-50 py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-semibold text-neutral-800">
            {memorial.pet_name}
          </h1>
          <p className="mt-2 text-xl text-neutral-600">
            {memorial.pet_breed}
          </p>
          <p className="mt-4 text-neutral-600">
            {formatDate(memorial.birth_date)} - {formatDate(memorial.death_date)}
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Photo Gallery */}
        <section className="mb-12">
          <PhotoGallery photos={memorial.photos} />
        </section>

        {/* Bio */}
        {memorial.bio && (
          <section className="mb-12 rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold text-neutral-800">
              生平故事
            </h2>
            <div className="prose prose-lg max-w-none text-neutral-700">
              {memorial.bio}
            </div>
          </section>
        )}

        {/* Memorial Text */}
        {memorial.memorial_text && (
          <section className="mb-12 rounded-lg bg-primary-50 p-8">
            <h2 className="mb-4 text-2xl font-semibold text-neutral-800">
              纪念文
            </h2>
            <div className="prose max-w-none italic text-neutral-700">
              {memorial.memorial_text}
            </div>
          </section>
        )}

        {/* Virtual Tribute */}
        <section className="mb-12">
          <VirtualTribute
            memorialId={memorial.id}
            candleCount={memorial.candle_count}
            flowerCount={memorial.flower_count}
          />
        </section>

        {/* Tribute Form */}
        <section className="mb-12 rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-neutral-800">
            留下您的悼念
          </h2>
          <TributeForm memorialId={memorial.id} />
        </section>

        {/* Tribute List */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-neutral-800">
            悼念留言 ({tributes?.length || 0})
          </h2>
          <TributeList tributes={tributes || []} />
        </section>
      </div>
    </div>
  )
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
```

**任务清单**:
- [ ] 实现纪念页布局
- [ ] 实现照片画廊组件（轮播+网格）
- [ ] 实现虚拟悼念组件（蜡烛+鲜花）
- [ ] 实现留言表单
- [ ] 实现留言列表
- [ ] 添加 SEO meta 标签
- [ ] 实现访问计数
- [ ] 添加分享功能

---

### 3.3 照片上传与管理

#### Supabase Storage 配置

**创建 Storage Bucket**:
- [ ] 在 Supabase Dashboard 创建 `memorial-photos` bucket
- [ ] 设置为 Public bucket
- [ ] 配置 RLS 策略

```sql
-- Storage RLS 策略
CREATE POLICY "Users can upload photos to own memorials"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'memorial-photos' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text FROM memorials WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Anyone can view public memorial photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'memorial-photos');
```

**任务清单**:
- [ ] 配置 Storage Bucket
- [ ] 实现图片压缩（client-side）
- [ ] 实现拖拽上传
- [ ] 实现照片排序
- [ ] 实现照片删除
- [ ] 添加上传进度显示

---

### 阶段 3 验收标准

**完成标准**:
- ✅ 用户可以通过三步向导创建纪念页
- ✅ 照片上传功能正常
- ✅ 纪念页展示美观且响应式
- ✅ 虚拟蜡烛和鲜花动画流畅
- ✅ 留言功能可用（需审核）
- ✅ SEO meta 标签正确

**测试清单**:
- [ ] 测试创建纪念页完整流程
- [ ] 测试照片上传（单个、多个、拖拽）
- [ ] 测试纪念页在不同设备上的展示
- [ ] 测试虚拟悼念互动
- [ ] 测试留言提交
- [ ] 验证 SEO meta 标签

**Git Commit**:
```bash
git add .
git commit -m "feat: complete phase 3 - memorial core features

- Implement 3-step memorial creation wizard
- Add photo upload with drag-and-drop
- Create memorial display page with beautiful layout
- Add virtual candle and flower tribute animations
- Implement tribute message system with moderation
- Add SEO optimization for memorial pages"
```

---

## 阶段 4: 彩虹桥故事墙

**目标**: 实现首页公共纪念页展示（瀑布流布局）

**时间估算**: 5-7 天

### 4.1 首页设计

```typescript
// src/app/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { RainbowBridgeWall } from '@/components/home/rainbow-bridge-wall'
import { Hero } from '@/components/home/hero'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function HomePage() {
  const supabase = await createServerSupabaseClient()

  // 获取公开的纪念页
  const { data: memorials } = await supabase
    .from('memorials')
    .select(`
      id,
      pet_name,
      pet_breed,
      pet_species,
      birth_date,
      death_date,
      bio,
      slug,
      view_count,
      candle_count,
      flower_count,
      photos!inner (
        url,
        thumbnail_url
      )
    `)
    .eq('privacy', 'public')
    .order('created_at', { ascending: false })
    .limit(30)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Rainbow Bridge Wall */}
      <section className="bg-primary-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold text-neutral-800">
              彩虹桥故事墙
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              纪念那些陪伴我们的永远的朋友
            </p>
          </div>

          <RainbowBridgeWall memorials={memorials || []} />

          <div className="mt-12 text-center">
            <Link href="/memorials">
              <Button size="lg" variant="outline">
                查看更多纪念页
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-primary-100 to-white py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-semibold text-neutral-800">
            为您的宠物创建纪念页
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            建立一个温暖、永久的纪念空间，让爱与回忆永存
          </p>
          <Link href="/memorials/create">
            <Button size="lg" className="mt-8">
              开始创建
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
```

### 4.2 瀑布流布局实现

```typescript
// src/components/home/rainbow-bridge-wall.tsx
'use client'

import { useState } from 'react'
import { MemorialCard } from './memorial-card'
import Masonry from 'react-masonry-css'

type Memorial = {
  id: string
  pet_name: string
  pet_breed: string
  pet_species: string
  birth_date: string
  death_date: string
  bio: string
  slug: string
  photos: { url: string }[]
}

export function RainbowBridgeWall({ memorials }: { memorials: Memorial[] }) {
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest')

  const sortedMemorials = [...memorials].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.death_date).getTime() - new Date(a.death_date).getTime()
    } else {
      return b.view_count - a.view_count
    }
  })

  const breakpointColumns = {
    default: 3,
    1024: 2,
    640: 1,
  }

  return (
    <div>
      {/* Sort Controls */}
      <div className="mb-8 flex justify-center gap-4">
        <button
          onClick={() => setSortBy('latest')}
          className={`rounded-full px-6 py-2 ${
            sortBy === 'latest'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-neutral-700'
          }`}
        >
          最新创建
        </button>
        <button
          onClick={() => setSortBy('popular')}
          className={`rounded-full px-6 py-2 ${
            sortBy === 'popular'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-neutral-700'
          }`}
        >
          最多访问
        </button>
      </div>

      {/* Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-6 w-auto"
        columnClassName="pl-6 bg-clip-padding"
      >
        {sortedMemorials.map((memorial) => (
          <MemorialCard key={memorial.id} memorial={memorial} />
        ))}
      </Masonry>
    </div>
  )
}
```

**安装依赖**:
```bash
npm install react-masonry-css
```

**任务清单**:
- [ ] 实现 Hero 组件
- [ ] 实现瀑布流布局
- [ ] 创建纪念页卡片组件
- [ ] 实现排序功能（最新/最热）
- [ ] 实现无限滚动（可选）
- [ ] 添加加载骨架屏
- [ ] 优化首页性能（ISR）

---

### 阶段 4 验收标准

**完成标准**:
- ✅ 首页展示公开纪念页
- ✅ 瀑布流布局美观且响应式
- ✅ 排序功能正常
- ✅ 首页加载速度快（< 2s）
- ✅ 移动端体验良好

**Git Commit**:
```bash
git add .
git commit -m "feat: complete phase 4 - rainbow bridge memorial wall

- Implement homepage with hero section
- Create masonry grid layout for memorial wall
- Add sorting functionality (latest/popular)
- Optimize homepage performance with ISR
- Ensure responsive design across devices"
```

---

## 阶段 5: 内容管理与优化

**目标**: SEO 优化、性能优化、内容审核、测试和部署

**时间估算**: 5-7 天

### 5.1 SEO 优化

#### Sitemap 生成

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createServerSupabaseClient()

  // 获取所有公开纪念页
  const { data: memorials } = await supabase
    .from('memorials')
    .select('slug, updated_at')
    .eq('privacy', 'public')

  const memorialUrls = memorials?.map((memorial) => ({
    url: `https://wplacegrasswonder.memorial/memorials/${memorial.slug}`,
    lastModified: new Date(memorial.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  })) || []

  return [
    {
      url: 'https://wplacegrasswonder.memorial',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...memorialUrls,
  ]
}
```

#### Robots.txt

```typescript
// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/api', '/admin'],
    },
    sitemap: 'https://wplacegrasswonder.memorial/sitemap.xml',
  }
}
```

#### Schema.org 结构化数据

```typescript
// src/components/memorials/memorial-schema.tsx
export function MemorialSchema({ memorial }: { memorial: Memorial }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: memorial.pet_name,
    birthDate: memorial.birth_date,
    deathDate: memorial.death_date,
    description: memorial.bio,
    image: memorial.photos[0]?.url,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

**任务清单**:
- [ ] 实现 sitemap.xml 生成
- [ ] 配置 robots.txt
- [ ] 添加 Schema.org 结构化数据
- [ ] 优化 meta 标签
- [ ] 配置 Open Graph 标签
- [ ] 添加 Google Analytics
- [ ] 提交到 Google Search Console

---

### 5.2 性能优化

#### Next.js 配置优化

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['@/components'],
  },
}

export default nextConfig
```

**任务清单**:
- [ ] 图片优化（Next.js Image）
- [ ] 代码分割
- [ ] 懒加载非关键组件
- [ ] 配置 ISR（增量静态再生）
- [ ] 添加加载状态
- [ ] 优化字体加载
- [ ] Lighthouse 审计并修复问题

**性能目标**:
- Lighthouse Performance: > 90
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

---

### 5.3 内容审核系统

```typescript
// src/app/admin/tributes/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { TributeModerationTable } from '@/components/admin/tribute-moderation-table'

export default async function TributeModerationPage() {
  const supabase = await createServerSupabaseClient()

  // 获取待审核留言
  const { data: pendingTributes } = await supabase
    .from('tributes')
    .select(`
      *,
      memorials (
        pet_name,
        slug
      )
    `)
    .eq('is_approved', false)
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-semibold">
        留言审核 ({pendingTributes?.length || 0})
      </h1>

      <TributeModerationTable tributes={pendingTributes || []} />
    </div>
  )
}
```

**任务清单**:
- [ ] 创建管理员页面
- [ ] 实现留言审核队列
- [ ] 添加批准/拒绝功能
- [ ] 实现关键词过滤（黑名单）
- [ ] 添加举报功能
- [ ] 创建审核日志

---

### 5.4 测试与部署

#### 测试清单

**功能测试**:
- [ ] 用户注册和登录
- [ ] 纪念页创建完整流程
- [ ] 照片上传
- [ ] 虚拟悼念互动
- [ ] 留言提交
- [ ] Dashboard 功能
- [ ] 账户设置

**响应式测试**:
- [ ] 移动端（< 640px）
- [ ] 平板端（640px - 1024px）
- [ ] 桌面端（> 1024px）

**浏览器测试**:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

**性能测试**:
- [ ] Lighthouse 审计
- [ ] 首页加载时间
- [ ] 纪念页加载时间
- [ ] 图片加载优化

#### 部署到 Vercel

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署
vercel --prod
```

**环境变量配置**:
在 Vercel Dashboard 配置:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

**任务清单**:
- [ ] 配置 Vercel 项目
- [ ] 设置环境变量
- [ ] 配置自定义域名
- [ ] 配置 SSL 证书
- [ ] 设置 CI/CD（自动部署）
- [ ] 配置错误监控（Sentry）
- [ ] 配置 Uptime 监控

---

### 阶段 5 验收标准

**完成标准**:
- ✅ SEO 优化完成（sitemap, robots.txt, schema）
- ✅ 性能达标（Lighthouse > 90）
- ✅ 内容审核系统可用
- ✅ 所有功能测试通过
- ✅ 成功部署到生产环境
- ✅ 自定义域名配置完成

**最终测试**:
- [ ] 完整用户旅程测试
- [ ] SEO 验证（Google Search Console）
- [ ] 性能监控设置
- [ ] 错误监控验证

**Git Commit**:
```bash
git add .
git commit -m "feat: complete phase 5 - optimization and deployment

- Implement SEO optimization (sitemap, robots, schema)
- Optimize performance (images, code splitting, ISR)
- Add content moderation system for tributes
- Configure Vercel deployment
- Add monitoring and analytics
- Achieve Lighthouse score > 90"
```

---

## 检查清单

### MVP 完成检查清单

#### 核心功能
- [ ] 用户可以注册和登录
- [ ] 用户可以创建纪念页（三步向导）
- [ ] 用户可以上传照片（至少 1 张）
- [ ] 用户可以编写生平故事和纪念文
- [ ] 纪念页可以公开展示
- [ ] 访客可以点亮蜡烛
- [ ] 访客可以献花
- [ ] 访客可以留言（需审核）
- [ ] 首页展示彩虹桥故事墙
- [ ] 管理员可以审核留言

#### 技术要求
- [ ] 响应式设计（移动端友好）
- [ ] Lighthouse Performance > 85
- [ ] SEO 优化（meta, sitemap, schema）
- [ ] 数据库 RLS 策略正确
- [ ] 图片上传和存储正常
- [ ] 错误处理完善
- [ ] 加载状态显示

#### 设计要求
- [ ] 色彩系统柔和温暖
- [ ] 字体易读（18px 基准）
- [ ] 大量留白，避免信息过载
- [ ] 圆角设计（8-12px）
- [ ] 动画流畅（300-500ms）
- [ ] 情感化文案（避免"死亡"等词）

#### 部署要求
- [ ] 成功部署到 Vercel
- [ ] 自定义域名配置
- [ ] SSL 证书有效
- [ ] 环境变量配置正确
- [ ] 监控和分析工具配置

---

## 风险与注意事项

### 技术风险

**1. Supabase 配额限制**
- 免费套餐限制：500MB 数据库，1GB 存储
- 应对：监控使用量，及时升级

**2. 图片存储成本**
- 用户上传大量高清照片
- 应对：客户端压缩，限制单张大小

**3. 性能问题**
- 首页加载大量纪念页卡片
- 应对：分页加载，ISR 优化

### 设计风险

**1. 情感设计失衡**
- 过于悲伤或过于轻浮
- 应对：用户测试，收集反馈

**2. 文案不当**
- 使用不敏感词汇
- 应对：仔细审查所有文案

### 安全风险

**1. 内容审核不及时**
- 不当留言未审核
- 应对：自动过滤 + 人工审核

**2. 用户隐私泄露**
- 私密纪念页被访问
- 应对：RLS 策略验证

---

## 后续迭代计划

### MVP 后优化（第 4-6 个月）

**功能增强**:
- [ ] 付费功能（高级模板、无限照片）
- [ ] 纪念日提醒
- [ ] 纪念页编辑功能
- [ ] 照片排序和删除
- [ ] 博客系统（悲伤疏导文章）

**性能优化**:
- [ ] CDN 加速
- [ ] 图片缩略图生成
- [ ] 数据库索引优化
- [ ] 缓存策略

**社区功能（第三阶段）**:
- [ ] 悲伤支持论坛
- [ ] 私信系统
- [ ] 用户等级系统

---

## 总结

这个实施计划将 plan.md 的愿景转化为具体的开发任务。整个 MVP 预计需要 6-8 周完成。

**关键成功因素**:
1. **共情设计** - 每个细节都考虑用户的悲伤情绪
2. **渐进式发布** - MVP 先验证核心价值
3. **用户反馈** - 持续收集反馈并迭代
4. **性能优先** - 快速加载，流畅体验
5. **内容质量** - SEO 内容 + UGC 双引擎

**请您审核此计划，确认无误后我将开始分阶段执行。**
