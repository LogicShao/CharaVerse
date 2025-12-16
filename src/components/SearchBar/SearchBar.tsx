/**
 * 搜索栏组件
 * 支持实时搜索，带有 debounce 优化
 */

import { useState, useEffect, useCallback } from 'react'
import type { FC } from 'react'
import { Search, X } from 'lucide-react'
import type { SearchBarProps } from './SearchBar.types'
import styles from './SearchBar.module.css'

const DEBOUNCE_DELAY = 300

export const SearchBar: FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = '搜索角色名称或昵称...',
  disabled = false,
  className,
}) => {
  const [localValue, setLocalValue] = useState(value)

  // 同步外部值到本地值
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  // Debounced onChange
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue)
      }
    }, DEBOUNCE_DELAY)

    return () => clearTimeout(timer)
  }, [localValue, value, onChange])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)
  }, [])

  const handleClear = useCallback(() => {
    setLocalValue('')
    onChange('')
  }, [onChange])

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <Search className={styles.icon} />
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={styles.input}
      />
      {localValue && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className={styles.clearButton}
          aria-label="清除搜索"
        >
          <X className={styles.clearIcon} />
        </button>
      )}
    </div>
  )
}
