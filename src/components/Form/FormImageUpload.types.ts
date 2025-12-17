/**
 * FormImageUpload 组件类型定义
 */

import type { URL } from '@/types/enums'

export interface FormImageUploadProps {
  /** 字段名称 */
  name: string
  /** 字段值（图片URL） */
  value: URL | string
  /** 值变化回调 */
  onChange: (value: string, name: string) => void
  /** 验证错误信息 */
  error?: string
  /** 是否必填 */
  required?: boolean
  /** 字段标签 */
  label?: string
  /** 帮助文本 */
  helperText?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否全宽 */
  fullWidth?: boolean
  /** 自定义类名 */
  className?: string
  /** 允许的文件类型 */
  accept?: string
  /** 最大文件大小（字节） */
  maxSize?: number
  /** 图片预览宽度 */
  previewWidth?: number
  /** 图片预览高度 */
  previewHeight?: number
}
