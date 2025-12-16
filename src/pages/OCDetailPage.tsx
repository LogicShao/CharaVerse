/**
 * 角色详情页面（占位页面）
 * 阶段 4 暂时使用占位页面，阶段 5 将实现完整功能
 */

import { useEffect } from 'react'
import type { FC } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useCharacterStore } from '@/stores/characterStore'
import { Button, Card, CardBody } from '@/components'
import styles from './OCDetailPage.module.css'

export const OCDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentCharacter, loading, loadCharacter } = useCharacterStore()

  useEffect(() => {
    if (id) {
      loadCharacter(id)
    }
  }, [id, loadCharacter])

  const handleBack = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>加载中...</div>
      </div>
    )
  }

  if (!currentCharacter) {
    return (
      <div className={styles.container}>
        <Card>
          <CardBody>
            <div className={styles.notFound}>
              <h2>角色未找到</h2>
              <p>ID: {id}</p>
              <Button onClick={handleBack} icon={<ArrowLeft />}>
                返回列表
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    )
  }

  const displayName = currentCharacter.basic.nameCn || currentCharacter.basic.nameEn

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button onClick={handleBack} variant="ghost" icon={<ArrowLeft />}>
          返回列表
        </Button>
        <h1 className={styles.title}>{displayName}</h1>
      </div>

      <Card>
        <CardBody>
          <div className={styles.placeholder}>
            <h2>详情页面开发中</h2>
            <p>阶段 5 将实现完整的角色详情展示功能</p>
            <div className={styles.info}>
              <p><strong>ID:</strong> {currentCharacter.basic.id}</p>
              <p><strong>中文名:</strong> {currentCharacter.basic.nameCn}</p>
              <p><strong>英文名:</strong> {currentCharacter.basic.nameEn}</p>
              <p><strong>MBTI:</strong> {currentCharacter.personality.mbti}</p>
              <p><strong>标签:</strong> {currentCharacter.metadata.tags.join('、')}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default OCDetailPage
