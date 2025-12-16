/**
 * FilterPanel 组件类型定义
 */

export interface FilterOptions {
  /** 选中的标签 */
  selectedTags: string[]
  /** 排序方式 */
  sortBy: 'name' | 'date' | 'updated'
  /** 排序顺序 */
  sortOrder: 'asc' | 'desc'
  /** 性别筛选 */
  gender?: string
  /** MBTI 类型筛选 */
  mbti?: string
}

export interface FilterPanelProps {
  /** 所有可用标签 */
  availableTags: string[]
  /** 当前筛选选项 */
  filterOptions: FilterOptions
  /** 筛选选项变化回调 */
  onChange: (options: FilterOptions) => void
  /** 重置筛选 */
  onReset: () => void
  /** 自定义类名 */
  className?: string
}
