/**
 * 角色数据状态管理 Store
 * 使用 Zustand 管理角色列表、当前选中角色、加载状态等
 */

import { create } from 'zustand'
import type { Character } from '@/types/character'
import { characterService } from '@/services/characterService'

/**
 * Store 状态接口
 */
interface CharacterStoreState {
  // State
  characters: Character[]
  currentCharacter: Character | null
  loading: boolean
  error: string | null

  // Actions
  loadCharacters: () => Promise<void>
  loadCharacter: (id: string) => Promise<void>
  saveCharacter: (character: Character) => Promise<void>
  deleteCharacter: (id: string) => Promise<void>
  setCurrentCharacter: (character: Character | null) => void
  clearError: () => void
  initializeFromMockData: (mockCharacters: Character[]) => Promise<void>
}

/**
 * 创建角色数据 Store
 */
export const useCharacterStore = create<CharacterStoreState>((set, get) => ({
  // Initial state
  characters: [],
  currentCharacter: null,
  loading: false,
  error: null,

  // Actions
  loadCharacters: async () => {
    set({ loading: true, error: null })

    try {
      const characters = await characterService.loadCharacters()
      set({ characters, loading: false })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load characters'
      set({ error: errorMessage, loading: false })
      throw error
    }
  },

  loadCharacter: async (id: string) => {
    set({ loading: true, error: null })

    try {
      const character = await characterService.loadCharacter(id)
      set({ currentCharacter: character, loading: false })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `Failed to load character: ${id}`
      set({ error: errorMessage, loading: false, currentCharacter: null })
      throw error
    }
  },

  saveCharacter: async (character: Character) => {
    set({ loading: true, error: null })

    try {
      await characterService.saveCharacter(character)

      // 更新列表中的角色或添加新角色
      const { characters } = get()
      const existingIndex = characters.findIndex(
        (c) => c.basic.id === character.basic.id
      )

      if (existingIndex >= 0) {
        // 更新现有角色
        const updatedCharacters = [...characters]
        updatedCharacters[existingIndex] = character
        set({ characters: updatedCharacters, loading: false })
      } else {
        // 添加新角色
        set({ characters: [...characters, character], loading: false })
      }

      // 如果是当前角色，也更新
      const { currentCharacter } = get()
      if (currentCharacter?.basic.id === character.basic.id) {
        set({ currentCharacter: character })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save character'
      set({ error: errorMessage, loading: false })
      throw error
    }
  },

  deleteCharacter: async (id: string) => {
    set({ loading: true, error: null })

    try {
      await characterService.deleteCharacter(id)

      // 从列表中移除
      const { characters } = get()
      const updatedCharacters = characters.filter(
        (c) => c.basic.id !== id
      )
      set({ characters: updatedCharacters, loading: false })

      // 如果删除的是当前角色，清除当前角色
      const { currentCharacter } = get()
      if (currentCharacter?.basic.id === id) {
        set({ currentCharacter: null })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `Failed to delete character: ${id}`
      set({ error: errorMessage, loading: false })
      throw error
    }
  },

  setCurrentCharacter: (character: Character | null) => {
    set({ currentCharacter: character })
  },

  clearError: () => {
    set({ error: null })
  },

  initializeFromMockData: async (mockCharacters: Character[]) => {
    set({ loading: true, error: null })

    try {
      await characterService.initializeFromMockData(mockCharacters)
      // 重新加载所有角色
      await get().loadCharacters()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to initialize from mock data'
      set({ error: errorMessage, loading: false })
      throw error
    }
  },
}))
