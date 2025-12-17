/**
 * AdditionalInfoEditor 类型定义
 */

import type { AdditionalInfo } from '@/types/character'

export interface AdditionalInfoEditorProps {
  value: AdditionalInfo
  onChange: (value: AdditionalInfo) => void
  errors?: Record<string, string>
  disabled?: boolean
}
