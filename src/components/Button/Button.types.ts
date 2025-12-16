/**
 * Button 组件类型定义
 */

import type { ButtonHTMLAttributes, ReactNode } from 'react'

/**
 * 按钮变体类型
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'

/**
 * 按钮尺寸类型
 */
export type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * Button 组件属性接口
 */
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * 按钮变体样式
   * @default 'primary'
   */
  variant?: ButtonVariant

  /**
   * 按钮尺寸
   * @default 'md'
   */
  size?: ButtonSize

  /**
   * 是否为全宽按钮
   * @default false
   */
  fullWidth?: boolean

  /**
   * 是否处于加载状态
   * @default false
   */
  loading?: boolean

  /**
   * 是否禁用按钮
   * @default false
   */
  disabled?: boolean

  /**
   * 按钮类型
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset'

  /**
   * 按钮图标（可选）
   */
  icon?: ReactNode

  /**
   * 图标位置
   * @default 'left'
   */
  iconPosition?: 'left' | 'right'

  /**
   * 按钮内容
   */
  children?: ReactNode

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 点击事件处理函数
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
