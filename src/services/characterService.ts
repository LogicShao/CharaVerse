/**
 * 角色数据服务类
 * 提供角色数据的 CRUD 操作和验证功能
 */

import type { Character } from '@/types/character'
import { validateCharacter, safeValidateCharacter } from '@/schemas/character.schema'
import { localStorageAdapter } from './storage/localStorageAdapter'

/**
 * 从任意值中安全提取角色 id（不使用 any）
 * 如果结构不匹配则返回 'unknown'
 */
function getCharacterIdSafe(value: unknown): string {
  if (typeof value !== 'object' || value === null) return 'unknown'

  const obj = value as Record<string, unknown>
  const basic = obj['basic']
  if (typeof basic !== 'object' || basic === null) return 'unknown'

  const basicObj = basic as Record<string, unknown>
  const id = basicObj['id']
  return typeof id === 'string' && id.length > 0 ? id : 'unknown'
}

/**
 * 数据服务错误类型
 */
export class CharacterServiceError extends Error {
  code: 'VALIDATION_ERROR' | 'NOT_FOUND' | 'STORAGE_ERROR' | 'UNKNOWN_ERROR'
  details?: unknown

  constructor(
    message: string,
    code: 'VALIDATION_ERROR' | 'NOT_FOUND' | 'STORAGE_ERROR' | 'UNKNOWN_ERROR',
    details?: unknown
  ) {
    super(message)
    this.name = 'CharacterServiceError'
    this.code = code
    this.details = details
  }
}

/**
 * 角色数据服务类
 */
export class CharacterService {
  /**
   * 加载所有角色
   */
  async loadCharacters(): Promise<Character[]> {
    try {
      const characters = await localStorageAdapter.loadAllCharacters()

      // 验证所有角色数据
      const validCharacters: Character[] = []

      for (const character of characters) {
        const validation = safeValidateCharacter(character)
        if (validation.success && validation.data) {
          validCharacters.push(validation.data)
        } else {
          const charId = getCharacterIdSafe(character)
          console.warn(`Invalid character data for ID: ${charId}`, validation.error)
        }
      }

      return validCharacters
    } catch (error) {
      throw new CharacterServiceError(
        'Failed to load characters',
        'STORAGE_ERROR',
        error
      )
    }
  }

  /**
   * 加载单个角色
   */
  async loadCharacter(id: string): Promise<Character> {
    try {
      const character = await localStorageAdapter.loadCharacter(id)

      if (!character) {
        throw new CharacterServiceError(
          `Character not found: ${id}`,
          'NOT_FOUND'
        )
      }

      // 验证角色数据
      const validatedCharacter = validateCharacter(character)
      return validatedCharacter
    } catch (error) {
      if (error instanceof CharacterServiceError) {
        throw error
      }
      throw new CharacterServiceError(
        `Failed to load character: ${id}`,
        'STORAGE_ERROR',
        error
      )
    }
  }

  /**
   * 保存角色数据
   */
  async saveCharacter(character: Character): Promise<void> {
    try {
      // 验证角色数据
      const validatedCharacter = validateCharacter(character)

      // 保存到存储
      await localStorageAdapter.saveCharacter(validatedCharacter)
    } catch (error) {
      if (error instanceof Error && error.message.includes('validation')) {
        throw new CharacterServiceError(
          'Invalid character data',
          'VALIDATION_ERROR',
          error
        )
      }
      throw new CharacterServiceError(
        'Failed to save character',
        'STORAGE_ERROR',
        error
      )
    }
  }

  /**
   * 删除角色
   */
  async deleteCharacter(id: string): Promise<void> {
    try {
      const exists = await localStorageAdapter.exists(id)

      if (!exists) {
        throw new CharacterServiceError(
          `Character not found: ${id}`,
          'NOT_FOUND'
        )
      }

      await localStorageAdapter.deleteCharacter(id)
    } catch (error) {
      if (error instanceof CharacterServiceError) {
        throw error
      }
      throw new CharacterServiceError(
        `Failed to delete character: ${id}`,
        'STORAGE_ERROR',
        error
      )
    }
  }

  /**
   * 验证角色数据
   */
  validateCharacter(character: unknown): { success: boolean; error?: string } {
    const validation = safeValidateCharacter(character)

    if (validation.success) {
      return { success: true }
    } else {
      return {
        success: false,
        error: validation.error?.message || 'Validation failed'
      }
    }
  }

  /**
   * 检查角色是否存在
   */
  async exists(id: string): Promise<boolean> {
    return await localStorageAdapter.exists(id)
  }

  /**
   * 获取角色数量
   */
  async getCount(): Promise<number> {
    return await localStorageAdapter.getCount()
  }

  /**
   * 批量导入角色
   */
  async importCharacters(characters: Character[]): Promise<{
    success: number
    failed: number
    errors: Array<{ index: number; error: string }>
  }> {
    let success = 0
    let failed = 0
    const errors: Array<{ index: number; error: string }> = []

    for (let i = 0; i < characters.length; i++) {
      try {
        await this.saveCharacter(characters[i])
        success++
      } catch (error) {
        failed++
        errors.push({
          index: i,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return { success, failed, errors }
  }

  /**
   * 导出所有角色
   */
  async exportCharacters(): Promise<Character[]> {
    return await this.loadCharacters()
  }

  /**
   * 清空所有角色数据
   */
  async clearAll(): Promise<void> {
    try {
      await localStorageAdapter.clearAll()
    } catch (error) {
      throw new CharacterServiceError(
        'Failed to clear all characters',
        'STORAGE_ERROR',
        error
      )
    }
  }

  /**
   * 从 Mock 数据初始化
   */
  async initializeFromMockData(mockCharacters: Character[]): Promise<void> {
    const currentCount = await this.getCount()

    // 如果已有数据，不覆盖
    if (currentCount > 0) {
      console.log('Characters already exist, skipping initialization')
      return
    }

    console.log(`Initializing with ${mockCharacters.length} mock characters`)
    await this.importCharacters(mockCharacters)
  }
}

// 导出单例实例
export const characterService = new CharacterService()
