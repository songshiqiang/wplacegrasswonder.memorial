# wplacegrasswonder.memorial

> 宠物纪念网站 - 为失去宠物的主人提供温暖、尊重、永久的纪念空间

---

## 🌈 项目简介

wplacegrasswonder.memorial 是一个专注于宠物纪念的情感化网站平台，提供：

- 🐾 **个性化纪念页** - 为您的宠物创建永恒的纪念空间
- 🕯️ **虚拟悼念** - 点亮蜡烛、献花表达思念
- 💬 **留言互动** - 亲友可以留下温暖的回忆和安慰
- 🌸 **彩虹桥故事墙** - 分享和浏览其他宠物的故事
- 📸 **照片相册** - 珍藏每一个美好瞬间

## 🛠️ 技术栈

### 核心框架
- **Next.js 16** - React 服务端渲染框架（App Router）
- **TypeScript** - 类型安全
- **Tailwind CSS 4** - 样式框架

### 数据库 & 认证
- **PostgreSQL** - Supabase 托管的关系型数据库
- **Drizzle ORM** - 类型安全的数据库操作
- **Supabase Auth** - 用户认证（邮箱/OAuth）
- **Supabase Storage** - 图片和文件存储

### UI & 动画
- **Shadcn UI** - 可定制的 UI 组件库
- **Framer Motion** - 流畅的动画效果
- **Lucide React** - 美观的图标库

### 开发工具
- **Drizzle Kit** - 数据库迁移工具
- **ESLint** - 代码规范
- **TypeScript** - 类型检查

## 📁 项目结构

```
wplacegrasswonder.memorial/
├── src/                     # 源代码目录
│   ├── app/                # Next.js App Router
│   │   ├── globals.css     # 全局样式（Tailwind + 设计系统）
│   │   ├── layout.tsx      # 根布局
│   │   ├── page.tsx        # 首页
│   │   ├── (auth)/         # 认证相关页面
│   │   ├── (dashboard)/    # Dashboard 页面
│   │   ├── memorials/      # 纪念页页面
│   │   └── api/            # API 路由
│   ├── components/         # React 组件
│   │   ├── ui/             # Shadcn UI 组件
│   │   ├── home/           # 首页组件
│   │   ├── memorials/      # 纪念页组件
│   │   ├── dashboard/      # Dashboard 组件
│   │   ├── admin/          # 管理员组件
│   │   └── memorial/       # 虚拟悼念组件
│   ├── db/                 # 数据库相关
│   │   ├── schema.ts       # Drizzle Schema 定义
│   │   └── index.ts        # 数据库客户端
│   ├── lib/                # 工具库
│   │   ├── supabase/       # Supabase 客户端
│   │   ├── design-tokens.ts # 设计 Token
│   │   └── utils/          # 工具函数
│   ├── types/              # TypeScript 类型
│   │   └── index.ts        # 通用类型定义
│   ├── hooks/              # 自定义 React Hooks
│   └── middleware.ts       # Next.js 中间件
├── .claude/                # 项目文档
│   ├── design-system.md   # 设计系统文档
│   ├── deployment-guide.md # 部署指南
│   ├── testing-guide.md   # 测试指南
│   ├── project-summary.md # 项目总结
│   └── ...                # 其他文档
├── drizzle.config.ts       # Drizzle 配置
├── components.json         # Shadcn UI 配置
└── tsconfig.json           # TypeScript 配置
```

## 🚀 快速开始

### 前置要求

- Node.js 18+
- npm 或 yarn
- Supabase 账号

### 安装依赖

```bash
npm install
```

### 环境变量配置

复制 `.env.local.example` 为 `.env.local` 并填入配置：

```bash
cp .env.local.example .env.local
```

需要配置的环境变量：

```bash
# Supabase (用于 Auth 和 Storage)
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Database (用于 Drizzle ORM)
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 数据库迁移

```bash
# 生成迁移文件
npm run db:generate

# 推送 schema 到数据库
npm run db:push

# 打开 Drizzle Studio 查看数据库
npm run db:studio
```

### 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 📝 开发脚本

```bash
# 开发
npm run dev

# 构建
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 数据库操作
npm run db:generate  # 生成迁移
npm run db:migrate   # 执行迁移
npm run db:push      # 推送 schema
npm run db:studio    # 打开 Drizzle Studio
```

## 🎨 设计系统

项目采用情感化设计原则：

- **色彩**: 柔和的蓝色（平静）+ 淡紫色（温柔）+ 柔粉色（温暖）
- **字体**: Inter（18px 基准，易读性优先）
- **圆角**: 12px 默认（柔和感）
- **动画**: 300ms 过渡（流畅）

详见：`.claude/design-system.md`

## 📖 文档

- [项目规划](/.claude/plan.md) - 完整的项目规划（AI 生成）
- [实施计划](/.claude/implementation-plan.md) - 分阶段执行计划
- [设计系统](/.claude/design-system.md) - 设计规范和组件
- [Drizzle 配置](/.claude/drizzle-setup.md) - 数据库 ORM 配置指南

## 🔐 安全

- **Row Level Security (RLS)** - 数据库级别的访问控制
- **认证保护** - Supabase Auth
- **数据加密** - HTTPS + 数据库加密
- **内容审核** - 留言需要审核

详见：`.claude/database-rls-policies.sql`

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT

---

**用心设计，用爱纪念** ❤️
