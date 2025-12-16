/**
 * Select 组件类型定义
 */

import type { ReactNode } from 'react'

/**
 * 下拉选项尺寸类型
 */
export type SelectSize = 'sm' | 'md' | 'lg'

/**
 * 下拉选项状态类型
 */
export type SelectStatus = 'default' | 'error' | 'warning' | 'success'

/**
 * 选项数据接口
 */
export interface SelectOption<T = string> {
  /**
   * 选项值
   */
  value: T

  /**
   * 选项显示标签
   */
  label: string

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * 选项描述（可选）
   */
  description?: string

  /**
   * 自定义图标或前缀内容
   */
  icon?: ReactNode

  /**
   * 分组名称（用于分组显示）
   */
  group?: string
}

/**
 * Select 组件属性接口
 */
export interface SelectProps<T = string> {
  /**
   * 下拉选项尺寸
   * @default 'md'
   */
  size?: SelectSize

  /**
   * 下拉选项状态
   * @default 'default'
   */
  status?: SelectStatus

  /**
   * 是否全宽
   * @default false
   */
  fullWidth?: boolean

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * 占位符文本
   */
  placeholder?: string

  /**
   * 标签文本
   */
  label?: string

  /**
   * 帮助文本
   */
  helperText?: string

  /**
   * 错误提示文本
   */
  errorText?: string

  /**
   * 前缀图标或内容
   */
  prefix?: ReactNode

  /**
   * 是否必填
   * @default false
   */
  required?: boolean

  /**
   * 选项数据列表
   */
  options: SelectOption<T>[]

  /**
   * 当前选中的值
   */
  value?: T

  /**
   * 默认选中的值
   */
  defaultValue?: T

  /**
   * 是否可清空
   * @default false
   */
  clearable?: boolean

  /**
   * 是否可搜索
   * @default false
   */
  searchable?: boolean

  /**
   * 搜索框占位符
   * @default '搜索...'
   */
  searchPlaceholder?: string

  /**
   * 无匹配结果时的提示文本
   * @default '无匹配结果'
   */
  notFoundText?: string

  /**
   * 下拉菜单最大高度
   * @default '300px'
   */
  maxDropdownHeight?: string

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 选项渲染函数（自定义选项显示）
   */
  renderOption?: (option: SelectOption<T>) => ReactNode

  /**
   * 值改变时的回调
   */
  onChange?: (value: T | undefined, option: SelectOption<T> | undefined) => void

  /**
   * 下拉菜单打开时的回调
   */
  onOpen?: () => void

  /**
   * 下拉菜单关闭时的回调
   */
  onClose?: () => void

  /**
   * 搜索文本改变时的回调
   */
  onSearch?: (searchText: string) => void
}
