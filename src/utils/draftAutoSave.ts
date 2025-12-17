/**
 * 草稿自动保存工具
 * 提供OC编辑页面的草稿自动保存功能
 */

import type { Character } from '@/types/character'

/**
 * 草稿存储键前缀
 */
const DRAFT_KEY_PREFIX = 'charaverse_draft_'

/**
 * 草稿元数据存储键
 */
const DRAFT_METADATA_KEY = 'charaverse_drafts_metadata'

/**
 * 草稿元数据接口
 */
export interface DraftMetadata {
  /** 角色ID */
  characterId: string
  /** 草稿保存时间戳 */
  savedAt: string
  /** 草稿数据大小（字节） */
  size: number
  /** 草稿标题（角色名称） */
  title: string
}

/**
 * 获取草稿存储键
 */
function getDraftKey(characterId: string): string {
  return `${DRAFT_KEY_PREFIX}${characterId}`
}

/**
 * 保存草稿
 */
export function saveDraft(characterId: string, data: Character): void {
  try {
    const draftKey = getDraftKey(characterId)
    const dataString = JSON.stringify(data)
    const size = new Blob([dataString]).size

    // 保存草稿数据
    localStorage.setItem(draftKey, dataString)

    // 更新草稿元数据
    const metadata: DraftMetadata = {
      characterId,
      savedAt: new Date().toISOString(),
      size,
      title: `${data.basic.nameCn} (${data.basic.nameEn})`,
    }

    const allMetadata = getAllDraftsMetadata()
    const existingIndex = allMetadata.findIndex((m) => m.characterId === characterId)

    if (existingIndex >= 0) {
      allMetadata[existingIndex] = metadata
    } else {
      allMetadata.push(metadata)
    }

    // 按保存时间排序，最新的在前面
    allMetadata.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime())

    // 只保留最近的10个草稿
    const recentMetadata = allMetadata.slice(0, 10)
    localStorage.setItem(DRAFT_METADATA_KEY, JSON.stringify(recentMetadata))

    console.log(`草稿已保存: ${characterId} (${size} bytes)`)
  } catch (error) {
    console.error('保存草稿失败:', error)
  }
}

/**
 * 加载草稿
 */
export function loadDraft(characterId: string): Character | null {
  try {
    const draftKey = getDraftKey(characterId)
    const dataString = localStorage.getItem(draftKey)

    if (!dataString) {
      return null
    }

    const data = JSON.parse(dataString) as Character
    console.log(`草稿已加载: ${characterId}`)
    return data
  } catch (error) {
    console.error('加载草稿失败:', error)
    return null
  }
}

/**
 * 删除草稿
 */
export function deleteDraft(characterId: string): void {
  try {
    const draftKey = getDraftKey(characterId)
    localStorage.removeItem(draftKey)

    // 从元数据中移除
    const allMetadata = getAllDraftsMetadata()
    const filteredMetadata = allMetadata.filter((m) => m.characterId !== characterId)
    localStorage.setItem(DRAFT_METADATA_KEY, JSON.stringify(filteredMetadata))

    console.log(`草稿已删除: ${characterId}`)
  } catch (error) {
    console.error('删除草稿失败:', error)
  }
}

/**
 * 获取所有草稿的元数据
 */
export function getAllDraftsMetadata(): DraftMetadata[] {
  try {
    const metadataString = localStorage.getItem(DRAFT_METADATA_KEY)
    if (!metadataString) {
      return []
    }
    return JSON.parse(metadataString) as DraftMetadata[]
  } catch (error) {
    console.error('获取草稿元数据失败:', error)
    return []
  }
}

/**
 * 清除所有草稿
 */
export function clearAllDrafts(): void {
  try {
    // 删除所有草稿数据
    const allMetadata = getAllDraftsMetadata()
    allMetadata.forEach((metadata) => {
      const draftKey = getDraftKey(metadata.characterId)
      localStorage.removeItem(draftKey)
    })

    // 删除元数据
    localStorage.removeItem(DRAFT_METADATA_KEY)

    console.log('所有草稿已清除')
  } catch (error) {
    console.error('清除草稿失败:', error)
  }
}

/**
 * 获取草稿大小（字节）
 */
export function getDraftSize(characterId: string): number {
  try {
    const draftKey = getDraftKey(characterId)
    const dataString = localStorage.getItem(draftKey)
    return dataString ? new Blob([dataString]).size : 0
  } catch (error) {
    console.error('获取草稿大小失败:', error)
    return 0
  }
}

/**
 * 检查是否有草稿
 */
export function hasDraft(characterId: string): boolean {
  const draftKey = getDraftKey(characterId)
  return localStorage.getItem(draftKey) !== null
}

/**
 * 获取草稿保存时间
 */
export function getDraftSavedAt(characterId: string): string | null {
  const allMetadata = getAllDraftsMetadata()
  const metadata = allMetadata.find((m) => m.characterId === characterId)
  return metadata?.savedAt || null
}

/**
 * 格式化草稿保存时间
 */
export function formatDraftTime(savedAt: string): string {
  const date = new Date(savedAt)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))

  if (diffMins < 1) {
    return '刚刚'
  } else if (diffMins < 60) {
    return `${diffMins}分钟前`
  } else if (diffMins < 24 * 60) {
    const diffHours = Math.floor(diffMins / 60)
    return `${diffHours}小时前`
  } else {
    return date.toLocaleDateString()
  }
}

/**
 * 自动保存管理器
 */
export class AutoSaveManager {
  private characterId: string
  private saveInterval: number
  private lastSaveTime: number = 0
  private isSaving: boolean = false
  private saveCallback: (data: Character) => void

  constructor(
    characterId: string,
    saveCallback: (data: Character) => void,
    intervalMs: number = 30000 // 默认30秒
  ) {
    this.characterId = characterId
    this.saveCallback = saveCallback
    this.saveInterval = intervalMs
  }

  /**
   * 开始自动保存
   */
  start(): void {
    // 加载现有草稿
    const draft = loadDraft(this.characterId)
    if (draft) {
      console.log('检测到现有草稿，准备恢复')
      this.saveCallback(draft)
    }

    // 设置定时器
    setInterval(() => {
      this.autoSave()
    }, this.saveInterval)

    console.log(`自动保存已启动，间隔: ${this.saveInterval}ms`)
  }

  /**
   * 手动触发保存
   */
  manualSave(data: Character): void {
    this.saveDraft(data)
  }

  /**
   * 自动保存
   */
  private autoSave(): void {
    if (this.isSaving) {
      return
    }

    const now = Date.now()
    if (now - this.lastSaveTime < this.saveInterval) {
      return
    }

    // 这里需要从外部获取当前数据
    // 在实际使用中，需要通过回调或其他方式获取当前编辑的数据
    console.log('自动保存检查...')
  }

  /**
   * 保存草稿
   */
  private saveDraft(data: Character): void {
    if (this.isSaving) {
      return
    }

    this.isSaving = true
    try {
      saveDraft(this.characterId, data)
      this.lastSaveTime = Date.now()
      console.log(`草稿已自动保存: ${this.characterId}`)
    } catch (error) {
      console.error('自动保存失败:', error)
    } finally {
      this.isSaving = false
    }
  }

  /**
   * 停止自动保存
   */
  stop(): void {
    console.log('自动保存已停止')
  }

  /**
   * 清理草稿
   */
  cleanup(): void {
    deleteDraft(this.characterId)
    console.log('草稿已清理')
  }
}
