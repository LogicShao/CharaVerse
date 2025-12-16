/**
 * TypeScript 类型工具函数
 * 提供类型守卫、类型转换等实用工具
 */

/**
 * TypeScript 类型工具函数
 * 提供类型守卫、类型转换等实用工具
 */
import type {Character, CharacterPreview} from './character'
import type {
  UUID,
  ISODateString,
  Gender,
  BodyType,
  SkinTone,
  FaceShape,
  EyeShape,
  CommonColor,
  HairLength,
  HairStyle,
  ClothingStyle
} from './enums'

// ============= 类型守卫 =============

/**
 * 检查对象是否为有效的 UUID
 */
export function isUUID(value: unknown): value is UUID {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

/**
 * 检查对象是否为有效的 ISO 日期字符串
 */
export function isISODateString(value: unknown): value is ISODateString {
  if (typeof value !== 'string') return false
  try {
    const date = new Date(value)
    return !isNaN(date.getTime()) && value === date.toISOString()
  } catch {
    return false
  }
}

/**
 * 检查对象是否为 Character 类型（基础检查）
 */
export function isCharacter(value: unknown): value is Character {
  if (typeof value !== 'object' || value === null) return false

  const obj = value as Record<string, unknown>

  // 检查必需的基础字段
  return (
    typeof obj.basic === 'object' &&
    obj.basic !== null &&
    typeof (obj.basic as Record<string, unknown>).id === 'string' &&
    typeof (obj.basic as Record<string, unknown>).nameEn === 'string' &&
    typeof (obj.basic as Record<string, unknown>).nameCn === 'string'
  )
}

/**
 * 检查对象是否为 CharacterPreview 类型
 */
export function isCharacterPreview(value: unknown): value is CharacterPreview {
  if (typeof value !== 'object' || value === null) return false

  const obj = value as Record<string, unknown>

  return (
    typeof obj.id === 'string' &&
    typeof obj.nameEn === 'string' &&
    typeof obj.nameCn === 'string' &&
    Array.isArray(obj.nicknames) &&
    typeof obj.gender === 'string' &&
    typeof obj.createdAt === 'string' &&
    typeof obj.updatedAt === 'string'
  )
}

// ============= 类型转换 =============

/**
 * 从完整角色数据生成预览数据
 */
export function toCharacterPreview(character: Character): CharacterPreview {
  // 提取主要性格特质（前3个）
  const mainTraits = character.personality.traits
    .slice(0, 3)
    .map(trait => trait.name)

  // 查找头像 URL
  const avatarAsset = character.media.assets.find(
    asset => asset.type === 'avatar' && asset.isOfficial
  )

  return {
    id: character.basic.id,
    nameEn: character.basic.nameEn,
    nameCn: character.basic.nameCn,
    nicknames: character.basic.nicknames,
    gender: character.basic.gender,
    createdAt: character.basic.createdAt,
    updatedAt: character.basic.updatedAt,
    avatarUrl: avatarAsset?.url,
    mainTraits,
    tags: character.additionalInfo.tags,
  }
}

/**
 * 生成新的 UUID v4
 */
export function generateUUID(): UUID {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 生成当前时间的 ISO 字符串
 */
export function generateISODateString(): ISODateString {
  return new Date().toISOString()
}

// ============= 数据验证工具 =============

/**
 * 验证角色数据的必填字段
 */
export function validateRequiredFields(character: Partial<Character>): string[] {
  const errors: string[] = []

  // 检查基础信息
  if (!character.basic?.nameEn?.trim()) {
    errors.push('英文名不能为空')
  }
  if (!character.basic?.nameCn?.trim()) {
    errors.push('中文名不能为空')
  }
  if (!character.basic?.creator?.name?.trim()) {
    errors.push('创作者名称不能为空')
  }

  // 检查外观信息
  if (!character.appearance?.body?.age || character.appearance.body.age <= 0) {
    errors.push('年龄必须为正数')
  }
  if (!character.appearance?.body?.height || character.appearance.body.height <= 0) {
    errors.push('身高必须为正数')
  }
  if (!character.appearance?.body?.weight || character.appearance.body.weight <= 0) {
    errors.push('体重必须为正数')
  }

  // 检查性格信息
  if (!character.personality?.coreDescription?.trim()) {
    errors.push('核心性格描述不能为空')
  }
  if (!character.personality?.psychology?.mainFear?.trim()) {
    errors.push('主要恐惧不能为空')
  }
  if (!character.personality?.psychology?.coreDesire?.trim()) {
    errors.push('核心欲望不能为空')
  }

  return errors
}

/**
 * 清理角色数据中的空值
 */
export function cleanCharacterData<T extends Partial<Character>>(data: T): T {
  const cleaned = { ...data }

  // 递归清理对象中的空字符串
  const cleanObject = (obj: unknown): unknown => {
    if (Array.isArray(obj)) {
      return obj.map(cleanObject).filter(item => item !== '' && item !== null && item !== undefined)
    } else if (obj && typeof obj === 'object') {
      const result: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(obj)) {
        const cleanedValue = cleanObject(value)
        if (cleanedValue !== '' && cleanedValue !== null && cleanedValue !== undefined) {
          result[key] = cleanedValue
        }
      }
      return Object.keys(result).length > 0 ? result : undefined
    }
    return obj
  }

  return cleanObject(cleaned) as T
}

// ============= 数据操作工具 =============

/**
 * 合并角色数据（用于更新操作）
 */
export function mergeCharacterData(
  original: Character,
  updates: Partial<Character>
): Character {
  // 深度合并函数 - 使用更简单的类型定义
  const deepMerge = <T>(target: T, source: Partial<T>): T => {
    const result = { ...target } as T

    for (const key in source) {
      const sourceValue = source[key]
      const targetValue = target[key as keyof T]

      if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
        // 递归合并对象
        result[key as keyof T] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        ) as T[keyof T]
      } else if (sourceValue !== undefined) {
        // 直接赋值（包括数组）
        result[key as keyof T] = sourceValue as T[keyof T]
      }
    }

    return result
  }

  return deepMerge(original, updates)
}

