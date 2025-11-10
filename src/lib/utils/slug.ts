/**
 * Slug generation utility
 * 生成纪念页的唯一 slug
 */

/**
 * 生成 slug（URL 友好的字符串）
 * @param petName 宠物名字
 * @param petBreed 品种（可选）
 * @returns slug 字符串
 */
export function generateSlug(petName: string, petBreed?: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 6)

  // 组合名字和品种
  let baseSlug = petName
  if (petBreed) {
    baseSlug += `-${petBreed}`
  }

  // 转换为 URL 友好格式
  const slug = `${baseSlug}-${random}`
    .toLowerCase()
    .replace(/[\u4e00-\u9fa5]/g, (char) => {
      // 中文字符转拼音（简化版，实际项目可使用 pinyin 库）
      return char
    })
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100) // 限制长度

  return slug || `memorial-${random}`
}

/**
 * 验证 slug 格式
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9\u4e00-\u9fa5-]+$/.test(slug)
}
