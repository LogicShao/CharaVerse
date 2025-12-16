/**
 * OC 详情页面
 * 展示角色的完整信息，包含多个Tab面板
 */

import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCharacterStore } from '@/stores/characterStore'
import { OCDetailLayout } from '@/components/OCDetail'
import { BasicInfoPanel } from '@/components/OCDetail/BasicInfoPanel'
import { AppearancePanel } from '@/components/OCDetail/AppearancePanel'
import { PersonalityPanel } from '@/components/OCDetail/PersonalityPanel'
import { BackgroundPanel } from '@/components/OCDetail/BackgroundPanel'
import { SkillsPanel } from '@/components/OCDetail/SkillsPanel'
import { RelationshipsPanel } from '@/components/OCDetail/RelationshipsPanel'
import { WardrobePanel } from '@/components/OCDetail/WardrobePanel'
import { GalleryPanel } from '@/components/OCDetail/GalleryPanel'

export const OCDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentCharacter, loading, error, loadCharacter } = useCharacterStore()
  const [activeTab, setActiveTab] = useState('basic')

  // 加载角色数据
  useEffect(() => {
    if (id) {
      loadCharacter(id)
    }
  }, [id, loadCharacter])

  // 返回列表页
  const handleBack = () => {
    navigate('/')
  }

  // 编辑角色（暂时占位，阶段6将实现编辑功能）
  const handleEdit = () => {
    // TODO: 阶段6实现编辑功能
    console.log('编辑功能将在阶段6实现')
  }

  // 错误状态
  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>加载失败</h2>
        <p>{error}</p>
        <button onClick={handleBack}>返回列表</button>
      </div>
    )
  }

  // 未找到角色
  if (!loading && !currentCharacter) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>角色不存在</h2>
        <p>未找到ID为 {id} 的角色</p>
        <button onClick={handleBack}>返回列表</button>
      </div>
    )
  }

  // 加载中或未加载数据
  if (!currentCharacter) {
    return null
  }

  // 配置Tab面板
  const tabs = [
    {
      key: 'basic',
      label: '基本信息',
      content: <BasicInfoPanel character={currentCharacter} />,
    },
    {
      key: 'appearance',
      label: '外观',
      content: <AppearancePanel character={currentCharacter} />,
    },
    {
      key: 'personality',
      label: '性格',
      content: <PersonalityPanel character={currentCharacter} />,
    },
    {
      key: 'background',
      label: '背景',
      content: <BackgroundPanel character={currentCharacter} />,
    },
    {
      key: 'skills',
      label: '技能',
      content: <SkillsPanel character={currentCharacter} />,
    },
    {
      key: 'relationships',
      label: '关系',
      content: <RelationshipsPanel character={currentCharacter} />,
    },
    {
      key: 'wardrobe',
      label: '服装',
      content: <WardrobePanel character={currentCharacter} />,
    },
    {
      key: 'gallery',
      label: '媒体',
      content: <GalleryPanel character={currentCharacter} />,
    },
  ]

  return (
    <OCDetailLayout
      characterName={currentCharacter.basic.nameCn || currentCharacter.basic.nameEn}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={handleBack}
      onEdit={handleEdit}
      loading={loading}
    />
  )
}

export default OCDetailPage
