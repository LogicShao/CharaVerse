/**
 * Button 组件
 * 支持多种变体、尺寸和状态的按钮组件
 */

import { forwardRef } from 'react'
import type { FC } from 'react'
import styles from './Button.module.css'
import type { ButtonProps } from './Button.types'

/**
 * Button 组件
 */
export const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled = false,
      type = 'button',
      icon,
      iconPosition = 'left',
      children,
      className = '',
      onClick,
      ...rest
    },
    ref
  ) => {
    // 组合类名
    const buttonClasses = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    // 渲染图标
    const renderIcon = () => {
      if (!icon || loading) return null

      return (
        <span
          className={`${styles.icon} ${
            iconPosition === 'left' ? styles.iconLeft : styles.iconRight
          }`}
        >
          {icon}
        </span>
      )
    }

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={onClick}
        {...rest}
      >
        {renderIcon()}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
