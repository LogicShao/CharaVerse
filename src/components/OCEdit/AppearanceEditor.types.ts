/**
 * AppearanceEditor 类型定义
 */

import type { Appearance } from '@/types/character'

export interface AppearanceEditorProps {
  value: Appearance
  onChange: (value: Appearance) => void
  errors?: Record<string, string>
  disabled?: boolean
}

export interface BodyInfoEditorProps {
  value: Appearance['body']
  onChange: (value: Appearance['body']) => void
  errors?: Record<string, string>
}

export interface FacialFeaturesEditorProps {
  value: Appearance['face']
  onChange: (value: Appearance['face']) => void
  errors?: Record<string, string>
}

export interface HairInfoEditorProps {
  value: Appearance['hair']
  onChange: (value: Appearance['hair']) => void
  errors?: Record<string, string>
}

export interface FacialMarkEditorProps {
  value: Appearance['facialMarks']
  onChange: (value: Appearance['facialMarks']) => void
  errors?: Record<string, string>
}

export interface AccessoryEditorProps {
  value: Appearance['accessories']
  onChange: (value: Appearance['accessories']) => void
  errors?: Record<string, string>
}