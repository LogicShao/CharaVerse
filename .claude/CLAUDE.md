# CharaVerse 项目开发指南

## 项目概述

CharaVerse 是一个基于 React + TypeScript 的 OC（原创角色）管理系统与名片展示前端应用。

**技术栈：**
- React 19 + TypeScript
- Vite（构建工具）
- Zustand（状态管理）
- React Router（路由）
- Zod（数据验证）

## 开发原则

### 1. 编码规范

**TypeScript：**
- 严格模式开启（strict: true）
- 使用接口定义所有数据结构
- 避免使用 `any` 类型
- 优先使用类型推断，必要时显式标注

**React：**
- 使用函数组件 + Hooks
- 组件单一职责，保持精简
- Props 使用接口定义
- 避免 inline styles，使用 CSS Modules

**命名规范：**
- 文件名：PascalCase（组件）、camelCase（工具函数）
- 组件：PascalCase
- 函数/变量：camelCase
- 常量：UPPER_SNAKE_CASE
- 类型/接口：PascalCase，接口以 `I` 开头或以组件名 + `Props` 结尾

### 2. 项目结构

```
src/
├── types/              # TypeScript 类型定义
├── models/             # 数据模型和 JSON Schema
├── components/         # React 组件（按模块组织）
├── pages/              # 页面组件
├── services/           # 数据服务层（API、存储）
├── hooks/              # 自定义 React Hooks
├── utils/              # 工具函数
├── styles/             # 全局样式
├── stores/             # Zustand 状态管理
└── router/             # 路由配置

data/
└── characters/         # OC 角色 JSON 文件
```

### 3. 路径别名

项目配置了 `@/` 路径别名，始终使用别名导入：

```typescript
// ✅ 推荐
import { Button } from '@/components/Button'

// ❌ 不推荐
import { Button } from '../../components/Button'
```

### 4. 组件开发规范

**组件文件组织：**
```
ComponentName/
├── ComponentName.tsx           # 主组件
├── ComponentName.module.css    # 样式
├── ComponentName.types.ts      # 类型定义
└── index.ts                    # 导出
```

**组件模板：**
```typescript
import { FC } from 'react'
import styles from './ComponentName.module.css'
import { ComponentNameProps } from './ComponentName.types'

export const ComponentName: FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  return (
    <div className={styles.container}>
      {/* Component content */}
    </div>
  )
}
```

### 5. 状态管理

使用 Zustand 进行状态管理：

```typescript
import { create } from 'zustand'

interface StoreState {
  data: DataType[]
  loading: boolean
  fetchData: () => Promise<void>
}

export const useStore = create<StoreState>((set) => ({
  data: [],
  loading: false,
  fetchData: async () => {
    set({ loading: true })
    // fetch logic
    set({ data: newData, loading: false })
  },
}))
```

### 6. 数据验证

使用 Zod 进行运行时数据验证：

```typescript
import { z } from 'zod'

export const CharacterSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  age: z.number().int().positive(),
  // ...
})

export type Character = z.infer<typeof CharacterSchema>
```

## 开发流程

### 分阶段开发

项目采用分阶段开发模式：

1. **每个阶段独立完整**：完成后能够独立运行和调试
2. **渐进增强**：后续阶段建立在前一阶段基础上
3. **验收确认**：每个阶段完成后需要验收确认才继续
4. **Git 提交**：每个阶段完成后建议创建 commit

### 开发步骤

**对于每个新功能/组件：**

1. **类型定义**：先定义 TypeScript 类型
2. **数据验证**：创建 Zod Schema
3. **组件开发**：实现组件逻辑和 UI
4. **样式实现**：编写 CSS Modules
5. **集成测试**：在页面中集成并测试

### 调试指南

**开发服务器：**
```bash
npm run dev
```

**类型检查：**
```bash
npm run build  # TypeScript 编译检查
```

**代码检查：**
```bash
npm run lint
```

## 数据模型

### OC 角色数据结构

OC 数据模型包含以下主要部分：

