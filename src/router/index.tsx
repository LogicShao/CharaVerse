/**
 * 应用路由配置
 * 使用 React Router v7
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import type { FC } from 'react'

// 页面组件懒加载
const Home = lazy(() => import('@/pages/Home'))
const ComponentShowcase = lazy(() => import('@/pages/ComponentShowcase'))
const DataServiceDemo = lazy(() => import('@/pages/DataServiceDemo'))

// 加载中组件
const LoadingFallback: FC = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: 'var(--font-size-lg)',
    color: 'var(--text-secondary)'
  }}>
    加载中...
  </div>
)

// 错误边界组件
const ErrorBoundary: FC<{ error: Error }> = ({ error }) => (
  <div style={{
    padding: 'var(--spacing-8)',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center'
  }}>
    <h1 style={{ color: 'var(--color-error-600)', marginBottom: 'var(--spacing-4)' }}>
      页面加载失败
    </h1>
    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-4)' }}>
      {error.message}
    </p>
    <button
      onClick={() => window.location.reload()}
      style={{
        padding: 'var(--spacing-2) var(--spacing-4)',
        backgroundColor: 'var(--color-primary-600)',
        color: 'white',
        border: 'none',
        borderRadius: 'var(--radius-base)',
        cursor: 'pointer',
        fontSize: 'var(--font-size-base)'
      }}
    >
      重新加载
    </button>
  </div>
)

// 路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Home />
      </Suspense>
    ),
    errorElement: <ErrorBoundary error={new Error('页面加载失败')} />
  },
  {
    path: '/components',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ComponentShowcase />
      </Suspense>
    ),
    errorElement: <ErrorBoundary error={new Error('组件展示页面加载失败')} />
  },
  {
    path: '/data-demo',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <DataServiceDemo />
      </Suspense>
    ),
    errorElement: <ErrorBoundary error={new Error('数据服务测试页面加载失败')} />
  }
])

// 路由提供者组件
export const AppRouter: FC = () => {
  return <RouterProvider router={router} />
}

export default AppRouter