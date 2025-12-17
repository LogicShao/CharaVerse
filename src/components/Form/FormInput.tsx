/**
 * FormInput 表单输入框组件
 * 基于 Input 组件，专门用于表单场景
 */

import type { FC, ChangeEvent } from 'react'
import { Input } from '@/components/Input'
import type { FormInputProps } from './FormInput.types'

export const FormInput: FC<FormInputProps> = ({
  name,
  value,
  onChange,
  error,
  required = false,
  label,
  helperText,
  status,
  ...restProps
}) => {
  // 处理输入变化
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, name)
  }

  return (
    <Input
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
