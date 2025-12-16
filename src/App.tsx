/**
 * 主应用组件
 * 集成路由系统，作为应用的根组件
 */

import { AppRouter } from '@/router'
import './styles/variables.css'
import './styles/global.css'

function App() {
  return <AppRouter />
}

export default App
