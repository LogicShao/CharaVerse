/**
 * LocalStorage 存储适配器
 * 提供基于浏览器 LocalStorage 的数据持久化功能
 */

import type { Character } from '@/types/character'

const STORAGE_KEY_PREFIX = 'charaverse_'
const CHARACTERS_LIST_KEY = `${STORAGE_KEY_PREFIX}characters_list`

/**
 * LocalStorage 适配器类
 */
export class LocalStorageAdapter {
  /**
   * 保存单个角色数据
   */
  async saveCharacter(character: Character): Promise<void> {
    try {
      const key = this.getCharacterKey(character.basic.id)
      const data = JSON.stringify(character)
      localStorage.setItem(key, data)

      // 更新角色列表
      await this.updateCharactersList(character.basic.id)
    } catch (error) {
      throw new Error(`Failed to save character: ${error}`)
    }
  }

  /**
   * 加载单个角色数据
   */
  async loadCharacter(id: string): Promise<Character | null> {
    try {
      const key = this.getCharacterKey(id)
      const data = localStorage.getItem(key)

      if (!data) {
        return null
      }

      return JSON.parse(data) as Character
    } catch (error) {
      throw new Error(`Failed to load character: ${error}`)
    }
  }

  /**
   * 加载所有角色数据
   */
  async loadAllCharacters(): Promise<Character[]> {
    try {
      const ids = await this.getCharacterIds()
      const characters: Character[] = []

      for (const id of ids) {
        const character = await this.loadCharacter(id)
        if (character) {
          characters.push(character)
        }
      }

      return characters
    } catch (error) {
      throw new Error(`Failed to load all characters: ${error}`)
    }
  }

  /**
   * 删除单个角色数据
   */
  async deleteCharacter(id: string): Promise<void> {
    try {
      const key = this.getCharacterKey(id)
      localStorage.removeItem(key)

      // 从角色列表中移除
      await this.removeFromCharactersList(id)
    } catch (error) {
      throw new Error(`Failed to delete character: ${error}`)
    }
  }

  /**
   * 清空所有角色数据
   */
  async clearAll(): Promise<void> {
    try {
      const ids = await this.getCharacterIds()

      for (const id of ids) {
        const key = this.getCharacterKey(id)
        localStorage.removeItem(key)
      }

      localStorage.removeItem(CHARACTERS_LIST_KEY)
    } catch (error) {
      throw new Error(`Failed to clear all characters: ${error}`)
    }
  }

  /**
   * 获取存储的角色数量
   */
  async getCount(): Promise<number> {
    const ids = await this.getCharacterIds()
    return ids.length
  }

  /**
   * 检查角色是否存在
   */
  async exists(id: string): Promise<boolean> {
    const key = this.getCharacterKey(id)
    return localStorage.getItem(key) !== null
  }

  /**
   * 批量导入角色数据
   */
  async importCharacters(characters: Character[]): Promise<void> {
    for (const character of characters) {
      await this.saveCharacter(character)
    }
  }

  /**
   * 导出所有角色数据
   */
  async exportCharacters(): Promise<Character[]> {
    return await this.loadAllCharacters()
  }

  // Private helper methods

  /**
   * 生成角色存储键
   */
  private getCharacterKey(id: string): string {
    return `${STORAGE_KEY_PREFIX}character_${id}`
  }

  /**
   * 获取所有角色 ID 列表
   */
  private async getCharacterIds(): Promise<string[]> {
    try {
      const data = localStorage.getItem(CHARACTERS_LIST_KEY)
      if (!data) {
        return []
      }
      return JSON.parse(data) as string[]
    } catch (error) {
      console.error('Failed to get character IDs:', error)
      return []
    }
  }

  /**
   * 更新角色 ID 列表
   */
  private async updateCharactersList(id: string): Promise<void> {
    const ids = await this.getCharacterIds()

    if (!ids.includes(id)) {
      ids.push(id)
      localStorage.setItem(CHARACTERS_LIST_KEY, JSON.stringify(ids))
    }
  }

  /**
   * 从角色列表中移除 ID
   */
  private async removeFromCharactersList(id: string): Promise<void> {
    const ids = await this.getCharacterIds()
    const filteredIds = ids.filter((existingId) => existingId !== id)
    localStorage.setItem(CHARACTERS_LIST_KEY, JSON.stringify(filteredIds))
  }
}

// 导出单例实例
export const localStorageAdapter = new LocalStorageAdapter()
