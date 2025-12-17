/**
 * OCEditPage 页面类型定义
 */

import type { Character } from '@/types/character'

export type OCEditPageProps = Record<string, never>

export interface EditorTab {
  key: string
  label: string
  description?: string
  required?: boolean
}

export interface EditorError {
  tabKey: string
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: EditorError[]
}

export interface EditorTabConfig {
  key: string
  label: string
  description: string
  requiredFields: string[]
  validate: (character: Character) => string[]
}

// 编辑器组件 props 类型
export interface BaseEditorProps<T> {
  value: T
  onChange: (value: T) => void
  errors?: Record<string, string>
  disabled?: boolean
}
