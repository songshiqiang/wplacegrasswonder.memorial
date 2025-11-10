# 设计系统文档

> wplacegrasswonder.memorial 情感化设计系统
>
> 版本：1.0
> 日期：2025-11-10

---

## 设计原则

### 核心原则：共情至上

**设计目标**：
为失去宠物的主人提供温暖、尊重、永久的纪念空间。所有设计决策都应以用户的悲伤情绪为首要考虑。

**设计关键词**：
- 🌸 **温暖** - 使用柔和的色彩，避免冰冷感
- 🕊️ **平静** - 大量留白，减少信息过载
- 💝 **共情** - 文案温柔，避免刺激性词汇
- 🌈 **希望** - 渐变色彩，传递积极的情感

---

## 色彩系统

### 主色调（Primary）

**浅蓝色系 - 代表平静和治愈**

| 色阶 | HEX | RGB | 用途 |
|------|-----|-----|------|
| 50 | `#E3F2FD` | 227, 242, 253 | 背景、卡片 |
| 100 | `#BBDEFB` | 187, 222, 251 | 浅色背景 |
| 200 | `#90CAF9` | 144, 202, 249 | Hover 状态 |
| 300 | `#64B5F6` | 100, 181, 246 | 次要元素 |
| 400 | `#42A5F5` | 66, 165, 245 | 主要交互元素 |
| 500 | `#2196F3` | 33, 150, 243 | 品牌色 |
| 600 | `#1E88E5` | 30, 136, 229 | 按钮按下 |

**使用示例**：
```css
/* 背景 */
background-color: var(--primary-50);

/* 按钮 */
background-color: var(--primary-500);

/* Hover */
background-color: var(--primary-600);
```

---

### 次要色（Secondary）

**淡紫色系 - 代表温柔和关怀**

| 色阶 | HEX | RGB | 用途 |
|------|-----|-----|------|
| 50 | `#F3E5F5` | 243, 229, 245 | 装饰背景 |
| 100 | `#E1BEE7` | 225, 190, 231 | 卡片边框 |
| 200 | `#CE93D8` | 206, 147, 216 | 次要按钮 |
| 300 | `#BA68C8` | 186, 104, 200 | 图标 |
| 400 | `#AB47BC` | 171, 71, 188 | 强调元素 |
| 500 | `#9C27B0` | 156, 39, 176 | 次要品牌色 |

**使用场景**：
- 装饰性元素
- 次要交互组件
- 图标和徽章
- 渐变背景

---

### 温暖色（Warm）

**柔粉色系 - 代表温暖和爱**

| 色阶 | HEX | RGB | 用途 |
|------|-----|-----|------|
| 50 | `#FCE4EC` | 252, 228, 236 | 温暖背景 |
| 100 | `#F8BBD0` | 248, 187, 208 | 情感化元素 |
| 200 | `#F48FB1` | 244, 143, 177 | 虚拟鲜花 |
| 300 | `#F06292` | 240, 98, 146 | 心形图标 |

**使用场景**：
- 虚拟献花功能
- 爱心/心形图标
- 情感化的装饰元素

---

### 中性色（Neutral）

**米白和深灰系 - 基础色调**

| 色阶 | HEX | RGB | 用途 |
|------|-----|-----|------|
| 50 | `#FAFAFA` | 250, 250, 250 | 主背景 |
| 100 | `#F5F5F5` | 245, 245, 245 | 次要背景 |
| 200 | `#EEEEEE` | 238, 238, 238 | 分隔线 |
| 300 | `#E0E0E0` | 224, 224, 224 | 边框 |
| 400 | `#BDBDBD` | 189, 189, 189 | 禁用文本 |
| 500 | `#9E9E9E` | 158, 158, 158 | 次要文本 |
| 600 | `#757575` | 117, 117, 117 | 辅助文本 |
| 700 | `#616161` | 97, 97, 97 | 正文 |
| 800 | `#333333` | 51, 51, 51 | 标题（避免纯黑） |
| 900 | `#1A1A1A` | 26, 26, 26 | 深色文本 |

