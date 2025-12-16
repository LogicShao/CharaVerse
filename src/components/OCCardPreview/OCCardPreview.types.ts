/**
 * OCCardPreview 组件类型定义
 */

import type { Character } from '@/types/character'

export interface OCCardPreviewProps {
  /** 角色数据 */
  character: Character
  /** 点击事件处理 */
  onClick?: (character: Character) => void
  /** 自定义类名 */
  className?: string
}