/**
 * 创建新角色的完整数据
 */
export function createNewCharacter(
  input: Partial<Character>,
  creatorName: string
): Character {
  const now = generateISODateString()
  const id = generateUUID()

  // 基础模板
  const baseCharacter: Character = {
    basic: {
      id,
      nameEn: '',
      nameCn: '',
      nicknames: [],
      gender: 'unknown' as Gender,
      createdAt: now,
      updatedAt: now,
      creator: {
        name: creatorName,
      },
      schemaVersion: '1.0.0',
    },
    appearance: {
      body: {
        age: 18,
        height: 170,
        weight: 60,
        bodyType: 'average' as BodyType,
        skinTone: 'medium' as SkinTone,
      },
      face: {
        faceShape: 'oval' as FaceShape,
        eyeShape: 'almond' as EyeShape,
        eyeColor: 'brown' as CommonColor,
        lipColor: 'pink' as CommonColor,
      },
      hair: {
        primaryColor: 'black' as CommonColor,
        length: 'shoulder' as HairLength,
        style: 'straight' as HairStyle,
        description: '直发',
      },
      facialMarks: [],
      accessories: [],
    },
    wardrobe: {
      outfits: [
        {
          name: '默认服装',
          description: '日常服装',
          primaryColor: '#333333',
          style: 'casual' as ClothingStyle,
          isDefault: true,
        },
      ],
      mainAccessories: [],
    },
    personality: {
      coreDescription: '',
      traits: [],
      motivation: '',
      psychology: {
        mainFear: '',
        coreDesire: '',
      },
      expression: {
        actionStyle: '',
        emotionalExpression: '',
        speechHabits: [],
        catchphrases: [],
        bodyLanguage: [],
      },
    },
    background: {
      birthplace: '',
      socialBackground: '',
      family: [],
      childhood: '',
      education: '',
      turningPoints: [],
      adventures: [],
      currentLife: '',
    },
    skills: {
      occupation: '',
      skills: [],
      weaknesses: [],
      limitations: [],
    },
    relationships: {
      connections: [],
    },
    lore: {
      universe: '',
      species: '',
      socialStatus: '',
      faction: '',
      religion: '',
      philosophy: '',
    },
    additionalInfo: {
      hobbies: [],
      dislikes: [],
      habits: [],
      dreams: [],
      motto: '',
      tags: [],
    },
    media: {
      profileImage: null,
      gallery: [],
      voiceClaim: null,
      themeSong: null,
      assets: [],
    },
    metadata: {
      tags: [],
      isPublic: true,
      isNSFW: false,
      language: 'zh-CN',
      contentWarnings: [],
      creatorInfo: {
        name: creatorName,
      },
      versionHistory: [
        {
          version: '1.0.0',
          date: now,
          changes: ['初始创建'],
        },
      ],
      license: {
        type: 'All Rights Reserved',
        allowsFanWorks: false,
        description: '保留所有权利',
      },
      links: [],
      customMetadata: {},
    },
  }

  // 合并输入数据
  return mergeCharacterData(baseCharacter, input)
}

// ============= 导出类型 =============

export type {
  Character,
  CharacterPreview,
} from './character'

export type {
  UUID,
  ISODateString,
  URL,
  HexColor,
} from './enums'
