# CharaVerse 源代码目录结构

## 目录说明

```
src/
├── types/              # TypeScript 类型定义
├── models/             # 数据模型和 JSON Schema
├── components/         # React 组件
├── pages/              # 页面组件
├── services/           # 数据服务层
├── hooks/              # 自定义 React Hooks
├── utils/              # 工具函数
├── styles/             # 全局样式
├── stores/             # 状态管理 (Zustand)
├── router/             # 路由配置
└── App.tsx             # 主应用组件
```

## 数据存储

```
data/
└── characters/         # OC 角色 JSON 文件存储目录
```

## 路径别名

项目配置了 `@/` 路径别名，指向 `src/` 目录。

**使用示例：**
```typescript
// 不推荐
import { Button } from '../../components/Button'

// 推荐
import { Button } from '@/components/Button'
```
