/**
 * LoreEditor 设定编辑器
 * 编辑角色的世界观、种族、社会地位、文化背景等设定信息
 */

import type { FC } from 'react'
import { FormInput, FormTextarea } from '@/components/Form'
import type { LoreEditorProps } from './LoreEditor.types'
import type { Lore } from '@/types/character'
import styles from './LoreEditor.module.css'

export const LoreEditor: FC<LoreEditorProps> = ({
  value,
  onChange,
  errors = {},
  disabled = false,
}) => {
  // 更新整个Lore对象
  const updateLore = <K extends keyof Lore>(
    key: K,
    newValue: Lore[K]
  ) => {
    onChange({
      ...value,
      [key]: newValue,
    })
  }

  return (
    <div className={styles.container}>
      {/* 世界观信息 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>世界观信息</h3>
        <div className={styles.formGrid}>
          <FormInput
            name="universe"
            label="所属宇宙或世界观"
            value={value.universe}
            onChange={(val) => updateLore('universe', val)}
            error={errors.universe}
            required
            disabled={disabled}
            placeholder="例如：现代都市、中世纪奇幻、未来科幻"
          />
          <FormInput
            name="species"
            label="种族或物种"
            value={value.species}
            onChange={(val) => updateLore('species', val)}
            error={errors.species}
            required
            disabled={disabled}
            placeholder="例如：人类、精灵、机器人、外星人"
          />
        </div>
      </div>

      {/* 社会地位 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>社会地位</h3>
        <div className={styles.formGrid}>
          <FormInput
            name="socialStatus"
            label="社会阶级或身份地位"
            value={value.socialStatus}
            onChange={(val) => updateLore('socialStatus', val)}
            error={errors.socialStatus}
            required
            disabled={disabled}
            placeholder="例如：平民、贵族、皇室、奴隶"
          />
          <FormInput
            name="faction"
            label="文化或派系从属"
            value={value.faction}
            onChange={(val) => updateLore('faction', val)}
            error={errors.faction}
            required
            disabled={disabled}
            placeholder="例如：王国骑士团、魔法学院、反抗军"
          />
        </div>
      </div>

      {/* 信仰与哲学 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>信仰与哲学</h3>
        <div className={styles.formRow}>
          <FormTextarea
            name="religion"
            label="宗教或信仰"
            value={value.religion}
            onChange={(val) => updateLore('religion', val)}
            error={errors.religion}
            required
            disabled={disabled}
            placeholder="描述角色的宗教信仰、神灵崇拜或无神论观点"
            rows={3}
          />
        </div>
        <div className={styles.formRow}>
          <FormTextarea
            name="philosophy"
            label="价值观和生活哲学"
            value={value.philosophy}
            onChange={(val) => updateLore('philosophy', val)}
            error={errors.philosophy}
            required
            disabled={disabled}
            placeholder="描述角色的核心价值观、人生哲学、道德准则"
            rows={4}
          />
        </div>
      </div>

      {/* 设定说明 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>设定说明</h3>
        <div className={styles.formRow}>
          <p className={styles.helperText}>
            设定信息定义了角色所处的世界背景和文化环境。这些信息对于理解角色的行为和动机至关重要。
          </p>
          <ul className={styles.helperText}>
            <li><strong>所属宇宙</strong>：角色所处的世界观类型（现代、奇幻、科幻等）</li>
            <li><strong>种族/物种</strong>：角色的生物学或文化身份</li>
            <li><strong>社会地位</strong>：角色在社会结构中的位置</li>
            <li><strong>派系从属</strong>：角色所属的组织、团体或文化群体</li>
            <li><strong>宗教信仰</strong>：角色的精神信仰和宗教实践</li>
            <li><strong>生活哲学</strong>：角色的核心价值观和人生指导原则</li>
          </ul>
          <p className={styles.helperText}>
            完整的设定信息有助于创建更加立体和可信的角色，使其在世界中拥有合理的背景和动机。
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoreEditor
