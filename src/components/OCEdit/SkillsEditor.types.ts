/**
 * SkillsEditor 类型定义
 */

import type { Skills, Skill } from '@/types/character'

export interface SkillsEditorProps {
  value: Skills
  onChange: (value: Skills) => void
  errors?: Record<string, string>
  disabled?: boolean
}

export interface SkillEditorProps {
  value: Skill
  onChange: (value: Skill) => void
  onRemove?: () => void
  index: number
  errors?: Record<string, string>
  disabled?: boolean
}
