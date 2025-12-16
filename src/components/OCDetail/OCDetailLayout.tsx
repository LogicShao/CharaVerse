import type { FC } from 'react'
import { ArrowLeft, Edit } from 'lucide-react'
import styles from './OCDetailLayout.module.css'
import type { OCDetailLayoutProps } from './OCDetailLayout.types'
import { Tabs } from '@/components/Tabs'
import { Button } from '@/components/Button'

/**
 * OC 详情页布局组件
 * 提供统一的详情页面结构：Header + Tab 导航 + 内容区域
 */
export const OCDetailLayout: FC<OCDetailLayoutProps> = ({
  characterName,
  tabs,
  activeTab,
  onTabChange,
  onBack,
  onEdit,
  loading = false,
  className,
}) => {
  return (
    <div className={`${styles.layout} ${className || ''}`}>
      {/* Header 区域 */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {/* 面包屑导航 */}
          <nav className={styles.breadcrumb}>
            <span className={styles.breadcrumbLink} onClick={onBack}>
              角色列表
            </span>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{characterName}</span>
          </nav>

          {/* 标题和操作按钮 */}
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{characterName}</h1>
            <div className={styles.actions}>
              <Button variant="outline" size="md" icon={<ArrowLeft size={16} />} onClick={onBack}>
                返回
              </Button>
              {onEdit && (
                <Button variant="primary" size="md" icon={<Edit size={16} />} onClick={onEdit}>
                  编辑
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 内容区域 */}
      <main className={styles.content}>
        {loading ? (
          <div className={styles.loading}>加载中...</div>
        ) : (
          <div className={styles.tabsContainer}>
            <Tabs
              items={tabs.map((tab) => ({
                key: tab.key,
                label: tab.label,
                children: tab.content,
              }))}
              activeKey={activeTab}
              onChange={onTabChange}
            />
          </div>
        )}
      </main>
    </div>
  )
}
