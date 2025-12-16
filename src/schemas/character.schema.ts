/**
 * OC 角色数据模型的 Zod Schema 定义
 * 用于运行时数据验证
 */

import {z} from 'zod'
import {
  Gender,
  BodyType,
  HairLength,
  HairStyle,
  EyeShape,
  CommonColor,
  FaceShape,
  SkinTone,
  RelationshipType,
  RelationshipStrength,
  SkillLevel,
  ClothingStyle,
  MBTIType,
  BloodType,
  Zodiac,
} from '@/types/enums'

// ============= 基础 Schema =============

/** UUID v4 验证 */
export const uuidSchema = z.string().uuid()

/** ISO 日期字符串验证 */
export const isoDateSchema = z.string().datetime()

/** URL 验证 */
export const urlSchema = z.string().url()

/** 十六进制颜色验证 */
export const hexColorSchema = z.string().regex(/^#[0-9A-Fa-f]{6}$/)

// ============= Part A: 基础信息块 Schema =============

export const basicProfileSchema = z.object({
  id: uuidSchema,
  nameEn: z.string().min(1, '英文名不能为空'),
  nameCn: z.string().min(1, '中文名不能为空'),
  nicknames: z.array(z.string().min(1)).default([]),
  gender: z.nativeEnum(Gender),
  createdAt: isoDateSchema,
  updatedAt: isoDateSchema,
  creator: z.object({
    name: z.string().min(1, '创作者名称不能为空'),
    contact: z.string().optional(),
  }),
  schemaVersion: z.string().regex(/^\d+\.\d+\.\d+$/, '版本号格式应为 x.y.z'),
})

// ============= Part B: 外观设计块 Schema =============

export const bodyInfoSchema = z.object({
  age: z.number().int().positive('年龄必须为正整数'),
  biologicalAge: z.number().int().positive('生理年龄必须为正整数').optional(),
  height: z.number().positive('身高必须为正数'),
  weight: z.number().positive('体重必须为正数'),
  bodyType: z.nativeEnum(BodyType),
  skinTone: z.nativeEnum(SkinTone),
  skinTexture: z.string().optional(),
})

export const facialFeaturesSchema = z.object({
  faceShape: z.nativeEnum(FaceShape),
  eyeShape: z.nativeEnum(EyeShape),
  eyeColor: z.nativeEnum(CommonColor),
  eyebrowShape: z.string().optional(),
  eyebrowColor: z.nativeEnum(CommonColor).optional(),
  noseShape: z.string().optional(),
  lipColor: z.nativeEnum(CommonColor),
  lipThickness: z.string().optional(),
})

export const hairInfoSchema = z.object({
  primaryColor: z.nativeEnum(CommonColor),
  secondaryColor: z.nativeEnum(CommonColor).optional(),
  length: z.nativeEnum(HairLength),
  style: z.nativeEnum(HairStyle),
  description: z.string().min(1, '发型描述不能为空'),
  texture: z.string().optional(),
})

export const facialMarkSchema = z.object({
  type: z.enum(['scar', 'tattoo', 'birthmark', 'freckles', 'other']),
  location: z.string().min(1, '标记位置不能为空'),
  size: z.string().optional(),
  story: z.string().optional(),
})

export const accessorySchema = z.object({
  type: z.string().min(1, '装饰品类型不能为空'),
  description: z.string().min(1, '装饰品描述不能为空'),
  material: z.string().optional(),
  color: z.string().optional(),
})

export const appearanceSchema = z.object({
  body: bodyInfoSchema,
  face: facialFeaturesSchema,
  hair: hairInfoSchema,
  facialMarks: z.array(facialMarkSchema).default([]),
  accessories: z.array(accessorySchema).default([]),
  bodyHair: z.string().optional(),
})

// ============= Part C: 服装与配饰块 Schema =============

export const outfitSchema = z.object({
  name: z.string().min(1, '服装名称不能为空'),
  description: z.string().min(1, '服装描述不能为空'),
  primaryColor: hexColorSchema,
  secondaryColor: hexColorSchema.optional(),
  style: z.nativeEnum(ClothingStyle),
  story: z.string().optional(),
  isDefault: z.boolean().default(false),
})

export const wardrobeSchema = z.object({
  outfits: z.array(outfitSchema).min(1, '至少需要一套服装'),
  mainAccessories: z.array(accessorySchema).default([]),
  signatureWeapon: z
    .object({
      name: z.string().min(1),
      description: z.string().min(1),
      type: z.string().min(1),
    })
    .optional(),
})

// ============= Part D: 性格与心理块 Schema =============

export const personalityTraitSchema = z.object({
  name: z.string().min(1, '特质名称不能为空'),
  description: z.string().min(1, '特质描述不能为空'),
  isPositive: z.boolean(),
  intensity: z.number().int().min(1).max(5),
})

export const psychologySchema = z.object({
  mainFear: z.string().min(1, '主要恐惧不能为空'),
  coreDesire: z.string().min(1, '核心欲望不能为空'),
  trauma: z.string().optional(),
  defenseMechanism: z.string().optional(),
})

export const expressionSchema = z.object({
  speechHabits: z.array(z.string().min(1)).default([]),
  catchphrases: z.array(z.string().min(1)).default([]),
  actionStyle: z.string().min(1, '行动风格不能为空'),
  emotionalExpression: z.string().min(1, '情感表达方式不能为空'),
  bodyLanguage: z.array(z.string().min(1)).default([]),
})

export const personalitySchema = z.object({
  mbti: z.nativeEnum(MBTIType).optional(),
  zodiac: z.nativeEnum(Zodiac).optional(),
  bloodType: z.nativeEnum(BloodType).optional(),
  coreDescription: z.string().min(1, '核心性格描述不能为空'),
  traits: z.array(personalityTraitSchema).min(1, '至少需要一个性格特质'),
  motivation: z.string().min(1, '性格动机不能为空'),
  psychology: psychologySchema,
  expression: expressionSchema,
})

// ============= Part E: 背景故事块 Schema =============

export const familyMemberSchema = z.object({
  relationship: z.string().min(1, '家庭成员关系不能为空'),
  name: z.string().min(1, '家庭成员姓名不能为空'),
  description: z.string().optional(),
  isAlive: z.boolean().optional(),
})

export const importantEventSchema = z.object({
  name: z.string().min(1, '事件名称不能为空'),
  time: z.string().min(1, '事件时间不能为空'),
  description: z.string().min(1, '事件描述不能为空'),
  impact: z.string().min(1, '事件影响不能为空'),
})

export const backgroundSchema = z.object({
  birthplace: z.string().min(1, '出生地不能为空'),
  socialBackground: z.string().min(1, '社会背景不能为空'),
  family: z.array(familyMemberSchema).default([]),
  childhood: z.string().min(1, '童年经历不能为空'),
  education: z.string().min(1, '教育背景不能为空'),
  turningPoints: z.array(importantEventSchema).default([]),
  adventures: z.array(z.string().min(1)).default([]),
  currentLife: z.string().min(1, '当前生活状态不能为空'),
})

// ============= Part F: 能力与专长块 Schema =============

export const skillSchema = z.object({
  name: z.string().min(1, '技能名称不能为空'),
  description: z.string().min(1, '技能描述不能为空'),
  level: z.nativeEnum(SkillLevel),
  source: z.string().optional(),
  isSpecialAbility: z.boolean().default(false),
})

export const skillsSchema = z.object({
  occupation: z.string().min(1, '职业或身份不能为空'),
  skills: z.array(skillSchema).default([]),
  weaknesses: z.array(z.string().min(1)).default([]),
  limitations: z.array(z.string().min(1)).default([]),
  combatStyle: z.string().optional(),
  toolProficiency: z.string().optional(),
})

// ============= Part G: 关系网络块 Schema =============

export const relationshipSchema = z.object({
  targetName: z.string().min(1, '关系对象名称不能为空'),
  targetId: uuidSchema.optional(),
  type: z.nativeEnum(RelationshipType),
  strength: z.nativeEnum(RelationshipStrength),
  description: z.string().min(1, '关系描述不能为空'),
  sharedMemories: z.array(z.string().min(1)).optional(),
})

export const relationshipsSchema = z.object({
  connections: z.array(relationshipSchema).default([]),
})

// ============= Part H: 设定与世界块 Schema =============

export const loreSchema = z.object({
  universe: z.string().min(1, '所属宇宙不能为空'),
  species: z.string().min(1, '种族或物种不能为空'),
  socialStatus: z.string().min(1, '社会阶级不能为空'),
  faction: z.string().min(1, '文化或派系不能为空'),
  religion: z.string().min(1, '宗教或信仰不能为空'),
  philosophy: z.string().min(1, '价值观和生活哲学不能为空'),
})

// ============= Part I: 补充信息块 Schema =============

export const additionalInfoSchema = z.object({
  hobbies: z.array(z.string().min(1)).default([]),
  dislikes: z.array(z.string().min(1)).default([]),
  habits: z.array(z.string().min(1)).default([]),
  dreams: z.array(z.string().min(1)).default([]),
  motto: z.string().min(1, '座右铭不能为空'),
  tags: z.array(z.string().min(1)).default([]),
})

// ============= Part J: 媒体资源块 Schema =============

export const mediaAssetSchema = z.object({
  type: z.enum(['avatar', 'full-body', 'reference', 'fan-art', 'other']),
  url: urlSchema,
  description: z.string().min(1, '资源描述不能为空'),
  isOfficial: z.boolean(),
  creator: z.string().optional(),
})

export const mediaAssetsSchema = z.object({
  profileImage: z.string().nullable().default(null),
  gallery: z.array(z.string()).default([]),
  voiceClaim: z.string().nullable().default(null),
  themeSong: z.string().nullable().default(null),
  assets: z.array(mediaAssetSchema).default([]),
})

// ============= Part K: 元数据块 Schema =============

export const metadataSchema = z.object({
  tags: z.array(z.string()).default([]),
  isPublic: z.boolean().default(true),
  isNSFW: z.boolean().default(false),
  language: z.string().default('zh-CN'),
  contentWarnings: z.array(z.string()).default([]),
  creatorInfo: z.object({
    name: z.string().min(1, '创作者名称不能为空'),
    contact: z.string().optional(),
  }),
  versionHistory: z
    .array(
      z.object({
        version: z.string().regex(/^\d+\.\d+\.\d+$/, '版本号格式应为 x.y.z'),
        date: isoDateSchema,
        changes: z.array(z.string().min(1)),
      })
    )
    .default([]),
  license: z.object({
    type: z.string().min(1, '许可证类型不能为空'),
    allowsFanWorks: z.boolean(),
    description: z.string().min(1, '许可证描述不能为空'),
  }),
  links: z
    .array(
      z.object({
        platform: z.string().min(1, '平台名称不能为空'),
        url: urlSchema,
      })
    )
    .default([]),
  customMetadata: z.record(z.string(), z.any()).default({}),
})

// ============= 完整角色 Schema =============

/**
 * 完整的 OC 角色数据 Schema
 */
export const characterSchema = z.object({
  basic: basicProfileSchema,
  appearance: appearanceSchema,
  wardrobe: wardrobeSchema,
  personality: personalitySchema,
  background: backgroundSchema,
  skills: skillsSchema,
  relationships: relationshipsSchema,
  lore: loreSchema,
  additionalInfo: additionalInfoSchema,
  media: mediaAssetsSchema,
  metadata: metadataSchema,
})

/**
 * 角色预览信息 Schema
 */
export const characterPreviewSchema = z.object({
  id: uuidSchema,
  nameEn: z.string().min(1),
  nameCn: z.string().min(1),
  nicknames: z.array(z.string().min(1)).default([]),
  gender: z.nativeEnum(Gender),
  createdAt: isoDateSchema,
  updatedAt: isoDateSchema,
  avatarUrl: urlSchema.optional(),
  mainTraits: z.array(z.string().min(1)).default([]),
  tags: z.array(z.string().min(1)).default([]),
})

/**
 * 角色创建/更新时的数据 Schema
 */
export const characterInputSchema = z.object({
  basic: basicProfileSchema.omit({id: true, createdAt: true, updatedAt: true, schemaVersion: true}),
  appearance: appearanceSchema.partial().optional(),
  wardrobe: wardrobeSchema.partial().optional(),
  personality: personalitySchema.partial().optional(),
  background: backgroundSchema.partial().optional(),
  skills: skillsSchema.partial().optional(),
  relationships: relationshipsSchema.partial().optional(),
  lore: loreSchema.partial().optional(),
  additionalInfo: additionalInfoSchema.partial().optional(),
  media: mediaAssetsSchema.partial().optional(),
  metadata: metadataSchema.partial().optional(),
})

// ============= 类型推断 =============

export type BasicProfile = z.infer<typeof basicProfileSchema>
export type Appearance = z.infer<typeof appearanceSchema>
export type Wardrobe = z.infer<typeof wardrobeSchema>
export type Personality = z.infer<typeof personalitySchema>
export type Background = z.infer<typeof backgroundSchema>
export type Skills = z.infer<typeof skillsSchema>
export type Relationships = z.infer<typeof relationshipsSchema>
export type Lore = z.infer<typeof loreSchema>
export type AdditionalInfo = z.infer<typeof additionalInfoSchema>
export type MediaAssets = z.infer<typeof mediaAssetsSchema>
export type Metadata = z.infer<typeof metadataSchema>
export type Character = z.infer<typeof characterSchema>
export type CharacterPreview = z.infer<typeof characterPreviewSchema>
export type CharacterInput = z.infer<typeof characterInputSchema>

// ============= 工具函数 =============

/**
 * 验证角色数据
 */
export function validateCharacter(data: unknown): Character {
  return characterSchema.parse(data)
}

/**
 * 安全验证角色数据（不抛出异常）
 */
export function safeValidateCharacter(data: unknown): {
  success: boolean;
  data?: Character;
  error?: z.ZodError
} {
  const result = characterSchema.safeParse(data)
  if (result.success) {
    return {success: true, data: result.data}
  } else {
    return {success: false, error: result.error}
  }
}

/**
 * 创建新角色的默认数据
 */
export function createDefaultCharacterInput(creatorName: string): CharacterInput {
  return {
    basic: {
      nameEn: '',
      nameCn: '',
      nicknames: [],
      gender: Gender.Unknown,
      creator: {
        name: creatorName,
      },
    },
    appearance: {
      body: {
        age: 18,
        height: 170,
        weight: 60,
        bodyType: BodyType.Average,
        skinTone: SkinTone.Medium,
      },
      face: {
        faceShape: FaceShape.Oval,
        eyeShape: EyeShape.Almond,
        eyeColor: CommonColor.Brown,
        lipColor: CommonColor.Pink,
      },
      hair: {
        primaryColor: CommonColor.Black,
        length: HairLength.Shoulder,
        style: HairStyle.Straight,
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
          style: ClothingStyle.Casual,
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
      assets: [],
    },
    metadata: {
      creatorInfo: {
        name: creatorName,
      },
      versionHistory: [],
      license: {
        type: 'All Rights Reserved',
        allowsFanWorks: false,
        description: '保留所有权利',
      },
      links: [],
      customMetadata: {},
    },
  }
}
