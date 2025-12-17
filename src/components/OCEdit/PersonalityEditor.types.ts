/**
 * PersonalityEditor 类型定义
 */

import type { Personality, PersonalityTrait, Psychology, Expression } from '@/types/character'

export interface PersonalityEditorProps {
  value: Personality
  onChange: (value: Personality) => void
  errors?: Record<string, string>
  disabled?: boolean
}

export interface TraitEditorProps {
  value: PersonalityTrait
  onChange: (value: PersonalityTrait) => void
  onRemove?: () => void
  index: number
  errors?: Record<string, string>
  disabled?: boolean
}

export interface PsychologyEditorProps {
  value: Psychology
  onChange: (value: Psychology) => void
  errors?: Record<string, string>
  disabled?: boolean
}

export interface ExpressionEditorProps {
  value: Expression
  onChange: (value: Expression) => void
  errors?: Record<string, string>
  disabled?: boolean
}