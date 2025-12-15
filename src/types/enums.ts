// /**
//  * 基础类型和枚举定义
//  * 为 OC 角色数据模型提供类型安全的枚举值
//  */

// ============= 性别 =============
export const Gender = {
  Male: 'male',
  Female: 'female',
  NonBinary: 'non-binary',
  Other: 'other',
  Unknown: 'unknown',
} as const;
export type Gender = typeof Gender[keyof typeof Gender];

// ============= 体型 =============
export const BodyType = {
  Slim: 'slim',
  Athletic: 'athletic',
  Average: 'average',
  Chubby: 'chubby',
  Muscular: 'muscular',
  Petite: 'petite',
} as const;
export type BodyType = typeof BodyType[keyof typeof BodyType];

// ============= 发型长度 =============
export const HairLength = {
  Bald: 'bald',
  VeryShort: 'very-short',
  Short: 'short',
  Shoulder: 'shoulder',
  Long: 'long',
  VeryLong: 'very-long',
} as const;
export type HairLength = typeof HairLength[keyof typeof HairLength];

// ============= 发型类型 =============
export const HairStyle = {
  Straight: 'straight',
  Wavy: 'wavy',
  Curly: 'curly',
  Braided: 'braided',
  Ponytail: 'ponytail',
  Bun: 'bun',
  TwinTails: 'twin-tails',
  Bob: 'bob',
  Other: 'other',
} as const;
export type HairStyle = typeof HairStyle[keyof typeof HairStyle];

// ============= 眼睛形状 =============
export const EyeShape = {
  Almond: 'almond',
  Round: 'round',
  Hooded: 'hooded',
  Upturned: 'upturned',
  Downturned: 'downturned',
  Monolid: 'monolid',
  DeepSet: 'deep-set',
} as const;
export type EyeShape = typeof EyeShape[keyof typeof EyeShape];

// ============= 常见颜色（眼睛、头发等） =============
export const CommonColor = {
  Black: 'black',
  Brown: 'brown',
  DarkBrown: 'dark-brown',
  LightBrown: 'light-brown',
  Blonde: 'blonde',
  Red: 'red',
  Auburn: 'auburn',
  Gray: 'gray',
  White: 'white',
  Blue: 'blue',
  Green: 'green',
  Hazel: 'hazel',
  Amber: 'amber',
  Purple: 'purple',
  Pink: 'pink',
  Silver: 'silver',
  Gold: 'gold',
  Multicolor: 'multicolor',
  Other: 'other',
} as const;
export type CommonColor = typeof CommonColor[keyof typeof CommonColor];

// ============= 脸型 =============
export const FaceShape = {
  Oval: 'oval',
  Round: 'round',
  Square: 'square',
  Heart: 'heart',
  Diamond: 'diamond',
  Long: 'long',
  Triangle: 'triangle',
} as const;
export type FaceShape = typeof FaceShape[keyof typeof FaceShape];

// ============= 肤色 =============
export const SkinTone = {
  VeryPale: 'very-pale',
  Pale: 'pale',
  Fair: 'fair',
  Light: 'light',
  Medium: 'medium',
  Tan: 'tan',
  Olive: 'olive',
  Brown: 'brown',
  Dark: 'dark',
  VeryDark: 'very-dark',
  Other: 'other',
} as const;
export type SkinTone = typeof SkinTone[keyof typeof SkinTone];

// ============= 关系类型 =============
export const RelationshipType = {
  Family: 'family',
  Friend: 'friend',
  BestFriend: 'best-friend',
  Romantic: 'romantic',
  Enemy: 'enemy',
  Rival: 'rival',
  Mentor: 'mentor',
  Student: 'student',
  Colleague: 'colleague',
  Acquaintance: 'acquaintance',
  Stranger: 'stranger',
  Other: 'other',
} as const;
export type RelationshipType = typeof RelationshipType[keyof typeof RelationshipType];

// ============= 关系强度 =============
export const RelationshipStrength = {
  VeryWeak: 1,
  Weak: 2,
  Moderate: 3,
  Strong: 4,
  VeryStrong: 5,
} as const;
export type RelationshipStrength = typeof RelationshipStrength[keyof typeof RelationshipStrength];

// ============= 技能等级 =============
export const SkillLevel = {
  Novice: 'novice',
  Beginner: 'beginner',
  Intermediate: 'intermediate',
  Advanced: 'advanced',
  Expert: 'expert',
  Master: 'master',
} as const;
export type SkillLevel = typeof SkillLevel[keyof typeof SkillLevel];

// ============= 服装风格 =============
export const ClothingStyle = {
  Casual: 'casual',
  Formal: 'formal',
  Business: 'business',
  Sport: 'sport',
  Traditional: 'traditional',
  Modern: 'modern',
  Fantasy: 'fantasy',
  SciFi: 'sci-fi',
  Military: 'military',
  School: 'school',
  Combat: 'combat',
  Other: 'other',
} as const;
export type ClothingStyle = typeof ClothingStyle[keyof typeof ClothingStyle];

// ============= MBTI 类型 =============
export const MBTIType = {
  INTJ: 'INTJ',
  INTP: 'INTP',
  ENTJ: 'ENTJ',
  ENTP: 'ENTP',
  INFJ: 'INFJ',
  INFP: 'INFP',
  ENFJ: 'ENFJ',
  ENFP: 'ENFP',
  ISTJ: 'ISTJ',
  ISFJ: 'ISFJ',
  ESTJ: 'ESTJ',
  ESFJ: 'ESFJ',
  ISTP: 'ISTP',
  ISFP: 'ISFP',
  ESTP: 'ESTP',
  ESFP: 'ESFP',
} as const;
export type MBTIType = typeof MBTIType[keyof typeof MBTIType];

// ============= 血型 =============
export const BloodType = {
  A: 'A',
  B: 'B',
  AB: 'AB',
  O: 'O',
  Unknown: 'unknown',
} as const;
export type BloodType = typeof BloodType[keyof typeof BloodType];

// ============= 星座 =============
export const Zodiac = {
  Aries: 'aries',
  Taurus: 'taurus',
  Gemini: 'gemini',
  Cancer: 'cancer',
  Leo: 'leo',
  Virgo: 'virgo',
  Libra: 'libra',
  Scorpio: 'scorpio',
  Sagittarius: 'sagittarius',
  Capricorn: 'capricorn',
  Aquarius: 'aquarius',
  Pisces: 'pisces',
} as const;
export type Zodiac = typeof Zodiac[keyof typeof Zodiac];

// ============= 类型别名 =============
export type UUID = string;
export type ISODateString = string;
export type URL = string;
export type HexColor = string; // 格式: #RRGGBB