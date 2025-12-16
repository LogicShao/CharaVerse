import type { FC } from 'react'
import styles from './PersonalityPanel.module.css'
import type { PersonalityPanelProps } from './PersonalityPanel.types'

/**
 * 性格信息面板组件
 * 展示角色的性格特质、MBTI、动机、心理特征等
 */
export const PersonalityPanel: FC<PersonalityPanelProps> = ({ character, className }) => {
  const { personality } = character

  // 渲染特质强度指示器
  const renderIntensity = (intensity: number) => {
    return (
      <div className={styles.traitIntensity}>
        {[1, 2, 3, 4, 5].map((level) => (
          <span
            key={level}
            className={`${styles.intensityDot} ${level <= intensity ? styles.filled : ''}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={`${styles.panel} ${className || ''}`}>
      {/* 基础性格信息 */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>基础信息</h2>
        <div className={styles.infoGrid}>
          {personality.mbti && (
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>MBTI</span>
              <span className={styles.infoValue}>{personality.mbti}</span>
            </div>
          )}

          {personality.zodiac && (
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>星座</span>
              <span className={styles.infoValue}>{personality.zodiac}</span>
            </div>
          )}
        </div>
      </div>

      {/* 核心性格描述 */}
      {personality.coreDescription && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>核心性格</h2>
          <p className={styles.description}>{personality.coreDescription}</p>
        </div>
      )}

      {/* 性格特质 */}
      {personality.traits && personality.traits.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>性格特质</h2>
          <div className={styles.traitsList}>
            {personality.traits.map((trait, index) => (
              <div
                key={index}
                className={`${styles.traitCard} ${trait.isPositive ? styles.positive : styles.negative}`}
              >
                <div className={styles.traitHeader}>
                  <span className={styles.traitName}>{trait.name}</span>
                  {renderIntensity(trait.intensity)}
                </div>
                {trait.description && (
                  <p className={styles.traitDescription}>{trait.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 动机与目标 */}
      {personality.motivation && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>动机与目标</h2>
          <p className={styles.description}>{personality.motivation}</p>
        </div>
      )}

      {/* 心理特征 */}
      {personality.psychology && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>心理特征</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>主要恐惧</span>
              <span className={styles.infoValue}>{personality.psychology.mainFear}</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>核心欲望</span>
              <span className={styles.infoValue}>{personality.psychology.coreDesire}</span>
            </div>

            {personality.psychology.trauma && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>心理创伤</span>
                <span className={styles.infoValue}>{personality.psychology.trauma}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 表达方式 */}
      {personality.expression && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>表达方式</h2>
          <div className={styles.infoGrid}>
            {personality.expression.speechHabits && personality.expression.speechHabits.length > 0 && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>说话习惯</span>
                <span className={styles.infoValue}>{personality.expression.speechHabits.join('、')}</span>
              </div>
            )}

            {personality.expression.actionStyle && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>行动风格</span>
                <span className={styles.infoValue}>{personality.expression.actionStyle}</span>
              </div>
            )}

            {personality.expression.catchphrases &&
              personality.expression.catchphrases.length > 0 && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>口头禅</span>
                  <span className={styles.infoValue}>
                    {personality.expression.catchphrases.join('、')}
                  </span>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  )
}
