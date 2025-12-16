/**
 * Input 组件
 * 支持多种尺寸、状态和扩展功能的输入框组件
 */

import { forwardRef, useState, useCallback } from 'react'
import type { FC } from 'react'
import styles from './Input.module.css'
import type { InputProps } from './Input.types'

/**
 * Input 组件
 */
export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      status = 'default',
      fullWidth = false,
      disabled = false,
      readOnly = false,
      placeholder,
      label,
      helperText,
      errorText,
      prefix,
      suffix,
      required = false,
      value,
      defaultValue,
      maxLength,
      showCount = false,
      className = '',
      onChange,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    // 内部状态管理（用于字符计数）
    const [internalValue, setInternalValue] = useState(defaultValue || '')
    const currentValue = value !== undefined ? value : internalValue

    // 处理输入变化
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (value === undefined) {
          setInternalValue(event.target.value)
        }
        onChange?.(event)
      },
      [value, onChange]
    )

    // 计算字符数
    const currentLength = currentValue?.length || 0
    const isOverLimit = maxLength ? currentLength > maxLength : false

    // 确定实际状态
    const actualStatus = errorText ? 'error' : status

    // 容器类名
    const containerClasses = [
      styles.container,
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    // 输入框包装器类名
    const wrapperClasses = [
      styles.inputWrapper,
      styles[size],
      styles[actualStatus],
      disabled && styles.disabled,
    ]
      .filter(Boolean)
      .join(' ')

    // 输入框类名
    const inputClasses = [styles.input, styles[size]].filter(Boolean).join(' ')

    return (
      <div className={containerClasses}>
        {/* 标签 */}
        {label && (
          <label className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        {/* 输入框 */}
        <div className={wrapperClasses}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          <input
            ref={ref}
            type="text"
            className={inputClasses}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            {...rest}
          />
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>

        {/* 底部信息 */}
        {(helperText || errorText || showCount) && (
          <div className={styles.footer}>
            {/* 帮助文本或错误文本 */}
            {errorText ? (
              <span className={styles.errorText}>{errorText}</span>
            ) : helperText ? (
              <span className={styles.helperText}>{helperText}</span>
            ) : (
              <span /> // 占位符，保持布局
            )}

            {/* 字符计数 */}
            {showCount && (
              <span className={`${styles.count} ${isOverLimit ? styles.overLimit : ''}`}>
                {currentLength}
                {maxLength && ` / ${maxLength}`}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
