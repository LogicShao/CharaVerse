/**
 * OC 网格布局组件
 * 响应式网格布局，支持加载状态和空状态
 */

import type { FC } from 'react'
import { Users } from 'lucide-react'
import { OCCardPreview } from '@/components/OCCardPreview'
import type { OCGridProps } from './OCGrid.types'
import styles from './OCGrid.module.css'

export const OCGrid: FC<OCGridProps> = ({
  characters,
  loading = false,
  onCardClick,
  className,
}) => {
  if (loading) {
    return (
      <div className={`${styles.grid} ${className || ''}`}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner} />
          <p className={styles.loadingText}>加载中...</p>
        </div>
      </div>
    )
  }

  if (characters.length === 0) {
    return (
      <div className={`${styles.grid} ${className || ''}`}>
        <div className={styles.emptyState}>
          <Users className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>暂无角色</h3>
          <p className={styles.emptyDescription}>
            当前没有找到符合条件的角色，请尝试调整筛选条件或创建新角色
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.grid} ${className || ''}`}>
      {characters.map((character) => (
        <OCCardPreview
          key={character.basic.id}
          character={character}
          onClick={onCardClick}
        />
      ))}
    </div>
  )
}
