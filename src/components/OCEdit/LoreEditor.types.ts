/**
 * LoreEditor 类型定义
 */

import type { Lore } from '@/types/character'

export interface LoreEditorProps {
  value: Lore
  onChange: (value: Lore) => void
  errors?: Record<string, string>
  disabled?: boolean
}
