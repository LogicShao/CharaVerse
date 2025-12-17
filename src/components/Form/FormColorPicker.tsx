/**
 * FormColorPicker 颜色选择器组件
 */

import type { FC, ChangeEvent } from 'react'
import type { FormColorPickerProps } from './FormColorPicker.types'
import styles from './FormColorPicker.module.css'

// 默认预设颜色
const DEFAULT_PRESET_COLORS = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
  '#FFC0CB', '#A52A2A', '#808080', '#FFD700', '#4B0082',
]

export const FormColorPicker: FC<FormColorPickerProps> = ({
  name,
  value,
  onChange,
  error,
  required = false,
  label,
  helperText,
  disabled = false,
  fullWidth = false,
  className,
  presetColors = DEFAULT_PRESET_COLORS,
}) => {
  // 处理颜色输入变化
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, name)
  }

  // 处理预设颜色点击
  const handlePresetClick = (color: string) => {
    if (!disabled) {
      onChange(color, name)
    }
  }

  return (
    <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''} ${className || ''}`}>
      {/* 标签 */}
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      {/* 颜色选择器 */}
      <div className={styles.pickerWrapper}>
        <input
          id={name}
          type="color"
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`${styles.colorInput} ${error ? styles.error : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
        />

        {/* 颜色值显示 */}
        <div className={styles.valueDisplay}>
          <div className={styles.colorPreview} style={{ backgroundColor: value }} />
          <span className={styles.colorValue}>{value}</span>
        </div>
      </div>

      {/* 预设颜色 */}
      {presetColors && presetColors.length > 0 && (
        <div className={styles.presetColors}>
          {presetColors.map((color) => (
            <button
              key={color}
              type="button"
              className={`${styles.presetColor} ${value === color ? styles.selected : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handlePresetClick(color)}
              disabled={disabled}
              aria-label={`选择颜色 ${color}`}
              title={color}
            />
          ))}
        </div>
      )}

      {/* 底部信息 */}
      <div className={styles.footer}>
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
    </div>
  )
}
