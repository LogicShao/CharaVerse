/**
 * AppearanceEditor 外观编辑器
 * 编辑角色的外观信息：体型、面容、发型、面部标记、装饰品等
 */

import type { FC } from 'react'
import { X, Plus } from 'lucide-react'
import { FormInput, FormSelect, FormTextarea } from '@/components/Form'
import type { AppearanceEditorProps } from './AppearanceEditor.types'
import type { SelectOption } from '@/components/Select'
import {
  BodyType,
  SkinTone,
  FaceShape,
  EyeShape,
  CommonColor,
  HairLength,
  HairStyle,
} from '@/types/enums'
import type { Appearance } from '@/types/character'
import styles from './AppearanceEditor.module.css'

// 枚举选项
const BODY_TYPE_OPTIONS = Object.values(BodyType).map((value) => ({
  value,
  label: value,
}))

const SKIN_TONE_OPTIONS = Object.values(SkinTone).map((value) => ({
  value,
  label: value,
}))

const FACE_SHAPE_OPTIONS = Object.values(FaceShape).map((value) => ({
  value,
  label: value,
}))

const EYE_SHAPE_OPTIONS = Object.values(EyeShape).map((value) => ({
  value,
  label: value,
}))

const COMMON_COLOR_OPTIONS = Object.values(CommonColor).map((value) => ({
  value,
  label: value,
}))

const HAIR_LENGTH_OPTIONS = Object.values(HairLength).map((value) => ({
  value,
  label: value,
}))

const HAIR_STYLE_OPTIONS = Object.values(HairStyle).map((value) => ({
  value,
  label: value,
}))

const FACIAL_MARK_TYPE_OPTIONS: SelectOption<Appearance['facialMarks'][number]['type']>[] = [
  { value: 'scar' as Appearance['facialMarks'][number]['type'], label: '疤痕' },
  { value: 'tattoo' as Appearance['facialMarks'][number]['type'], label: '纹身' },
  { value: 'birthmark' as Appearance['facialMarks'][number]['type'], label: '胎记' },
  { value: 'freckles' as Appearance['facialMarks'][number]['type'], label: '雀斑' },
  { value: 'other' as Appearance['facialMarks'][number]['type'], label: '其他' },
]

