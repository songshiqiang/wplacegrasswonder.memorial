# Deployment Guide - 部署指南

彩虹桥纪念网站部署指南

## 前置条件

- Node.js 18+
- PostgreSQL 数据库
- Supabase 账户（用于 Auth 和 Storage）
- 域名（可选）

---

## 1. 数据库设置

### 1.1 创建 PostgreSQL 数据库

使用 Supabase 或其他 PostgreSQL 提供商创建数据库。

### 1.2 运行数据库迁移

```bash
# 安装依赖
npm install

# 生成迁移文件
npm run db:generate

# 执行迁移
npm run db:migrate

# 或者直接推送 schema
npm run db:push
```

### 1.3 配置 RLS 策略

在 Supabase SQL Editor 中执行 `.claude/database-rls-policies.sql` 文件中的 SQL 语句。

---

## 2. Supabase 配置

### 2.1 配置 Authentication

1. 在 Supabase Dashboard 中启用 Email 认证
2. （可选）启用 Google OAuth
3. 配置邮件模板
4. 设置回调 URL: `https://your-domain.com/auth/callback`

### 2.2 创建 Storage Bucket

1. 创建名为 `memorial-photos` 的 bucket
2. 设置为 Public bucket
3. 配置 RLS 策略（参考 `.claude/database-rls-policies.sql`）

---

## 3. 环境变量配置

创建 `.env.local` 文件：

```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

## 4. 部署到 Vercel

### 4.1 连接 GitHub

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量（与 `.env.local` 相同）

### 4.2 构建配置

Vercel 会自动检测 Next.js 项目，无需额外配置。

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

### 4.3 部署

点击 "Deploy" 按钮，Vercel 会自动构建和部署。

---

## 5. 部署后配置

### 5.1 配置域名

在 Vercel Dashboard 中添加自定义域名。

### 5.2 Google Search Console

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加网站
3. 在 `app/layout.tsx` 中添加验证代码：
   ```typescript
   verification: {
     google: 'your-verification-code',
   }
   ```
4. 提交 sitemap: `https://your-domain.com/sitemap.xml`

### 5.3 性能监控

建议使用以下工具监控网站性能：
- Google Analytics
- Vercel Analytics
- Sentry（错误监控）

---

## 6. 测试清单

### 6.1 功能测试

- [ ] 用户注册和登录
- [ ] 创建纪念页（完整流程）
- [ ] 照片上传
- [ ] 虚拟蜡烛点亮
- [ ] 虚拟鲜花献上
- [ ] 留言提交
- [ ] Dashboard 功能
- [ ] 账户设置修改

### 6.2 响应式测试

- [ ] 移动端 (< 640px)
- [ ] 平板端 (640px - 1024px)
- [ ] 桌面端 (> 1024px)

### 6.3 浏览器兼容性

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### 6.4 性能测试

使用 Lighthouse 进行审计，目标分数：
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

---

## 7. 维护和更新

### 7.1 数据库迁移

更新 schema 后：
```bash
npm run db:generate
npm run db:migrate
```

### 7.2 监控

定期检查：
- 错误日志
- 性能指标
- 数据库使用情况
- Storage 使用情况

### 7.3 备份

建议设置：
- 数据库每日自动备份
- Storage 定期备份
- 代码版本控制（Git）

---

## 8. 常见问题

### Q: 图片上传失败

A: 检查 Storage bucket 配置和 RLS 策略。

### Q: 用户无法登录

A: 检查 Supabase Auth 配置和回调 URL。

### Q: 数据库连接失败

A: 检查 DATABASE_URL 环境变量和数据库凭证。

### Q: 构建失败

A: 检查 Node.js 版本（需要 18+）和依赖安装。

---

## 9. 安全建议

- 定期更新依赖包
- 使用环境变量保护敏感信息
- 启用 Supabase RLS 策略
- 配置 CORS 和 CSP headers
- 定期审查日志和错误
- 实施速率限制（API routes）

---

## 10. 性能优化建议

- 启用 Vercel Edge Functions（如需要）
- 配置 CDN 缓存策略
- 优化图片大小和格式
- 使用 ISR 减少服务器负载
- 监控 Core Web Vitals

---

## 支持

如有问题，请查看：
- [Next.js 文档](https://nextjs.org/docs)
- [Supabase 文档](https://supabase.com/docs)
- [Drizzle ORM 文档](https://orm.drizzle.team/)
- [Vercel 文档](https://vercel.com/docs)
