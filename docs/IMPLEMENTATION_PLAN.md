# CharaVerse 项目分阶段实施计划

## 📌 总体原则

- **从小到大、从易到难**：先基础后复杂，先核心后扩展
- **每阶段独立可运行**：每个阶段完成后都能在 WebStorm 中调试运行
- **确认后再继续**：完成一个阶段，验证无 bug 后再进行下一阶段
- **Git 版本控制**：每个阶段完成后 commit，方便回滚

---

## 🎯 项目总体目标

构建一个基于 React + TypeScript 的 OC（原创角色）管理系统与名片展示前端应用，支持：
- 完整的 OC 数据模型（外观、性格、背景、技能、关系等）
- 美观的名片展示界面
- 数据的增删改查和导入导出功能

---

## 📋 阶段划分概览

| 阶段 | 名称 | 核心内容 | 预计复杂度 |
|------|------|---------|-----------|
| 阶段 0 | 项目环境配置 | 依赖安装、配置优化 | ⭐ |
| 阶段 1 | TypeScript 类型系统 | 完整的数据模型定义 | ⭐⭐ |
| 阶段 2 | 基础 UI 组件库 | 按钮、卡片、输入框等基础组件 | ⭐⭐ |
| 阶段 3 | 数据服务层 | JSON 数据加载、保存、验证 | ⭐⭐ |
| 阶段 4 | OC 列表页面 | 卡片预览、搜索、筛选 | ⭐⭐⭐ |
| 阶段 5 | OC 详情页面 | 完整信息展示（多面板） | ⭐⭐⭐⭐ |
| 阶段 6 | 数据编辑功能 | 表单、验证、保存 | ⭐⭐⭐⭐ |
| 阶段 7 | 导入导出功能 | JSON 导入导出、验证 | ⭐⭐⭐ |
| 阶段 8 | UI 优化与响应式 | 主题、动画、移动端适配 | ⭐⭐⭐ |
| 阶段 9 | 测试与性能优化 | 单元测试、性能优化 | ⭐⭐⭐ |

---

## 详细阶段规划

### ✅ 阶段 0：项目环境配置与初始化

**目标**：确保开发环境正确配置，项目能够正常启动和调试

**任务清单**：
1. 安装额外的必要依赖
   - 状态管理：`zustand`
   - 路由：`react-router-dom`
   - 工具库：`lodash-es`、`date-fns`、`uuid`
   - 验证库：`zod`
   - 图标：`lucide-react`
2. 配置 TypeScript 路径别名（`@/` -> `src/`）
3. 创建项目目录结构
4. 配置 Vite 开发服务器
5. 测试项目能够正常启动（`npm run dev`）

**验收标准**：
- ✅ 运行 `npm run dev` 能够正常启动开发服务器
- ✅ 浏览器能够访问 `http://localhost:5173` 并看到初始页面
- ✅ WebStorm 中 TypeScript 没有路径解析错误
- ✅ 项目目录结构清晰合理

**输出文件**：
- `package.json`（更新依赖）
- `vite.config.ts`（配置路径别名）
- `tsconfig.json`（配置路径映射）
- 创建基础目录结构

---

### ✅ 阶段 1：TypeScript 类型系统建设

**目标**：定义完整的 OC 数据模型类型系统，为后续开发提供类型安全保障

**任务清单**：
1. 创建基础类型和枚举（`src/types/enums.ts`）
   - 性别、体型、发型、发色、眼睛颜色等枚举
   - 关系类型、技能等级等分类
2. 定义数据模型接口（`src/types/character.ts`）
   - `BasicProfile`：基础信息
   - `Appearance`：外观信息
   - `Personality`：性格心理
   - `Background`：背景故事
   - `Skills`：技能能力
   - `Relationships`：关系网络
   - `Wardrobe`：服装配饰
   - `MediaAssets`：媒体资源
   - `Metadata`：元数据
   - `Character`：完整角色接口（组合以上所有接口）
