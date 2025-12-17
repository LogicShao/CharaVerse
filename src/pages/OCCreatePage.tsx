/**
 * OCCreatePage 新建角色页面（MVP版本）
 * 复用BasicInfoEditor，支持快速创建新角色
 */

import { useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useCharacterStore } from '@/stores/characterStore'
import { Button } from '@/components/Button'
import { BasicInfoEditor } from '@/components/OCEdit/BasicInfoEditor'
import { createDefaultCharacterInput } from '@/schemas/character.schema'
import type { Character, BasicProfile } from '@/types/character'
import { Gender } from '@/types/enums'
import styles from './OCEditPage.module.css'

export const OCCreatePage: FC = () => {
  const navigate = useNavigate()
  const { saveCharacter } = useCharacterStore()

  // 初始化新角色数据
  const [newCharacter] = useState<Character>(() => {
    const now = new Date().toISOString()

    // 创建完整的默认Character对象
    const defaultCharInput = createDefaultCharacterInput('默认创作者')

    return {
      basic: {
        id: uuidv4(),
        nameEn: '',
        nameCn: '',
        nicknames: [],
        gender: Gender.Unknown,
        createdAt: now,
        updatedAt: now,
        creator: {
          name: '',
          contact: '',
        },
        schemaVersion: '1.0.0',
      },
      appearance: defaultCharInput.appearance!,
      wardrobe: defaultCharInput.wardrobe!,
      personality: defaultCharInput.personality!,
      background: defaultCharInput.background!,
      skills: defaultCharInput.skills!,
      relationships: defaultCharInput.relationships!,
      lore: defaultCharInput.lore!,
      additionalInfo: defaultCharInput.additionalInfo!,
      media: defaultCharInput.media!,
      metadata: defaultCharInput.metadata!,
    } as Character
  })

  // 编辑状态
  const [editData, setEditData] = useState<Character>(newCharacter)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // 处理基础信息变化
  const handleBasicInfoChange = (basic: BasicProfile) => {
    setEditData({
      ...editData,
      basic,
    })
    // 清除相关错误
    setErrors({})
  }

  // 验证表单
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!editData.basic.nameEn.trim()) {
      newErrors.nameEn = '英文名不能为空'
    }
    if (!editData.basic.nameCn.trim()) {
      newErrors.nameCn = '中文名不能为空'
    }
    if (!editData.basic.creator.name.trim()) {
      newErrors['creator.name'] = '创作者名称不能为空'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 保存新角色
  const handleCreate = async () => {
    if (!validateForm()) {
      alert('请填写所有必填字段')
      return
    }

    try {
      setSaving(true)
      await saveCharacter(editData)

      // 创建成功后导航到详情页
      navigate(`/characters/${editData.basic.id}`)
    } catch (err) {
      console.error('创建失败:', err)
      alert('创建失败，请重试')
    } finally {
      setSaving(false)
    }
  }

  // 取消创建
  const handleCancel = () => {
    const confirmed = window.confirm('确定要放弃创建吗？')
    if (confirmed) {
      navigate('/')
    }
  }

  return (
    <div className={styles.container}>
      {/* 头部 */}
      <div className={styles.header}>
        <h1 className={styles.title}>新建角色</h1>
      </div>

      {/* 编辑器 */}
      <div className={styles.editorContainer}>
        <BasicInfoEditor
          value={editData.basic}
          onChange={handleBasicInfoChange}
          errors={errors}
        />
      </div>

      {/* 底部操作栏 */}
      <div className={styles.footer}>
        <Button variant="outline" onClick={handleCancel} disabled={saving}>
          取消
        </Button>
        <Button variant="primary" onClick={handleCreate} disabled={saving}>
          {saving ? '创建中...' : '创建'}
        </Button>
      </div>
    </div>
  )
}

export default OCCreatePage
