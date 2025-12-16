import type { ReactNode } from 'react'

/**
 * OC 详情页布局属性
 */
export interface OCDetailLayoutProps {
  /** 角色名称 */
  characterName: string
  /** Tab 配置数组 */
  tabs: TabConfig[]
  /** 当前激活的 Tab */
  activeTab: string
  /** Tab 切换回调 */
  onTabChange: (key: string) => void
  /** 返回按钮点击回调 */
  onBack: () => void
  /** 编辑按钮点击回调（可选） */
  onEdit?: () => void
  /** 是否显示加载状态 */
  loading?: boolean
  /** 附加的 CSS 类名 */
  className?: string
}

/**
 * Tab 配置
 */
export interface TabConfig {
  /** Tab 唯一标识 */
  key: string
  /** Tab 显示标签 */
  label: string
  /** Tab 内容 */
  content: ReactNode
}
