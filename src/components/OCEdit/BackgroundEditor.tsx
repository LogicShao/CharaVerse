/**
 * BackgroundEditor 背景编辑器
 * 编辑角色的背景信息：出生地、家庭、教育、重要事件等
 */

import type { FC } from 'react'
import { X, Plus } from 'lucide-react'
import { FormInput, FormTextarea } from '@/components/Form'
import type {
  BackgroundEditorProps,
  FamilyMemberEditorProps,
  ImportantEventEditorProps,
} from './BackgroundEditor.types'
import type { Background, FamilyMember, ImportantEvent } from '@/types/character'
import styles from './BackgroundEditor.module.css'

// 家庭成员编辑器子组件
const FamilyMemberEditor: FC<FamilyMemberEditorProps> = ({
  value,
  onChange,
  onRemove,
  index,
  errors = {},
  disabled = false,
}) => {
  const updateField = <K extends keyof FamilyMember>(
    field: K,
    newValue: FamilyMember[K]
  ) => {
    onChange({
      ...value,
      [field]: newValue,
    })
  }

  return (
    <div className={styles.familyItem}>
      <div className={styles.familyHeader}>
        <div className={styles.familyMemberName}>家庭成员 #{index + 1}</div>
        <div className={styles.familyControls}>
          <span
            className={`${styles.familyMemberStatus} ${
              value.isAlive === false ? styles.statusDeceased : styles.statusAlive
            }`}
          >
            {value.isAlive === false ? '已故' : '在世'}
          </span>
          {onRemove && (
            <button
              type="button"
              className={styles.removeButton}
              onClick={onRemove}
              disabled={disabled}
              aria-label="删除该家庭成员"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.formGrid}>
        <FormInput
          name={`family-name-${index}`}
          label="姓名"
          value={value.name}
          onChange={(val) => updateField('name', val)}
          error={errors[`family.${index}.name`]}
          required
          disabled={disabled}
          placeholder="例如：父亲、母亲、兄弟姐妹的名字"
        />
        <FormInput
          name={`family-relationship-${index}`}
          label="与角色关系"
          value={value.relationship}
          onChange={(val) => updateField('relationship', val)}
          error={errors[`family.${index}.relationship`]}
          required
          disabled={disabled}
          placeholder="例如：父亲、母亲、兄弟、姐妹"
        />
      </div>

      <div className={styles.formRow}>
        <FormInput
          name={`family-description-${index}`}
          label="描述"
          value={value.description || ''}
          onChange={(val) => updateField('description', val || undefined)}
          error={errors[`family.${index}.description`]}
          disabled={disabled}
          placeholder="例如：温柔的护士，总是在你需要的时候陪伴你"
          helperText="可选项"
        />
      </div>

      <div className={styles.formGrid}>
        <div className={styles.switchContainer}>
          <label className={styles.switchLabel}>在世状态：</label>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={value.isAlive !== false}
              onChange={(e) => updateField('isAlive', e.target.checked)}
              disabled={disabled}
            />
            <span className={styles.slider}></span>
          </label>
          <span className={styles.switchLabel}>
            {value.isAlive === false ? '已故' : '在世'}
          </span>
        </div>
      </div>
    </div>
  )
}

// 重要事件编辑器子组件
const ImportantEventEditor: FC<ImportantEventEditorProps> = ({
  value,
  onChange,
  onRemove,
  index,
  errors = {},
  disabled = false,
}) => {
  const updateField = <K extends keyof ImportantEvent>(
    field: K,
    newValue: ImportantEvent[K]
  ) => {
    onChange({
      ...value,
      [field]: newValue,
    })
  }

  return (
    <div className={styles.eventItem}>
      <div className={styles.eventHeader}>
        <div className={styles.eventName}>事件 #{index + 1}</div>
        {onRemove && (
          <button
            type="button"
            className={styles.removeButton}
            onClick={onRemove}
            disabled={disabled}
            aria-label="删除该事件"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className={styles.formGrid}>
        <FormInput
          name={`event-name-${index}`}
          label="事件名称"
          value={value.name}
          onChange={(val) => updateField('name', val)}
          error={errors[`turningPoints.${index}.name`]}
          required
          disabled={disabled}
          placeholder="例如：第一次离家、遇到导师"
        />
        <FormInput
          name={`event-time-${index}`}
          label="发生时间"
          value={value.time}
          onChange={(val) => updateField('time', val)}
          error={errors[`turningPoints.${index}.time`]}
          required
          disabled={disabled}
          placeholder="例如：5岁时、上周一"
        />
      </div>

      <div className={styles.formRow}>
        <FormTextarea
          name={`event-description-${index}`}
          label="事件描述"
          value={value.description}
          onChange={(val) => updateField('description', val)}
          error={errors[`turningPoints.${index}.description`]}
          required
          disabled={disabled}
          placeholder="详细描述该事件的发生过程和具体情况"
          rows={3}
        />
      </div>

      <div className={styles.formRow}>
        <FormTextarea
          name={`event-impact-${index}`}
          label="对角色的影响"
          value={value.impact}
          onChange={(val) => updateField('impact', val)}
          error={errors[`turningPoints.${index}.impact`]}
          required
          disabled={disabled}
          placeholder="描述这个事件如何影响了角色的性格和人生"
          rows={3}
        />
      </div>
    </div>
  )
}

export const BackgroundEditor: FC<BackgroundEditorProps> = ({
  value,
  onChange,
  errors = {},
  disabled = false,
}) => {
  // 更新整个Background对象
  const updateBackground = <K extends keyof Background>(
    key: K,
    newValue: Background[K]
  ) => {
    onChange({
      ...value,
      [key]: newValue,
    })
  }

  // 添加家庭成员
  const handleAddFamilyMember = () => {
    const newFamilyMember: FamilyMember = {
      name: '',
      relationship: '',
      description: '',
      isAlive: true,
    }
    updateBackground('family', [...value.family, newFamilyMember])
  }

  // 删除家庭成员
  const handleRemoveFamilyMember = (index: number) => {
    updateBackground('family', value.family.filter((_, i) => i !== index))
  }

  // 更新家庭成员
  const handleUpdateFamilyMember = (index: number, newMember: FamilyMember) => {
    const newFamily = [...value.family]
    newFamily[index] = newMember
    updateBackground('family', newFamily)
  }

  // 添加重要事件
  const handleAddTurningPoint = () => {
    const newEvent: ImportantEvent = {
      name: '',
      time: '',
      description: '',
      impact: '',
    }
    updateBackground('turningPoints', [...value.turningPoints, newEvent])
  }

  // 删除重要事件
  const handleRemoveTurningPoint = (index: number) => {
    updateBackground('turningPoints', value.turningPoints.filter((_, i) => i !== index))
  }

  // 更新重要事件
  const handleUpdateTurningPoint = (index: number, newEvent: ImportantEvent) => {
    const newEvents = [...value.turningPoints]
    newEvents[index] = newEvent
    updateBackground('turningPoints', newEvents)
  }

  // 添加冒险/主要经历
  const handleAddAdventure = () => {
    updateBackground('adventures', [...value.adventures, ''])
  }

  // 删除冒险/主要经历
  const handleRemoveAdventure = (index: number) => {
    updateBackground('adventures', value.adventures.filter((_, i) => i !== index))
  }

  // 更新冒险/主要经历
  const handleUpdateAdventure = (index: number, newValue: string) => {
    const newAdventures = [...value.adventures]
    newAdventures[index] = newValue
    updateBackground('adventures', newAdventures)
  }

  return (
    <div className={styles.container}>
      {/* 出生和社会背景 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>出生和社会背景</h3>
        <div className={styles.formGrid}>
          <FormInput
            name="birthplace"
            label="出生地"
            value={value.birthplace}
            onChange={(val) => updateBackground('birthplace', val)}
            error={errors.birthplace}
            required
            disabled={disabled}
            placeholder="例如：东海之滨的小镇、京都皇室"
          />
          <FormInput
            name="socialBackground"
            label="社会背景"
            value={value.socialBackground}
            onChange={(val) => updateBackground('socialBackground', val)}
            error={errors.socialBackground}
            required
            disabled={disabled}
            placeholder="例如：平民家庭、贵族世家"
          />
        </div>
      </div>

      {/* 家庭成员 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>家庭成员</h3>
        <div className={styles.familyContainer}>
          {value.family.map((member, index) => (
            <FamilyMemberEditor
              key={index}
              value={member}
              onChange={(newMember) => handleUpdateFamilyMember(index, newMember)}
              onRemove={() => handleRemoveFamilyMember(index)}
              index={index}
              errors={errors}
              disabled={disabled}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddFamilyMember}
          disabled={disabled}
        >
          <Plus size={16} />
          <span>添加家庭成员</span>
        </button>
      </div>

      {/* 童年经历 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>童年经历</h3>
        <div className={styles.formRow}>
          <FormTextarea
            name="childhood"
            label="童年经历描述"
            value={value.childhood}
            onChange={(val) => updateBackground('childhood', val)}
            error={errors.childhood}
            required
            disabled={disabled}
            placeholder="描述角色的童年时光，包括成长环境、重要经历等"
            rows={4}
          />
        </div>
      </div>

      {/* 教育背景 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>教育背景</h3>
        <div className={styles.formRow}>
          <FormTextarea
            name="education"
            label="教育经历"
            value={value.education}
            onChange={(val) => updateBackground('education', val)}
            error={errors.education}
            required
            disabled={disabled}
            placeholder="描述角色的教育历程，包括学校、师傅、学习经历等"
            rows={4}
          />
        </div>
      </div>

      {/* 重要人生转折点 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>重要人生转折点</h3>
        <div className={styles.eventsContainer}>
          {value.turningPoints.map((event, index) => (
            <ImportantEventEditor
              key={`${event.name}-${index}`}
              value={event}
              onChange={(newEvent) => handleUpdateTurningPoint(index, newEvent)}
              onRemove={() => handleRemoveTurningPoint(index)}
              index={index}
              errors={errors}
              disabled={disabled}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddTurningPoint}
          disabled={disabled}
        >
          <Plus size={16} />
          <span>添加重要事件</span>
        </button>
      </div>

      {/* 主要经历和冒险 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>主要经历和冒险</h3>
        <div className={styles.formRow}>
          <label className={styles.label}>冒险经历</label>
          <div className={styles.dynamicList}>
            {value.adventures.map((adventure, index) => (
              <div key={index} className={styles.listItem}>
                <div className={styles.listItemContent}>
                  <FormInput
                    name={`adventure-${index}`}
                    value={adventure}
                    onChange={(val) => handleUpdateAdventure(index, val)}
                    error={errors[`adventures.${index}`]}
                    disabled={disabled}
                    placeholder="例如：探索黑暗森林、击败恶龙"
                    fullWidth
                  />
                </div>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveAdventure(index)}
                  disabled={disabled}
                  aria-label="删除冒险经历"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddAdventure}
            disabled={disabled}
          >
            <Plus size={16} />
            <span>添加冒险经历</span>
          </button>
        </div>
      </div>

      {/* 当前生活状态 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>当前生活状态</h3>
        <div className={styles.formRow}>
          <FormTextarea
            name="currentLife"
            label="当前生活描述"
            value={value.currentLife}
            onChange={(val) => updateBackground('currentLife', val)}
            error={errors.currentLife}
            required
            disabled={disabled}
            placeholder="描述角色当前的生活状态、居住环境、工作情况等"
            rows={4}
          />
        </div>
      </div>
    </div>
  )
}

export default BackgroundEditor
