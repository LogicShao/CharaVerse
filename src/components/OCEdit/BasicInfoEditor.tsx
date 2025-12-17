/**
 * BasicInfoEditor 基础信息编辑器
 * 编辑角色的基础信息：名称、性别、创建者等
 */

import type { FC } from 'react'
import { X, Plus } from 'lucide-react'
import { FormInput, FormSelect } from '@/components/Form'
import type { BasicInfoEditorProps } from './BasicInfoEditor.types'
import { Gender } from '@/types/enums'
import styles from './BasicInfoEditor.module.css'

// 性别选项
const GENDER_OPTIONS = [
  { value: Gender.Male, label: '男性' },
  { value: Gender.Female, label: '女性' },
  { value: Gender.Other, label: '其他' },
  { value: Gender.Unknown, label: '未知' },
]

export const BasicInfoEditor: FC<BasicInfoEditorProps> = ({
  value,
  onChange,
  errors = {},
}) => {
  // 更新单个字段
  const updateField = <K extends keyof typeof value>(
    field: K,
    newValue: typeof value[K]
  ) => {
    onChange({
      ...value,
      [field]: newValue,
    })
  }

  // 更新嵌套字段（如creator.name）
  const updateCreatorField = (field: keyof typeof value.creator, newValue: string) => {
    onChange({
      ...value,
      creator: {
        ...value.creator,
        [field]: newValue,
      },
    })
  }

  // 添加昵称
  const handleAddNickname = () => {
    onChange({
      ...value,
      nicknames: [...value.nicknames, ''],
    })
  }

  // 删除昵称
  const handleRemoveNickname = (index: number) => {
    onChange({
      ...value,
      nicknames: value.nicknames.filter((_, i) => i !== index),
    })
  }

  // 更新昵称
  const handleUpdateNickname = (index: number, newValue: string) => {
    const newNicknames = [...value.nicknames]
    newNicknames[index] = newValue
    onChange({
      ...value,
      nicknames: newNicknames,
    })
  }

  return (
    <div className={styles.container}>
      {/* 名称信息 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>名称信息</h3>
        <div className={styles.formGrid}>
          <FormInput
            name="nameEn"
            label="英文名"
            value={value.nameEn}
            onChange={(val) => updateField('nameEn', val)}
            error={errors.nameEn}
            required
            placeholder="例如: Luna Starfall"
            fullWidth
          />
          <FormInput
            name="nameCn"
            label="中文名"
            value={value.nameCn}
            onChange={(val) => updateField('nameCn', val)}
            error={errors.nameCn}
            required
            placeholder="例如: 月落星"
            fullWidth
          />
        </div>

        {/* 昵称列表 */}
        <div className={styles.formRow}>
          <div className={styles.nicknamesContainer}>
            <label className={styles.label}>昵称/别称</label>
            {value.nicknames.map((nickname, index) => (
              <div key={index} className={styles.nicknameItem}>
                <FormInput
                  name={`nickname-${index}`}
                  value={nickname}
                  onChange={(val) => handleUpdateNickname(index, val)}
                  placeholder="输入昵称"
                  fullWidth
                  className={styles.nicknameInput}
                />
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveNickname(index)}
                  aria-label="删除昵称"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              className={styles.addButton}
              onClick={handleAddNickname}
            >
              <Plus size={16} />
              <span>添加昵称</span>
            </button>
          </div>
        </div>
      </div>

      {/* 基本属性 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>基本属性</h3>
        <div className={styles.formGrid}>
          <FormSelect
            name="gender"
            label="性别"
            value={value.gender}
            onChange={(val) => updateField('gender', val as Gender)}
            options={GENDER_OPTIONS}
            error={errors.gender}
            required
            fullWidth
          />
        </div>
      </div>

      {/* 创作者信息 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>创作者信息</h3>
        <div className={styles.formGrid}>
          <FormInput
            name="creatorName"
            label="创作者名称"
            value={value.creator.name}
            onChange={(val) => updateCreatorField('name', val)}
            error={errors['creator.name']}
            required
            placeholder="例如: 张三"
            fullWidth
          />
          <FormInput
            name="creatorContact"
            label="联系方式"
            value={value.creator.contact || ''}
            onChange={(val) => updateCreatorField('contact', val)}
            error={errors['creator.contact']}
            placeholder="例如: email@example.com"
            helperText="可选项"
            fullWidth
          />
        </div>
      </div>
    </div>
  )
}
