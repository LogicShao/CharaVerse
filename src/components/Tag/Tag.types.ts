/**
 * Tag 组件类型定义
 */

import type { HTMLAttributes, ReactNode } from 'react'

/**
 * 标签变体类型
 */
export type TagVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'

/**
 * 标签尺寸类型
 */
export type TagSize = 'sm' | 'md' | 'lg'

/**
 * Tag 组件属性接口
 */
export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * 标签变体样式
   * @default 'default'
   */
  variant?: TagVariant

  /**
   * 标签尺寸
   * @default 'md'
   */
  size?: TagSize

  /**
   * 是否可关闭
   * @default false
   */
  closable?: boolean

  /**
   * 是否带边框
   * @default false
   */
  bordered?: boolean

  /**
   * 标签图标
   */
  icon?: ReactNode

  /**
   * 标签内容
   */
  children?: ReactNode

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 关闭时的回调
   */
  onClose?: (event: React.MouseEvent<HTMLSpanElement>) => void

  /**
   * 点击事件处理函数
   */
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void
}
