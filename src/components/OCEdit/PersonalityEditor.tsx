/**
 * PersonalityEditor 性格编辑器
 * 编辑角色的性格信息：MBTI、星座、性格特质、动机、心理、表达方式等
 */

import type { FC } from 'react'
import { X, Plus } from 'lucide-react'
import { FormInput, FormSelect, FormTextarea } from '@/components/Form'
import type { PersonalityEditorProps, TraitEditorProps } from './PersonalityEditor.types'
import type { Personality, PersonalityTrait, Psychology, Expression } from '@/types/character'
import { MBTIType, Zodiac, BloodType } from '@/types/enums'
import styles from './PersonalityEditor.module.css'

// 枚举选项
const MBTI_OPTIONS = Object.values(MBTIType).map((value) => ({
  value,
  label: value,
}))

const ZODIAC_OPTIONS = Object.values(Zodiac).map((value) => ({
  value,
  label: value,
}))

const BLOOD_TYPE_OPTIONS = Object.values(BloodType).map((value) => ({
  value,
  label: value,
}))

// 特质编辑器子组件
const TraitEditor: FC<TraitEditorProps> = ({
  value,
  onChange,
  onRemove,
  index,
  errors = {},
  disabled = false,
}) => {
  const updateField = <K extends keyof PersonalityTrait>(
    field: K,
    newValue: PersonalityTrait[K]
  ) => {
    onChange({
      ...value,
      [field]: newValue,
    })
  }

  const handleIntensityChange = (newIntensity: number) => {
    updateField('intensity', newIntensity)
  }

  return (
    <div className={styles.traitItem}>
      <div className={styles.traitHeader}>
        <div className={styles.traitName}>特质 #{index + 1}</div>
        <div className={styles.traitControls}>
          <span className={`${styles.traitTypeBadge} ${value.isPositive ? styles.traitTypePositive : styles.traitTypeNegative}`}>
            {value.isPositive ? '积极特质' : '消极特质'}
          </span>
          {onRemove && (
            <button
              type="button"
              className={styles.removeButton}
              onClick={onRemove}
              disabled={disabled}
              aria-label="删除特质"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.formGrid}>
        <FormInput
          name={`trait-name-${index}`}
          label="特质名称"
          value={value.name}
          onChange={(val) => updateField('name', val)}
          error={errors[`traits.${index}.name`]}
          required
          disabled={disabled}
          placeholder="例如：勇敢、谨慎、乐观"
        />
        <FormInput
          name={`trait-description-${index}`}
          label="特质描述"
          value={value.description}
          onChange={(val) => updateField('description', val)}
          error={errors[`traits.${index}.description`]}
          required
          disabled={disabled}
          placeholder="例如：面对危险时能够保持冷静"
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.switchContainer}>
          <label className={styles.switchLabel}>特质类型：</label>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={value.isPositive}
              onChange={(e) => updateField('isPositive', e.target.checked)}
              disabled={disabled}
            />
            <span className={styles.slider}></span>
          </label>
          <span className={styles.switchLabel}>
            {value.isPositive ? '积极' : '消极'}
          </span>
        </div>

        <div className={styles.intensityContainer}>
          <div className={styles.intensityLabel}>强度：</div>
          <div className={styles.intensityStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`${styles.intensityStar} ${value.intensity >= star ? styles.active : ''}`}
                onClick={() => handleIntensityChange(star)}
                disabled={disabled}
                aria-label={`强度 ${star} 级`}
              />
            ))}
          </div>
          <span className={styles.helperText}>当前强度：{value.intensity}/5</span>
        </div>
      </div>
    </div>
  )
}

