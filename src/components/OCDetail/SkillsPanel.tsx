import type { FC } from 'react'
import styles from './SkillsPanel.module.css'
import type { SkillsPanelProps } from './SkillsPanel.types'

export const SkillsPanel: FC<SkillsPanelProps> = ({ character, className }) => {
  const { skills } = character

  return (
    <div className={`${styles.panel} ${className || ''}`}>
      {/* 职业 */}
      {skills.occupation && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>职业</h2>
          <div className={styles.infoItem}>
            <span className={styles.infoValue}>{skills.occupation}</span>
          </div>
        </div>
      )}

      {/* 技能列表 */}
      {skills.skills && skills.skills.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>技能</h2>
          <div className={styles.skillsList}>
            {skills.skills.map((skill, index) => (
              <div key={index} className={styles.skillCard}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillLevel}>{skill.level}</span>
                </div>
                {skill.description && (
                  <p className={styles.skillDescription}>{skill.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 弱点 */}
      {skills.weaknesses && skills.weaknesses.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>弱点</h2>
          <div className={styles.infoItem}>
            <span className={styles.infoValue}>{skills.weaknesses.join('、')}</span>
          </div>
        </div>
      )}

      {/* 限制 */}
      {skills.limitations && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>限制</h2>
          <p className={styles.description}>{skills.limitations}</p>
        </div>
      )}
    </div>
  )
}
