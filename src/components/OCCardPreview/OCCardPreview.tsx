/**
 * 角色卡片预览组件
 * 用于在列表页面展示角色的简要信息
 */

import type { FC } from 'react'
import { User, Calendar } from 'lucide-react'
import { Card, CardBody, Tag } from '@/components'
import type { OCCardPreviewProps } from './OCCardPreview.types'
import styles from './OCCardPreview.module.css'

export const OCCardPreview: FC<OCCardPreviewProps> = ({
  character,
  onClick,
  className,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(character)
    }
  }

  const displayName = character.basic.nameCn || character.basic.nameEn
  const firstNickname = character.basic.nicknames?.[0]
  const tags = character.metadata.tags.slice(0, 3)
  const createdDate = new Date(character.basic.createdAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })

  return (
    <Card
      variant="bordered"
      hoverable
      className={`${styles.card} ${className || ''}`}
      onClick={handleClick}
    >
      <div className={styles.avatarSection}>
        {character.media.profileImage ? (
          <img
            src={character.media.profileImage}
            alt={displayName}
            className={styles.avatarImage}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {displayName.charAt(0)}
          </div>
        )}
      </div>

      <CardBody className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{displayName}</h3>
          {character.basic.nameEn && character.basic.nameCn && (
            <p className={styles.nameEn}>{character.basic.nameEn}</p>
          )}
        </div>

        {firstNickname && (
          <span className={styles.nickname}>{firstNickname}</span>
        )}

        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <Tag key={index} variant="default" size="sm">
              {tag}
            </Tag>
          ))}
        </div>

        <div className={styles.info}>
          <div className={styles.infoItem}>
            <User className={styles.icon} />
            <span className={styles.mbti}>{character.personality.mbti || 'N/A'}</span>
          </div>
          <div className={styles.infoItem}>
            <Calendar className={styles.icon} />
            <span>{createdDate}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
