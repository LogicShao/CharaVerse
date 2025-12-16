import type { FC } from 'react'
import styles from './AppearancePanel.module.css'
import type { AppearancePanelProps } from './AppearancePanel.types'
import { Tag } from '@/components/Tag'

/**
 * 外观信息面板组件
 * 展示角色的外观特征：体型、面部、发型、配饰等
 */
export const AppearancePanel: FC<AppearancePanelProps> = ({ character, className }) => {
  const { appearance } = character

  return (
    <div className={`${styles.panel} ${className || ''}`}>
      {/* 体型信息 */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>体型</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>身高</span>
            <span className={styles.infoValue}>{appearance.body.height} cm</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>体重</span>
            <span className={styles.infoValue}>{appearance.body.weight} kg</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>体型类型</span>
            <span className={styles.infoValue}>{appearance.body.bodyType}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>肤色</span>
            <span className={styles.infoValue}>{appearance.body.skinTone}</span>
          </div>
        </div>
      </div>

      {/* 面部特征 */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>面部特征</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>面型</span>
            <span className={styles.infoValue}>{appearance.face.faceShape}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>眼睛颜色</span>
            <span className={styles.infoValue}>
              <span className={styles.colorSwatch}>
                <span
                  className={styles.colorBox}
                  style={{ backgroundColor: appearance.face.eyeColor }}
                />
                {appearance.face.eyeColor}
              </span>
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>眼睛形状</span>
            <span className={styles.infoValue}>{appearance.face.eyeShape}</span>
          </div>
        </div>
      </div>

      {/* 发型 */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>发型</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>发型</span>
            <span className={styles.infoValue}>{appearance.hair.style}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>发长</span>
            <span className={styles.infoValue}>{appearance.hair.length}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>发色</span>
            <span className={styles.infoValue}>
              <span className={styles.colorSwatch}>
                <span
                  className={styles.colorBox}
                  style={{ backgroundColor: appearance.hair.primaryColor }}
                />
                {appearance.hair.primaryColor}
              </span>
            </span>
          </div>
        </div>

        {appearance.hair.description && (
          <>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>发型描述</span>
            </div>
            <p className={styles.description}>{appearance.hair.description}</p>
          </>
        )}
      </div>

      {/* 面部标记 */}
      {appearance.facialMarks && appearance.facialMarks.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>面部标记</h2>
          <div className={styles.tagList}>
            {appearance.facialMarks.map((mark, index) => (
              <Tag key={index} variant="info">
                {mark.type} - {mark.location}
              </Tag>
            ))}
          </div>
        </div>
      )}

      {/* 配饰 */}
      {appearance.accessories && appearance.accessories.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>配饰</h2>
          <div className={styles.tagList}>
            {appearance.accessories.map((accessory, index) => (
              <Tag key={index} variant="default">
                {accessory.type}: {accessory.description}
              </Tag>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
