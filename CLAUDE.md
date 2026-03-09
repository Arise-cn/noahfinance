# Noah Finance 设计系统与 Figma 集成规则

本文档供 AI 与开发者参考，用于将 Figma 设计通过 Model Context Protocol (MCP) 一致地落地到本仓库。

---

## 1. 设计 Token 定义

### 1.1 存放位置与格式

- **Tailwind 扩展**：`tailwind.config.js` 的 `theme.extend` 中定义颜色、字体、间距等。
- **CSS 变量**：`src/index.css` 的 `:root` 中定义全局变量，便于与 Figma 变量一一映射。
- **独立 Token 文件**：`src/styles/tokens.css` 用于集中存放与 Figma 同步的 token（可选导入到 `index.css`）。

### 1.2 与 Figma 变量同步

- 使用 Figma MCP 的 **get_variable_defs** 获取节点/文件的变量定义。
- URL 中的 `node-id=15-1247` 需转换为参数 `nodeId: "15:1247"`（冒号格式）。
- 将返回的变量映射到：
  - **颜色** → `tailwind.config.js` 的 `theme.extend.colors` 或 `:root { --color-* }`
  - **字体/字号** → `theme.extend.fontFamily`、`fontSize`
  - **间距** → `theme.extend.spacing`
- 本仓库未使用 token 转换管道；若引入请统一在构建前从 Figma 或 JSON 生成 `tokens.css`/tailwind 配置。

**示例（tailwind.config.js）：**

```js
theme: {
  extend: {
    colors: {
      primary: { DEFAULT: '#2563eb', hover: '#1d4ed8' },
      // 从 get_variable_defs 同步
    },
    spacing: {
      '18': '4.5rem',
      '22': '5.5rem',
    },
  },
},
```

---

## 2. 组件库

### 2.1 组件位置与架构

- **路径**：`src/components/`，按功能或类型分子目录（如 `src/components/ui/`、`src/components/layout/`）。
- **架构**：函数式 React 组件 + TypeScript；复杂交互用 Hooks 抽离。
- **文档**：暂无 Storybook；组件应导出清晰 Props 类型，重要组件可在 `README.md` 或单独 `.md` 中说明用法。

### 2.2 与 Figma 的对应关系

- 使用 **get_design_context** 获取某一节点（如首页 `15:1247`）的参考代码、截图与元数据。
- 将设计稿中的「组件」对应为 `src/components/` 下的 React 组件；命名与 Figma 组件名保持一致或采用 PascalCase 等价命名。
- 优先用 Tailwind 类名实现样式，必要时配合 `src/index.css` 或 `tokens.css` 中的变量。

---

## 3. 技术栈与构建

### 3.1 框架与库

| 类别     | 技术 |
|----------|------|
| 脚手架   | Vite |
| 语言     | React 18 + TypeScript |
| 样式     | Tailwind CSS 3 |
| 动画     | Framer Motion |
| 构建/打包 | Vite (Rollup) |

### 3.2 调用 Figma MCP 时的建议参数

- `clientLanguages`: `"typescript,css"`
- `clientFrameworks`: `"react"`
- `artifactType`: 整页用 `WEB_PAGE_OR_APP_SCREEN`，单组件用 `REUSABLE_COMPONENT` 或 `COMPONENT_WITHIN_A_WEB_PAGE_OR_APP_SCREEN`
- `taskType`: `CREATE_ARTIFACT` | `CHANGE_ARTIFACT` | `DELETE_ARTIFACT` 按任务选择

---

## 4. 资源管理

### 4.1 存放与引用

- **静态资源**：放在 `public/`，引用时使用根路径（如 `/favicon.svg`）。
- **需打包的图片/媒体**：放在 `src/assets/`，在代码中 `import`，由 Vite 处理哈希与优化。

### 4.2 优化与 CDN

- 当前未配置 CDN；若后续接入，可考虑将 `public/` 或构建产物部署到 CDN，并在 `vite.config.ts` 中设置 `base`。

