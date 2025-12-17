/**
 * RelationshipsEditor 关系编辑器
 * 编辑角色与其他角色的关系网络
 */

import type { FC } from 'react'
import { X, Plus } from 'lucide-react'
import { FormInput, FormTextarea, FormSelect } from '@/components/Form'
import type { RelationshipsEditorProps, RelationshipEditorProps } from './RelationshipsEditor.types'
import type { Relationships, Relationship } from '@/types/character'
import { RelationshipType, RelationshipStrength } from '@/types/enums'
import styles from './RelationshipsEditor.module.css'

// 关系类型选项
const RELATIONSHIP_TYPE_OPTIONS = Object.values(RelationshipType).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' '),
}))

// 关系强度选项
const RELATIONSHIP_STRENGTH_OPTIONS = [
  { value: RelationshipStrength.VeryWeak, label: '非常弱 (1)' },
  { value: RelationshipStrength.Weak, label: '弱 (2)' },
  { value: RelationshipStrength.Moderate, label: '中等 (3)' },
  { value: RelationshipStrength.Strong, label: '强 (4)' },
  { value: RelationshipStrength.VeryStrong, label: '非常强 (5)' },
]

// 关系类型对应的样式类名
const getRelationshipTypeClass = (type: RelationshipType) => {
  switch (type) {
    case RelationshipType.Family:
      return styles.relationshipTypeFamily
    case RelationshipType.Friend:
    case RelationshipType.BestFriend:
      return styles.relationshipTypeFriend
    case RelationshipType.Romantic:
      return styles.relationshipTypeRomantic
    case RelationshipType.Enemy:
    case RelationshipType.Rival:
      return styles.relationshipTypeEnemy
    case RelationshipType.Mentor:
    case RelationshipType.Student:
      return styles.relationshipTypeMentor
    default:
      return styles.relationshipTypeOther
  }
}

// 关系编辑器子组件
const RelationshipEditor: FC<RelationshipEditorProps> = ({
  value,
  onChange,
  onRemove,
  index,
  errors = {},
  disabled = false,
}) => {
  const updateField = <K extends keyof Relationship>(
    field: K,
    newValue: Relationship[K]
  ) => {
    onChange({
      ...value,
      [field]: newValue,
    })
  }

  const handleStrengthChange = (newStrength: number) => {
    updateField('strength', newStrength as RelationshipStrength)
  }

  return (
    <div className={styles.relationshipItem}>
      <div className={styles.relationshipHeader}>
        <div className={styles.relationshipName}>关系 #{index + 1}</div>
        <div className={styles.relationshipControls}>
          <span
            className={`${styles.relationshipType} ${getRelationshipTypeClass(value.type)}`}
          >
            {value.type.charAt(0).toUpperCase() + value.type.slice(1).replace('-', ' ')}
          </span>
          {onRemove && (
            <button
              type="button"
              className={styles.removeButton}
              onClick={onRemove}
              disabled={disabled}
              aria-label="删除关系"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.formGrid}>
        <FormInput
          name={`relationship-targetName-${index}`}
          label="关系对象名称"
          value={value.targetName}
          onChange={(val) => updateField('targetName', val)}
          error={errors[`connections.${index}.targetName`]}
          required
          disabled={disabled}
          placeholder="例如：张三、李四"
        />
        <FormSelect
          name={`relationship-type-${index}`}
          label="关系类型"
          value={value.type}
          onChange={(val) => updateField('type', val as RelationshipType)}
          options={RELATIONSHIP_TYPE_OPTIONS}
          error={errors[`connections.${index}.type`]}
          required
          disabled={disabled}
        />
      </div>

      <div className={styles.formGrid}>
        <FormInput
          name={`relationship-targetId-${index}`}
          label="关系对象ID（可选）"
          value={value.targetId || ''}
          onChange={(val) => updateField('targetId', val || undefined)}
          error={errors[`connections.${index}.targetId`]}
          disabled={disabled}
          placeholder="如果是系统中的其他角色，可填写其ID"
          helperText="可选项"
        />
        <FormSelect
          name={`relationship-strength-${index}`}
          label="关系强度"
          value={value.strength}
          onChange={(val) => updateField('strength', val as RelationshipStrength)}
          options={RELATIONSHIP_STRENGTH_OPTIONS}
          error={errors[`connections.${index}.strength`]}
          required
          disabled={disabled}
        />
      </div>

      <div className={styles.formRow}>
        <FormTextarea
          name={`relationship-description-${index}`}
          label="关系描述"
          value={value.description}
          onChange={(val) => updateField('description', val)}
          error={errors[`connections.${index}.description`]}
          required
          disabled={disabled}
          placeholder="详细描述这个关系的性质、历史、现状等"
          rows={3}
        />
      </div>

      {/* 关系强度可视化 */}
      <div className={styles.relationshipStrengthContainer}>
        <span className={styles.relationshipStrengthLabel}>关系强度：</span>
        <div className={styles.relationshipStrengthStars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`${styles.relationshipStrengthStar} ${
                value.strength >= star ? styles.active : ''
              }`}
              onClick={() => handleStrengthChange(star)}
              disabled={disabled}
              aria-label={`强度 ${star} 级`}
            />
          ))}
        </div>
        <span className={styles.helperText}>当前强度：{value.strength}/5</span>
      </div>

      {/* 共同回忆（可选） */}
      <div className={styles.formRow}>
        <label className={styles.label}>共同回忆（可选）</label>
        <div className={styles.dynamicList}>
          {(value.sharedMemories || []).map((memory, memoryIndex) => (
            <div key={memoryIndex} className={styles.listItem}>
              <div className={styles.listItemContent}>
                <FormInput
                  name={`relationship-memory-${index}-${memoryIndex}`}
                  value={memory}
                  onChange={(val) => {
                    const newMemories = [...(value.sharedMemories || [])]
                    newMemories[memoryIndex] = val
                    updateField('sharedMemories', newMemories)
                  }}
                  error={errors[`connections.${index}.sharedMemories.${memoryIndex}`]}
                  disabled={disabled}
                  placeholder="例如：一起冒险的经历、重要的对话"
                  fullWidth
                />
              </div>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => {
                  const newMemories = [...(value.sharedMemories || [])]
                  newMemories.splice(memoryIndex, 1)
                  updateField('sharedMemories', newMemories)
                }}
                disabled={disabled}
                aria-label="删除共同回忆"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => {
            const newMemories = [...(value.sharedMemories || []), '']
            updateField('sharedMemories', newMemories)
          }}
          disabled={disabled}
        >
          <Plus size={16} />
          <span>添加共同回忆</span>
        </button>
      </div>
    </div>
  )
}

