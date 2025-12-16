import type { FC } from 'react'
import styles from './WardrobePanel.module.css'
import type { WardrobePanelProps } from './WardrobePanel.types'

export const WardrobePanel: FC<WardrobePanelProps> = ({ character, className }) => {
  const { wardrobe } = character

  return (
    <div className={`${styles.panel} ${className || ''}`}>
      {wardrobe.outfits && wardrobe.outfits.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>服装</h2>
          <div className={styles.outfitList}>
            {wardrobe.outfits.map((outfit, index) => (
              <div key={index} className={styles.outfitCard}>
                <h3 className={styles.outfitName}>{outfit.name}</h3>
                <p className={styles.outfitDescription}>{outfit.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {wardrobe.signatureWeapon && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>标志性武器</h2>
          <p className={styles.infoValue}>
            {wardrobe.signatureWeapon.name}: {wardrobe.signatureWeapon.description}
          </p>
        </div>
      )}
    </div>
  )
}
