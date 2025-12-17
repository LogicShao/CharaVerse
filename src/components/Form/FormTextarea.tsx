/**
 * FormTextarea 多行文本输入组件
 */

import type { FC, ChangeEvent } from 'react'
import type { FormTextareaProps } from './FormTextarea.types'
import styles from './FormTextarea.module.css'

export const FormTextarea: FC<FormTextareaProps> = ({
  name,
  value,
  onChange,
  error,
  required = false,
  label,
  helperText,
  placeholder,
  rows = 4,
  maxLength,
  showCount = false,
  disabled = false,
  readOnly = false,
  fullWidth = false,
  className,
}) => {
  // 处理输入变化
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value, name)
  }

  // 是否超出最大长度
  const isExceeded = maxLength ? value.length > maxLength : false
  const currentCount = value.length
  const countText = maxLength ? `${currentCount} / ${maxLength}` : `${currentCount}`

  return (
    <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''} ${className || ''}`}>
      {/* 标签 */}
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      {/* 文本框 */}
      <div className={styles.textareaWrapper}>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          className={`${styles.textarea} ${error ? styles.error : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
        />
      </div>

      {/* 底部信息 */}
      <div className={styles.footer}>
        <div>
          {error && (
            <div id={`${name}-error`} className={`${styles.helperText} ${styles.errorText}`}>
              {error}
            </div>
          )}
          {!error && helperText && (
            <div id={`${name}-helper`} className={styles.helperText}>
              {helperText}
            </div>
          )}
        </div>
        {showCount && (
          <div className={`${styles.count} ${isExceeded ? styles.exceeded : ''}`}>
            {countText}
          </div>
        )}
      </div>
    </div>
  )
}