3. 创建 Zod Schema 用于运行时验证（`src/schemas/character.schema.ts`）
4. 编写类型工具函数（`src/types/utils.ts`）
   - 类型守卫（Type Guards）
   - 类型转换函数
5. 创建示例数据（`data/characters/example.json`）

**验收标准**：
- ✅ 所有类型定义无 TypeScript 错误
- ✅ Zod Schema 能够正确验证示例数据
- ✅ 类型系统覆盖 PROJECT.md 中描述的所有字段
- ✅ 示例数据完整且通过验证

**输出文件**：
- `src/types/enums.ts`
- `src/types/character.ts`
- `src/types/utils.ts`
- `src/schemas/character.schema.ts`
- `data/characters/example.json`

---

### ✅ 阶段 2：基础 UI 组件库

**目标**：构建可复用的基础 UI 组件，为后续页面开发打下基础

**任务清单**：
1. 创建设计系统基础（`src/styles/design-system.css`）
   - CSS 变量定义（颜色、间距、字体、圆角等）
   - Light/Dark 主题变量
2. 开发基础组件（使用 CSS Modules）：
   - `Button` - 按钮组件（多种变体：primary、secondary、ghost）
   - `Card` - 卡片容器
   - `Input` - 输入框
   - `Tag` - 标签组件（用于性格特质等）
   - `Avatar` - 头像组件
   - `Modal` - 模态对话框
   - `Tabs` - 选项卡组件
   - `Loading` - 加载状态组件
3. 创建组件测试页面（`src/pages/ComponentDemo.tsx`）
4. 配置全局样式（`src/index.css`）

**验收标准**：
- ✅ 所有组件在 ComponentDemo 页面中正确渲染
- ✅ 组件支持必要的 props 和事件
- ✅ 组件具有良好的视觉效果和交互反馈
- ✅ 支持 Light/Dark 主题切换
- ✅ TypeScript 类型定义完整

**输出文件**：
- `src/styles/design-system.css`
- `src/components/Button/`（组件文件夹，包含 tsx、css、types）
- `src/components/Card/`
- `src/components/Input/`
- `src/components/Tag/`
- `src/components/Avatar/`
- `src/components/Modal/`
- `src/components/Tabs/`
- `src/components/Loading/`
- `src/pages/ComponentDemo.tsx`

---

### ✅ 阶段 3：数据服务层

**目标**：实现数据加载、保存、验证等核心功能，为数据展示和编辑提供支持

**任务清单**：
1. 创建数据服务类（`src/services/characterService.ts`）
   - `loadCharacters()`：从本地加载所有角色数据
   - `loadCharacter(id)`：加载单个角色
   - `saveCharacter(character)`：保存角色数据
   - `deleteCharacter(id)`：删除角色
   - `validateCharacter(character)`：验证角色数据
2. 实现 LocalStorage 适配器（`src/services/storage/localStorageAdapter.ts`）
3. 实现 JSON 文件适配器（`src/services/storage/jsonFileAdapter.ts`，用于开发环境）
4. 创建状态管理 Store（`src/stores/characterStore.ts`）
   - 使用 Zustand
   - 管理角色列表、当前选中角色、加载状态等
5. 创建 Mock 数据（3-5 个示例角色）（`data/characters/`）
6. 编写数据服务测试页面（`src/pages/DataServiceDemo.tsx`）

**验收标准**：
- ✅ 能够成功加载 Mock 数据并在页面中显示
- ✅ 数据验证功能正常工作（能识别无效数据）
- ✅ Store 状态管理正常（可以读取和更新状态）
- ✅ LocalStorage 读写功能正常
- ✅ 没有数据加载错误或类型错误

**输出文件**：
- `src/services/characterService.ts`
- `src/services/storage/localStorageAdapter.ts`
- `src/services/storage/jsonFileAdapter.ts`
- `src/stores/characterStore.ts`
- `data/characters/char-001.json`（示例角色 1）
- `data/characters/char-002.json`（示例角色 2）
- `data/characters/char-003.json`（示例角色 3）
- `src/pages/DataServiceDemo.tsx`

---

