/**
 * 筛选面板组件
 * 支持按标签、性别、MBTI、排序方式筛选
 */

import type { FC } from 'react'
import { Filter, ArrowUpDown } from 'lucide-react'
import { Tag, Select } from '@/components'
import type { SelectOption } from '@/components'
import type { FilterPanelProps } from './FilterPanel.types'
import styles from './FilterPanel.module.css'

export const FilterPanel: FC<FilterPanelProps> = ({
  availableTags,
  filterOptions,
  onChange,
  onReset,
  className,
}) => {
  // 排序选项
  const sortOptions: SelectOption[] = [
    { value: 'date', label: '创建时间' },
    { value: 'updated', label: '更新时间' },
    { value: 'name', label: '名称' },
  ]

  // 性别选项
  const genderOptions: SelectOption[] = [
    { value: 'male', label: '男性' },
    { value: 'female', label: '女性' },
    { value: 'other', label: '其他' },
    { value: 'unknown', label: '未知' },
  ]

  // MBTI 选项
  const mbtiOptions: SelectOption[] = [
    { value: 'INTJ', label: 'INTJ - 建筑师', description: '富有想象力和战略性的思想家' },
    { value: 'INTP', label: 'INTP - 逻辑学家', description: '创新的发明家' },
    { value: 'ENTJ', label: 'ENTJ - 指挥官', description: '大胆、富有想象力的领导者' },
    { value: 'ENTP', label: 'ENTP - 辩论家', description: '聪明好奇的思想家' },
    { value: 'INFJ', label: 'INFJ - 提倡者', description: '安静而神秘的理想主义者' },
    { value: 'INFP', label: 'INFP - 调停者', description: '诗意、善良的利他主义者' },
    { value: 'ENFJ', label: 'ENFJ - 主人公', description: '富有魅力的鼓舞人心的领导者' },
    { value: 'ENFP', label: 'ENFP - 竞选者', description: '热情、有创造力的自由精神' },
    { value: 'ISTJ', label: 'ISTJ - 物流师', description: '实际而注重事实的个人' },
    { value: 'ISFJ', label: 'ISFJ - 守卫者', description: '非常专注而温暖的守护者' },
    { value: 'ESTJ', label: 'ESTJ - 总经理', description: '出色的管理者' },
    { value: 'ESFJ', label: 'ESFJ - 执政官', description: '关心他人、善于交际的人' },
    { value: 'ISTP', label: 'ISTP - 鉴赏家', description: '大胆而实际的实验者' },
    { value: 'ISFP', label: 'ISFP - 探险家', description: '灵活而有魅力的艺术家' },
    { value: 'ESTP', label: 'ESTP - 企业家', description: '精力充沛的冒险家' },
    { value: 'ESFP', label: 'ESFP - 表演者', description: '自发的、热情的表演者' },
  ]

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

  const handleSortChange = (value: string | undefined) => {
    if (value) {
      onChange({
        ...filterOptions,
        sortBy: value as 'name' | 'date' | 'updated',
      })
    }
  }

  const handleGenderChange = (value: string | undefined) => {
    onChange({
      ...filterOptions,
      gender: value,
    })
  }

  const handleMbtiChange = (value: string | undefined) => {
    onChange({
      ...filterOptions,
      mbti: value,
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
    filterOptions.sortOrder !== 'desc' ||
    !!filterOptions.gender ||
    !!filterOptions.mbti

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
        <h4 className={styles.sectionTitle}>性别</h4>
        <Select
          size="sm"
          placeholder="全部"
          options={genderOptions}
          value={filterOptions.gender}
          onChange={handleGenderChange}
          clearable
          fullWidth
        />
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>MBTI 类型</h4>
        <Select
          size="sm"
          placeholder="全部"
          options={mbtiOptions}
          value={filterOptions.mbti}
          onChange={handleMbtiChange}
          clearable
          searchable
          fullWidth
        />
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
          <Select
            size="sm"
            options={sortOptions}
            value={filterOptions.sortBy}
            onChange={handleSortChange}
            fullWidth
          />
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
