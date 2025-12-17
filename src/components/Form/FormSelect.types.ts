/**
 * FormSelect 组件类型定义
 * 基于 Select 组件的表单专用版本
 */

import type { SelectProps, SelectOption } from '@/components/Select'

/**
 * FormSelect 组件属性
 */
export interface FormSelectProps<T extends string | number = string>
  extends Omit<SelectProps<T>, 'value' | 'onChange'> {
  /** 字段名称 */
  name: string
  /** 字段值 */
  value: T | undefined
  /** 值变化回调 */
  onChange: (value: T | undefined, name: string) => void
  /** 验证错误信息 */
  error?: string
  /** 是否必填 */
  required?: boolean
  /** 字段标签 */
  label?: string
  /** 帮助文本 */
  helperText?: string
}

export type { SelectOption }
