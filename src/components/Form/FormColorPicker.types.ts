/**
 * FormColorPicker 组件类型定义
 */

import type { HexColor } from '@/types/enums'

export interface FormColorPickerProps {
  /** 字段名称 */
  name: string
  /** 字段值（十六进制颜色） */
  value: HexColor | string
  /** 值变化回调 */
  onChange: (value: string, name: string) => void
  /** 验证错误信息 */
  error?: string
  /** 是否必填 */
  required?: boolean
  /** 字段标签 */
  label?: string
  /** 帮助文本 */
  helperText?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否全宽 */
  fullWidth?: boolean
  /** 自定义类名 */
  className?: string
  /** 预设颜色列表 */
  presetColors?: string[]
}
