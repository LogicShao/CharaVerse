/**
 * FormInput 组件类型定义
 * 基于 Input 组件的表单专用版本
 */

import type { InputProps } from '@/components/Input'

/**
 * FormInput 组件属性
 */
export interface FormInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  /** 字段名称 */
  name: string
  /** 字段值 */
  value: string
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
}
