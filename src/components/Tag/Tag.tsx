/**
 * Tag 组件
 * 用于标记和分类的标签组件
 */

import { useState } from 'react'
import type { FC } from 'react'
import styles from './Tag.module.css'
import type { TagProps } from './Tag.types'

/**
 * Tag 组件
 */
export const Tag: FC<TagProps> = ({
  variant = 'default',
  size = 'md',
  closable = false,
  bordered = false,
  icon,
  children,
  className = '',
  onClose,
  onClick,
  ...rest
}) => {
  // 控制标签可见性
  const [visible, setVisible] = useState(true)

  // 处理关闭事件
  const handleClose = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()
    setVisible(false)
    onClose?.(event)
  }

  // 如果标签已关闭，不渲染
  if (!visible) {
    return null
  }

  // 组合类名
  const tagClasses = [
    styles.tag,
    styles[variant],
    styles[size],
    bordered && styles.bordered,
    onClick && styles.clickable,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={tagClasses} onClick={onClick} {...rest}>
      {/* 图标 */}
      {icon && <span className={styles.icon}>{icon}</span>}

      {/* 内容 */}
      {children}

      {/* 关闭按钮 */}
      {closable && (
        <span className={styles.closeIcon} onClick={handleClose}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 3L3 9M3 3L9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </span>
  )
}

Tag.displayName = 'Tag'
