import type { FC } from 'react'
import styles from './RelationshipsPanel.module.css'
import type { RelationshipsPanelProps } from './RelationshipsPanel.types'

export const RelationshipsPanel: FC<RelationshipsPanelProps> = ({ character, className }) => {
  const { relationships } = character

  return (
    <div className={`${styles.panel} ${className || ''}`}>
      {relationships.connections && relationships.connections.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>关系网络</h2>
          <div className={styles.relationList}>
            {relationships.connections.map((connection, index) => (
              <div key={index} className={styles.relationCard}>
                <div className={styles.relationHeader}>
                  <span className={styles.relationName}>{connection.targetName}</span>
                  <span className={styles.relationType}>{connection.type}</span>
                </div>
                {connection.description && (
                  <p className={styles.relationDescription}>{connection.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