export const RelationshipsEditor: FC<RelationshipsEditorProps> = ({
  value,
  onChange,
  errors = {},
  disabled = false,
}) => {
  // 更新整个Relationships对象
  const updateRelationships = <K extends keyof Relationships>(
    key: K,
    newValue: Relationships[K]
  ) => {
    onChange({
      ...value,
      [key]: newValue,
    })
  }

  // 添加关系
  const handleAddRelationship = () => {
    const newRelationship: Relationship = {
      targetName: '',
      type: RelationshipType.Friend,
      strength: RelationshipStrength.Moderate,
      description: '',
    }
    updateRelationships('connections', [...value.connections, newRelationship])
  }

  // 删除关系
  const handleRemoveRelationship = (index: number) => {
    updateRelationships('connections', value.connections.filter((_, i) => i !== index))
  }

  // 更新关系
  const handleUpdateRelationship = (index: number, newRelationship: Relationship) => {
    const newConnections = [...value.connections]
    newConnections[index] = newRelationship
    updateRelationships('connections', newConnections)
  }

  return (
    <div className={styles.container}>
      {/* 关系网络 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>关系网络</h3>
        <div className={styles.relationshipsContainer}>
          {value.connections.map((relationship, index) => (
            <RelationshipEditor
              key={index}
              value={relationship}
              onChange={(newRelationship) => handleUpdateRelationship(index, newRelationship)}
              onRemove={() => handleRemoveRelationship(index)}
              index={index}
              errors={errors}
              disabled={disabled}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddRelationship}
          disabled={disabled}
        >
          <Plus size={16} />
          <span>添加关系</span>
        </button>
      </div>

      {/* 关系网络说明 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>关系网络说明</h3>
        <div className={styles.formRow}>
          <p className={styles.helperText}>
            关系网络展示了角色与其他角色之间的各种联系。每个关系包含以下信息：
          </p>
          <ul className={styles.helperText}>
            <li><strong>关系对象名称</strong>：对方的姓名或称呼</li>
            <li><strong>关系类型</strong>：定义关系的性质（家人、朋友、恋人等）</li>
            <li><strong>关系强度</strong>：从1（非常弱）到5（非常强）</li>
            <li><strong>关系描述</strong>：详细描述这个关系的性质和背景</li>
            <li><strong>共同回忆</strong>：记录双方共同经历的重要事件</li>
          </ul>
          <p className={styles.helperText}>
            通过建立关系网络，可以更好地理解角色在社会中的位置和互动模式。
          </p>
        </div>
      </div>
    </div>
  )
}

export default RelationshipsEditor
