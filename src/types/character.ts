/**
 * OC 角色数据模型接口定义
 * 按照 PROJECT.md 中的 11 个部分进行组织
 */

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
    type UUID,
    type ISODateString,
    type URL,
    type HexColor,
} from './enums'

// ============= Part A: 基础信息块（Basic Profile） =============

/**
 * 基础信息接口
 */
export interface BasicProfile {
    /** 唯一标识符（UUID v4） */
    id: UUID
    /** 英文名 */
    nameEn: string
    /** 中文名 */
    nameCn: string
    /** 昵称/别称列表 */
    nicknames: string[]
    /** 性别 */
    gender: Gender
    /** 创建日期（ISO 8601） */
    createdAt: ISODateString
    /** 最后修改日期（ISO 8601） */
    updatedAt: ISODateString
    /** 创作者信息 */
    creator: {
        /** 创作者名称 */
        name: string
        /** 创作者联系方式（可选） */
        contact?: string
    }
    /** Schema 版本号（语义化版本） */
    schemaVersion: string
}

// ============= Part B: 外观设计块（Appearance） =============

/**
 * 身体信息
 */
export interface BodyInfo {
    /** 实际年龄（岁） */
    age: number
    /** 生理年龄（岁，可选） */
    biologicalAge?: number
    /** 身高（厘米） */
    height: number
    /** 体重（千克） */
    weight: number
    /** 体型 */
    bodyType: BodyType
    /** 肤色 */
    skinTone: SkinTone
    /** 肤质描述（可选） */
    skinTexture?: string
}

/**
 * 面部特征
 */
export interface FacialFeatures {
    /** 脸型 */
    faceShape: FaceShape
    /** 眼睛形状 */
    eyeShape: EyeShape
    /** 眼睛颜色 */
    eyeColor: CommonColor
    /** 眉毛形状描述（可选） */
    eyebrowShape?: string
    /** 眉毛颜色（可选） */
    eyebrowColor?: CommonColor
    /** 鼻子形状描述（可选） */
    noseShape?: string
    /** 嘴唇颜色 */
    lipColor: CommonColor
    /** 嘴唇厚度描述（可选） */
    lipThickness?: string
}

/**
 * 发型信息
 */
export interface HairInfo {
    /** 发色（主色） */
    primaryColor: CommonColor
    /** 发色（副色，可选） */
    secondaryColor?: CommonColor
    /** 发长 */
    length: HairLength
    /** 发型 */
    style: HairStyle
    /** 发型名称/描述 */
    description: string
    /** 发质描述（可选） */
    texture?: string
}

/**
 * 脸部标记
 */
export interface FacialMark {
    /** 标记类型（疤痕、纹身、胎记、雀斑等） */
    type: 'scar' | 'tattoo' | 'birthmark' | 'freckles' | 'other'
    /** 位置描述 */
    location: string
    /** 大小描述（可选） */
    size?: string
    /** 故事/含义（可选） */
    story?: string
}

/**
 * 装饰品
 */
export interface Accessory {
    /** 类型（耳环、项链、手环、眼镜等） */
    type: string
    /** 描述 */
    description: string
    /** 材质（可选） */
    material?: string
    /** 颜色（可选） */
    color?: string
}

/**
 * 完整的外观信息
 */
export interface Appearance {
    /** 身体信息 */
    body: BodyInfo
    /** 面部特征 */
    face: FacialFeatures
    /** 发型信息 */
    hair: HairInfo
    /** 脸部标记列表 */
    facialMarks: FacialMark[]
    /** 装饰品列表 */
    accessories: Accessory[]
    /** 体毛特征描述（可选） */
    bodyHair?: string
}

// ============= Part C: 服装与配饰块（Wardrobe） =============

/**
 * 单套服装
 */
export interface Outfit {
    /** 服装名称 */
    name: string
    /** 完整描述 */
    description: string
    /** 主要颜色 */
    primaryColor: HexColor
    /** 次要颜色（可选） */
    secondaryColor?: HexColor
    /** 风格分类 */
    style: ClothingStyle
    /** 关联故事或场景（可选） */
    story?: string
    /** 是否为默认服装 */
    isDefault: boolean
}

/**
 * 服装与配饰信息
 */
