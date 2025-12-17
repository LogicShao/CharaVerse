/**
 * 表单验证工具
 * 提供OC编辑页面的表单验证功能
 */

import type { Character } from '@/types/character'
import { safeValidateCharacter } from '@/schemas/character.schema'
import type { ZodSchema } from 'zod'

// 不再需要定义ZodIssue类型，直接使用Zod的内部类型

/**
 * 表单验证错误类型
 */
export interface FormValidationError {
  /** 字段路径，例如 'basic.nameEn' 或 'personality.psychology.mainFear' */
  path: string
  /** 错误消息 */
  message: string
}

/**
 * 表单验证结果
 */
export interface FormValidationResult {
  /** 是否验证成功 */
  success: boolean
  /** 验证错误列表 */
  errors: FormValidationError[]
  /** 验证后的数据（如果成功） */
  data?: Character
}

/**
 * 验证整个角色数据
 */
export function validateCharacterForm(data: Character): FormValidationResult {
  const validation = safeValidateCharacter(data)

  if (validation.success && validation.data) {
    return {
      success: true,
      errors: [],
      data: validation.data,
    }
  }

  if (validation.error) {
    const errors: FormValidationError[] = validation.error.issues.map((zodError) => {
      // 安全地处理path，过滤掉symbol类型
      const safePath = zodError.path
        .map((item) => {
          if (typeof item === 'string' || typeof item === 'number') {
            return item.toString()
          }
          return '' // 忽略symbol类型
        })
        .filter((item) => item !== '') // 移除空字符串
        .join('.')

      return {
        path: safePath || 'unknown',
        message: zodError.message,
      }
    })

    return {
      success: false,
      errors,
    }
  }

  return {
    success: false,
    errors: [{ path: 'unknown', message: '未知验证错误' }],
  }
}

/**
 * 将Zod验证错误转换为Tab错误格式
 */
export function convertToTabErrors(
  validationErrors: FormValidationError[]
): Record<string, Record<string, string>> {
  const tabErrors: Record<string, Record<string, string>> = {}

  validationErrors.forEach((error) => {
    // 解析路径，例如 'basic.nameEn' -> ['basic', 'nameEn']
    const parts = error.path.split('.')

    if (parts.length >= 2) {
      const tabKey = parts[0] // 第一个部分是Tab键
      const fieldPath = parts.slice(1).join('.') // 剩余部分是字段路径

      if (!tabErrors[tabKey]) {
        tabErrors[tabKey] = {}
      }

      tabErrors[tabKey][fieldPath] = error.message
    } else {
      // 如果路径只有一个部分，放在unknown中
      if (!tabErrors.unknown) {
        tabErrors.unknown = {}
      }
      tabErrors.unknown[error.path] = error.message
    }
  })

  return tabErrors
}

/**
 * 验证特定Tab的数据
 */
export function validateTabData<T>(
  tabKey: string,
  data: T,
  schema: ZodSchema<T>
): Record<string, string> {
  try {
    const result = schema.safeParse(data)

    if (result.success) {
      return {}
    }

    const errors: Record<string, string> = {}
    // 修复：使用 ZodError.issues 而不是不存在的 .errors
    result.error.issues.forEach((zodError) => {
      // 安全地处理path，过滤掉symbol类型
      const safePath = zodError.path
        .map((item) => {
          if (typeof item === 'string' || typeof item === 'number') {
            return item.toString()
          }
          return '' // 忽略symbol类型
        })
        .filter((item) => item !== '') // 移除空字符串
        .join('.')

      if (safePath) {
        errors[safePath] = zodError.message
      }
    })

    return errors
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`验证Tab ${tabKey} 时出错:`, error)
    } else {
      console.error(`验证Tab ${tabKey} 时出错:`, String(error))
    }
    return { _error: '验证过程中发生错误' }
  }
}

/**
 * 检查表单是否有错误
 */
export function hasFormErrors(tabErrors: Record<string, Record<string, string>>): boolean {
  return Object.values(tabErrors).some((errors) => Object.keys(errors).length > 0)
}

/**
 * 获取特定Tab的错误数量
 */
export function getTabErrorCount(
  tabErrors: Record<string, Record<string, string>>,
  tabKey: string
): number {
  return tabErrors[tabKey] ? Object.keys(tabErrors[tabKey]).length : 0
}

/**
 * 获取所有Tab的错误总数
 */
export function getTotalErrorCount(tabErrors: Record<string, Record<string, string>>): number {
  return Object.values(tabErrors).reduce(
    (total, errors) => total + Object.keys(errors).length,
    0
  )
}

/**
 * 清除特定Tab的错误
 */
export function clearTabErrors(
  tabErrors: Record<string, Record<string, string>>,
  tabKey: string
): Record<string, Record<string, string>> {
  const newErrors = { ...tabErrors }
  delete newErrors[tabKey]
  return newErrors
}

/**
 * 更新特定字段的错误状态
 */
export function updateFieldError(
  tabErrors: Record<string, Record<string, string>>,
  tabKey: string,
  fieldPath: string,
  error: string | null
): Record<string, Record<string, string>> {
  const newErrors = { ...tabErrors }

  if (!newErrors[tabKey]) {
    newErrors[tabKey] = {}
  }

  if (error) {
    newErrors[tabKey][fieldPath] = error
  } else {
    delete newErrors[tabKey][fieldPath]

    // 如果该Tab没有错误了，删除整个Tab的错误对象
    if (Object.keys(newErrors[tabKey]).length === 0) {
      delete newErrors[tabKey]
    }
  }

  return newErrors
}
