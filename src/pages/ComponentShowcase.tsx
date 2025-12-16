/**
 * 组件展示页面
 * 用于展示和测试所有基础 UI 组件
 */

import { useState } from 'react'
import type { FC } from 'react'
import { Button, Card, CardHeader, CardBody, CardFooter, Input, Tag } from '@/components'

/**
 * 组件展示页面
 */
const ComponentShowcase: FC = () => {
  const [inputValue, setInputValue] = useState('')

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>CharaVerse 基础组件库</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        阶段2：基础UI组件展示和测试
      </p>

      {/* Button 组件展示 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Button 按钮组件</h2>

        <Card variant="bordered" style={{ marginBottom: '1.5rem' }}>
          <CardHeader title="按钮变体" />
          <CardBody>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </CardBody>
        </Card>

        <Card variant="bordered" style={{ marginBottom: '1.5rem' }}>
          <CardHeader title="按钮尺寸" />
          <CardBody>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </CardBody>
        </Card>

        <Card variant="bordered">
          <CardHeader title="按钮状态" />
          <CardBody>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button fullWidth>Full Width</Button>
            </div>
          </CardBody>
        </Card>
      </section>

      {/* Card 组件展示 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Card 卡片组件</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <Card variant="default">
            <CardHeader title="Default Card" subtitle="默认样式卡片" />
            <CardBody>
              <p>这是一个默认样式的卡片组件，带有阴影效果。</p>
            </CardBody>
            <CardFooter>
              <Button size="sm">操作</Button>
            </CardFooter>
          </Card>

          <Card variant="bordered" hoverable>
            <CardHeader title="Bordered Card" subtitle="边框样式卡片" />
            <CardBody>
              <p>这是一个带边框的卡片，鼠标悬停时会有动画效果。</p>
            </CardBody>
          </Card>

          <Card variant="elevated" clickable onClick={() => alert('卡片被点击！')}>
            <CardHeader title="Elevated Card" subtitle="抬升样式卡片" />
            <CardBody>
              <p>这是一个抬升样式的卡片，可以点击。</p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Input 组件展示 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Input 输入框组件</h2>

        <Card variant="bordered">
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Input
                label="基础输入框"
                placeholder="请输入内容"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <Input
                label="必填输入框"
                placeholder="请输入内容"
                required
                helperText="这是一个必填字段"
              />

              <Input
                label="错误状态"
                placeholder="请输入内容"
                status="error"
                errorText="输入内容不符合要求"
              />

              <Input
                label="带计数器"
                placeholder="最多50个字符"
                maxLength={50}
                showCount
              />

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Input size="sm" placeholder="Small" />
                <Input size="md" placeholder="Medium" />
                <Input size="lg" placeholder="Large" />
              </div>
            </div>
          </CardBody>
        </Card>
      </section>

      {/* Tag 组件展示 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Tag 标签组件</h2>

        <Card variant="bordered" style={{ marginBottom: '1.5rem' }}>
          <CardHeader title="标签变体" />
          <CardBody>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Tag variant="default">Default</Tag>
              <Tag variant="primary">Primary</Tag>
              <Tag variant="success">Success</Tag>
              <Tag variant="warning">Warning</Tag>
              <Tag variant="error">Error</Tag>
              <Tag variant="info">Info</Tag>
            </div>
          </CardBody>
        </Card>

        <Card variant="bordered" style={{ marginBottom: '1.5rem' }}>
          <CardHeader title="边框样式" />
          <CardBody>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Tag variant="primary" bordered>Primary</Tag>
              <Tag variant="success" bordered>Success</Tag>
              <Tag variant="warning" bordered>Warning</Tag>
              <Tag variant="error" bordered>Error</Tag>
              <Tag variant="info" bordered>Info</Tag>
            </div>
          </CardBody>
        </Card>

        <Card variant="bordered">
          <CardHeader title="可关闭标签" />
          <CardBody>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Tag variant="primary" closable>可关闭</Tag>
              <Tag variant="success" closable>可关闭</Tag>
              <Tag variant="error" closable>可关闭</Tag>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  )
}

export default ComponentShowcase