export interface Wardrobe {
    /** 服装列表 */
    outfits: Outfit[]
    /** 主要配饰列表 */
    mainAccessories: Accessory[]
    /** 标志性武器或工具（可选） */
    signatureWeapon?: {
        /** 名称 */
        name: string
        /** 描述 */
        description: string
        /** 类型 */
        type: string
    }
}

// ============= Part D: 性格与心理块（Personality & Psychology） =============

/**
 * 性格特质
 */
export interface PersonalityTrait {
    /** 特质名称 */
    name: string
    /** 描述 */
    description: string
    /** 是否为积极特质 */
    isPositive: boolean
    /** 强度（1-5） */
    intensity: number
}

/**
 * 心理状态
 */
export interface Psychology {
    /** 主要恐惧 */
    mainFear: string
    /** 核心欲望 */
    coreDesire: string
    /** 创伤或心理阴影（可选） */
    trauma?: string
    /** 心理防御机制（可选） */
    defenseMechanism?: string
}

/**
 * 表现方式
 */
export interface Expression {
    /** 说话习惯 */
    speechHabits: string[]
    /** 口头禅列表 */
    catchphrases: string[]
    /** 行动风格描述 */
    actionStyle: string
    /** 情感表达方式 */
    emotionalExpression: string
    /** 肢体语言特征 */
    bodyLanguage: string[]
}

/**
 * 性格与心理信息
 */
export interface Personality {
    /** MBTI 类型（可选） */
    mbti?: MBTIType
    /** 星座（可选） */
    zodiac?: Zodiac
    /** 血型（可选） */
    bloodType?: BloodType
    /** 核心性格描述 */
    coreDescription: string
    /** 性格特质列表 */
    traits: PersonalityTrait[]
    /** 性格动机 */
    motivation: string
    /** 心理状态 */
    psychology: Psychology
    /** 表现方式 */
    expression: Expression
}

// ============= Part E: 背景故事块（Background Story） =============

/**
 * 家庭成员
 */
export interface FamilyMember {
    /** 关系（父亲、母亲、兄弟姐妹等） */
    relationship: string
    /** 姓名 */
    name: string
    /** 描述（可选） */
    description?: string
    /** 是否在世（可选） */
    isAlive?: boolean
}

/**
 * 重要事件
 */
export interface ImportantEvent {
    /** 事件名称 */
    name: string
    /** 发生时间（年龄或具体时间） */
    time: string
    /** 事件描述 */
    description: string
    /** 对角色的影响 */
    impact: string
}

/**
 * 背景故事信息
 */
export interface Background {
    /** 出生地 */
    birthplace: string
    /** 社会背景 */
    socialBackground: string
    /** 家庭成员列表 */
    family: FamilyMember[]
    /** 童年经历描述 */
    childhood: string
    /** 教育背景 */
    education: string
    /** 重要人生转折点列表 */
    turningPoints: ImportantEvent[]
    /** 主要经历和冒险 */
    adventures: string[]
    /** 当前生活状态 */
    currentLife: string
}

// ============= Part F: 能力与专长块（Skills & Abilities） =============

/**
 * 技能项
 */
export interface Skill {
    /** 技能名称 */
    name: string
    /** 技能描述 */
    description: string
    /** 掌握等级 */
    level: SkillLevel
    /** 相关装备或学习来源（可选） */
    source?: string
    /** 是否为特殊能力 */
    isSpecialAbility: boolean
}

/**
 * 能力与专长信息
 */
export interface Skills {
    /** 职业或身份 */
    occupation: string
    /** 技能列表 */
    skills: Skill[]
    /** 弱点描述 */
    weaknesses: string[]
    /** 限制描述 */
    limitations: string[]
    /** 战斗风格（如果适用，可选） */
    combatStyle?: string
    /** 工具掌握度描述（可选） */
    toolProficiency?: string
}

// ============= Part G: 关系网络块（Relationships） =============

/**
 * 单个关系
 */
export interface Relationship {
    /** 关系对象名称 */
    targetName: string
    /** 关系对象 ID（如果是同一系统中的其他 OC） */
    targetId?: UUID
    /** 关系类型 */
    type: RelationshipType
    /** 关系强度 */
    strength: RelationshipStrength
    /** 关系描述 */
    description: string
    /** 重要事件或共同回忆（可选） */
    sharedMemories?: string[]
}

