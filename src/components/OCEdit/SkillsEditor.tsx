/**
 * SkillsEditor 技能编辑器
 * 编辑角色的技能、职业、弱点、限制等能力信息
 */

import type { FC } from 'react'
import { X, Plus } from 'lucide-react'
import { FormInput, FormTextarea, FormSelect } from '@/components/Form'
import type { SkillsEditorProps, SkillEditorProps } from './SkillsEditor.types'
import type { Skills, Skill } from '@/types/character'
import { SkillLevel } from '@/types/enums'
import styles from './SkillsEditor.module.css'

// 技能等级选项
const SKILL_LEVEL_OPTIONS = Object.values(SkillLevel).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' '),
}))

// 技能编辑器子组件
const SkillEditor: FC<SkillEditorProps> = ({
  value,
  onChange,
  onRemove,
  index,
  errors = {},
  disabled = false,
}) => {
  const updateField = <K extends keyof Skill>(
    field: K,
    newValue: Skill[K]
  ) => {
    onChange({
      ...value,
      [field]: newValue,
    })
  }

  return (
    <div className={styles.skillItem}>
      <div className={styles.skillHeader}>
        <div className={styles.skillName}>技能 #{index + 1}</div>
        <div className={styles.skillControls}>
          <span
            className={`${styles.skillCategory} ${
              value.isSpecialAbility ? styles.skillSpecial : styles.skillNormal
            }`}
          >
            {value.isSpecialAbility ? '特殊能力' : '普通技能'}
          </span>
          {onRemove && (
            <button
              type="button"
              className={styles.removeButton}
              onClick={onRemove}
              disabled={disabled}
              aria-label="删除技能"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.formGrid}>
        <FormInput
          name={`skill-name-${index}`}
          label="技能名称"
          value={value.name}
          onChange={(val) => updateField('name', val)}
          error={errors[`skills.${index}.name`]}
          required
          disabled={disabled}
          placeholder="例如：剑术、编程、魔法"
        />
        <FormSelect
          name={`skill-level-${index}`}
          label="掌握等级"
          value={value.level}
          onChange={(val) => updateField('level', val as SkillLevel)}
          options={SKILL_LEVEL_OPTIONS}
          error={errors[`skills.${index}.level`]}
          required
          disabled={disabled}
        />
      </div>

      <div className={styles.formRow}>
        <FormTextarea
          name={`skill-description-${index}`}
          label="技能描述"
          value={value.description}
          onChange={(val) => updateField('description', val)}
          error={errors[`skills.${index}.description`]}
          required
          disabled={disabled}
          placeholder="详细描述该技能的特点、威力、使用限制等"
          rows={3}
        />
      </div>

      <div className={styles.formGrid}>
        <FormInput
          name={`skill-source-${index}`}
          label="技能来源（可选）"
          value={value.source || ''}
          onChange={(val) => updateField('source', val || undefined)}
          error={errors[`skills.${index}.source`]}
          disabled={disabled}
          placeholder="例如：通过训练学习、天生的能力"
          helperText="可选项"
        />
      </div>

      <div className={styles.formGrid}>
        <div className={styles.switchContainer}>
          <label className={styles.switchLabel}>技能类型：</label>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={value.isSpecialAbility}
              onChange={(e) => updateField('isSpecialAbility', e.target.checked)}
              disabled={disabled}
            />
            <span className={styles.slider}></span>
          </label>
          <span className={styles.switchLabel}>
            {value.isSpecialAbility ? '特殊能力' : '普通技能'}
          </span>
        </div>
      </div>

      <div className={styles.skillLevelContainer}>
        <span className={styles.skillLevelLabel}>当前等级：</span>
        <span className={styles.skillLevelValue}>{(value.level as string).toUpperCase()}</span>
      </div>
    </div>
  )
}

export const SkillsEditor: FC<SkillsEditorProps> = ({
  value,
  onChange,
  errors = {},
  disabled = false,
}) => {
  // 更新整个Skills对象
  const updateSkills = <K extends keyof Skills>(
    key: K,
    newValue: Skills[K]
  ) => {
    onChange({
      ...value,
      [key]: newValue,
    })
  }

  // 添加技能
  const handleAddSkill = () => {
    const newSkill: Skill = {
      name: '',
      description: '',
      level: SkillLevel.Novice,
      isSpecialAbility: false,
    }
    updateSkills('skills', [...value.skills, newSkill])
  }

  // 删除技能
  const handleRemoveSkill = (index: number) => {
    updateSkills('skills', value.skills.filter((_, i) => i !== index))
  }

  // 更新技能
  const handleUpdateSkill = (index: number, newSkill: Skill) => {
    const newSkills = [...value.skills]
    newSkills[index] = newSkill
    updateSkills('skills', newSkills)
  }

  // 添加弱点
  const handleAddWeakness = () => {
    updateSkills('weaknesses', [...value.weaknesses, ''])
  }

  // 删除弱点
  const handleRemoveWeakness = (index: number) => {
    updateSkills('weaknesses', value.weaknesses.filter((_, i) => i !== index))
  }

  // 更新弱点
  const handleUpdateWeakness = (index: number, newValue: string) => {
    const newWeaknesses = [...value.weaknesses]
    newWeaknesses[index] = newValue
    updateSkills('weaknesses', newWeaknesses)
  }

  // 添加限制
  const handleAddLimitation = () => {
    updateSkills('limitations', [...value.limitations, ''])
  }

  // 删除限制
  const handleRemoveLimitation = (index: number) => {
    updateSkills('limitations', value.limitations.filter((_, i) => i !== index))
  }

  // 更新限制
  const handleUpdateLimitation = (index: number, newValue: string) => {
    const newLimitations = [...value.limitations]
    newLimitations[index] = newValue
    updateSkills('limitations', newLimitations)
  }

  return (
    <div className={styles.container}>
      {/* 职业信息 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>职业信息</h3>
        <div className={styles.formRow}>
          <FormInput
            name="occupation"
            label="职业或身份"
            value={value.occupation}
            onChange={(val) => updateSkills('occupation', val)}
            error={errors.occupation}
            required
            disabled={disabled}
            placeholder="例如：剑士、魔法师、科学家、学生"
          />
        </div>
      </div>

      {/* 技能列表 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>技能列表</h3>
        <div className={styles.skillsContainer}>
          {value.skills.map((skill, index) => (
            <SkillEditor
              key={index}
              value={skill}
              onChange={(newSkill) => handleUpdateSkill(index, newSkill)}
              onRemove={() => handleRemoveSkill(index)}
              index={index}
              errors={errors}
              disabled={disabled}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddSkill}
          disabled={disabled}
        >
          <Plus size={16} />
          <span>添加技能</span>
        </button>
      </div>

      {/* 弱点 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>弱点</h3>
        <div className={styles.formRow}>
          <label className={styles.label}>弱点列表</label>
          <div className={styles.dynamicList}>
            {value.weaknesses.map((weakness, index) => (
              <div key={index} className={styles.listItem}>
                <div className={styles.listItemContent}>
                  <FormTextarea
                    name={`weakness-${index}`}
                    value={weakness}
                    onChange={(val) => handleUpdateWeakness(index, val)}
                    error={errors[`weaknesses.${index}`]}
                    disabled={disabled}
                    placeholder="例如：害怕高处、容易相信他人"
                    rows={2}
                    fullWidth
                  />
                </div>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveWeakness(index)}
                  disabled={disabled}
                  aria-label="删除弱点"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddWeakness}
            disabled={disabled}
          >
            <Plus size={16} />
            <span>添加弱点</span>
          </button>
        </div>
      </div>

      {/* 限制 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>能力与限制</h3>
        <div className={styles.formRow}>
          <label className={styles.label}>限制条件</label>
          <div className={styles.dynamicList}>
            {value.limitations.map((limitation, index) => (
              <div key={index} className={styles.listItem}>
                <div className={styles.listItemContent}>
                  <FormTextarea
                    name={`limitation-${index}`}
                    value={limitation}
                    onChange={(val) => handleUpdateLimitation(index, val)}
                    error={errors[`limitations.${index}`]}
                    disabled={disabled}
                    placeholder="例如：魔法每天只能使用3次、受伤后能力下降"
                    rows={2}
                    fullWidth
                  />
                </div>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveLimitation(index)}
                  disabled={disabled}
                  aria-label="删除限制"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddLimitation}
            disabled={disabled}
          >
            <Plus size={16} />
            <span>添加限制</span>
          </button>
        </div>
      </div>

      {/* 战斗风格（可选） */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>战斗风格</h3>
        <div className={styles.formRow}>
          <FormTextarea
            name="combatStyle"
            label="战斗风格（如适用）"
            value={value.combatStyle || ''}
            onChange={(val) => updateSkills('combatStyle', val || undefined)}
            error={errors.combatStyle}
            disabled={disabled}
            placeholder="例如：近战格斗、远程魔法、防御型战术"
            helperText="如果角色有战斗能力，请描述其战斗风格"
            rows={3}
          />
        </div>
      </div>

      {/* 工具掌握（可选） */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>工具掌握</h3>
        <div className={styles.formRow}>
          <FormTextarea
            name="toolProficiency"
            label="工具或武器掌握度"
            value={value.toolProficiency || ''}
            onChange={(val) => updateSkills('toolProficiency', val || undefined)}
            error={errors.toolProficiency}
            disabled={disabled}
            placeholder="描述角色对各种工具、武器的掌握情况"
            helperText="可选项"
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}

export default SkillsEditor
