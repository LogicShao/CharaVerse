import type { Character } from '@/types/character'

/**
 * 外观信息面板属性
 */
export interface AppearancePanelProps {
  /** 角色数据 */
  character: Character
  /** 附加的 CSS 类名 */
  className?: string
}
