/**
 * 基础类型和枚举定义
 * 为 OC 角色数据模型提供类型安全的枚举值
 */

// ============= 性别 =============
export enum Gender {
  Male = 'male',
  Female = 'female',
  NonBinary = 'non-binary',
  Other = 'other',
  Unknown = 'unknown',
}

// ============= 体型 =============
export enum BodyType {
  Slim = 'slim',           // 纤细
  Athletic = 'athletic',   // 健壮
  Average = 'average',     // 普通
  Chubby = 'chubby',       // 圆润
  Muscular = 'muscular',   // 肌肉发达
  Petite = 'petite',       // 娇小
}

// ============= 发型长度 =============
export enum HairLength {
  Bald = 'bald',               // 光头
  VeryShort = 'very-short',    // 超短
  Short = 'short',             // 短发
  Shoulder = 'shoulder',       // 齐肩
  Long = 'long',               // 长发
  VeryLong = 'very-long',      // 超长发
}

// ============= 发型类型 =============
export enum HairStyle {
  Straight = 'straight',       // 直发
  Wavy = 'wavy',              // 波浪卷
  Curly = 'curly',            // 卷发
  Braided = 'braided',        // 编发
  Ponytail = 'ponytail',      // 马尾
  Bun = 'bun',                // 发髻
  TwinTails = 'twin-tails',   // 双马尾
  Bob = 'bob',                // 短发波波头
  Other = 'other',            // 其他
}

// ============= 眼睛形状 =============
export enum EyeShape {
  Almond = 'almond',           // 杏仁眼
  Round = 'round',             // 圆眼
  Hooded = 'hooded',           // 垂眼
  Upturned = 'upturned',       // 上挑眼
  Downturned = 'downturned',   // 下垂眼
  Monolid = 'monolid',         // 单眼皮
  DeepSet = 'deep-set',        // 深邃眼
}

// ============= 常见颜色（眼睛、头发等） =============
export enum CommonColor {
  Black = 'black',
  Brown = 'brown',
  DarkBrown = 'dark-brown',
  LightBrown = 'light-brown',
  Blonde = 'blonde',
  Red = 'red',
  Auburn = 'auburn',
  Gray = 'gray',
  White = 'white',
  Blue = 'blue',
  Green = 'green',
  Hazel = 'hazel',
  Amber = 'amber',
  Purple = 'purple',
  Pink = 'pink',
  Silver = 'silver',
  Gold = 'gold',
  Multicolor = 'multicolor',
  Other = 'other',
}

// ============= 脸型 =============
export enum FaceShape {
  Oval = 'oval',           // 鹅蛋脸
  Round = 'round',         // 圆脸
  Square = 'square',       // 方脸
  Heart = 'heart',         // 心形脸
  Diamond = 'diamond',     // 菱形脸
  Long = 'long',           // 长脸
  Triangle = 'triangle',   // 三角脸
}

// ============= 肤色 =============
export enum SkinTone {
  VeryPale = 'very-pale',
  Pale = 'pale',
  Fair = 'fair',
  Light = 'light',
  Medium = 'medium',
  Tan = 'tan',
  Olive = 'olive',
  Brown = 'brown',
  Dark = 'dark',
  VeryDark = 'very-dark',
  Other = 'other',
}

// ============= 关系类型 =============
export enum RelationshipType {
  Family = 'family',           // 家人
  Friend = 'friend',           // 朋友
  BestFriend = 'best-friend',  // 挚友
  Romantic = 'romantic',       // 恋人
  Enemy = 'enemy',             // 敌人
  Rival = 'rival',             // 对手
  Mentor = 'mentor',           // 导师
  Student = 'student',         // 学生
  Colleague = 'colleague',     // 同事
  Acquaintance = 'acquaintance', // 熟人
  Stranger = 'stranger',       // 陌生人
  Other = 'other',
}

// ============= 关系强度 =============
export enum RelationshipStrength {
  VeryWeak = 1,
  Weak = 2,
  Moderate = 3,
  Strong = 4,
  VeryStrong = 5,
}

// ============= 技能等级 =============
export enum SkillLevel {
  Novice = 'novice',           // 新手
  Beginner = 'beginner',       // 初学者
  Intermediate = 'intermediate', // 中级
  Advanced = 'advanced',       // 高级
  Expert = 'expert',           // 专家
  Master = 'master',           // 大师
}

// ============= 服装风格 =============
export enum ClothingStyle {
  Casual = 'casual',           // 休闲
  Formal = 'formal',           // 正装
  Business = 'business',       // 商务
  Sport = 'sport',             // 运动
  Traditional = 'traditional', // 传统
  Modern = 'modern',           // 现代
  Fantasy = 'fantasy',         // 奇幻
  SciFi = 'sci-fi',           // 科幻
  Military = 'military',       // 军装
  School = 'school',           // 校服
  Combat = 'combat',           // 战斗
  Other = 'other',
}

// ============= MBTI 类型 =============
export enum MBTIType {
  INTJ = 'INTJ',
  INTP = 'INTP',
  ENTJ = 'ENTJ',
  ENTP = 'ENTP',
  INFJ = 'INFJ',
  INFP = 'INFP',
  ENFJ = 'ENFJ',
  ENFP = 'ENFP',
  ISTJ = 'ISTJ',
  ISFJ = 'ISFJ',
  ESTJ = 'ESTJ',
  ESFJ = 'ESFJ',
  ISTP = 'ISTP',
  ISFP = 'ISFP',
  ESTP = 'ESTP',
  ESFP = 'ESFP',
}

// ============= 血型 =============
export enum BloodType {
  A = 'A',
  B = 'B',
  AB = 'AB',
  O = 'O',
  Unknown = 'unknown',
}

// ============= 星座 =============
export enum Zodiac {
  Aries = 'aries',           // 白羊座
  Taurus = 'taurus',         // 金牛座
  Gemini = 'gemini',         // 双子座
  Cancer = 'cancer',         // 巨蟹座
  Leo = 'leo',               // 狮子座
  Virgo = 'virgo',           // 处女座
  Libra = 'libra',           // 天秤座
  Scorpio = 'scorpio',       // 天蝎座
  Sagittarius = 'sagittarius', // 射手座
  Capricorn = 'capricorn',   // 摩羯座
  Aquarius = 'aquarius',     // 水瓶座
  Pisces = 'pisces',         // 双鱼座
}

// ============= 类型别名 =============
export type UUID = string
export type ISODateString = string
export type URL = string
export type HexColor = string // 格式: #RRGGBB
