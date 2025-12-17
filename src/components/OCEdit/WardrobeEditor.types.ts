/**
 * WardrobeEditor 类型定义
 */

import type { Wardrobe, Outfit, Accessory } from '@/types/character'

export interface WardrobeEditorProps {
  value: Wardrobe
  onChange: (value: Wardrobe) => void
  errors?: Record<string, string>
  disabled?: boolean
}

export interface OutfitEditorProps {
  value: Outfit
  onChange: (value: Outfit) => void
  onRemove?: () => void
  index: number
  errors?: Record<string, string>
  disabled?: boolean
}

export interface AccessoryEditorProps {
  value: Accessory
  onChange: (value: Accessory) => void
  onRemove?: () => void
  index: number
  errors?: Record<string, string>
  disabled?: boolean
}
