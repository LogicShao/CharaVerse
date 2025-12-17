/**
 * FormTextarea 组件类型定义
 */

export interface FormTextareaProps {
  /** 字段名称 */
  name: string
  /** 字段值 */
  value: string
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
  /** 占位符 */
  placeholder?: string
  /** 行数 */
  rows?: number
  /** 最大长度 */
  maxLength?: number
  /** 是否显示字符计数 */
  showCount?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readOnly?: boolean
  /** 是否全宽 */
  fullWidth?: boolean
  /** 自定义类名 */
  className?: string
}
