/**
 * FormSelect 表单下拉选择组件
 * 基于 Select 组件，专门用于表单场景
 */

import type { FC } from 'react'
import { Select } from '@/components/Select'
import type { FormSelectProps } from './FormSelect.types'

export const FormSelect = <T extends string | number = string>({
  name,
  value,
  onChange,
  error,
  required = false,
  label,
  helperText,
  status,
  ...restProps
}: FormSelectProps<T>): ReturnType<FC> => {
  // 处理选择变化
  const handleChange = (selectedValue: T | undefined) => {
    onChange(selectedValue, name)
  }

  return (
    <Select<T>
      {...restProps}
      value={value}
      onChange={handleChange}
      status={error ? 'error' : status}
      errorText={error}
      label={label}
      helperText={helperText}
      required={required}
    />
  )
}
