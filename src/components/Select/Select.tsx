/**
 * Select 下拉选择组件
 * 支持搜索、清空、键盘导航等功能
 */

import { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback, type FC, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, X, Search } from 'lucide-react'
import type { SelectProps, SelectOption } from './Select.types'
import styles from './Select.module.css'

export const Select = <T extends string | number = string>({
  size = 'md',
  status = 'default',
  fullWidth = false,
  disabled = false,
  placeholder = '请选择',
  label,
  helperText,
  errorText,
  prefix,
  required = false,
  options = [],
  value,
  defaultValue,
  clearable = false,
  searchable = false,
  searchPlaceholder = '搜索...',
  notFoundText = '无匹配结果',
  maxDropdownHeight = '300px',
  className,
  renderOption,
  onChange,
  onOpen,
  onClose,
  onSearch,
}: SelectProps<T>): ReturnType<FC> => {
  const [isOpen, setIsOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue)
  const [searchText, setSearchText] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })

  const containerRef = useRef<HTMLDivElement>(null)
  const selectorRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const currentValue = value !== undefined ? value : internalValue
  const currentStatus = errorText ? 'error' : status

  // 查找选中的选项
  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === currentValue),
    [options, currentValue]
  )

  // 过滤选项（搜索功能）
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchText) return options

    const searchLower = searchText.toLowerCase()
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(searchLower) ||
        opt.description?.toLowerCase().includes(searchLower)
    )
  }, [options, searchText, searchable])

  // 分组选项
  const groupedOptions = useMemo(() => {
    const groups: Record<string, SelectOption<T>[]> = {}
    const ungrouped: SelectOption<T>[] = []

    filteredOptions.forEach((opt) => {
      if (opt.group) {
        if (!groups[opt.group]) {
          groups[opt.group] = []
        }
        groups[opt.group].push(opt)
      } else {
        ungrouped.push(opt)
      }
    })

    return { groups, ungrouped }
  }, [filteredOptions])

  // 打开下拉菜单（使用 useCallback 使其稳定，避免 effect 警告）
  const handleOpen = useCallback(() => {
    if (disabled) return
    setIsOpen(true)
    setFocusedIndex(-1)
    onOpen?.()
  }, [disabled, onOpen])

  // 关闭下拉菜单（使用 useCallback 使其稳定，避免 effect 警告）
  const handleClose = useCallback(() => {
    setIsOpen(false)
    setSearchText('')
    setFocusedIndex(-1)
    onClose?.()
  }, [onClose])

  // 处理点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      // 检查点击是否在选择器或下拉菜单内
      const isClickInside =
        (containerRef.current && containerRef.current.contains(target)) ||
        (dropdownRef.current && dropdownRef.current.contains(target))

      if (!isClickInside) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, handleClose])

  // 打开下拉菜单时聚焦搜索框
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen, searchable])

  // 计算下拉菜单位置（使用 Portal 时需要）
  useLayoutEffect(() => {
    if (isOpen && selectorRef.current) {
      const rect = selectorRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      })
    }
  }, [isOpen])

  // 处理滚动和窗口大小变化时更新位置
  useEffect(() => {
    if (!isOpen) return

    const updatePosition = () => {
      if (selectorRef.current) {
        const rect = selectorRef.current.getBoundingClientRect()
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        })
      }
    }

    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isOpen])

  // 切换下拉菜单
  const handleToggle = () => {
    if (isOpen) {
      handleClose()
    } else {
      handleOpen()
    }
  }

  // 选择选项
  const handleSelectOption = (option: SelectOption<T>) => {
    if (option.disabled) return

    setInternalValue(option.value)
    onChange?.(option.value, option)
    handleClose()
  }

  // 清空选择
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setInternalValue(undefined)
    onChange?.(undefined, undefined)
  }

  // 搜索文本改变
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setSearchText(text)
    setFocusedIndex(-1)
    onSearch?.(text)
  }

  // 键盘导航
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return

    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        if (!isOpen) {
          handleOpen()
        } else if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          handleSelectOption(filteredOptions[focusedIndex])
        }
        break

      case 'Escape':
        e.preventDefault()
        handleClose()
        break

      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          handleOpen()
        } else {
          setFocusedIndex((prev) => {
            const nextIndex = prev + 1
            return nextIndex >= filteredOptions.length ? 0 : nextIndex
          })
        }
        break

      case 'ArrowUp':
        e.preventDefault()
        if (isOpen) {
          setFocusedIndex((prev) => {
            const nextIndex = prev - 1
            return nextIndex < 0 ? filteredOptions.length - 1 : nextIndex
          })
        }
        break

      case 'Tab':
        if (isOpen) {
          handleClose()
        }
        break
    }
  }

  // 渲染选项内容
  const renderOptionContent = (option: SelectOption<T>) => {
    if (renderOption) {
      return renderOption(option)
    }

    return (
      <>
        {option.icon ? (
          <span className={styles.optionIcon}>{option.icon}</span>
        ) : (
          <div className={styles.optionPlaceholder}>
            {option.label.charAt(0)}
          </div>
        )}
        <div className={styles.optionContent}>
          <div className={styles.optionLabel}>{option.label}</div>
          {option.description && (
            <div className={styles.optionDescription}>{option.description}</div>
          )}
        </div>
      </>
    )
  }

  return (
    <div
      className={`${styles.container} ${fullWidth ? styles.fullWidth : ''} ${
        className || ''
      }`}
      ref={containerRef}
    >
      {/* 标签 */}
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      {/* 选择器主体 */}
      <div
        ref={selectorRef}
        className={`${styles.selector} ${styles[`size-${size}`]} ${
          styles[`status-${currentStatus}`]
        } ${disabled ? styles.disabled : ''} ${isOpen ? styles.open : ''}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
      >
        {/* 前缀 */}
        {prefix && <span className={styles.prefix}>{prefix}</span>}

        {/* 显示内容 */}
        <div className={styles.display}>
          {selectedOption ? (
            <div className={styles.selectedOption}>
              {selectedOption.icon ? (
                <span className={styles.selectedIcon}>{selectedOption.icon}</span>
              ) : (
                <div className={styles.selectedPlaceholder}>
                  {selectedOption.label.charAt(0)}
                </div>
              )}
              <span className={styles.selectedLabel}>{selectedOption.label}</span>
            </div>
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </div>

        {/* 后缀操作 */}
        <div className={styles.suffix}>
          {clearable && selectedOption && !disabled && (
            <span
              className={styles.clearIcon}
              onClick={handleClear}
              role="button"
              aria-label="清空"
            >
              <X size={16} />
            </span>
          )}
          <span className={`${styles.arrowIcon} ${isOpen ? styles.arrowUp : ''}`}>
            <ChevronDown size={18} />
          </span>
        </div>
      </div>

      {/* 帮助文本或错误提示 */}
      {(helperText || errorText) && (
        <div
          className={`${styles.helperText} ${
            errorText ? styles.errorText : ''
          }`}
        >
          {errorText || helperText}
        </div>
      )}

      {/* 下拉菜单 - 使用 Portal 渲染到 body */}
      {isOpen &&
        createPortal(
          <div
            className={styles.dropdown}
            style={{
              position: 'absolute',
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              maxHeight: maxDropdownHeight,
            }}
            ref={dropdownRef}
            role="listbox"
          >
            {/* 搜索框 */}
            {searchable && (
              <div className={styles.searchBox}>
                <Search size={16} className={styles.searchIcon} />
                <input
                  ref={searchInputRef}
                  type="text"
                  className={styles.searchInput}
                  placeholder={searchPlaceholder}
                  value={searchText}
                  onChange={handleSearchChange}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {/* 选项列表 */}
            <div className={styles.optionsList}>
              {filteredOptions.length === 0 ? (
                <div className={styles.emptyState}>{notFoundText}</div>
              ) : (
                <>
                  {/* 未分组选项 */}
                  {groupedOptions.ungrouped.map((option, index) => (
                    <div
                      key={String(option.value)}
                      className={`${styles.option} ${
                        option.disabled ? styles.optionDisabled : ''
                      } ${option.value === currentValue ? styles.optionSelected : ''} ${
                        index === focusedIndex ? styles.optionFocused : ''
                      }`}
                      onClick={() => handleSelectOption(option)}
                      role="option"
                      aria-selected={option.value === currentValue}
                      aria-disabled={option.disabled}
                    >
                      {renderOptionContent(option)}
                    </div>
                  ))}

                  {/* 分组选项 */}
                  {Object.entries(groupedOptions.groups).map(([groupName, groupOptions]) => (
                    <div key={groupName} className={styles.optionGroup}>
                      <div className={styles.groupLabel}>{groupName}</div>
                      {groupOptions.map((option, index) => {
                        const globalIndex =
                          groupedOptions.ungrouped.length +
                          Object.keys(groupedOptions.groups)
                            .slice(0, Object.keys(groupedOptions.groups).indexOf(groupName))
                            .reduce(
                              (acc, key) => acc + groupedOptions.groups[key].length,
                              0
                            ) +
                          index

                        return (
                          <div
                            key={String(option.value)}
                            className={`${styles.option} ${
                              option.disabled ? styles.optionDisabled : ''
                            } ${
                              option.value === currentValue ? styles.optionSelected : ''
                            } ${globalIndex === focusedIndex ? styles.optionFocused : ''}`}
                            onClick={() => handleSelectOption(option)}
                            role="option"
                            aria-selected={option.value === currentValue}
                            aria-disabled={option.disabled}
                          >
                            {renderOptionContent(option)}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
