/**
 * BackgroundEditor 类型定义
 */

import type { Background, FamilyMember, ImportantEvent } from '@/types/character'

export interface BackgroundEditorProps {
  value: Background
  onChange: (value: Background) => void
  errors?: Record<string, string>
  disabled?: boolean
}

export interface FamilyMemberEditorProps {
  value: FamilyMember
  onChange: (value: FamilyMember) => void
  onRemove?: () => void
  index: number
  errors?: Record<string, string>
  disabled?: boolean
}

export interface ImportantEventEditorProps {
  value: ImportantEvent
  onChange: (value: ImportantEvent) => void
  onRemove?: () => void
  index: number
  errors?: Record<string, string>
  disabled?: boolean
}
