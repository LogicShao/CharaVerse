/**
 * Card 组件类型定义
 */

import type { HTMLAttributes, ReactNode } from 'react'

/**
 * 卡片变体类型
 */
export type CardVariant = 'default' | 'bordered' | 'elevated' | 'flat'

/**
 * Card 组件属性接口
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 卡片变体样式
   * @default 'default'
   */
  variant?: CardVariant

  /**
   * 是否可悬停
   * @default false
   */
  hoverable?: boolean

  /**
   * 是否可点击
   * @default false
   */
  clickable?: boolean

  /**
   * 卡片内容
   */
  children?: ReactNode

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 点击事件处理函数
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

/**
 * CardHeader 组件属性接口
 */
export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * 标题内容
   */
  title?: ReactNode

  /**
   * 子标题内容
   */
  subtitle?: ReactNode

  /**
   * 额外内容（通常放在右侧）
   */
  extra?: ReactNode

  /**
   * 子元素
   */
  children?: ReactNode

  /**
   * 自定义类名
   */
  className?: string
}

/**
 * CardBody 组件属性接口
 */
export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 卡片主体内容
   */
  children?: ReactNode

  /**
   * 自定义类名
   */
  className?: string
}

/**
 * CardFooter 组件属性接口
 */
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 卡片底部内容
   */
  children?: ReactNode

  /**
   * 自定义类名
   */
  className?: string
}
