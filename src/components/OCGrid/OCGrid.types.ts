/**
 * OCGrid 组件类型定义
 */

import type { Character } from '@/types/character'

export interface OCGridProps {
  /** 角色列表 */
  characters: Character[]
  /** 是否加载中 */
  loading?: boolean
  /** 卡片点击事件 */
  onCardClick?: (character: Character) => void
  /** 自定义类名 */
  className?: string
}
