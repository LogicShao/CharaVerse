/**
 * OCEditPage 角色编辑页面（完整Tab版本）
 * 支持所有11个信息面板的编辑和保存
 */

import { useState, useEffect, useRef, type FC } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCharacterStore } from '@/stores/characterStore'
import { Button, Tabs } from '@/components'
import {
  BasicInfoEditor,
  AppearanceEditor,
  PersonalityEditor,
  BackgroundEditor,
  SkillsEditor,
  RelationshipsEditor,
  WardrobeEditor,
  LoreEditor,
  AdditionalInfoEditor,
} from '@/components/OCEdit'
import type {
  Character,
  BasicProfile,
  Appearance,
  Personality,
  Background,
  Skills,
  Relationships,
  Wardrobe,
  Lore,
  AdditionalInfo,
} from '@/types/character'
import { validateCharacterForm, convertToTabErrors } from '@/utils/formValidation'
import { saveDraft, loadDraft, deleteDraft, hasDraft } from '@/utils/draftAutoSave'
import type { EditorTab } from './OCEditPage.types'
import styles from './OCEditPage.module.css'

export const OCEditPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentCharacter, loading, error, loadCharacter, saveCharacter } = useCharacterStore()

  // 编辑状态
  const [editData, setEditData] = useState<Character | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [tabErrors, setTabErrors] = useState<Record<string, Record<string, string>>>({})

  // 草稿状态
  const [hasDraftData, setHasDraftData] = useState(false)
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastSaveRef = useRef<number>(0)

  // 加载角色数据
  useEffect(() => {
    if (id) {
      loadCharacter(id)
    }
  }, [id, loadCharacter])

  // 初始化编辑数据（检查草稿）
  useEffect(() => {
    if (currentCharacter && !editData && id) {
      // 检查是否有草稿
      const draft = loadDraft(id)
      if (draft) {
        // 询问用户是否恢复草稿
        const shouldRestore = window.confirm(
          '检测到未保存的草稿，是否恢复？\n\n点击"确定"恢复草稿，点击"取消"使用原始数据。'
        )

        if (shouldRestore) {
          setEditData(draft)
          setHasDraftData(true)
          setHasUnsavedChanges(true)
          console.log('草稿已恢复')
        } else {
          setEditData({ ...currentCharacter })
          // 删除草稿
          deleteDraft(id)
          console.log('草稿已丢弃')
        }
      } else {
        setEditData({ ...currentCharacter })
      }

      // 检查草稿状态
      setHasDraftData(hasDraft(id))
    }
  }, [currentCharacter, editData, id])

  // 自动保存草稿
  useEffect(() => {
    if (!editData || !id || !hasUnsavedChanges) return

    // 防抖：只在数据变化后3秒保存
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current)
    }

    autoSaveTimerRef.current = setTimeout(() => {
      const now = Date.now()
      // 至少间隔10秒才保存一次
      if (now - lastSaveRef.current > 10000) {
        saveDraft(id, editData)
        lastSaveRef.current = now
        setHasDraftData(true)
        console.log('草稿已自动保存')
      }
    }, 3000)

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current)
      }
    }
  }, [editData, id, hasUnsavedChanges])

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current)
      }
    }
  }, [])

  // 定义Tab配置
  const editorTabs: EditorTab[] = [
    { key: 'basic', label: '基本信息', description: '角色的基础身份信息', required: true },
    { key: 'appearance', label: '外观', description: '体型、面容、发型等外观特征' },
    { key: 'personality', label: '性格', description: '性格特质、MBTI、动机等' },
    { key: 'background', label: '背景', description: '出生地、家庭、教育等背景故事' },
    { key: 'skills', label: '技能', description: '职业、技能、弱点等能力信息' },
    { key: 'relationships', label: '关系', description: '与其他角色的关系网络' },
    { key: 'wardrobe', label: '服装', description: '服装、配饰、标志性武器' },
    { key: 'lore', label: '设定', description: '世界观、时间线、重要物品' },
    { key: 'additionalInfo', label: '补充信息', description: '爱好、习惯、目标等' },
    { key: 'media', label: '媒体资源', description: '图片、配音、主题曲等' },
    { key: 'metadata', label: '元数据', description: '标签、可见性、语言等' },
  ]

  // 处理基础信息变化
  const handleBasicInfoChange = (basic: BasicProfile) => {
    if (!editData) return

    setEditData({
      ...editData,
      basic,
    })
    setHasUnsavedChanges(true)
  }

  // 处理外观信息变化
  const handleAppearanceChange = (appearance: Appearance) => {
    if (!editData) return

    setEditData({
      ...editData,
      appearance,
    })
    setHasUnsavedChanges(true)
  }

  // 处理性格信息变化
  const handlePersonalityChange = (personality: Personality) => {
    if (!editData) return

    setEditData({
      ...editData,
      personality,
    })
    setHasUnsavedChanges(true)
  }

  // 处理背景信息变化
  const handleBackgroundChange = (background: Background) => {
    if (!editData) return

    setEditData({
      ...editData,
      background,
    })
    setHasUnsavedChanges(true)
  }

  // 处理技能信息变化
  const handleSkillsChange = (skills: Skills) => {
    if (!editData) return

    setEditData({
      ...editData,
      skills,
    })
    setHasUnsavedChanges(true)
  }

  // 处理关系信息变化
  const handleRelationshipsChange = (relationships: Relationships) => {
    if (!editData) return

    setEditData({
      ...editData,
      relationships,
    })
    setHasUnsavedChanges(true)
  }

  // 处理服装信息变化
  const handleWardrobeChange = (wardrobe: Wardrobe) => {
    if (!editData) return

    setEditData({
      ...editData,
      wardrobe,
    })
    setHasUnsavedChanges(true)
  }

  // 处理设定信息变化
  const handleLoreChange = (lore: Lore) => {
    if (!editData) return

    setEditData({
      ...editData,
      lore,
    })
    setHasUnsavedChanges(true)
  }

  // 处理补充信息变化
  const handleAdditionalInfoChange = (additionalInfo: AdditionalInfo) => {
    if (!editData) return

    setEditData({
      ...editData,
      additionalInfo,
    })
    setHasUnsavedChanges(true)
  }

  // 更新Tab错误状态 (暂时注释，后续编辑器组件会使用)
  // const updateTabErrors = (tabKey: string, field: string, error: string | null) => {
  //   setTabErrors((prev) => {
  //     const tabErrors = { ...prev[tabKey] }
  //     if (error) {
  //       tabErrors[field] = error
  //     } else {
  //       delete tabErrors[field]
  //     }
  //     return {
  //       ...prev,
  //       [tabKey]: Object.keys(tabErrors).length > 0 ? tabErrors : {},
  //     }
  //   })
  // }

  // 验证表单
  const validateForm = (): boolean => {
    if (!editData) return false

    const validationResult = validateCharacterForm(editData)

    if (validationResult.success) {
      setTabErrors({})
      return true
    }

    const errors = convertToTabErrors(validationResult.errors)
    setTabErrors(errors)

    // 如果有错误，滚动到第一个有错误的Tab
    if (Object.keys(errors).length > 0) {
      const firstErrorTab = Object.keys(errors)[0]
      setActiveTab(firstErrorTab)
    }

    return false
  }

  // 手动保存草稿
  const handleSaveDraft = () => {
    if (!editData || !id) return

    saveDraft(id, editData)
    setHasDraftData(true)
    alert('草稿已保存')
  }

  // 删除草稿
  const handleDeleteDraft = () => {
    if (!id) return

    const confirmed = window.confirm('确定要删除草稿吗？此操作不可撤销。')
    if (confirmed) {
      deleteDraft(id)
      setHasDraftData(false)
      alert('草稿已删除')
    }
  }

  // 保存变更
  const handleSave = async () => {
    if (!editData || !id) return

    // 验证表单
    if (!validateForm()) {
      alert('请填写所有必填字段')
      return
    }

    try {
      setSaving(true)

      // 更新时间戳
      const now = new Date().toISOString()
      const updatedData: Character = {
        ...editData,
        basic: {
          ...editData.basic,
          updatedAt: now,
        },
      }

      await saveCharacter(updatedData)
      setHasUnsavedChanges(false)

      // 删除草稿
      deleteDraft(id)
      setHasDraftData(false)

      // 保存成功后返回详情页
      navigate(`/characters/${id}`)
    } catch (err) {
      console.error('保存失败:', err)
      alert('保存失败，请重试')
    } finally {
      setSaving(false)
    }
  }

  // 取消编辑
  const handleCancel = () => {
    if (hasUnsavedChanges && id) {
      const confirmed = window.confirm(
        '有未保存的更改，确定要离开吗？\n\n点击"确定"离开并保留草稿，点击"取消"继续编辑。'
      )
      if (!confirmed) return
    }
    navigate(`/characters/${id}`)
  }

  // 加载中
  if (loading && !editData) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>加载中...</div>
      </div>
    )
  }

  // 错误状态
  if (error || !editData) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>加载失败</h2>
          <p className={styles.errorMessage}>{error || '无法加载角色数据'}</p>
          <Button onClick={() => navigate('/')}>返回列表</Button>
        </div>
      </div>
    )
  }

  // 渲染当前激活的Tab内容
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <BasicInfoEditor
            value={editData.basic}
            onChange={handleBasicInfoChange}
            errors={tabErrors.basic}
          />
        )
      case 'appearance':
        return (
          <AppearanceEditor
            value={editData.appearance}
            onChange={handleAppearanceChange}
            errors={tabErrors.appearance}
          />
        )
      case 'personality':
        return (
          <PersonalityEditor
            value={editData.personality}
            onChange={handlePersonalityChange}
            errors={tabErrors.personality}
          />
        )
      case 'background':
        return (
          <BackgroundEditor
            value={editData.background}
            onChange={handleBackgroundChange}
            errors={tabErrors.background}
          />
        )
      case 'skills':
        return (
          <SkillsEditor
            value={editData.skills}
            onChange={handleSkillsChange}
            errors={tabErrors.skills}
          />
        )
      case 'relationships':
        return (
          <RelationshipsEditor
            value={editData.relationships}
            onChange={handleRelationshipsChange}
            errors={tabErrors.relationships}
          />
        )
      case 'wardrobe':
        return (
          <WardrobeEditor
            value={editData.wardrobe}
            onChange={handleWardrobeChange}
            errors={tabErrors.wardrobe}
          />
        )
      case 'lore':
        return (
          <LoreEditor
            value={editData.lore}
            onChange={handleLoreChange}
            errors={tabErrors.lore}
          />
        )
      case 'additionalInfo':
        return (
          <AdditionalInfoEditor
            value={editData.additionalInfo}
            onChange={handleAdditionalInfoChange}
            errors={tabErrors.additionalInfo}
          />
        )
      case 'media':
        return (
          <div className={styles.placeholderTab}>
            <h3>媒体资源编辑器</h3>
            <p>此功能将在后续版本中实现</p>
          </div>
        )
      case 'metadata':
        return (
          <div className={styles.placeholderTab}>
            <h3>元数据编辑器</h3>
            <p>此功能将在后续版本中实现</p>
          </div>
        )
      default:
        return (
          <div className={styles.placeholderTab}>
            <h3>未知编辑器</h3>
            <p>请选择有效的Tab</p>
          </div>
        )
    }
  }

  return (
    <div className={styles.container}>
      {/* 头部 */}
      <div className={styles.header}>
        <h1 className={styles.title}>编辑角色</h1>
      </div>

      {/* 未保存提示 */}
      {hasUnsavedChanges && (
        <div className={styles.unsavedChanges}>
          有未保存的更改
        </div>
      )}

      {/* Tab导航 */}
      <div className={styles.tabsContainer}>
        <Tabs
          items={editorTabs.map((tab) => ({
            key: tab.key,
            label: tab.label,
            children: (
              <div className={styles.tabContent}>
                <div className={styles.tabDescription}>
                  <h3>{tab.label}</h3>
                  {tab.description && <p>{tab.description}</p>}
                  {tab.required && <span className={styles.requiredBadge}>必填</span>}
                </div>
                {renderActiveTab()}
              </div>
            ),
          }))}
          activeKey={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* 底部操作栏 */}
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          {hasDraftData && (
            <div className={styles.draftStatus}>
              <span className={styles.draftIndicator}>📝 有未保存的草稿</span>
              <button
                type="button"
                className={styles.draftActionButton}
                onClick={handleDeleteDraft}
                title="删除草稿"
              >
                删除草稿
              </button>
            </div>
          )}
        </div>
        <div className={styles.footerRight}>
          <Button variant="outline" onClick={handleCancel} disabled={saving}>
            取消
          </Button>
          <Button
            variant="secondary"
            onClick={handleSaveDraft}
            disabled={!hasUnsavedChanges || saving}
            title="手动保存草稿"
          >
            保存草稿
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!hasUnsavedChanges || saving}
          >
            {saving ? '保存中...' : '保存'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OCEditPage
