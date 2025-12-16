import type { ReactNode } from 'react'

/**
 * Tabs 组件属性
 */
export interface TabsProps {
  /** Tab 项数组 */
  items: TabItem[]
  /** 当前激活的 Tab 值 */
  activeKey: string
  /** Tab 切换时的回调 */
  onChange: (key: string) => void
  /** 附加的 CSS 类名 */
  className?: string
}

/**
 * Tab 项配置
 */
export interface TabItem {
  /** Tab 的唯一标识 */
  key: string
  /** Tab 显示的标签文本 */
  label: string
  /** Tab 内容 */
  children: ReactNode
  /** 是否禁用 */
  disabled?: boolean
}