---

## 5. 图标系统

### 5.1 存放与使用

- 图标可放在 `src/assets/icons/` 或 `public/icons/`。
- 使用方式：SVG 以 React 组件引入，或 `<img src="/icons/xxx.svg" />`。
- 命名：小写 + 连字符，如 `arrow-right.svg`、`icon-default-secondary.svg`（可与 Figma 命名对应）。

### 5.2 与 Figma 变量

- 若 Figma 中有 icon 颜色等变量，通过 **get_variable_defs** 拿到后写入 `tokens.css` 或 Tailwind theme，组件内用 `currentColor` 或 Tailwind 颜色类控制图标颜色。

---

## 6. 样式策略

### 6.1 方法论

- **Tailwind 优先**：布局、间距、颜色、字体等均用 Tailwind 工具类。
- **全局样式**：`src/index.css` 中 `@tailwind base/components/utilities`，以及 `:root` 下的 CSS 变量。
- **无 CSS Modules / Styled Components**；若单组件样式过多，可抽成 `ComponentName.module.css` 并由 Vite 处理，但需与团队约定。

### 6.2 响应式

- 使用 Tailwind 断点：`sm:`、`md:`、`lg:`、`xl:`、`2xl:`。
- 与 Figma 多端稿对齐时，先确定断点与设计稿宽度的对应关系，并在本规则或 `tailwind.config.js` 中注明。

### 6.3 动画（Framer Motion）

- 页面级入场：在根布局或页面组件上使用 `motion` 的 `initial` / `animate` / `transition`。
- 列表、卡片等：优先使用 `motion` 的 `layout`、`whileHover`、`whileTap`，避免与设计稿动效冲突。
- 简单过渡可用 Tailwind `transition-*`；复杂序列用 Framer Motion。

---

## 7. 项目结构

```
noahfinance/
├── public/                 # 静态资源，按路径引用
│   └── favicon.svg
├── src/
│   ├── assets/             # 需打包的图片/媒体
│   ├── components/         # 可复用 UI 与布局组件
│   │   └── ui/             # 基础 UI 组件（可选）
│   ├── styles/
│   │   └── tokens.css      # 设计 token（Figma 变量映射）
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css           # 全局与 Tailwind 入口
├── index.html
├── vite.config.ts          # 路径别名 @ -> src
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

### 7.1 路径别名

- `@/*` → `src/*`，在 `tsconfig.json` 与 `vite.config.ts` 中已配置，引用示例：`import Button from '@/components/ui/Button'`。

### 7.2 功能组织

- 按页面/功能可增加 `src/pages/`、`src/features/` 等；新功能优先放在对应目录下并复用 `components/` 与 `styles/tokens.css`。

---

## 8. Figma 首页与本项目对应

- **设计稿**：[Figma 首页](https://www.figma.com/design/qunfnbxyaNKXhQb2cSk6bT/draft?node-id=15-1247&t=pma58bKIuJwF64Ey-4)
- **节点 ID**：`15:1247`（URL 中 `node-id=15-1247` 转为 `15:1247`）。
- 使用 **get_design_context** 时传入 `nodeId: "15:1247"` 可获取该帧的参考代码与截图，用于实现或还原首页。
- 若无法访问（如无 Dev Mode 或权限），需在 Figma 中确认权限与 Dev Mode 已开启。

---

## 9. 落地清单（Figma → 代码）

1. 用 **get_variable_defs** 拉取当前节点/文件的变量 → 写入 `tokens.css` 或 `tailwind.config.js`。
2. 用 **get_design_context** 拉取目标节点 → 根据参考代码与截图在 `src/components/` 或 `src/pages/` 中实现组件/页面。
3. 样式以 Tailwind 类为主，颜色/间距等尽量使用已同步的 token 或 CSS 变量。
4. 交互动效用 Framer Motion 实现，与设计稿动效描述保持一致。
5. 资源从设计稿导出后放入 `public/` 或 `src/assets/`，并按上文规范引用。
