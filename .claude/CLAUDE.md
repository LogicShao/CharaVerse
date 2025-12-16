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

**代码风格规范：**
- **严格专业**：禁止在注释、日志消息或 UI 字符串中使用表情符号（如 🚀、✨、📦）、颜文字或非 ASCII 装饰符号
- **纯文本**：仅使用标准标点符号
- **注释**：保持注释技术性、简洁，使用英文或中文（如要求），但避免情感符号
- **UI 文本**：所有用户界面文本使用简洁专业的语言，避免装饰性符号
- **日志消息**：错误、警告和信息消息使用清晰的技术描述，不使用表情符号

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

### 测试规范

**测试文件组织**：
- 所有测试代码放在 `/tests/` 目录下
- 按功能模块组织测试文件
- 测试文件命名：`模块名.test.ts` 或 `模块名.spec.ts`

**测试类型**：
- **单元测试**：测试工具函数、数据验证等独立功能
- **组件测试**：测试 React 组件的渲染和交互
- **集成测试**：测试多个模块的协作
- **E2E 测试**：测试完整的用户流程

**测试原则**：
- 测试代码也需要遵循代码规范
- 重要的工具函数必须有单元测试
- 核心业务逻辑必须有测试覆盖
- 保留有价值的测试代码作为参考

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

- **实施计划**：`docs/IMPLEMENTATION_PLAN.md` - 完整的分阶段实施计划（10个阶段）
  - **当前阶段**：阶段 2 - 基础 UI 组件库
  - **核心任务**：创建设计系统基础，开发可复用的 UI 组件库
  - **详细计划**：参见 `.claude/IMPLEMENTATION_PLAN_SUMMARY.md`

- **已完成阶段**：`docs/COMPLETED_STAGES.md` - 阶段完成记录
  - **已完成**：阶段 0 - 项目环境配置与初始化，阶段 1 - TypeScript 类型系统建设
  - **验收结果**：项目正常启动，路径别名配置正确，目录结构清晰，类型系统完整
  - **详细记录**：参见 `.claude/COMPLETED_STAGES_SUMMARY.md`

- **项目大纲**：`docs/PROJECT.md` - 详细的项目需求和设计文档
  - **核心内容**：OC JSON 数据模板结构（11个部分）
  - **技术架构**：React + TypeScript + Zustand + Zod
  - **UI设计**：名片展示组件系统（8个主要面板）
  - **详细设计**：参见 `.claude/PROJECT_SUMMARY.md`

- **目录说明**：`src/README.md` - 源代码目录结构说明

### 文档访问优化
为提升 AI 记忆效率，已在 `.claude/` 目录创建：
1. 关键文档的摘要版本（带核心信息提取）
2. 智能引用指南（何时读取哪个文档）
3. 阶段跟踪助手（自动更新当前状态）

## 当前开发状态

### 阶段跟踪
**当前阶段**：阶段 2 - 基础 UI 组件库 [已完成]
**完成日期**：2025-12-16
**下一阶段**：阶段 3 - 数据服务层

### 阶段 2 完成总结
**已完成所有核心任务**：
1. **设计系统基础**（`src/styles/variables.css`）- 完整的 CSS 变量系统
2. **Button 组件**（`src/components/Button/`）- 5 种变体，3 种尺寸，支持图标和加载状态
3. **Card 组件**（`src/components/Card/`）- 3 种变体，支持 Header/Body/Footer 子组件
4. **Input 组件**（`src/components/Input/`）- 3 种尺寸，支持验证状态和字符计数
5. **Tag 组件**（`src/components/Tag/`）- 6 种变体，支持边框模式和可关闭功能
6. **组件展示页面**（`src/pages/ComponentShowcase.tsx`）- 完整的组件演示和交互测试
7. **全局样式**（`src/styles/global.css`）- CSS Reset 和基础样式配置

### 验收结果
- 所有组件在 ComponentShowcase 页面中正确渲染（已验证）
- 组件支持必要的 props 和事件（已实现）
- TypeScript 类型定义完整，无类型错误（已通过类型检查）
- CSS Modules 正确应用，样式隔离良好（已验证）
- 设计系统变量完整且易于使用（已测试）
- 组件响应式布局正常（已测试）

### 输出文件清单
- `src/styles/variables.css` - 设计系统 CSS 变量
- `src/styles/global.css` - 全局样式
- `src/components/Button/` - Button 组件（.tsx, .module.css, .types.ts, index.ts）
- `src/components/Card/` - Card 组件（.tsx, .module.css, .types.ts, index.ts）
- `src/components/Input/` - Input 组件（.tsx, .module.css, .types.ts, index.ts）
- `src/components/Tag/` - Tag 组件（.tsx, .module.css, .types.ts, index.ts）
- `src/components/index.ts` - 组件统一导出
- `src/pages/ComponentShowcase.tsx` - 组件展示页面
- `src/pages/Home.tsx` - 更新首页链接
- `src/router/routes.tsx` - 路由配置

### 文档同步状态
- **实施计划**：`docs/IMPLEMENTATION_PLAN.md` - 阶段 2 已完成
- **完成记录**：`docs/COMPLETED_STAGES.md` - 已更新阶段 2 记录
- **项目设计**：`docs/PROJECT.md` - 组件系统已实现

### 下一阶段准备
**阶段 3：数据服务层**
- 创建数据服务类（characterService.ts）
- 实现 LocalStorage 和 JSON 文件适配器
- 创建 Zustand 状态管理 Store
- 创建 3-5 个 Mock 示例角色数据
- 编写数据服务测试页面

---

**最后更新**：2025-12-16
