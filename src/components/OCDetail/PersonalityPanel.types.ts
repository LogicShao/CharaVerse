import type { Character } from '@/types/character'

/**
 * 性格信息面板属性
 */
export interface PersonalityPanelProps {
  /** 角色数据 */
  character: Character
  /** 附加的 CSS 类名 */
  className?: string
}
