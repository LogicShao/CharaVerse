import type { FC } from 'react'
import styles from './GalleryPanel.module.css'
import type { GalleryPanelProps } from './GalleryPanel.types'

export const GalleryPanel: FC<GalleryPanelProps> = ({ character, className }) => {
  const { media } = character

  // 显示名称（优先中文名）
  const displayName = character.basic.nameCn || character.basic.nameEn

  return (
    <div className={`${styles.panel} ${className || ''}`}>
      {media.gallery && media.gallery.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>图片画廊</h2>
          <div className={styles.gallery}>
            {media.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${displayName} - 图片 ${index + 1}`}
                className={styles.galleryImage}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            ))}
          </div>
        </div>
      )}
      {media.voiceClaim && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>配音</h2>
          <span className={styles.infoValue}>{media.voiceClaim}</span>
        </div>
      )}
      {media.themeSong && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>主题曲</h2>
          <span className={styles.infoValue}>{media.themeSong}</span>
        </div>
      )}
    </div>
  )
}
