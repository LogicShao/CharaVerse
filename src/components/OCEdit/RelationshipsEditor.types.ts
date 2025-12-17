/**
 * RelationshipsEditor 类型定义
 */

import type { Relationships, Relationship } from '@/types/character'

export interface RelationshipsEditorProps {
  value: Relationships
  onChange: (value: Relationships) => void
  errors?: Record<string, string>
  disabled?: boolean
}

export interface RelationshipEditorProps {
  value: Relationship
  onChange: (value: Relationship) => void
  onRemove?: () => void
  index: number
  errors?: Record<string, string>
  disabled?: boolean
}
