/**
 * OC 列表页面
 * 展示所有角色的列表，支持搜索和筛选功能
 */

import { useEffect, useState, useMemo, useCallback } from 'react'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Database } from 'lucide-react'
import { useCharacterStore } from '@/stores/characterStore'
import type { Character } from '@/types/character'
import {
  Button,
  SearchBar,
  FilterPanel,
  OCGrid,
  Card,
  CardBody,
  type FilterOptions,
} from '@/components'
import styles from './OCListPage.module.css'

// 导入 Mock 数据
import mockChar001 from '../../data/characters/char-001.json'
import mockChar002 from '../../data/characters/char-002.json'
import mockChar003 from '../../data/characters/char-003.json'

const mockCharacters = [mockChar001, mockChar002, mockChar003] as Character[]

const defaultFilterOptions: FilterOptions = {
  selectedTags: [],
  sortBy: 'date',
  sortOrder: 'desc',
  gender: undefined,
  mbti: undefined,
}

export const OCListPage: FC = () => {
  const navigate = useNavigate()
  const { characters, loading, loadCharacters, initializeFromMockData } = useCharacterStore()

  const [searchQuery, setSearchQuery] = useState('')
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilterOptions)

  // 加载数据
  useEffect(() => {
    loadCharacters()
  }, [loadCharacters])

  // 获取所有可用标签
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>()
    characters.forEach((char) => {
      char.metadata.tags.forEach((tag) => tagsSet.add(tag))
    })
    return Array.from(tagsSet).sort()
  }, [characters])

  // 筛选和排序角色
  const filteredCharacters = useMemo(() => {
    let result = [...characters]

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((char) => {
        const nameCn = char.basic.nameCn?.toLowerCase() || ''
        const nameEn = char.basic.nameEn?.toLowerCase() || ''
        const nicknames = char.basic.nicknames.map((n) => n.toLowerCase()).join(' ')

        return (
          nameCn.includes(query) ||
          nameEn.includes(query) ||
          nicknames.includes(query)
        )
      })
    }

    // 标签过滤
    if (filterOptions.selectedTags.length > 0) {
      result = result.filter((char) =>
        filterOptions.selectedTags.some((tag) => char.metadata.tags.includes(tag))
      )
    }

    // 性别过滤
    if (filterOptions.gender) {
      result = result.filter((char) => char.basic.gender === filterOptions.gender)
    }

    // MBTI 类型过滤
    if (filterOptions.mbti) {
      result = result.filter((char) => char.personality.mbti === filterOptions.mbti)
    }

    // 排序
    result.sort((a, b) => {
      let comparison = 0

      if (filterOptions.sortBy === 'name') {
        const nameA = a.basic.nameCn || a.basic.nameEn
        const nameB = b.basic.nameCn || b.basic.nameEn
        comparison = nameA.localeCompare(nameB, 'zh-CN')
      } else if (filterOptions.sortBy === 'date') {
        comparison =
          new Date(a.basic.createdAt).getTime() -
          new Date(b.basic.createdAt).getTime()
      } else if (filterOptions.sortBy === 'updated') {
        comparison =
          new Date(a.basic.updatedAt).getTime() -
          new Date(b.basic.updatedAt).getTime()
      }

      return filterOptions.sortOrder === 'asc' ? comparison : -comparison
    })

    return result
  }, [characters, searchQuery, filterOptions])

  const handleCardClick = useCallback(
    (character: Character) => {
      navigate(`/characters/${character.basic.id}`)
    },
    [navigate]
  )

  const handleResetFilter = useCallback(() => {
    setFilterOptions(defaultFilterOptions)
    setSearchQuery('')
  }, [])

  const handleInitializeMockData = useCallback(async () => {
    try {
      await initializeFromMockData(mockCharacters)
    } catch (error) {
      console.error('初始化 Mock 数据失败:', error)
    }
  }, [initializeFromMockData])

  const handleCreateNew = useCallback(() => {
    // 阶段6才实现创建功能，暂时显示提示
    alert('创建角色功能将在阶段6（数据编辑功能）中实现')
    // navigate('/characters/new') // 暂时注释掉
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>角色列表</h1>
          <p className={styles.subtitle}>
            共 {filteredCharacters.length} / {characters.length} 个角色
          </p>
        </div>
        <div className={styles.headerActions}>
          <Button
            onClick={handleInitializeMockData}
            variant="secondary"
            icon={<Database />}
            disabled={loading || characters.length > 0}
          >
            加载示例数据
          </Button>
          <Button
            onClick={handleCreateNew}
            icon={<Plus />}
            disabled={loading}
          >
            创建角色（阶段6）
          </Button>
        </div>
      </div>

      <div className={styles.controls}>
        {/* 左侧筛选面板 */}
        <div className={styles.filterSection}>
          <FilterPanel
            availableTags={availableTags}
            filterOptions={filterOptions}
            onChange={setFilterOptions}
            onReset={handleResetFilter}
          />
        </div>

        {/* 右侧主内容区：搜索 + 列表 */}
        <div className={styles.mainContent}>
          <div className={styles.searchSection}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className={styles.content}>
            {characters.length === 0 && !loading ? (
              <Card variant="bordered">
                <CardBody>
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>📭</div>
                    <h3 className={styles.emptyTitle}>暂无角色数据</h3>
                    <p className={styles.emptyDescription}>
                      当前还没有任何角色数据。请点击"加载示例数据"按钮来加载示例角色。
                    </p>
                    <div className={styles.emptyActions}>
                      <Button
                        onClick={handleInitializeMockData}
                        variant="primary"
                        icon={<Database />}
                      >
                        加载示例数据
                      </Button>
                    </div>
                    <div className={styles.emptyHint}>
                      <p>提示：</p>
                      <ul>
                        <li>示例数据包含 3 个完整的角色信息</li>
                        <li>数据将保存在浏览器的 LocalStorage 中</li>
                        <li>创建角色功能将在阶段 6 实现</li>
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ) : (
              <OCGrid
                characters={filteredCharacters}
                loading={loading}
                onCardClick={handleCardClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OCListPage