### ✅ 阶段 4：OC 列表页面

**目标**：实现角色列表展示、搜索、筛选功能

**任务清单**：
1. 创建 OCCardPreview 组件（`src/components/OCCardPreview/`）
   - 显示头像、名字、昵称、性格标签
   - 支持点击事件
   - Hover 效果
2. 创建 SearchBar 组件（`src/components/SearchBar/`）
   - 实时搜索（debounce 300ms）
   - 支持按名字、昵称搜索
3. 创建 FilterPanel 组件（`src/components/FilterPanel/`）
   - 按标签筛选
   - 按创建日期筛选
   - 筛选条件展示和清除
4. 创建 OCGrid 组件（`src/components/OCGrid/`）
   - 响应式网格布局
   - 空状态展示
5. 创建 OCListPage 页面（`src/pages/OCListPage.tsx`）
   - 整合以上所有组件
   - 连接 Store 获取数据
6. 配置路由（`src/router/index.tsx`）
   - 设置首页为列表页

**验收标准**：
- ✅ 列表页正确显示所有角色卡片
- ✅ 搜索功能正常（能按名字筛选）
- ✅ 筛选功能正常（能按标签筛选）
- ✅ 响应式布局正常（桌面 3-4 列，平板 2 列，手机 1 列）
- ✅ 点击卡片能够导航到详情页（此阶段暂时跳转到占位页面）
- ✅ 加载状态和空状态显示正常

**输出文件**：
- `src/components/OCCardPreview/`
- `src/components/SearchBar/`
- `src/components/FilterPanel/`
- `src/components/OCGrid/`
- `src/pages/OCListPage.tsx`
- `src/router/index.tsx`
- `src/App.tsx`（更新为使用路由）

---

### ✅ 阶段 5：OC 详情页面

**目标**：实现完整的角色详情展示，包括所有信息面板

**任务清单**：
1. 创建详情页布局组件（`src/components/OCDetail/OCDetailLayout.tsx`）
   - Header 区域（面包屑、操作按钮）
   - Tab 导航
   - 内容区域
2. 创建各个信息面板组件：
   - `BasicInfoPanel`：基础信息面板
   - `AppearancePanel`：外观信息面板（图片 + 详细描述）
   - `PersonalityPanel`：性格信息面板（MBTI、特质、口头禅等）
   - `BackgroundPanel`：背景故事面板（时间轴或分段展示）
   - `SkillsPanel`：技能面板（技能列表 + 等级展示）
   - `RelationshipsPanel`：关系面板（关系列表 + 可视化）
   - `WardrobePanel`：服装面板（多套服装展示）
   - `GalleryPanel`：媒体资源面板（图片网格）
3. 创建 OCDetailPage 页面（`src/pages/OCDetailPage.tsx`）
   - 整合所有面板
   - Tab 切换功能
   - 数据加载和错误处理
4. 更新路由配置（添加详情页路由）

**验收标准**：
- ✅ 详情页能够正确加载并显示角色完整信息
- ✅ 所有面板正确渲染（信息完整、格式正确）
- ✅ Tab 切换功能正常
- ✅ 从列表页点击卡片能够正确导航到详情页
- ✅ 面包屑导航和返回功能正常
- ✅ 加载状态和错误状态显示正常
- ✅ 图片加载和预览功能正常

**输出文件**：
- `src/components/OCDetail/OCDetailLayout.tsx`
- `src/components/OCDetail/BasicInfoPanel.tsx`
- `src/components/OCDetail/AppearancePanel.tsx`
- `src/components/OCDetail/PersonalityPanel.tsx`
- `src/components/OCDetail/BackgroundPanel.tsx`
- `src/components/OCDetail/SkillsPanel.tsx`
- `src/components/OCDetail/RelationshipsPanel.tsx`
- `src/components/OCDetail/WardrobePanel.tsx`
- `src/components/OCDetail/GalleryPanel.tsx`
- `src/pages/OCDetailPage.tsx`
- `src/router/index.tsx`（更新）

---

### ✅ 阶段 6：数据编辑功能

