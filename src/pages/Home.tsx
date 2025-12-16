/**
 * 主页组件
 * CharaVerse 应用的主页，展示项目介绍和导航
 */

import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardHeader, CardBody, CardFooter, Tag } from '@/components'
import './Home.module.css'

/**
 * 主页组件
 */
const Home: FC = () => {
  return (
    <div className="home-container">
      {/* 英雄区域 */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Tag variant="primary" bordered>原创角色管理系统</Tag>
          </div>
          <h1 className="hero-title">
            欢迎来到 <span className="highlight">CharaVerse</span>
          </h1>
          <p className="hero-description">
            一个现代化的原创角色（OC）管理系统与名片展示平台。
            帮助创作者系统化地管理角色信息，并生成精美的数字名片。
          </p>
          <div className="hero-actions">
            <Link to="/components">
              <Button variant="primary" size="lg">
                查看组件库
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              了解更多
            </Button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-card">
            <div className="card-preview">
              <div className="preview-header">
                <div className="preview-avatar"></div>
                <div className="preview-info">
                  <div className="preview-name">示例角色</div>
                  <div className="preview-title">原创角色</div>
                </div>
              </div>
              <div className="preview-tags">
                <Tag variant="primary" size="sm">幻想</Tag>
                <Tag variant="success" size="sm">英雄</Tag>
                <Tag variant="info" size="sm">魔法</Tag>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 功能特性区域 */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">核心功能</h2>
          <p className="section-description">
            CharaVerse 提供完整的原创角色管理解决方案
          </p>
        </div>

        <div className="features-grid">
          <Card variant="elevated" hoverable className="feature-card">
            <CardHeader
              title="角色信息管理"
              subtitle="系统化存储和管理角色数据"
            />
            <CardBody>
              <ul className="feature-list">
                <li>基础信息与外观描述</li>
                <li>性格心理与背景故事</li>
                <li>技能能力与关系网络</li>
                <li>媒体资源与元数据</li>
              </ul>
            </CardBody>
          </Card>

          <Card variant="elevated" hoverable className="feature-card">
            <CardHeader
              title="数字名片生成"
              subtitle="创建精美的角色展示卡片"
            />
            <CardBody>
              <ul className="feature-list">
                <li>多种名片模板选择</li>
                <li>自定义样式和布局</li>
                <li>响应式设计适配</li>
                <li>一键导出和分享</li>
              </ul>
            </CardBody>
          </Card>

          <Card variant="elevated" hoverable className="feature-card">
            <CardHeader
              title="数据验证与安全"
              subtitle="确保数据完整性和安全性"
            />
            <CardBody>
              <ul className="feature-list">
                <li>TypeScript 类型安全</li>
                <li>Zod 运行时数据验证</li>
                <li>本地存储加密</li>
                <li>数据备份与恢复</li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* 技术栈展示区域 */}
      <section className="tech-section">
        <div className="section-header">
          <h2 className="section-title">技术栈</h2>
          <p className="section-description">
            基于现代前端技术栈构建，提供优秀的开发体验
          </p>
        </div>

        <div className="tech-grid">
          <div className="tech-item">
            <div className="tech-icon react">R</div>
            <h3 className="tech-name">React 19</h3>
            <p className="tech-description">现代化的 React 框架</p>
          </div>

          <div className="tech-item">
            <div className="tech-icon typescript">TS</div>
            <h3 className="tech-name">TypeScript</h3>
            <p className="tech-description">类型安全的 JavaScript</p>
          </div>

          <div className="tech-item">
            <div className="tech-icon vite">V</div>
            <h3 className="tech-name">Vite</h3>
            <p className="tech-description">快速的构建工具</p>
          </div>

          <div className="tech-item">
            <div className="tech-icon zustand">Z</div>
            <h3 className="tech-name">Zustand</h3>
            <p className="tech-description">轻量级状态管理</p>
          </div>

          <div className="tech-item">
            <div className="tech-icon zod">V</div>
            <h3 className="tech-name">Zod</h3>
            <p className="tech-description">运行时数据验证</p>
          </div>

          <div className="tech-item">
            <div className="tech-icon router">R</div>
            <h3 className="tech-name">React Router</h3>
            <p className="tech-description">客户端路由</p>
          </div>
        </div>
      </section>

      {/* 快速开始区域 */}
      <section className="quickstart-section">
        <Card variant="bordered" className="quickstart-card">
          <CardHeader
            title="快速开始"
            subtitle="立即体验 CharaVerse"
          />
          <CardBody>
            <div className="quickstart-content">
              <div className="quickstart-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>查看组件库</h3>
                  <p>浏览我们精心设计的基础 UI 组件</p>
                </div>
              </div>

              <div className="quickstart-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>创建第一个角色</h3>
                  <p>使用我们的数据模板创建原创角色</p>
                </div>
              </div>

              <div className="quickstart-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>生成数字名片</h3>
                  <p>为角色创建精美的展示卡片</p>
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <div className="quickstart-actions">
              <Link to="/components">
                <Button variant="primary">
                  开始探索组件
                </Button>
              </Link>
              <Button variant="ghost">
                查看文档
              </Button>
            </div>
          </CardFooter>
        </Card>
      </section>

      {/* 页脚 */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-info">
            <h3 className="footer-title">CharaVerse</h3>
            <p className="footer-description">
              原创角色管理系统与名片展示平台
            </p>
            <div className="footer-tags">
              <Tag variant="default" size="sm">React</Tag>
              <Tag variant="default" size="sm">TypeScript</Tag>
              <Tag variant="default" size="sm">Vite</Tag>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4 className="link-group-title">项目</h4>
              <Link to="/" className="footer-link">主页</Link>
              <Link to="/components" className="footer-link">组件库</Link>
              <a href="#" className="footer-link">文档</a>
            </div>

            <div className="link-group">
              <h4 className="link-group-title">开发</h4>
              <a href="#" className="footer-link">GitHub</a>
              <a href="#" className="footer-link">问题反馈</a>
              <a href="#" className="footer-link">贡献指南</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © 2025 CharaVerse. 基于 React + TypeScript 构建。
          </p>
          <p className="version">
            当前版本: 0.1.0 | 阶段 2: 基础 UI 组件库
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home