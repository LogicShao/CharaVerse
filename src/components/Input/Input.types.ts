/**
 * Input 组件类型定义
 */

import type { InputHTMLAttributes, ReactNode } from 'react'

/**
 * 输入框尺寸类型
 */
export type InputSize = 'sm' | 'md' | 'lg'

/**
 * 输入框状态类型
 */
export type InputStatus = 'default' | 'error' | 'warning' | 'success'

/**
 * Input 组件属性接口
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /**
   * 输入框尺寸
   * @default 'md'
   */
  size?: InputSize

  /**
   * 输入框状态
   * @default 'default'
   */
  status?: InputStatus

  /**
   * 是否全宽
   * @default false
   */
  fullWidth?: boolean

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * 是否只读
   * @default false
   */
  readOnly?: boolean

  /**
   * 占位符文本
   */
  placeholder?: string

  /**
   * 标签文本
   */
  label?: string

  /**
   * 帮助文本
   */
  helperText?: string

  /**
   * 错误提示文本
   */
  errorText?: string

  /**
   * 前缀图标或内容
   */
  prefix?: ReactNode

  /**
   * 后缀图标或内容
   */
  suffix?: ReactNode

  /**
   * 是否必填
   * @default false
   */
  required?: boolean

  /**
   * 输入值
   */
  value?: string

  /**
   * 默认值
   */
  defaultValue?: string

  /**
   * 最大长度
   */
  maxLength?: number

  /**
   * 是否显示字符计数
   * @default false
   */
  showCount?: boolean

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 输入值改变时的回调
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void

  /**
   * 获得焦点时的回调
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void

  /**
   * 失去焦点时的回调
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}