export const PersonalityEditor: FC<PersonalityEditorProps> = ({
  value,
  onChange,
  errors = {},
  disabled = false,
}) => {
  // 更新整个Personality对象
  const updatePersonality = <K extends keyof Personality>(
    key: K,
    newValue: Personality[K]
  ) => {
    onChange({
      ...value,
      [key]: newValue,
    })
  }

  // 更新Psychology
  const updatePsychology = <K extends keyof Psychology>(
    key: K,
    newValue: Psychology[K]
  ) => {
    updatePersonality('psychology', {
      ...value.psychology,
      [key]: newValue,
    })
  }

  // 更新Expression
  const updateExpression = <K extends keyof Expression>(
    key: K,
    newValue: Expression[K]
  ) => {
    updatePersonality('expression', {
      ...value.expression,
      [key]: newValue,
    })
  }

  // 添加特质
  const handleAddTrait = () => {
    const newTrait: PersonalityTrait = {
      name: '',
      description: '',
      isPositive: true,
      intensity: 3,
    }
    updatePersonality('traits', [...value.traits, newTrait])
  }

  // 删除特质
  const handleRemoveTrait = (index: number) => {
    updatePersonality(
      'traits',
      value.traits.filter((_, i) => i !== index)
    )
  }

  // 更新特质
  const handleUpdateTrait = (index: number, newTrait: PersonalityTrait) => {
    const newTraits = [...value.traits]
    newTraits[index] = newTrait
    updatePersonality('traits', newTraits)
  }

  // 添加说话习惯
  const handleAddSpeechHabit = () => {
    updateExpression('speechHabits', [...value.expression.speechHabits, ''])
  }

  // 删除说话习惯
  const handleRemoveSpeechHabit = (index: number) => {
    updateExpression(
      'speechHabits',
      value.expression.speechHabits.filter((_, i) => i !== index)
    )
  }

  // 更新说话习惯
  const handleUpdateSpeechHabit = (index: number, newValue: string) => {
    const newHabits = [...value.expression.speechHabits]
    newHabits[index] = newValue
    updateExpression('speechHabits', newHabits)
  }

  // 添加口头禅
  const handleAddCatchphrase = () => {
    updateExpression('catchphrases', [...value.expression.catchphrases, ''])
  }

  // 删除口头禅
  const handleRemoveCatchphrase = (index: number) => {
    updateExpression(
      'catchphrases',
      value.expression.catchphrases.filter((_, i) => i !== index)
    )
  }

  // 更新口头禅
  const handleUpdateCatchphrase = (index: number, newValue: string) => {
    const newCatchphrases = [...value.expression.catchphrases]
    newCatchphrases[index] = newValue
    updateExpression('catchphrases', newCatchphrases)
  }

  // 添加肢体语言
  const handleAddBodyLanguage = () => {
    updateExpression('bodyLanguage', [...value.expression.bodyLanguage, ''])
  }

  // 删除肢体语言
  const handleRemoveBodyLanguage = (index: number) => {
    updateExpression(
      'bodyLanguage',
      value.expression.bodyLanguage.filter((_, i) => i !== index)
    )
  }

  // 更新肢体语言
  const handleUpdateBodyLanguage = (index: number, newValue: string) => {
    const newBodyLanguage = [...value.expression.bodyLanguage]
    newBodyLanguage[index] = newValue
    updateExpression('bodyLanguage', newBodyLanguage)
  }

  return (
    <div className={styles.container}>
      {/* 性格类型 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>性格类型</h3>
        <div className={styles.formGrid}>
          <FormSelect
            name="mbti"
            label="MBTI 类型"
            value={value.mbti || ''}
            onChange={(val) => updatePersonality('mbti', val as MBTIType || undefined)}
            options={[{ value: '', label: '未选择' }, ...MBTI_OPTIONS]}
            error={errors.mbti}
            disabled={disabled}
            helperText="可选项"
          />
          <FormSelect
            name="zodiac"
            label="星座"
            value={value.zodiac || ''}
            onChange={(val) => updatePersonality('zodiac', val as Zodiac || undefined)}
            options={[{ value: '', label: '未选择' }, ...ZODIAC_OPTIONS]}
            error={errors.zodiac}
            disabled={disabled}
            helperText="可选项"
          />
          <FormSelect
            name="bloodType"
            label="血型"
            value={value.bloodType || ''}
            onChange={(val) => updatePersonality('bloodType', val as BloodType || undefined)}
            options={[{ value: '', label: '未选择' }, ...BLOOD_TYPE_OPTIONS]}
            error={errors.bloodType}
            disabled={disabled}
            helperText="可选项"
          />
        </div>
      </div>

      {/* 核心性格描述 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>核心性格描述</h3>
        <div className={styles.formRow}>
          <FormTextarea
            name="coreDescription"
            label="核心性格描述"
            value={value.coreDescription}
            onChange={(val) => updatePersonality('coreDescription', val)}
            error={errors.coreDescription}
            required
            disabled={disabled}
            placeholder="例如：一个乐观开朗的人，总是能看到事情积极的一面..."
            rows={4}
          />
        </div>
      </div>

      {/* 性格特质 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>性格特质</h3>
        <div className={styles.traitsContainer}>
          {value.traits.map((trait, index) => (
            <TraitEditor
              key={index}
              value={trait}
              onChange={(newTrait) => handleUpdateTrait(index, newTrait)}
              onRemove={() => handleRemoveTrait(index)}
              index={index}
              errors={errors}
              disabled={disabled}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddTrait}
          disabled={disabled}
        >
          <Plus size={16} />
          <span>添加性格特质</span>
        </button>
      </div>

      {/* 性格动机 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>性格动机</h3>
        <div className={styles.formRow}>
          <FormTextarea
            name="motivation"
            label="性格动机"
            value={value.motivation}
            onChange={(val) => updatePersonality('motivation', val)}
            error={errors.motivation}
            required
            disabled={disabled}
            placeholder="例如：渴望获得他人的认可，追求自由和冒险..."
            rows={3}
          />
        </div>
      </div>

      {/* 心理状态 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>心理状态</h3>
        <div className={styles.formGrid}>
          <FormInput
            name="mainFear"
            label="主要恐惧"
            value={value.psychology.mainFear}
            onChange={(val) => updatePsychology('mainFear', val)}
            error={errors['psychology.mainFear']}
            required
            disabled={disabled}
            placeholder="例如：害怕被抛弃、害怕失败"
          />
          <FormInput
            name="coreDesire"
            label="核心欲望"
            value={value.psychology.coreDesire}
            onChange={(val) => updatePsychology('coreDesire', val)}
            error={errors['psychology.coreDesire']}
            required
            disabled={disabled}
            placeholder="例如：渴望被爱、追求完美"
          />
        </div>
        <div className={styles.formGrid}>
          <FormInput
            name="trauma"
            label="创伤或心理阴影"
            value={value.psychology.trauma || ''}
            onChange={(val) => updatePsychology('trauma', val || undefined)}
            error={errors['psychology.trauma']}
            disabled={disabled}
            placeholder="例如：童年时期失去亲人"
            helperText="可选项"
          />
          <FormInput
            name="defenseMechanism"
            label="心理防御机制"
            value={value.psychology.defenseMechanism || ''}
            onChange={(val) => updatePsychology('defenseMechanism', val || undefined)}
            error={errors['psychology.defenseMechanism']}
            disabled={disabled}
            placeholder="例如：否认、投射、合理化"
            helperText="可选项"
          />
        </div>
      </div>

      {/* 表现方式 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>表现方式</h3>

        {/* 说话习惯 */}
        <div className={styles.formRow}>
          <label className={styles.label}>说话习惯</label>
          <div className={styles.dynamicList}>
            {value.expression.speechHabits.map((habit, index) => (
              <div key={index} className={styles.listItem}>
                <div className={styles.listItemContent}>
                  <FormInput
                    name={`speechHabit-${index}`}
                    value={habit}
                    onChange={(val) => handleUpdateSpeechHabit(index, val)}
                    error={errors[`expression.speechHabits.${index}`]}
                    disabled={disabled}
                    placeholder="例如：说话时喜欢用手势、语速较快"
                    fullWidth
                  />
                </div>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveSpeechHabit(index)}
                  disabled={disabled}
                  aria-label="删除说话习惯"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddSpeechHabit}
            disabled={disabled}
          >
            <Plus size={16} />
            <span>添加说话习惯</span>
          </button>
        </div>

        {/* 口头禅 */}
        <div className={styles.formRow}>
          <label className={styles.label}>口头禅</label>
          <div className={styles.dynamicList}>
            {value.expression.catchphrases.map((catchphrase, index) => (
              <div key={index} className={styles.listItem}>
                <div className={styles.listItemContent}>
                  <FormInput
                    name={`catchphrase-${index}`}
                    value={catchphrase}
                    onChange={(val) => handleUpdateCatchphrase(index, val)}
                    error={errors[`expression.catchphrases.${index}`]}
                    disabled={disabled}
                    placeholder="例如：没问题、相信我、你懂的"
                    fullWidth
                  />
                </div>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveCatchphrase(index)}
                  disabled={disabled}
                  aria-label="删除口头禅"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddCatchphrase}
            disabled={disabled}
          >
            <Plus size={16} />
            <span>添加口头禅</span>
          </button>
        </div>

        <div className={styles.formGrid}>
          <FormInput
            name="actionStyle"
            label="行动风格"
            value={value.expression.actionStyle}
            onChange={(val) => updateExpression('actionStyle', val)}
            error={errors['expression.actionStyle']}
            required
            disabled={disabled}
            placeholder="例如：果断迅速、谨慎小心、随性而为"
          />
          <FormInput
            name="emotionalExpression"
            label="情感表达方式"
            value={value.expression.emotionalExpression}
            onChange={(val) => updateExpression('emotionalExpression', val)}
            error={errors['expression.emotionalExpression']}
            required
            disabled={disabled}
            placeholder="例如：直接表达、内敛含蓄、夸张表现"
          />
        </div>

        {/* 肢体语言 */}
        <div className={styles.formRow}>
          <label className={styles.label}>肢体语言特征</label>
          <div className={styles.dynamicList}>
            {value.expression.bodyLanguage.map((bodyLang, index) => (
              <div key={index} className={styles.listItem}>
                <div className={styles.listItemContent}>
                  <FormInput
                    name={`bodyLanguage-${index}`}
                    value={bodyLang}
                    onChange={(val) => handleUpdateBodyLanguage(index, val)}
                    error={errors[`expression.bodyLanguage.${index}`]}
                    disabled={disabled}
                    placeholder="例如：喜欢交叉双臂、说话时眼神接触"
                    fullWidth
                  />
                </div>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveBodyLanguage(index)}
                  disabled={disabled}
                  aria-label="删除肢体语言特征"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddBodyLanguage}
            disabled={disabled}
          >
            <Plus size={16} />
            <span>添加肢体语言特征</span>
          </button>
        </div>
      </div>
    </div>
  )
}