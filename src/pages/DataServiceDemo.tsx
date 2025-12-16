/**
 * 数据服务测试页面
 * 用于测试和演示数据服务层功能
 */

import { useEffect, useState, useCallback } from 'react'
import type { FC } from 'react'
import { useCharacterStore } from '@/stores/characterStore'
import { Button, Card, CardHeader, CardBody, Tag } from '@/components'
import type { Character } from '@/types/character'

// 导入 Mock 数据
import mockChar001 from '../../data/characters/char-001.json'
import mockChar002 from '../../data/characters/char-002.json'
import mockChar003 from '../../data/characters/char-003.json'

const mockCharacters = [mockChar001, mockChar002, mockChar003] as Character[]

/**
 * 数据服务测试页面组件
 */
const DataServiceDemo: FC = () => {
  const {
    characters,
    loading,
    error,
    loadCharacters,
    deleteCharacter,
    initializeFromMockData,
    clearError,
  } = useCharacterStore()

  const [initialized, setInitialized] = useState(false)

  // 初始化数据
  const handleInitialize = async () => {
    try {
      await initializeFromMockData(mockCharacters)
      setInitialized(true)
    } catch (err) {
      console.error('初始化失败:', err)
    }
  }

  // 加载数据 — useCallback 保持引用稳定，避免 useEffect 缺失依赖警告
  const handleLoad = useCallback(async () => {
    try {
      await loadCharacters()
    } catch (err) {
      console.error('加载失败:', err)
    }
  }, [loadCharacters])

  // 删除角色
  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个角色吗？')) {
      return
    }

    try {
      await deleteCharacter(id)
    } catch (err) {
      console.error('删除失败:', err)
    }
  }

  // 组件挂载时加载数据
  useEffect(() => {
    handleLoad()
  }, [handleLoad])

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>数据服务层测试</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        阶段3：测试数据加载、保存、验证等核心功能
      </p>

      {/* 操作按钮 */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <Button onClick={handleInitialize} disabled={loading || initialized}>
          {initialized ? '已初始化' : '初始化 Mock 数据'}
        </Button>
        <Button onClick={handleLoad} variant="secondary" disabled={loading}>
          重新加载
        </Button>
      </div>

      {/* 错误提示 */}
      {error && (
        <Card variant="bordered" style={{ marginBottom: '1.5rem', borderColor: 'var(--color-error-500)' }}>
          <CardBody>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: 'var(--color-error-600)' }}>错误：</strong>
                <span style={{ marginLeft: '0.5rem' }}>{error}</span>
              </div>
              <Button size="sm" variant="ghost" onClick={clearError}>
                关闭
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* 加载状态 */}
      {loading && (
        <Card variant="bordered" style={{ marginBottom: '1.5rem' }}>
          <CardBody>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⏳</div>
              <div style={{ color: 'var(--text-secondary)' }}>加载中...</div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* 状态信息 */}
      <Card variant="bordered" style={{ marginBottom: '1.5rem' }}>
        <CardHeader title="数据统计" />
        <CardBody>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary-600)' }}>
                {characters.length}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                已加载角色
              </div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-success-600)' }}>
                {initialized ? '✓' : '○'}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                初始化状态
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 角色列表 */}
      <h2 style={{ marginBottom: '1rem' }}>角色列表</h2>

      {characters.length === 0 && !loading && (
        <Card variant="bordered">
          <CardBody>
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
              <div style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>暂无数据</div>
              <div style={{ fontSize: '0.875rem' }}>点击"初始化 Mock 数据"按钮加载示例数据</div>
            </div>
          </CardBody>
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {characters.map((character) => (
          <Card key={character.basic.id} variant="bordered" hoverable>
            <CardHeader
              title={character.basic.nameCn || character.basic.nameEn}
              subtitle={character.basic.nicknames?.[0] || character.skills.occupation}
            />
            <CardBody>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  <Tag variant="primary">{character.basic.gender === 'male' ? '男性' : character.basic.gender === 'female' ? '女性' : '其他'}</Tag>
                  <Tag variant="info">{character.skills.occupation}</Tag>
                  {character.appearance.body.age && (
                    <Tag variant="default">{character.appearance.body.age}岁</Tag>
                  )}
                </div>

                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <strong>MBTI:</strong> {character.personality.mbti || '未知'}
                </div>

                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <strong>性格特质:</strong>{' '}
                  {character.personality.traits.slice(0, 3).map(t => t.name).join('、')}
                </div>

                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <strong>ID:</strong>{' '}
                  <code style={{ fontSize: '0.75rem' }}>
                    {character.basic.id}
                  </code>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(character.basic.id)}
                  disabled={loading}
                >
                  删除
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DataServiceDemo