**注意**：
- ❌ **避免使用纯黑色** (#000000) - 过于刺眼
- ✅ **使用深灰色** (#333333) - 柔和且易读

---

### 功能色（Functional）

**柔和版本的功能色**

| 类型 | 颜色 | HEX | 用途 |
|------|------|-----|------|
| Success | 🟢 | `#66BB6A` | 成功提示 |
| Warning | 🟡 | `#FFA726` | 警告提示 |
| Error | 🔴 | `#EF5350` | 错误提示（柔和红色） |
| Info | 🔵 | `#42A5F5` | 信息提示 |

**设计原则**：
- 所有功能色都使用柔和版本
- 避免刺眼的饱和色
- 提示框使用圆角和阴影

---

## 字体系统

### 字体家族

**主字体**：Inter
- 现代、易读、多语言支持
- 包含多种字重（400-700）
- 优秀的屏幕显示效果

**后备字体**：
```css
font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

**等宽字体**（代码）：
```css
font-family: ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, monospace;
```

---

### 字体大小

**基准：18px** - 考虑到用户可能处于情绪低落状态，使用较大的基准字号以提高易读性

| 名称 | 大小 | 用途 | 示例 |
|------|------|------|------|
| xs | 12px (0.75rem) | 辅助信息、日期 | 2024年11月10日 |
| sm | 14px (0.875rem) | 次要文本、标签 | 已审核 |
| base | **18px (1.125rem)** | 正文（基准） | 这是一段正文文本 |
| lg | 20px (1.25rem) | 副标题 | 副标题 |
| xl | 24px (1.5rem) | 小标题 | 小标题 |
| 2xl | 32px (2rem) | 页面标题 | # 页面标题 |
| 3xl | 40px (2.5rem) | 主标题 | # 主标题 |
| 4xl | 48px (3rem) | Hero 标题 | # 纪念您的宠物 |

**使用示例**：
```css
/* 正文 */
font-size: var(--font-size-base); /* 18px */

/* 标题 */
font-size: var(--font-size-2xl); /* 32px */
```

---

### 行高（Line Height）

**易读性优先**

| 名称 | 行高 | 用途 |
|------|------|------|
| tight | 1.4 | 标题 |
| normal | **1.6** | 正文（默认） |
| relaxed | 1.8 | 长文本、故事 |
| loose | 2.0 | 诗歌、纪念文 |

**设计原则**：
- 正文使用 1.6 行高（易读）
- 长文本（生平故事）使用 1.8 行高
- 标题使用 1.4 行高（紧凑）

---

### 字重（Font Weight）

| 名称 | 字重 | 用途 |
|------|------|------|
| normal | 400 | 正文 |
| medium | 500 | 次要标题 |
| semibold | 600 | 标题 |
| bold | 700 | 重要强调 |

**使用建议**：
- 正文：400
- 按钮：500
- 标题：600
- 强调：700

---

## 间距系统

**基于 8px 网格系统**

| 名称 | 大小 | 用途 |
|------|------|------|
| xs | 8px (0.5rem) | 元素间小间距 |
| sm | 16px (1rem) | 元素间距 |
| md | 24px (1.5rem) | 组件间距 |
| lg | 32px (2rem) | 区块间距 |
| xl | 48px (3rem) | 大区块间距 |
| 2xl | 64px (4rem) | Section 间距 |
| 3xl | 96px (6rem) | 页面级间距 |
| 4xl | 128px (8rem) | 超大间距 |

**使用示例**：
```css
/* 卡片内边距 */
padding: var(--spacing-md); /* 24px */

/* Section 间距 */
margin-bottom: var(--spacing-2xl); /* 64px */
```

---

## 圆角系统

**柔和感设计**

| 名称 | 大小 | 用途 |
|------|------|------|
| sm | 8px (0.5rem) | 小元素、标签 |
| md | **12px (0.75rem)** | 卡片、按钮（默认） |
| lg | 16px (1rem) | 大卡片 |
| xl | 24px (1.5rem) | Modal、Hero 区域 |
| 2xl | 32px (2rem) | 特大元素 |
| full | 9999px | 圆形、药丸形按钮 |

**设计原则**：
- 默认使用 12px 圆角（柔和感）
- 避免尖锐的直角
- 大元素使用更大的圆角

---

## 阴影系统

**柔和的阴影**

| 名称 | 阴影值 | 用途 |
|------|--------|------|
| sm | `0 1px 2px rgba(0,0,0,0.05)` | 微妙阴影 |
| default | `0 1px 3px rgba(0,0,0,0.1)` | 卡片默认 |
| md | `0 4px 6px rgba(0,0,0,0.1)` | 悬浮卡片 |
| lg | `0 10px 15px rgba(0,0,0,0.1)` | Modal |
| xl | `0 20px 25px rgba(0,0,0,0.1)` | 下拉菜单 |
| 2xl | `0 25px 50px rgba(0,0,0,0.25)` | 深度阴影 |

**使用示例**：
```css
/* 卡片 */
box-shadow: var(--shadow);

/* Hover 状态 */
box-shadow: var(--shadow-md);
```

---

## 过渡动画

**流畅的动画**

### 时长

| 名称 | 时长 | 用途 |
|------|------|------|
| fast | 150ms | 微交互 |
| normal | **300ms** | 标准过渡（默认） |
| slow | 500ms | 复杂动画 |

### 缓动函数

```css
/* 标准缓动 */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* 淡入 */
transition-timing-function: cubic-bezier(0.4, 0, 1, 1);

/* 淡出 */
transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
```

**使用示例**：
```css
/* 按钮过渡 */
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 组件设计规范

### 按钮（Button）

**样式变体**：

1. **Primary Button** - 主要操作
```css
background: var(--primary-500);
color: white;
border-radius: var(--radius-md);
padding: 12px 24px;
```

2. **Secondary Button** - 次要操作
```css
background: transparent;
border: 1px solid var(--neutral-300);
color: var(--neutral-800);
```

3. **Ghost Button** - 轻量操作
```css
background: transparent;
color: var(--primary-500);
```

**状态**：
- Normal: 默认状态
- Hover: `transform: translateY(-1px)` + 阴影加深
- Active: `transform: translateY(0)`
- Disabled: 50% 透明度

---

### 卡片（Card）

**样式**：
```css
background: white;
border-radius: var(--radius-md);
box-shadow: var(--shadow);
padding: var(--spacing-md);
```

**Hover 效果**：
```css
box-shadow: var(--shadow-md);
transform: translateY(-2px);
```

---

### 输入框（Input）

**样式**：
```css
border: 1px solid var(--neutral-300);
border-radius: var(--radius-md);
padding: 12px 16px;
font-size: var(--font-size-base);
```

**状态**：
- Focus: 边框变为 `var(--primary-400)`
- Error: 边框变为 `var(--error)`
- Disabled: 背景变为 `var(--neutral-100)`

---

## 情感化设计元素

### 虚拟蜡烛

**设计**：
- 渐变色：从 `#FFB74D` 到 `#FFF3E0`
- 动画：轻微的缩放和透明度变化
- 时长：2s，无限循环

```css
@keyframes candle-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
```

---

### 虚拟鲜花

**花语映射**：
- 🌹 玫瑰：永恒的爱
- 🌸 百合：纯洁的心
- 🌼 菊花：怀念
- 🌷 郁金香：美好的回忆

**动画**：
- Hover: 旋转 10deg + 放大 1.2x
- Tap: 缩小 0.9x

---

## 文案原则

### 使用（推荐）

| 推荐 | 原因 |
|------|------|
| "彩虹桥" | 温暖的比喻 |
| "永远的朋友" | 正面的情感 |
| "纪念"、"怀念" | 温和的表达 |
| "陪伴我们的日子" | 美好的回忆 |
| "Ta 的故事" | 尊重的称呼 |

### 避免（不推荐）

| 避免 | 原因 |
|------|------|
| "死亡" | 过于直接 |
| "已故宠物" | 生硬 |
| "悼念" | 悲伤感过重 |
| "遗照" | 不敏感 |

---

## 响应式设计

### 断点

| 断点 | 宽度 | 设备 |
|------|------|------|
| sm | 640px | 大手机 |
| md | 768px | 平板 |
| lg | 1024px | 小笔记本 |
| xl | 1280px | 桌面 |
| 2xl | 1536px | 大屏幕 |

### 移动优先

**设计原则**：
1. 先设计移动端
2. 逐步增强到桌面端
3. 确保核心功能在所有设备可用

**布局**：
- 移动端：单列布局
- 平板端：双列布局
- 桌面端：三列布局

---

## 可访问性

### 对比度

**WCAG AA 标准**：
- 正文：至少 4.5:1
- 大文本（18px+）：至少 3:1

**检查工具**：
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### 焦点状态

所有可交互元素必须有明显的焦点状态：

```css
*:focus-visible {
  outline: 2px solid var(--primary-400);
  outline-offset: 2px;
}
```

### 语义化 HTML

- 使用正确的标签（`<button>`, `<a>`, `<nav>`）
- 添加 `aria-label` 属性
- 提供替代文本（`alt`）

---

## 设计工具和资源

### 在线工具

- **色彩**：[Coolors](https://coolors.co)
- **字体**：[Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- **图标**：[Lucide Icons](https://lucide.dev)
- **渐变**：[uiGradients](https://uigradients.com)

### 设计文件

- **Figma**: [待创建]
- **组件库**: Shadcn UI

---

## 更新日志

### v1.0 (2025-11-10)
- 初始版本
- 定义色彩系统
- 定义字体系统
- 定义间距和圆角
- 添加情感化设计元素

---

**设计系统维护者**: Claude Code
**项目**: wplacegrasswonder.memorial
**原则**: 温暖、柔和、平静、共情