**目标**：实现角色数据的创建、编辑功能

**任务清单**：
1. 创建表单组件库（基于基础组件）：
   - `FormInput`：表单输入框（带验证提示）
   - `FormSelect`：下拉选择框
   - `FormTextarea`：多行文本框
   - `FormColorPicker`：颜色选择器
   - `FormImageUpload`：图片上传组件
2. 创建编辑器组件（分模块）：
   - `BasicInfoEditor`：基础信息编辑器
   - `AppearanceEditor`：外观编辑器
   - `PersonalityEditor`：性格编辑器
   - `BackgroundEditor`：背景编辑器
   - `SkillsEditor`：技能编辑器
   - `RelationshipsEditor`：关系编辑器
   - `WardrobeEditor`：服装编辑器
3. 创建编辑页面（`src/pages/OCEditPage.tsx`）
   - 使用 Tab 组织各个编辑器
   - 实现表单验证
   - 实现保存和取消功能
   - 实现草稿自动保存
4. 创建新建页面（`src/pages/OCCreatePage.tsx`）
   - 复用编辑器组件
   - 初始化空白数据模板
5. 更新 Store 添加编辑相关的 actions
6. 在列表页添加"新建角色"按钮
7. 在详情页添加"编辑"按钮

**验收标准**：
- ✅ 能够创建新角色并保存
- ✅ 能够编辑现有角色并保存修改
- ✅ 表单验证功能正常（必填字段、格式验证）
- ✅ 保存后数据持久化（刷新页面后仍存在）
- ✅ 取消编辑时提示未保存的更改
- ✅ 草稿自动保存功能正常
- ✅ 图片上传和预览功能正常
- ✅ 编辑体验流畅（无明显卡顿）

**输出文件**：
- `src/components/Form/FormInput.tsx`
- `src/components/Form/FormSelect.tsx`
- `src/components/Form/FormTextarea.tsx`
- `src/components/Form/FormColorPicker.tsx`
- `src/components/Form/FormImageUpload.tsx`
- `src/components/OCEdit/BasicInfoEditor.tsx`
- `src/components/OCEdit/AppearanceEditor.tsx`
- `src/components/OCEdit/PersonalityEditor.tsx`
- `src/components/OCEdit/BackgroundEditor.tsx`
- `src/components/OCEdit/SkillsEditor.tsx`
- `src/components/OCEdit/RelationshipsEditor.tsx`
- `src/components/OCEdit/WardrobeEditor.tsx`
- `src/pages/OCEditPage.tsx`
- `src/pages/OCCreatePage.tsx`
- `src/stores/characterStore.ts`（更新）

---

### ✅ 阶段 7：导入导出功能

**目标**：实现角色数据的导入和导出功能

**任务清单**：
1. 创建导出功能（`src/utils/export.ts`）
   - 导出单个角色为 JSON
   - 导出所有角色为 JSON 数组
   - 导出为 ZIP 包（多个 JSON 文件）
2. 创建导入功能（`src/utils/import.ts`）
   - 解析 JSON 文件
   - 批量导入验证
   - 重复处理（提示覆盖或重命名）
3. 创建导入导出 UI 组件：
   - `ExportDialog`：导出对话框
   - `ImportDialog`：导入对话框（拖拽上传或选择文件）
4. 在列表页和详情页添加导入导出按钮
5. 实现数据验证和错误提示
6. 添加导入导出日志

**验收标准**：
- ✅ 能够成功导出单个角色为 JSON 文件
- ✅ 能够成功导出所有角色
- ✅ 能够成功导入 JSON 文件
- ✅ 导入时能够正确验证数据格式
- ✅ 重复角色处理逻辑正常
- ✅ 导入导出过程有清晰的进度和结果反馈
- ✅ 错误情况下有友好的错误提示

**输出文件**：
- `src/utils/export.ts`
- `src/utils/import.ts`
- `src/components/ImportExport/ExportDialog.tsx`
- `src/components/ImportExport/ImportDialog.tsx`
- `src/pages/OCListPage.tsx`（更新）
- `src/pages/OCDetailPage.tsx`（更新）

