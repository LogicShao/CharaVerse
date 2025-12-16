/**
 * 筛选面板组件
 * 支持按标签、排序方式筛选
 */

import type { FC } from 'react'
import { Filter, ArrowUpDown } from 'lucide-react'
import { Tag } from '@/components'
import type { FilterPanelProps } from './FilterPanel.types'
import styles from './FilterPanel.module.css'

export const FilterPanel: FC<FilterPanelProps> = ({
  availableTags,
  filterOptions,
  onChange,
  onReset,
  className,
}) => {
  const handleTagToggle = (tag: string) => {
    const { selectedTags } = filterOptions
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]

    onChange({
      ...filterOptions,
      selectedTags: newTags,
    })
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...filterOptions,
      sortBy: e.target.value as 'name' | 'date' | 'updated',
    })
  }

  const handleOrderToggle = () => {
    onChange({
      ...filterOptions,
      sortOrder: filterOptions.sortOrder === 'asc' ? 'desc' : 'asc',
    })
  }

  const hasActiveFilters =
    filterOptions.selectedTags.length > 0 ||
    filterOptions.sortBy !== 'date' ||
    filterOptions.sortOrder !== 'desc'

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Filter className={styles.icon} />
          筛选
        </h3>
        <button
          type="button"
          onClick={onReset}
          disabled={!hasActiveFilters}
          className={styles.resetButton}
        >
          重置
        </button>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>标签</h4>
        <div className={styles.tagsGrid}>
          {availableTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagToggle(tag)}
              className={`${styles.tagButton} ${
                filterOptions.selectedTags.includes(tag) ? styles.active : ''
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>排序</h4>
        <div className={styles.sortGroup}>
          <select
            value={filterOptions.sortBy}
            onChange={handleSortChange}
            className={styles.sortSelect}
          >
            <option value="date">创建时间</option>
            <option value="updated">更新时间</option>
            <option value="name">名称</option>
          </select>
          <button
            type="button"
            onClick={handleOrderToggle}
            className={styles.orderButton}
            aria-label={filterOptions.sortOrder === 'asc' ? '升序' : '降序'}
            title={filterOptions.sortOrder === 'asc' ? '升序' : '降序'}
          >
            <ArrowUpDown />
          </button>
        </div>
      </div>

      {filterOptions.selectedTags.length > 0 && (
        <div className={styles.activeFilters}>
          <p className={styles.activeFiltersTitle}>已选标签</p>
          <div className={styles.activeFiltersList}>
            {filterOptions.selectedTags.map((tag) => (
              <Tag
                key={tag}
                variant="primary"
                size="sm"
                closable
                onClose={() => handleTagToggle(tag)}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