export const AppearanceEditor: FC<AppearanceEditorProps> = ({
  value,
  onChange,
  errors = {},
  disabled = false,
}) => {
  // 更新整个Appearance对象
  const updateAppearance = <K extends keyof Appearance>(
    key: K,
    newValue: Appearance[K]
  ) => {
    onChange({
      ...value,
      [key]: newValue,
    })
  }

  // 更新BodyInfo
  const updateBodyInfo = <K extends keyof Appearance['body']>(
    key: K,
    newValue: Appearance['body'][K]
  ) => {
    updateAppearance('body', {
      ...value.body,
      [key]: newValue,
    })
  }

  // 更新FacialFeatures
  const updateFacialFeatures = <K extends keyof Appearance['face']>(
    key: K,
    newValue: Appearance['face'][K]
  ) => {
    updateAppearance('face', {
      ...value.face,
      [key]: newValue,
    })
  }

  // 更新HairInfo
  const updateHairInfo = <K extends keyof Appearance['hair']>(
    key: K,
    newValue: Appearance['hair'][K]
  ) => {
    updateAppearance('hair', {
      ...value.hair,
      [key]: newValue,
    })
  }

  // 添加面部标记
  const handleAddFacialMark = () => {
    const newFacialMark = {
      type: 'scar' as const,
      location: '',
      size: '',
      story: '',
    }
    updateAppearance('facialMarks', [...value.facialMarks, newFacialMark])
  }

  // 删除面部标记
  const handleRemoveFacialMark = (index: number) => {
    updateAppearance(
      'facialMarks',
      value.facialMarks.filter((_, i) => i !== index)
    )
  }

  // 更新面部标记
  const handleUpdateFacialMark = <K extends keyof (typeof value.facialMarks)[0]>(
    index: number,
    key: K,
    newValue: (typeof value.facialMarks)[0][K]
  ) => {
    const newFacialMarks = [...value.facialMarks]
    newFacialMarks[index] = {
      ...newFacialMarks[index],
      [key]: newValue,
    }
    updateAppearance('facialMarks', newFacialMarks)
  }

  // 添加装饰品
  const handleAddAccessory = () => {
    const newAccessory = {
      type: '',
      description: '',
      material: '',
      color: '',
    }
    updateAppearance('accessories', [...value.accessories, newAccessory])
  }

  // 删除装饰品
  const handleRemoveAccessory = (index: number) => {
    updateAppearance(
      'accessories',
      value.accessories.filter((_, i) => i !== index)
    )
  }

  // 更新装饰品
  const handleUpdateAccessory = <K extends keyof (typeof value.accessories)[0]>(
    index: number,
    key: K,
    newValue: (typeof value.accessories)[0][K]
  ) => {
    const newAccessories = [...value.accessories]
    newAccessories[index] = {
      ...newAccessories[index],
      [key]: newValue,
    }
    updateAppearance('accessories', newAccessories)
  }

  return (
    <div className={styles.container}>
      {/* 身体信息 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>身体信息</h3>
        <div className={styles.formGrid}>
          <FormInput
            name="age"
            label="年龄（岁）"
            type="number"
            value={value.body.age.toString()}
            onChange={(val) => updateBodyInfo('age', parseInt(val) || 0)}
            error={errors['body.age']}
            required
            disabled={disabled}
            min="0"
            max="200"
          />
          <FormInput
            name="biologicalAge"
            label="生理年龄（岁）"
            type="number"
            value={value.body.biologicalAge?.toString() || ''}
            onChange={(val) => updateBodyInfo('biologicalAge', parseInt(val) || undefined)}
            error={errors['body.biologicalAge']}
            disabled={disabled}
            min="0"
            max="200"
            helperText="可选项"
          />
          <FormInput
            name="height"
            label="身高（厘米）"
            type="number"
            value={value.body.height.toString()}
            onChange={(val) => updateBodyInfo('height', parseInt(val) || 0)}
            error={errors['body.height']}
            required
            disabled={disabled}
            min="50"
            max="300"
          />
          <FormInput
            name="weight"
            label="体重（千克）"
            type="number"
            value={value.body.weight.toString()}
            onChange={(val) => updateBodyInfo('weight', parseInt(val) || 0)}
            error={errors['body.weight']}
            required
            disabled={disabled}
            min="10"
            max="500"
          />
        </div>
        <div className={styles.formGrid}>
          <FormSelect
            name="bodyType"
            label="体型"
            value={value.body.bodyType}
            onChange={(val) => updateBodyInfo('bodyType', val as BodyType)}
            options={BODY_TYPE_OPTIONS}
            error={errors['body.bodyType']}
            required
            disabled={disabled}
          />
          <FormSelect
            name="skinTone"
            label="肤色"
            value={value.body.skinTone}
            onChange={(val) => updateBodyInfo('skinTone', val as SkinTone)}
            options={SKIN_TONE_OPTIONS}
            error={errors['body.skinTone']}
            required
            disabled={disabled}
          />
        </div>
        <div className={styles.formRow}>
          <FormInput
            name="skinTexture"
            label="肤质描述"
            value={value.body.skinTexture || ''}
            onChange={(val) => updateBodyInfo('skinTexture', val || undefined)}
            error={errors['body.skinTexture']}
            disabled={disabled}
            placeholder="例如：光滑、粗糙、有皱纹等"
            helperText="可选项"
          />
        </div>
      </div>

      {/* 面部特征 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>面部特征</h3>
        <div className={styles.formGrid}>
          <FormSelect
            name="faceShape"
            label="脸型"
            value={value.face.faceShape}
            onChange={(val) => updateFacialFeatures('faceShape', val as FaceShape)}
            options={FACE_SHAPE_OPTIONS}
            error={errors['face.faceShape']}
            required
            disabled={disabled}
          />
          <FormSelect
            name="eyeShape"
            label="眼睛形状"
            value={value.face.eyeShape}
            onChange={(val) => updateFacialFeatures('eyeShape', val as EyeShape)}
            options={EYE_SHAPE_OPTIONS}
            error={errors['face.eyeShape']}
            required
            disabled={disabled}
          />
          <FormSelect
            name="eyeColor"
            label="眼睛颜色"
            value={value.face.eyeColor}
            onChange={(val) => updateFacialFeatures('eyeColor', val as CommonColor)}
            options={COMMON_COLOR_OPTIONS}
            error={errors['face.eyeColor']}
            required
            disabled={disabled}
          />
          <FormSelect
            name="lipColor"
            label="嘴唇颜色"
            value={value.face.lipColor}
            onChange={(val) => updateFacialFeatures('lipColor', val as CommonColor)}
            options={COMMON_COLOR_OPTIONS}
            error={errors['face.lipColor']}
            required
            disabled={disabled}
          />
        </div>
        <div className={styles.formGrid}>
          <FormInput
            name="eyebrowShape"
            label="眉毛形状"
            value={value.face.eyebrowShape || ''}
            onChange={(val) => updateFacialFeatures('eyebrowShape', val || undefined)}
            error={errors['face.eyebrowShape']}
            disabled={disabled}
            placeholder="例如：细长、浓密、弯眉等"
            helperText="可选项"
          />
          <FormSelect
            name="eyebrowColor"
            label="眉毛颜色"
            value={value.face.eyebrowColor || ''}
            onChange={(val) => updateFacialFeatures('eyebrowColor', val as CommonColor || undefined)}
            options={[{ value: '', label: '未选择' }, ...COMMON_COLOR_OPTIONS]}
            error={errors['face.eyebrowColor']}
            disabled={disabled}
            helperText="可选项"
          />
          <FormInput
            name="noseShape"
            label="鼻子形状"
            value={value.face.noseShape || ''}
            onChange={(val) => updateFacialFeatures('noseShape', val || undefined)}
            error={errors['face.noseShape']}
            disabled={disabled}
            placeholder="例如：高挺、小巧、圆润等"
            helperText="可选项"
          />
          <FormInput
            name="lipThickness"
            label="嘴唇厚度"
            value={value.face.lipThickness || ''}
            onChange={(val) => updateFacialFeatures('lipThickness', val || undefined)}
            error={errors['face.lipThickness']}
            disabled={disabled}
            placeholder="例如：薄唇、厚唇、适中"
            helperText="可选项"
          />
        </div>
      </div>

      {/* 发型信息 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>发型信息</h3>
        <div className={styles.formGrid}>
          <FormSelect
            name="hairPrimaryColor"
            label="发色（主色）"
            value={value.hair.primaryColor}
            onChange={(val) => updateHairInfo('primaryColor', val as CommonColor)}
            options={COMMON_COLOR_OPTIONS}
            error={errors['hair.primaryColor']}
            required
            disabled={disabled}
          />
          <FormSelect
            name="hairSecondaryColor"
            label="发色（副色）"
            value={value.hair.secondaryColor || ''}
            onChange={(val) => updateHairInfo('secondaryColor', val as CommonColor || undefined)}
            options={[{ value: '', label: '未选择' }, ...COMMON_COLOR_OPTIONS]}
            error={errors['hair.secondaryColor']}
            disabled={disabled}
            helperText="可选项"
          />
          <FormSelect
            name="hairLength"
            label="发长"
            value={value.hair.length}
            onChange={(val) => updateHairInfo('length', val as HairLength)}
            options={HAIR_LENGTH_OPTIONS}
            error={errors['hair.length']}
            required
            disabled={disabled}
          />
          <FormSelect
            name="hairStyle"
            label="发型"
            value={value.hair.style}
            onChange={(val) => updateHairInfo('style', val as HairStyle)}
            options={HAIR_STYLE_OPTIONS}
            error={errors['hair.style']}
            required
            disabled={disabled}
          />
        </div>
        <div className={styles.formGrid}>
          <FormInput
            name="hairDescription"
            label="发型描述"
            value={value.hair.description}
            onChange={(val) => updateHairInfo('description', val)}
            error={errors['hair.description']}
            required
            disabled={disabled}
            placeholder="例如：齐肩波浪卷发"
          />
          <FormInput
            name="hairTexture"
            label="发质描述"
            value={value.hair.texture || ''}
            onChange={(val) => updateHairInfo('texture', val || undefined)}
            error={errors['hair.texture']}
            disabled={disabled}
            placeholder="例如：柔顺、卷曲、干枯等"
            helperText="可选项"
          />
        </div>
      </div>

      {/* 面部标记 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>面部标记</h3>
        <div className={styles.dynamicList}>
          {value.facialMarks.map((mark, index) => (
            <div key={index} className={styles.listItem}>
              <div className={styles.listItemContent}>
                <div className={styles.formGrid}>
                  <FormSelect<Appearance['facialMarks'][number]['type']>
                    name={`facialMark-type-${index}`}
                    label="标记类型"
                    value={mark.type}
                    onChange={(val) =>
                      // val may be undefined when cleared; use 'other' as a safe fallback
                      handleUpdateFacialMark(
                        index,
                        'type',
                        (val ?? 'other') as Appearance['facialMarks'][number]['type']
                      )
                    }
                    options={FACIAL_MARK_TYPE_OPTIONS}
                    error={errors[`facialMarks.${index}.type`]}
                    disabled={disabled}
                  />
                  <FormInput
                    name={`facialMark-location-${index}`}
                    label="位置"
                    value={mark.location}
                    onChange={(val) => handleUpdateFacialMark(index, 'location', val)}
                    error={errors[`facialMarks.${index}.location`]}
                    disabled={disabled}
                    placeholder="例如：左脸颊、额头中央"
                  />
                  <FormInput
                    name={`facialMark-size-${index}`}
                    label="大小"
                    value={mark.size || ''}
                    onChange={(val) => handleUpdateFacialMark(index, 'size', val || undefined)}
                    error={errors[`facialMarks.${index}.size`]}
                    disabled={disabled}
                    placeholder="例如：直径2厘米"
                    helperText="可选项"
                  />
                </div>
                <div className={styles.formRow}>
                  <FormTextarea
                    name={`facialMark-story-${index}`}
                    label="故事/含义"
                    value={mark.story || ''}
                    onChange={(val) => handleUpdateFacialMark(index, 'story', val || undefined)}
                    error={errors[`facialMarks.${index}.story`]}
                    disabled={disabled}
                    placeholder="例如：战斗留下的疤痕，象征着勇气"
                    helperText="可选项"
                  />
                </div>
              </div>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => handleRemoveFacialMark(index)}
                disabled={disabled}
                aria-label="删除面部标记"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddFacialMark}
          disabled={disabled}
        >
          <Plus size={16} />
          <span>添加面部标记</span>
        </button>
      </div>

      {/* 装饰品 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>装饰品</h3>
        <div className={styles.dynamicList}>
          {value.accessories.map((accessory, index) => (
            <div key={index} className={styles.listItem}>
              <div className={styles.listItemContent}>
                <div className={styles.formGrid}>
                  <FormInput
                    name={`accessory-type-${index}`}
                    label="类型"
                    value={accessory.type}
                    onChange={(val) => handleUpdateAccessory(index, 'type', val)}
                    error={errors[`accessories.${index}.type`]}
                    disabled={disabled}
                    placeholder="例如：耳环、项链、手环"
                  />
                  <FormInput
                    name={`accessory-description-${index}`}
                    label="描述"
                    value={accessory.description}
                    onChange={(val) => handleUpdateAccessory(index, 'description', val)}
                    error={errors[`accessories.${index}.description`]}
                    disabled={disabled}
                    placeholder="例如：银质十字架项链"
                  />
                  <FormInput
                    name={`accessory-material-${index}`}
                    label="材质"
                    value={accessory.material || ''}
                    onChange={(val) => handleUpdateAccessory(index, 'material', val || undefined)}
                    error={errors[`accessories.${index}.material`]}
                    disabled={disabled}
                    placeholder="例如：银、金、皮革"
                    helperText="可选项"
                  />
                  <FormInput
                    name={`accessory-color-${index}`}
                    label="颜色"
                    value={accessory.color || ''}
                    onChange={(val) => handleUpdateAccessory(index, 'color', val || undefined)}
                    error={errors[`accessories.${index}.color`]}
                    disabled={disabled}
                    placeholder="例如：银色、金色"
                    helperText="可选项"
                  />
                </div>
              </div>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => handleRemoveAccessory(index)}
                disabled={disabled}
                aria-label="删除装饰品"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddAccessory}
          disabled={disabled}
        >
          <Plus size={16} />
          <span>添加装饰品</span>
        </button>
      </div>

      {/* 体毛特征 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>体毛特征</h3>
        <div className={styles.formRow}>
          <FormTextarea
            name="bodyHair"
            label="体毛特征描述"
            value={value.bodyHair || ''}
            onChange={(val) => updateAppearance('bodyHair', val || undefined)}
            error={errors.bodyHair}
            disabled={disabled}
            placeholder="例如：手臂有少量汗毛，腿部毛发浓密"
            helperText="可选项"
          />
        </div>
      </div>
    </div>
  )
}