---

### ✅ 阶段 8：UI 优化与响应式设计

**目标**：优化用户界面，实现完整的响应式设计和主题系统

**任务清单**：
1. 实现主题切换功能（`src/hooks/useTheme.ts`）
   - 创建主题 Store
   - 实现 Light/Dark 切换
   - 主题持久化
2. 添加主题切换按钮（全局 Header）
3. 优化移动端体验：
   - 响应式导航栏（汉堡菜单）
   - 触摸友好的按钮大小
   - 优化表单输入体验
   - 侧边栏改为抽屉式
4. 添加过渡动画：
   - 页面切换动画
   - 组件进入/退出动画
   - 加载动画优化
5. 添加交互反馈：
   - 按钮点击反馈
   - 表单提交反馈
   - Toast 通知系统
6. 优化加载性能：
   - 图片懒加载
   - 虚拟滚动（长列表）
   - 代码分割（页面级）
7. 无障碍优化：
   - 键盘导航支持
   - ARIA 属性添加
   - 焦点管理

**验收标准**：
- ✅ Light/Dark 主题切换正常，样式无问题
- ✅ 移动端（手机、平板）显示和交互正常
- ✅ 动画流畅，无卡顿
- ✅ Toast 通知系统工作正常
- ✅ 图片懒加载正常
- ✅ 键盘导航可用（Tab、Enter、Esc 等）
- ✅ 在慢网络环境下体验良好

**输出文件**：
- `src/hooks/useTheme.ts`
- `src/stores/themeStore.ts`
- `src/components/Layout/Header.tsx`
- `src/components/Layout/MobileNav.tsx`
- `src/components/Toast/Toast.tsx`
- `src/components/Toast/ToastContainer.tsx`
- `src/utils/lazyLoad.ts`
- `src/styles/animations.css`
- 更新所有页面和组件以支持响应式和主题

---

### ✅ 阶段 9：测试与性能优化

**目标**：确保应用质量，优化性能

**任务清单**：
1. 配置测试环境（`vitest` + `@testing-library/react`）
2. 编写单元测试：
   - 工具函数测试
   - 数据验证测试
   - Store 测试
3. 编写组件测试：
   - 基础组件测试
   - 表单组件测试
   - 关键交互测试
4. 性能优化：
   - 使用 React DevTools Profiler 分析
   - 优化重渲染（useMemo、useCallback）
   - 优化大列表性能（虚拟化）
   - 代码分割和懒加载
5. 构建优化：
   - 配置生产环境构建
   - 资源压缩和优化
   - 分析打包体积
6. 编写用户文档（`USAGE.md`）
7. 编写开发文档（`DEVELOPMENT.md`）

**验收标准**：
- ✅ 关键功能有测试覆盖
- ✅ 所有测试通过
- ✅ 生产构建正常，没有警告
- ✅ 首屏加载时间 < 3s（正常网络）
- ✅ 操作响应流畅（无明显卡顿）
- ✅ 打包体积合理
- ✅ 文档完整清晰

**输出文件**：
- `vitest.config.ts`
- `src/**/*.test.ts(x)`（测试文件）
- `USAGE.md`
- `DEVELOPMENT.md`
- 更新 `package.json`（添加测试脚本）
- 性能优化相关代码更新

---

## 🎯 当前状态

**当前阶段**：阶段 0 准备开始

**下一步行动**：等待确认后开始阶段 0 的实施

---

## 📝 注意事项

1. **每个阶段独立完整**：完成后能够独立运行和调试
2. **渐进增强**：后续阶段建立在前一阶段的基础上
3. **类型安全**：始终保持 TypeScript 类型完整性
4. **代码质量**：遵循 ESLint 规则，保持代码整洁
5. **Git 提交**：每个阶段完成后建议创建 commit
6. **灵活调整**：如果发现某个阶段过于复杂，可以进一步拆分

---

## 🔄 变更记录

- 2025-12-15：创建初始实施计划
