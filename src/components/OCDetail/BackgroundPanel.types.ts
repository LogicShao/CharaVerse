import type { Character } from '@/types/character'

/**
 * 背景故事面板属性
 */
export interface BackgroundPanelProps {
  /** 角色数据 */
  character: Character
  /** 附加的 CSS 类名 */
  className?: string
}
