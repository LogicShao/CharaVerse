import type { FC } from 'react'
import { format } from 'date-fns'
import styles from './BasicInfoPanel.module.css'
import type { BasicInfoPanelProps } from './BasicInfoPanel.types'
import { Tag } from '@/components/Tag'

/**
 * 基础信息面板组件
 * 展示角色的基础信息：名字、性别、年龄、生日等
 */
export const BasicInfoPanel: FC<BasicInfoPanelProps> = ({ character, className }) => {
  const { basic, media, appearance } = character

  // 格式化日期
  const formatDate = (dateString?: string) => {
    if (!dateString) return '未设置'
    try {
      return format(new Date(dateString), 'yyyy年MM月dd日')
    } catch {
      return dateString
    }
  }

  // 显示名称（优先中文名）
  const displayName = basic.nameCn || basic.nameEn

  return (
    <div className={`${styles.panel} ${className || ''}`}>
      {/* 头部：头像和主要信息 */}
      <div className={styles.header}>
        {/* 头像 */}
        <div>
          {media.profileImage ? (
            <img
              src={media.profileImage}
              alt={displayName}
              className={styles.profileImage}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <div className={styles.profileImagePlaceholder}>暂无头像</div>
          )}
        </div>

        {/* 主要信息 */}
        <div className={styles.headerInfo}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>基本信息</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>中文名</span>
                <span className={styles.infoValue}>{basic.nameCn}</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>英文名</span>
                <span className={styles.infoValue}>{basic.nameEn}</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>性别</span>
                <span className={styles.infoValue}>{basic.gender || '未设置'}</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>年龄</span>
                <span className={styles.infoValue}>{appearance.body.age} 岁</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>创作者</span>
                <span className={styles.infoValue}>{basic.creator.name}</span>
              </div>
            </div>
          </div>

          {/* 昵称 */}
          {basic.nicknames && basic.nicknames.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>昵称</h3>
              <div className={styles.nicknameList}>
                {basic.nicknames.map((nickname, index) => (
                  <Tag key={index} variant="primary">
                    {nickname}
                  </Tag>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 元数据信息 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>元数据</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>创建时间</span>
            <span className={styles.infoValue}>{formatDate(basic.createdAt)}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>更新时间</span>
            <span className={styles.infoValue}>{formatDate(basic.updatedAt)}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>公开状态</span>
            <span className={styles.infoValue}>
              {character.metadata.isPublic ? '公开' : '私密'}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>语言</span>
            <span className={styles.infoValue}>{character.metadata.language || '未设置'}</span>
          </div>
        </div>
      </div>

      {/* 标签 */}
      {character.metadata.tags && character.metadata.tags.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>标签</h3>
          <div className={styles.nicknameList}>
            {character.metadata.tags.map((tag, index) => (
              <Tag key={index} variant="default">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
