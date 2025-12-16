import type { FC } from 'react'
import styles from './Tabs.module.css'
import type { TabsProps } from './Tabs.types'

/**
 * Tabs 选项卡组件
 * 用于在多个内容面板之间切换
 */
export const Tabs: FC<TabsProps> = ({ items, activeKey, onChange, className }) => {
  const activeItem = items.find((item) => item.key === activeKey)

  return (
    <div className={`${styles.tabs} ${className || ''}`}>
      {/* Tab 导航栏 */}
      <div className={styles.tabNav}>
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`${styles.tabButton} ${item.key === activeKey ? styles.active : ''}`}
            onClick={() => onChange(item.key)}
            disabled={item.disabled}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab 内容区域 */}
      <div className={styles.tabContent}>{activeItem?.children}</div>
    </div>
  )
}