/**
 * 关系网络信息
 */
export interface Relationships {
    /** 关系列表 */
    connections: Relationship[]
}

// ============= Part H: 设定与世界块（Lore & World） =============

/**
 * 设定与世界信息
 */
export interface Lore {
    /** 所属宇宙或世界观 */
    universe: string
    /** 种族或物种信息 */
    species: string
    /** 社会阶级或身份地位 */
    socialStatus: string
    /** 文化或派系从属 */
    faction: string
    /** 宗教或信仰 */
    religion: string
    /** 价值观和生活哲学 */
    philosophy: string
}

// ============= Part I: 补充信息块（Additional Info） =============

/**
 * 补充信息
 */
export interface AdditionalInfo {
    /** 爱好和兴趣列表 */
    hobbies: string[]
    /** 讨厌的东西列表 */
    dislikes: string[]
    /** 特殊习惯列表 */
    habits: string[]
    /** 梦想和目标 */
    dreams: string[]
    /** 座右铭或个性签名 */
    motto: string
    /** 标签（用于分类和检索） */
    tags: string[]
}

// ============= Part J: 媒体资源块（Media Assets） =============

/**
 * 媒体资源项
 */
export interface MediaAsset {
    /** 资源类型（avatar、full-body、reference 等） */
    type: 'avatar' | 'full-body' | 'reference' | 'fan-art' | 'other'
    /** 资源 URL 或本地路径 */
    url: URL
    /** 描述 */
    description: string
    /** 是否为官方资源 */
    isOfficial: boolean
    /** 创作者（如果是同人作品，可选） */
    creator?: string
}

/**
 * 媒体资源信息
 */
export interface MediaAssets {
    /** 媒体资源列表 */
    assets: MediaAsset[]
}

// ============= Part K: 元数据块（Metadata） =============

/**
 * 元数据信息
 */
export interface Metadata {
    /** 创建者信息（冗余存储，便于查询） */
    creatorInfo: {
        name: string
        contact?: string
    }
    /** 版本历史 */
    versionHistory: Array<{
        version: string
        date: ISODateString
        changes: string[]
    }>
    /** 许可证信息 */
    license: {
        /** 许可证类型 */
        type: string
        /** 是否允许同人创作 */
        allowsFanWorks: boolean
        /** 许可证描述 */
        description: string
    }
    /** 相关链接 */
    links: Array<{
        /** 平台名称 */
        platform: string
        /** 链接 */
        url: URL
    }>
    /** 自定义元数据（键值对） */
    customMetadata: Record<string, unknown>
}

// ============= 完整角色接口 =============

/**
 * 完整的 OC 角色数据接口
 * 组合所有 11 个部分
 */
export interface Character {
    /** 基础信息（Part A） */
    basic: BasicProfile
    /** 外观信息（Part B） */
    appearance: Appearance
    /** 服装与配饰（Part C） */
    wardrobe: Wardrobe
    /** 性格与心理（Part D） */
    personality: Personality
    /** 背景故事（Part E） */
    background: Background
    /** 能力与专长（Part F） */
    skills: Skills
    /** 关系网络（Part G） */
    relationships: Relationships
    /** 设定与世界（Part H） */
    lore: Lore
    /** 补充信息（Part I） */
    additionalInfo: AdditionalInfo
    /** 媒体资源（Part J） */
    media: MediaAssets
    /** 元数据（Part K） */
    metadata: Metadata
}

/**
 * 角色预览信息（用于列表展示）
 */
export interface CharacterPreview {
    id: UUID
    nameEn: string
    nameCn: string
    nicknames: string[]
    gender: Gender
    createdAt: ISODateString
    updatedAt: ISODateString
    /** 头像 URL */
    avatarUrl?: URL
    /** 主要性格特质（前3个） */
    mainTraits: string[]
    /** 标签（用于搜索） */
    tags: string[]
}

/**
 * 角色创建/更新时的数据（部分字段可选）
 */
export type CharacterInput = Partial<Omit<Character, 'basic'>> & {
    basic: Omit<BasicProfile, 'id' | 'createdAt' | 'updatedAt' | 'schemaVersion'>
}
