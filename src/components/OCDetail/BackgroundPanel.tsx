import type { FC } from 'react'
import styles from './BackgroundPanel.module.css'
import type { BackgroundPanelProps } from './BackgroundPanel.types'

/**
 * 背景故事面板组件
 * 展示角色的背景信息：出生地、家庭、教育、重要事件等
 */
export const BackgroundPanel: FC<BackgroundPanelProps> = ({ character, className }) => {
  const { background } = character

  return (
    <div className={`${styles.panel} ${className || ''}`}>
      {/* 基本背景信息 */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>基本信息</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>出生地</span>
            <span className={styles.infoValue}>{background.birthplace}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>社会背景</span>
            <span className={styles.infoValue}>{background.socialBackground}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>教育背景</span>
            <span className={styles.infoValue}>{background.education}</span>
          </div>
        </div>
      </div>

      {/* 家庭成员 */}
      {background.family && background.family.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>家庭成员</h2>
          <div className={styles.familyList}>
            {background.family.map((member, index) => (
              <div key={index} className={styles.familyMember}>
                <div className={styles.familyHeader}>
                  <span className={styles.familyName}>{member.name}</span>
                  <span className={styles.familyRelation}>{member.relationship}</span>
                </div>
                {member.isAlive !== undefined && (
                  <div className={styles.familyStatus}>
                    状态：{member.isAlive ? '健在' : '已故'}
                  </div>
                )}
                {member.description && (
                  <p className={styles.eventDescription}>{member.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 重要人生转折点 */}
      {background.turningPoints && background.turningPoints.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>重要人生转折点</h2>
          <div className={styles.eventsList}>
            {background.turningPoints.map((event, index) => (
              <div key={index} className={styles.eventCard}>
                <div className={styles.eventHeader}>
                  <h3 className={styles.eventTitle}>{event.name}</h3>
                  <span className={styles.eventAge}>{event.time}</span>
                </div>
                <p className={styles.eventDescription}>{event.description}</p>
                {event.impact && (
                  <p className={styles.eventDescription}>
                    <strong>影响：</strong>{event.impact}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
