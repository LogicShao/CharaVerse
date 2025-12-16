import type { Character } from '@/types/character'

/**
 * 基础信息面板属性
 */
export interface BasicInfoPanelProps {
  /** 角色数据 */
  character: Character
  /** 附加的 CSS 类名 */
  className?: string
}
