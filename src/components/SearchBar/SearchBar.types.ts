/**
 * SearchBar 组件类型定义
 */

export interface SearchBarProps {
  /** 搜索值 */
  value: string
  /** 搜索值变化回调 */
  onChange: (value: string) => void
  /** 占位符文本 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义类名 */
  className?: string
}
