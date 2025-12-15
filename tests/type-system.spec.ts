/**
 * 类型系统验证测试
 * 这个测试文件展示了如何验证 TypeScript 类型系统和 Zod Schema
 * 可以作为后续测试的参考模板
 */

import { describe, it, expect } from 'vitest'
import { validateCharacter, safeValidateCharacter, createDefaultCharacterInput } from '@/schemas/character.schema'
import { isCharacter, toCharacterPreview, generateUUID, isUUID } from '@/types/utils'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'

// 读取示例数据
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const exampleData = JSON.parse(
  readFileSync(join(__dirname, '../data/characters/example.json'), 'utf-8')
)

describe('类型系统验证', () => {
  describe('Zod Schema 验证', () => {
    it('应该能正确验证示例数据', () => {
      // 使用 validateCharacter 进行严格验证
      const validated = validateCharacter(exampleData)

      expect(validated).toBeDefined()
      expect(validated.basic.nameEn).toBe('Luna Starfall')
      expect(validated.basic.nameCn).toBe('月落星')
      expect(validated.basic.gender).toBe('female')
    })

    it('应该能安全验证无效数据', () => {
      const invalidData = { basic: { nameEn: '', nameCn: '' } }
      const result = safeValidateCharacter(invalidData)

      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
      expect(result.error?.issues.length).toBeGreaterThan(0)
    })

    it('应该能创建默认角色输入', () => {
      const defaultInput = createDefaultCharacterInput('测试创作者')

      expect(defaultInput.basic.creator.name).toBe('测试创作者')
      expect(defaultInput.appearance!.body!.age).toBe(18)
      expect(defaultInput.wardrobe?.outfits?.[0]?.name).toBe('默认服装')
    })
  })

  describe('类型守卫', () => {
    it('应该能识别有效的 Character 对象', () => {
      expect(isCharacter(exampleData)).toBe(true)
    })

    it('应该能识别无效的 Character 对象', () => {
      expect(isCharacter({})).toBe(false)
      expect(isCharacter(null)).toBe(false)
      expect(isCharacter('string')).toBe(false)
    })

    it('应该能生成和验证 UUID', () => {
      const uuid = generateUUID()
      expect(isUUID(uuid)).toBe(true)

      // 测试无效 UUID
      expect(isUUID('not-a-uuid')).toBe(false)
      expect(isUUID('12345678-1234-1234-1234-123456789012')).toBe(false) // 版本号不正确
    })
  })

  describe('类型转换', () => {
    it('应该能从完整角色生成预览数据', () => {
      const preview = toCharacterPreview(exampleData)

      expect(preview.id).toBe(exampleData.basic.id)
      expect(preview.nameEn).toBe(exampleData.basic.nameEn)
      expect(preview.nameCn).toBe(exampleData.basic.nameCn)
      expect(preview.mainTraits.length).toBeGreaterThan(0)
      expect(preview.tags.length).toBeGreaterThan(0)
    })

    it('预览数据应该包含主要性格特质', () => {
      const preview = toCharacterPreview(exampleData)
      const mainTraits = exampleData.personality.traits
        .slice(0, 3)
        .map((trait: { name: string }) => trait.name)

      expect(preview.mainTraits).toEqual(mainTraits)
    })
  })

  describe('数据结构完整性', () => {
    it('应该包含所有 11 个数据部分', () => {
      const sections = [
        'basic', 'appearance', 'wardrobe', 'personality', 'background',
        'skills', 'relationships', 'lore', 'additionalInfo', 'media', 'metadata'
      ]

      sections.forEach(section => {
        expect(exampleData).toHaveProperty(section)
      })
    })

    it('基础信息应该包含必需字段', () => {
      const { basic } = exampleData

      expect(basic.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      expect(basic.nameEn).toBeTruthy()
      expect(basic.nameCn).toBeTruthy()
      expect(basic.creator.name).toBeTruthy()
      expect(basic.schemaVersion).toMatch(/^\d+\.\d+\.\d+$/)
    })

    it('外观信息应该包含身体、面部、发型等子部分', () => {
      const { appearance } = exampleData

      expect(appearance.body).toBeDefined()
      expect(appearance.face).toBeDefined()
      expect(appearance.hair).toBeDefined()
      expect(Array.isArray(appearance.facialMarks)).toBe(true)
      expect(Array.isArray(appearance.accessories)).toBe(true)
    })
  })
})

describe('枚举值验证', () => {
  const validGenders = ['male', 'female', 'non-binary', 'other', 'unknown']
  const validBodyTypes = ['slim', 'athletic', 'average', 'chubby', 'muscular', 'petite']
  const validHairLengths = ['bald', 'very-short', 'short', 'shoulder', 'long', 'very-long']

  it('性别枚举值应该有效', () => {
    expect(validGenders).toContain(exampleData.basic.gender)
  })

  it('体型枚举值应该有效', () => {
    expect(validBodyTypes).toContain(exampleData.appearance.body.bodyType)
  })

  it('发长枚举值应该有效', () => {
    expect(validHairLengths).toContain(exampleData.appearance.hair.length)
  })
})

// 导出测试用例，方便其他测试文件引用
export const typeSystemTestCases = {
  exampleData,
  validGenders: ['male', 'female', 'non-binary', 'other', 'unknown'],
  validBodyTypes: ['slim', 'athletic', 'average', 'chubby', 'muscular', 'petite'],
  validHairLengths: ['bald', 'very-short', 'short', 'shoulder', 'long', 'very-long'],
}

// 工具函数：验证颜色格式
export function isValidHexColor(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color)
}

// 工具函数：验证日期格式
export function isValidISODate(dateString: string): boolean {
  try {
    const date = new Date(dateString)
    return !isNaN(date.getTime()) && dateString === date.toISOString()
  } catch {
    return false
  }
}