- **BasicProfile**：基础信息（ID、名字、昵称、创建日期等）
- **Appearance**：外观信息（身体、面部、发型、服装等）
- **Personality**：性格心理（MBTI、特质、恐惧、欲望等）
- **Background**：背景故事（出生地、家庭、经历等）
- **Skills**：技能能力（职业、技能列表、特殊能力等）
- **Relationships**：关系网络（与其他角色的关系）
- **MediaAssets**：媒体资源（头像、图片等）
- **Metadata**：元数据（创建者、版本、标签等）

详细的数据结构定义参见 `PROJECT.md` 第二章节。

## 注意事项

### 性能优化

- 使用 `useMemo` 缓存计算结果
- 使用 `useCallback` 缓存回调函数
- 图片使用懒加载
- 长列表使用虚拟滚动

### 可访问性

- 使用语义化 HTML 标签
- 添加适当的 ARIA 属性
- 支持键盘导航
- 确保足够的颜色对比度

### 响应式设计

断点定义：
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### 代码质量

- 遵循 ESLint 规则
- 保持函数精简（< 50 行）
- 组件保持单一职责
- 编写清晰的注释（中文）

## 常用命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint
```

## 文档参考

### 核心文档（AI 记忆优化）
**重要提示**：以下文档已通过 `.claude/` 目录的快捷方式优化访问，建议在需要时直接引用：

- **📋 实施计划**：`IMPLEMENTATION_PLAN.md` - 完整的分阶段实施计划（10个阶段）
  - **当前阶段**：阶段 1 - TypeScript 类型系统建设
  - **核心任务**：定义完整的数据模型类型系统和 Zod Schema
  - **详细计划**：参见 `.claude/IMPLEMENTATION_PLAN_SUMMARY.md`

- **✅ 已完成阶段**：`COMPLETED_STAGES.md` - 阶段完成记录
  - **已完成**：阶段 0 - 项目环境配置与初始化
  - **验收结果**：✅ 项目正常启动，✅ 路径别名配置正确，✅ 目录结构清晰
  - **详细记录**：参见 `.claude/COMPLETED_STAGES_SUMMARY.md`

- **📖 项目大纲**：`PROJECT.md` - 详细的项目需求和设计文档
  - **核心内容**：OC JSON 数据模板结构（11个部分）
  - **技术架构**：React + TypeScript + Zustand + Zod
  - **UI设计**：名片展示组件系统（8个主要面板）
  - **详细设计**：参见 `.claude/PROJECT_SUMMARY.md`

- **📁 目录说明**：`src/README.md` - 源代码目录结构说明

### 文档访问优化
为提升 AI 记忆效率，已在 `.claude/` 目录创建：
1. 关键文档的摘要版本（带核心信息提取）
2. 智能引用指南（何时读取哪个文档）
3. 阶段跟踪助手（自动更新当前状态）

## 当前开发状态

### 📊 阶段跟踪
**当前阶段**：阶段 1 - TypeScript 类型系统建设
**开始日期**：2025-12-15
**状态**：进行中

### 🎯 阶段 1 核心任务
1. **创建基础类型和枚举**（`src/types/enums.ts`）
2. **定义数据模型接口**（`src/types/character.ts`）
3. **创建 Zod Schema 验证**（`src/schemas/character.schema.ts`）
4. **编写类型工具函数**（`src/types/utils.ts`）
5. **创建示例数据**（`data/characters/example.json`）

### ✅ 验收标准
- ✅ 所有类型定义无 TypeScript 错误
- ✅ Zod Schema 能够正确验证示例数据
- ✅ 类型系统覆盖 PROJECT.md 中描述的所有字段
- ✅ 示例数据完整且通过验证

### 📁 预期输出文件
- `src/types/enums.ts`
- `src/types/character.ts`
- `src/types/utils.ts`
- `src/schemas/character.schema.ts`
- `data/characters/example.json`

### 🔄 文档同步
- 实施计划摘要：`.claude/IMPLEMENTATION_PLAN_SUMMARY.md`
- 项目设计摘要：`.claude/PROJECT_SUMMARY.md`
- 文档访问指南：`.claude/DOCUMENTATION_GUIDE.md`

---

**最后更新**：2025-12-15
