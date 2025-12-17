/**
 * AdditionalInfoEditor 补充信息编辑器
 * 编辑角色的爱好、习惯、梦想、座右铭等补充信息
 */

import type { FC } from 'react'
import { X, Plus } from 'lucide-react'
import { FormInput, FormTextarea } from '@/components/Form'
import type { AdditionalInfoEditorProps } from './AdditionalInfoEditor.types'
import type { AdditionalInfo } from '@/types/character'
import styles from './AdditionalInfoEditor.module.css'

export const AdditionalInfoEditor: FC<AdditionalInfoEditorProps> = ({
  value,
  onChange,
  errors = {},
  disabled = false,
}) => {
  // 更新整个AdditionalInfo对象
  const updateAdditionalInfo = <K extends keyof AdditionalInfo>(
    key: K,
    newValue: AdditionalInfo[K]
  ) => {
    onChange({
      ...value,
      [key]: newValue,
    })
  }

  // 添加爱好
  const handleAddHobby = () => {
    updateAdditionalInfo('hobbies', [...value.hobbies, ''])
  }

  // 删除爱好
  const handleRemoveHobby = (index: number) => {
    updateAdditionalInfo('hobbies', value.hobbies.filter((_, i) => i !== index))
  }

  // 更新爱好
  const handleUpdateHobby = (index: number, newValue: string) => {
    const newHobbies = [...value.hobbies]
    newHobbies[index] = newValue
    updateAdditionalInfo('hobbies', newHobbies)
  }

  // 添加讨厌的东西
  const handleAddDislike = () => {
    updateAdditionalInfo('dislikes', [...value.dislikes, ''])
  }

  // 删除讨厌的东西
  const handleRemoveDislike = (index: number) => {
    updateAdditionalInfo('dislikes', value.dislikes.filter((_, i) => i !== index))
  }

  // 更新讨厌的东西
  const handleUpdateDislike = (index: number, newValue: string) => {
    const newDislikes = [...value.dislikes]
    newDislikes[index] = newValue
    updateAdditionalInfo('dislikes', newDislikes)
  }

  // 添加习惯
  const handleAddHabit = () => {
    updateAdditionalInfo('habits', [...value.habits, ''])
  }

  // 删除习惯
  const handleRemoveHabit = (index: number) => {
    updateAdditionalInfo('habits', value.habits.filter((_, i) => i !== index))
  }

  // 更新习惯
  const handleUpdateHabit = (index: number, newValue: string) => {
    const newHabits = [...value.habits]
    newHabits[index] = newValue
    updateAdditionalInfo('habits', newHabits)
  }

  // 添加梦想
  const handleAddDream = () => {
    updateAdditionalInfo('dreams', [...value.dreams, ''])
  }

  // 删除梦想
  const handleRemoveDream = (index: number) => {
    updateAdditionalInfo('dreams', value.dreams.filter((_, i) => i !== index))
  }

  // 更新梦想
  const handleUpdateDream = (index: number, newValue: string) => {
    const newDreams = [...value.dreams]
    newDreams[index] = newValue
    updateAdditionalInfo('dreams', newDreams)
  }

  // 添加标签
  const handleAddTag = () => {
    updateAdditionalInfo('tags', [...value.tags, ''])
  }

  // 删除标签
  const handleRemoveTag = (index: number) => {
    updateAdditionalInfo('tags', value.tags.filter((_, i) => i !== index))
  }

  // 更新标签
  const handleUpdateTag = (index: number, newValue: string) => {
    const newTags = [...value.tags]
    newTags[index] = newValue
    updateAdditionalInfo('tags', newTags)
  }

  return (
    <div className={styles.container}>
      {/* 爱好和兴趣 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>爱好和兴趣</h3>
        <div className={styles.formRow}>
          <label className={styles.label}>爱好列表</label>
          <div className={styles.dynamicList}>
            {value.hobbies.map((hobby, index) => (
              <div key={index} className={styles.listItem}>
                <div className={styles.listItemContent}>
                  <FormInput
                    name={`hobby-${index}`}
                    value={hobby}
                    onChange={(val) => handleUpdateHobby(index, val)}
                    error={errors[`hobbies.${index}`]}
                    disabled={disabled}
                    placeholder="例如：阅读、绘画、运动、烹饪"
                    fullWidth
                  />
                </div>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveHobby(index)}
                  disabled={disabled}
                  aria-label="删除爱好"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddHobby}
            disabled={disabled}
          >
            <Plus size={16} />
            <span>添加爱好</span>
          </button>
        </div>
      </div>

      {/* 讨厌的东西 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>讨厌的东西</h3>
        <div className={styles.formRow}>
          <label className={styles.label}>讨厌的事物列表</label>
          <div className={styles.dynamicList}>
            {value.dislikes.map((dislike, index) => (
              <div key={index} className={styles.listItem}>
                <div className={styles.listItemContent}>
                  <FormInput
                    name={`dislike-${index}`}
                    value={dislike}
                    onChange={(val) => handleUpdateDislike(index, val)}
                    error={errors[`dislikes.${index}`]}
                    disabled={disabled}
                    placeholder="例如：谎言、暴力、甜食、早起"
                    fullWidth
                  />
                </div>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveDislike(index)}
                  disabled={disabled}
                  aria-label="删除讨厌的事物"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddDislike}
            disabled={disabled}
          >
            <Plus size={16} />
            <span>添加讨厌的事物</span>
          </button>
        </div>
      </div>

      {/* 特殊习惯 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>特殊习惯</h3>
        <div className={styles.formRow}>
          <label className={styles.label}>习惯列表</label>
          <div className={styles.dynamicList}>
            {value.habits.map((habit, index) => (
              <div key={index} className={styles.listItem}>
                <div className={styles.listItemContent}>
                  <FormInput
                    name={`habit-${index}`}
                    value={habit}
                    onChange={(val) => handleUpdateHabit(index, val)}
                    error={errors[`habits.${index}`]}
                    disabled={disabled}
                    placeholder="例如：思考时转笔、紧张时咬指甲"
                    fullWidth
                  />
                </div>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveHabit(index)}
                  disabled={disabled}
                  aria-label="删除习惯"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddHabit}
            disabled={disabled}
          >
            <Plus size={16} />
            <span>添加习惯</span>
          </button>
        </div>
      </div>

      {/* 梦想和目标 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>梦想和目标</h3>
        <div className={styles.formRow}>
          <label className={styles.label}>梦想列表</label>
          <div className={styles.dynamicList}>
            {value.dreams.map((dream, index) => (
              <div key={index} className={styles.listItem}>
                <div className={styles.listItemContent}>
                  <FormTextarea
                    name={`dream-${index}`}
                    value={dream}
                    onChange={(val) => handleUpdateDream(index, val)}
                    error={errors[`dreams.${index}`]}
                    disabled={disabled}
                    placeholder="例如：成为世界第一的剑士、环游世界"
                    rows={2}
                    fullWidth
                  />
                </div>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveDream(index)}
                  disabled={disabled}
                  aria-label="删除梦想"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddDream}
            disabled={disabled}
          >
            <Plus size={16} />
            <span>添加梦想</span>
          </button>
        </div>
      </div>

      {/* 座右铭 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>座右铭</h3>
        <div className={styles.formRow}>
          <FormTextarea
            name="motto"
            label="座右铭或个性签名"
            value={value.motto}
            onChange={(val) => updateAdditionalInfo('motto', val)}
            error={errors.motto}
            required
            disabled={disabled}
            placeholder="例如：永不放弃、活在当下、知识就是力量"
            rows={3}
          />
        </div>
      </div>

      {/* 标签 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>标签</h3>
        <div className={styles.formRow}>
          <label className={styles.label}>标签列表（用于分类和检索）</label>
          <div className={styles.dynamicList}>
            {value.tags.map((tag, index) => (
              <div key={index} className={styles.listItem}>
                <div className={styles.listItemContent}>
                  <FormInput
                    name={`tag-${index}`}
                    value={tag}
                    onChange={(val) => handleUpdateTag(index, val)}
                    error={errors[`tags.${index}`]}
                    disabled={disabled}
                    placeholder="例如：战士、魔法师、乐观、勇敢"
                    fullWidth
                  />
                </div>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveTag(index)}
                  disabled={disabled}
                  aria-label="删除标签"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddTag}
            disabled={disabled}
          >
            <Plus size={16} />
            <span>添加标签</span>
          </button>
        </div>
      </div>

      {/* 补充信息说明 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>补充信息说明</h3>
        <div className={styles.formRow}>
          <p className={styles.helperText}>
            补充信息记录了角色的个人偏好、习惯和人生目标。这些细节使角色更加生动和真实。
          </p>
          <ul className={styles.helperText}>
            <li><strong>爱好和兴趣</strong>：角色喜欢做什么，有什么兴趣爱好</li>
            <li><strong>讨厌的东西</strong>：角色不喜欢的事物，有助于塑造性格</li>
            <li><strong>特殊习惯</strong>：角色的行为习惯和口头禅</li>
            <li><strong>梦想和目标</strong>：角色的人生追求和愿望</li>
            <li><strong>座右铭</strong>：角色的生活信条或口头禅</li>
            <li><strong>标签</strong>：用于分类和检索角色的关键词</li>
          </ul>
          <p className={styles.helperText}>
            这些补充信息虽然看似琐碎，但对于塑造立体的角色形象至关重要。
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdditionalInfoEditor
