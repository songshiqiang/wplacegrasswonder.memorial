/**
 * 设计系统 Token
 *
 * 为 wplacegrasswonder.memorial 定义情感化的设计系统
 * 核心原则：温暖、柔和、平静、共情
 */

// ============================================
// 色彩系统
// ============================================

export const colors = {
  // 主色调 - 柔和温暖的色彩
  primary: {
    50: '#E3F2FD',   // 浅蓝 - 平静
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
  },

  // 次要色 - 温柔的紫色
  secondary: {
    50: '#F3E5F5',   // 淡紫 - 温柔
    100: '#E1BEE7',
    200: '#CE93D8',
    300: '#BA68C8',
    400: '#AB47BC',
    500: '#9C27B0',
    600: '#8E24AA',
  },

  // 温暖色 - 柔粉
  warm: {
    50: '#FCE4EC',   // 柔粉 - 温暖
    100: '#F8BBD0',
    200: '#F48FB1',
    300: '#F06292',
    400: '#EC407A',
    500: '#E91E63',
  },

  // 中性色 - 米白和深灰
  neutral: {
    50: '#FAFAFA',   // 米白 - 纯净
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#333333',  // 深灰（避免纯黑）
    900: '#1A1A1A',
  },

  // 功能色 - 柔和版本
  success: {
    light: '#81C784',
    DEFAULT: '#66BB6A',
    dark: '#4CAF50',
  },
  warning: {
    light: '#FFB74D',
    DEFAULT: '#FFA726',
    dark: '#FF9800',
  },
  error: {
    light: '#E57373',  // 柔和的红色（非刺眼）
    DEFAULT: '#EF5350',
    dark: '#F44336',
  },
  info: {
    light: '#64B5F6',
    DEFAULT: '#42A5F5',
    dark: '#2196F3',
  },
}

// ============================================
// 字体系统
// ============================================

export const typography = {
  // 字体家族
  fonts: {
    sans: 'var(--font-inter), Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'var(--font-inter), Inter, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, monospace',
  },

  // 字体大小
  sizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1.125rem',  // 18px (基准 - 易读)
    lg: '1.25rem',     // 20px
    xl: '1.5rem',      // 24px
    '2xl': '2rem',     // 32px
    '3xl': '2.5rem',   // 40px
    '4xl': '3rem',     // 48px
  },

  // 行高
  lineHeight: {
    tight: '1.4',
    normal: '1.6',   // 默认
    relaxed: '1.8',  // 易读
    loose: '2',
  },

  // 字重
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
}

// ============================================
// 间距系统
// ============================================

export const spacing = {
  xs: '0.5rem',    // 8px
  sm: '1rem',      // 16px
  md: '1.5rem',    // 24px
  lg: '2rem',      // 32px
  xl: '3rem',      // 48px
  '2xl': '4rem',   // 64px
  '3xl': '6rem',   // 96px
  '4xl': '8rem',   // 128px
}

// ============================================
// 圆角系统
// ============================================

export const borderRadius = {
  none: '0',
  sm: '0.5rem',     // 8px
  md: '0.75rem',    // 12px - 默认柔和感
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  full: '9999px',
}

// ============================================
// 阴影系统
// ============================================

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
}

// ============================================
// 过渡动画
// ============================================

export const transitions = {
  duration: {
    fast: '150ms',
    normal: '300ms',   // 默认
    slow: '500ms',
  },
  timing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
}

// ============================================
// 断点系统
// ============================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// ============================================
// Z-index 层级
// ============================================

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
}

// ============================================
// 导出所有 tokens
// ============================================

export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  zIndex,
}

export default designTokens
