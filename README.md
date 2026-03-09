# Noah Finance

基于 Vite + React + TypeScript + Tailwind CSS + Framer Motion 的前端项目，并与 Figma 设计稿（MCP）集成。

## 技术栈

- **脚手架**: Vite 6
- **语言**: React 18、TypeScript
- **样式**: Tailwind CSS 3
- **动画**: Framer Motion

## 快速开始

```bash
# 安装依赖
npm install

# 开发
npm run dev

# 构建
npm run build

# 预览构建结果
npm preview
```

## 设计系统与 Figma

- 设计系统与 Figma MCP 集成说明见 **[CLAUDE.md](./CLAUDE.md)**。
- 首页 Figma 设计：[draft · node 15-1247](https://www.figma.com/design/qunfnbxyaNKXhQb2cSk6bT/draft?node-id=15-1247&t=pma58bKIuJwF64Ey-4)  
  节点 ID 为 `15:1247`，用于 `get_design_context` / `get_variable_defs`。

若 Figma MCP 无法访问设计稿，请确认：
- 当前 Figma 账号已开通 **Dev Mode**；
- 对文件具备相应查看/编辑权限；
- 链接与节点 ID 正确。

## 目录结构

```
src/
├── assets/         # 图片等需打包资源
├── components/     # 可复用组件
├── styles/
│   └── tokens.css # 设计 token（可对齐 Figma 变量）
├── App.tsx
├── main.tsx
└── index.css
```

路径别名：`@/*` → `src/*`。
