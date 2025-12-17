/**
 * FormImageUpload 图片上传组件
 * 支持文件上传和URL输入两种方式
 */

import { useState, useRef, type FC, type ChangeEvent } from 'react'
import { Upload, Link } from 'lucide-react'
import type { FormImageUploadProps } from './FormImageUpload.types'
import styles from './FormImageUpload.module.css'

export const FormImageUpload: FC<FormImageUploadProps> = ({
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
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB
  previewWidth = 200,
  previewHeight = 200,
}) => {
  const [urlInput, setUrlInput] = useState('')
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 处理文件选择
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 验证文件大小
    if (maxSize && file.size > maxSize) {
      setUploadError(`文件大小超过限制 (${(maxSize / 1024 / 1024).toFixed(1)}MB)`)
      return
    }

    // 验证文件类型
    if (accept && !file.type.match(accept.replace('*', '.*'))) {
      setUploadError('文件类型不支持')
      return
    }

    // 读取文件并转换为 Data URL
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      onChange(dataUrl, name)
      setUploadError('')
    }
    reader.onerror = () => {
      setUploadError('文件读取失败')
    }
    reader.readAsDataURL(file)
  }

  // 处理URL输入
  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim(), name)
      setUrlInput('')
      setUploadError('')
    }
  }

  // 处理删除图片
  const handleRemove = () => {
    onChange('', name)
    setUploadError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // 触发文件选择
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const hasImage = Boolean(value)

  return (
    <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''} ${className || ''}`}>
      {/* 标签 */}
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      {/* 上传区域 */}
      <div className={styles.uploadArea}>
        {/* 图片预览 */}
        {hasImage && (
          <div
            className={styles.preview}
            style={{ width: previewWidth, height: previewHeight }}
          >
            <img
              src={value}
              alt="Preview"
              className={styles.previewImage}
              onError={(e) => {
                // 图片加载失败时的处理
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E加载失败%3C/text%3E%3C/svg%3E'
              }}
            />
            {!disabled && (
              <div className={styles.previewOverlay}>
                <button
                  type="button"
                  className={styles.overlayButton}
                  onClick={handleUploadClick}
                >
                  更换
                </button>
                <button
                  type="button"
                  className={styles.overlayButton}
                  onClick={handleRemove}
                >
                  删除
                </button>
              </div>
            )}
          </div>
        )}

        {/* 上传按钮 */}
        {!hasImage && (
          <>
            <button
              type="button"
              className={`${styles.uploadButton} ${error || uploadError ? styles.error : ''}`}
              onClick={handleUploadClick}
              disabled={disabled}
            >
              <Upload size={20} />
              <span>选择图片</span>
            </button>

            {/* 隐藏的文件输入 */}
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              disabled={disabled}
              className={styles.hiddenInput}
              aria-label="上传图片"
            />

            {/* URL输入 */}
            <div className={styles.urlInput}>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                placeholder="或输入图片URL"
                disabled={disabled}
                className={`${styles.urlInputField} ${error || uploadError ? styles.error : ''}`}
              />
              <button
                type="button"
                className={styles.urlButton}
                onClick={handleUrlSubmit}
                disabled={disabled || !urlInput.trim()}
              >
                <Link size={16} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* 底部信息 */}
      <div className={styles.footer}>
        {(error || uploadError) && (
          <div className={`${styles.helperText} ${styles.errorText}`}>
            {error || uploadError}
          </div>
        )}
        {!error && !uploadError && helperText && (
          <div className={styles.helperText}>{helperText}</div>
        )}
      </div>
    </div>
  )
}
