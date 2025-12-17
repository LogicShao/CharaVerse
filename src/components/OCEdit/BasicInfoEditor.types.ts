/**
 * BasicInfoEditor 组件类型定义
 */

import type { BasicProfile } from '@/types/character'

export interface BasicInfoEditorProps {
  /** 基础信息数据 */
  value: BasicProfile
  /** 数据变化回调 */
  onChange: (value: BasicProfile) => void
  /** 验证错误 */
  errors?: Partial<Record<keyof BasicProfile | string, string>>
}
