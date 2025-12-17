/**
 * WardrobeEditor 服装编辑器
 * 编辑角色的服装、配饰、标志性武器等
 */

import type { FC } from 'react'
import { X, Plus } from 'lucide-react'
import { FormInput, FormTextarea, FormSelect, FormColorPicker } from '@/components/Form'
import type {
  WardrobeEditorProps,
  OutfitEditorProps,
  AccessoryEditorProps,
} from './WardrobeEditor.types'
import type { Wardrobe, Outfit, Accessory } from '@/types/character'
import { ClothingStyle } from '@/types/enums'
import styles from './WardrobeEditor.module.css'

// 服装风格选项
const CLOTHING_STYLE_OPTIONS = Object.values(ClothingStyle).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' '),
}))

// 服装编辑器子组件
const OutfitEditor: FC<OutfitEditorProps> = ({
  value,
  onChange,
  onRemove,
  index,
  errors = {},
  disabled = false,
}) => {
  const updateField = <K extends keyof Outfit>(
    field: K,
    newValue: Outfit[K]
  ) => {
    onChange({
      ...value,
      [field]: newValue,
    })
  }

  return (
    <div className={styles.outfitItem}>
      <div className={styles.outfitHeader}>
        <div className={styles.outfitName}>服装 #{index + 1}</div>
        <div className={styles.outfitControls}>
          <span
            className={`${styles.outfitStatus} ${
              value.isDefault ? styles.outfitDefault : styles.outfitNormal
            }`}
          >
            {value.isDefault ? '默认服装' : '普通服装'}
          </span>
          {onRemove && (
            <button
              type="button"
              className={styles.removeButton}
              onClick={onRemove}
              disabled={disabled}
              aria-label="删除服装"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.formGrid}>
        <FormInput
          name={`outfit-name-${index}`}
          label="服装名称"
          value={value.name}
          onChange={(val) => updateField('name', val)}
          error={errors[`outfits.${index}.name`]}
          required
          disabled={disabled}
          placeholder="例如：日常便服、战斗装备、晚礼服"
        />
        <FormSelect
          name={`outfit-style-${index}`}
          label="服装风格"
          value={value.style}
          onChange={(val) => updateField('style', val as ClothingStyle)}
          options={CLOTHING_STYLE_OPTIONS}
          error={errors[`outfits.${index}.style`]}
          required
          disabled={disabled}
        />
      </div>

      <div className={styles.formRow}>
        <FormTextarea
          name={`outfit-description-${index}`}
          label="服装描述"
          value={value.description}
          onChange={(val) => updateField('description', val)}
          error={errors[`outfits.${index}.description`]}
          required
          disabled={disabled}
          placeholder="详细描述服装的款式、材质、特点等"
          rows={3}
        />
      </div>

      <div className={styles.formGrid}>
        <FormColorPicker
          name={`outfit-primaryColor-${index}`}
          label="主要颜色"
          value={value.primaryColor}
          onChange={(val) => updateField('primaryColor', val)}
          error={errors[`outfits.${index}.primaryColor`]}
          required
          disabled={disabled}
        />
        <FormColorPicker
          name={`outfit-secondaryColor-${index}`}
          label="次要颜色（可选）"
          value={value.secondaryColor || ''}
          onChange={(val) => updateField('secondaryColor', val || undefined)}
          error={errors[`outfits.${index}.secondaryColor`]}
          disabled={disabled}
          helperText="可选项"
        />
      </div>

      <div className={styles.formRow}>
        <FormTextarea
          name={`outfit-story-${index}`}
          label="关联故事或场景（可选）"
          value={value.story || ''}
          onChange={(val) => updateField('story', val || undefined)}
          error={errors[`outfits.${index}.story`]}
          disabled={disabled}
          placeholder="描述这件服装在什么场合穿着，有什么特殊意义"
          helperText="可选项"
          rows={2}
        />
      </div>

      <div className={styles.formGrid}>
        <div className={styles.switchContainer}>
          <label className={styles.switchLabel}>设为默认服装：</label>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={value.isDefault}
              onChange={(e) => updateField('isDefault', e.target.checked)}
              disabled={disabled}
            />
            <span className={styles.slider}></span>
          </label>
          <span className={styles.switchLabel}>
            {value.isDefault ? '是' : '否'}
          </span>
        </div>
      </div>

      {/* 颜色预览 */}
      <div className={styles.colorPreview}>
        <div
          className={styles.colorSwatch}
          style={{ backgroundColor: value.primaryColor }}
          title={`主要颜色: ${value.primaryColor}`}
        />
        <span className={styles.colorLabel}>主要颜色</span>
        {value.secondaryColor && (
          <>
            <div
              className={styles.colorSwatch}
              style={{ backgroundColor: value.secondaryColor }}
              title={`次要颜色: ${value.secondaryColor}`}
            />
            <span className={styles.colorLabel}>次要颜色</span>
          </>
        )}
      </div>
    </div>
  )
}

// 配饰编辑器子组件
const AccessoryEditor: FC<AccessoryEditorProps> = ({
  value,
  onChange,
  onRemove,
  index,
  errors = {},
  disabled = false,
}) => {
  const updateField = <K extends keyof Accessory>(
    field: K,
    newValue: Accessory[K]
  ) => {
    onChange({
      ...value,
      [field]: newValue,
    })
  }

  return (
    <div className={styles.accessoryItem}>
      <div className={styles.accessoryHeader}>
        <div className={styles.accessoryName}>配饰 #{index + 1}</div>
        <div className={styles.accessoryControls}>
          <span className={styles.accessoryType}>{value.type}</span>
          {onRemove && (
            <button
              type="button"
              className={styles.removeButton}
              onClick={onRemove}
              disabled={disabled}
              aria-label="删除配饰"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.formGrid}>
        <FormInput
          name={`accessory-type-${index}`}
          label="配饰类型"
          value={value.type}
          onChange={(val) => updateField('type', val)}
          error={errors[`mainAccessories.${index}.type`]}
          required
          disabled={disabled}
          placeholder="例如：耳环、项链、手环、眼镜"
        />
        <FormInput
          name={`accessory-material-${index}`}
          label="材质（可选）"
          value={value.material || ''}
          onChange={(val) => updateField('material', val || undefined)}
          error={errors[`mainAccessories.${index}.material`]}
          disabled={disabled}
          placeholder="例如：银、金、皮革"
          helperText="可选项"
        />
      </div>

      <div className={styles.formRow}>
        <FormTextarea
          name={`accessory-description-${index}`}
          label="配饰描述"
          value={value.description}
          onChange={(val) => updateField('description', val)}
          error={errors[`mainAccessories.${index}.description`]}
          required
          disabled={disabled}
          placeholder="详细描述配饰的外观、特点、意义等"
          rows={3}
        />
      </div>

      <div className={styles.formGrid}>
        <FormInput
          name={`accessory-color-${index}`}
          label="颜色（可选）"
          value={value.color || ''}
          onChange={(val) => updateField('color', val || undefined)}
          error={errors[`mainAccessories.${index}.color`]}
          disabled={disabled}
          placeholder="例如：银色、金色、红色"
          helperText="可选项"
        />
      </div>
    </div>
  )
}

export const WardrobeEditor: FC<WardrobeEditorProps> = ({
  value,
  onChange,
  errors = {},
  disabled = false,
}) => {
  // 更新整个Wardrobe对象
  const updateWardrobe = <K extends keyof Wardrobe>(
    key: K,
    newValue: Wardrobe[K]
  ) => {
    onChange({
      ...value,
      [key]: newValue,
    })
  }

  // 添加服装
  const handleAddOutfit = () => {
    const newOutfit: Outfit = {
      name: '',
      description: '',
      primaryColor: '#000000',
      style: ClothingStyle.Casual,
      isDefault: false,
    }
    updateWardrobe('outfits', [...value.outfits, newOutfit])
  }

  // 删除服装
  const handleRemoveOutfit = (index: number) => {
    updateWardrobe('outfits', value.outfits.filter((_, i) => i !== index))
  }

  // 更新服装
  const handleUpdateOutfit = (index: number, newOutfit: Outfit) => {
    const newOutfits = [...value.outfits]
    newOutfits[index] = newOutfit
    updateWardrobe('outfits', newOutfits)
  }

  // 添加配饰
  const handleAddAccessory = () => {
    const newAccessory: Accessory = {
      type: '',
      description: '',
    }
    updateWardrobe('mainAccessories', [...value.mainAccessories, newAccessory])
  }

  // 删除配饰
  const handleRemoveAccessory = (index: number) => {
    updateWardrobe('mainAccessories', value.mainAccessories.filter((_, i) => i !== index))
  }

  // 更新配饰
  const handleUpdateAccessory = (index: number, newAccessory: Accessory) => {
    const newAccessories = [...value.mainAccessories]
    newAccessories[index] = newAccessory
    updateWardrobe('mainAccessories', newAccessories)
  }

  // 更新标志性武器
  const updateSignatureWeapon = (field: keyof NonNullable<Wardrobe['signatureWeapon']>, newValue: string) => {
    const currentWeapon = value.signatureWeapon || { name: '', description: '', type: '' }
    updateWardrobe('signatureWeapon', {
      ...currentWeapon,
      [field]: newValue,
    })
  }

  return (
    <div className={styles.container}>
      {/* 服装列表 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>服装列表</h3>
        <div className={styles.outfitsContainer}>
          {value.outfits.map((outfit, index) => (
            <OutfitEditor
              key={index}
              value={outfit}
              onChange={(newOutfit) => handleUpdateOutfit(index, newOutfit)}
              onRemove={() => handleRemoveOutfit(index)}
              index={index}
              errors={errors}
              disabled={disabled}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddOutfit}
          disabled={disabled}
        >
          <Plus size={16} />
          <span>添加服装</span>
        </button>
      </div>

      {/* 主要配饰 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>主要配饰</h3>
        <div className={styles.accessoriesContainer}>
          {value.mainAccessories.map((accessory, index) => (
            <AccessoryEditor
              key={index}
              value={accessory}
              onChange={(newAccessory) => handleUpdateAccessory(index, newAccessory)}
              onRemove={() => handleRemoveAccessory(index)}
              index={index}
              errors={errors}
              disabled={disabled}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddAccessory}
          disabled={disabled}
        >
          <Plus size={16} />
          <span>添加配饰</span>
        </button>
      </div>

      {/* 标志性武器或工具 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>标志性武器或工具</h3>
        <div className={styles.formRow}>
          <p className={styles.helperText}>
            如果角色有标志性的武器、工具或特殊装备，请在此处描述。
          </p>
        </div>
        <div className={styles.formGrid}>
          <FormInput
            name="signatureWeapon-name"
            label="武器/工具名称"
            value={value.signatureWeapon?.name || ''}
            onChange={(val) => updateSignatureWeapon('name', val)}
            error={errors['signatureWeapon.name']}
            disabled={disabled}
            placeholder="例如：圣剑、魔法杖、高科技手枪"
            helperText="可选项"
          />
          <FormInput
            name="signatureWeapon-type"
            label="武器/工具类型"
            value={value.signatureWeapon?.type || ''}
            onChange={(val) => updateSignatureWeapon('type', val)}
            error={errors['signatureWeapon.type']}
            disabled={disabled}
            placeholder="例如：单手剑、法杖、远程武器"
            helperText="可选项"
          />
        </div>
        <div className={styles.formRow}>
          <FormTextarea
            name="signatureWeapon-description"
            label="武器/工具描述"
            value={value.signatureWeapon?.description || ''}
            onChange={(val) => updateSignatureWeapon('description', val)}
            error={errors['signatureWeapon.description']}
            disabled={disabled}
            placeholder="详细描述武器/工具的外观、能力、来历等"
            helperText="可选项"
            rows={3}
          />
        </div>
      </div>

      {/* 服装系统说明 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>服装系统说明</h3>
        <div className={styles.formRow}>
          <p className={styles.helperText}>
            服装系统记录了角色的各种着装和配饰。每个服装包含以下信息：
          </p>
          <ul className={styles.helperText}>
            <li><strong>服装名称</strong>：服装的识别名称</li>
            <li><strong>服装风格</strong>：定义服装的整体风格（日常、正式、奇幻等）</li>
            <li><strong>服装描述</strong>：详细描述服装的款式、材质、特点</li>
            <li><strong>颜色</strong>：主要颜色和次要颜色（十六进制格式）</li>
            <li><strong>关联故事</strong>：服装在故事中的特殊意义或穿着场合</li>
            <li><strong>默认服装</strong>：标记为角色的默认着装</li>
          </ul>
          <p className={styles.helperText}>
            通过服装系统，可以更好地展示角色的外观特征和风格偏好。
          </p>
        </div>
      </div>
    </div>
  )
}

export default WardrobeEditor
