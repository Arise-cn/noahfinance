# 将 Noah Finance 部署到 GitHub Pages

GitHub Pages 只托管**静态文件**（HTML/CSS/JS），因此需要使用 Next.js 的**静态导出**（`output: 'export'`），不能像 `next start` 那样跑 Node 服务器。

本文说明：本地如何配置、两种常见仓库地址（用户站 vs 项目站）、以及用 GitHub Actions 自动构建发布。

---

## 1. 先决条件

- 仓库已推送到 GitHub。
- 本项目当前 **没有** Route Handlers（`app/**/route.ts`），适合静态导出；若以后增加需要服务器的 API，则无法继续用纯静态导出部署到 GitHub Pages。
- 使用 `next/image` 时，静态导出需关闭默认图片优化（见下文配置）。

---

## 2. `next.config.ts`（已在本仓库配置）

根目录 `next.config.ts` 已启用：

- `output: "export"`：静态导出到 `out/`
- `images.unoptimized: true`：`next/image` 与静态导出兼容
- 可选 **`BASE_PATH`**：部署在 **Project site**（`https://<用户>.github.io/<仓库名>/`）时，构建前设置环境变量 `BASE_PATH=/仓库名`（与仓库名一致、**区分大小写**，含前导 `/`）。**User/Organization site**（仓库名 `<用户名>.github.io`）不要设置 `BASE_PATH`。

本地模拟项目站示例：`BASE_PATH=/noahfinance npm run build`。

本地验证：

```bash
npm ci         # 或 npm install / yarn install
npm run build
```

构建成功后，静态文件在 **`out/`** 目录。可用任意静态服务器预览，例如：

```bash
npx serve out
```

---

## 3. 环境变量（EmailJS 等）

以 `NEXT_PUBLIC_` 开头的变量会在**构建时**写入前端包。部署到 GitHub Pages 时，应在 **GitHub Actions** 的仓库 **Secrets and variables → Actions** 中配置同名变量，并在工作流里导出后再执行 `npm run build`（见第 4 节）。

不要将 `.env.local` 提交到仓库；本地保留即可。

---

## 4. 用 GitHub Actions 自动部署（推荐）

在仓库中创建 `.github/workflows/deploy-github-pages.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main] # 若默认分支是 dev，可改成 dev 或同时写多个分支

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        env:
          # 仅 Project site 需要：在仓库 Variables 中设置 BASE_PATH=/仓库名
          BASE_PATH: ${{ vars.BASE_PATH }}
          NEXT_PUBLIC_EMAILJS_SERVICE_ID: ${{ secrets.NEXT_PUBLIC_EMAILJS_SERVICE_ID }}
          NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: ${{ secrets.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID }}
          NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: ${{ secrets.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }}
          NEXT_PUBLIC_EMAILJS_GET_IN_TOUCH_TEMPLATE_ID: ${{ secrets.NEXT_PUBLIC_EMAILJS_GET_IN_TOUCH_TEMPLATE_ID }}
          NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID: ${{ secrets.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID }}
        run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**仓库设置：**

1. **Settings → Pages → Build and deployment → Source**：选择 **GitHub Actions**（不要选 Branch 直接发 `out`，除非你改用别的方式）。
2. 在 **Secrets** 中添加上述 `NEXT_PUBLIC_*` 密钥，值与本地 `.env.local` 一致。
3. 首次使用 **GitHub Pages** 时，若提示需要为 `github-pages` environment 审批，在 Actions 运行记录里按提示授权一次即可。

推送 `main`（或你配置的分支）后，Actions 会构建并把 `out/` 部署到 Pages。

---

## 5. 手动部署（可选）

不通过 Actions 时，可在本机构建后把 `out/` 内容推到 `gh-pages` 分支，或使用 [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) 等 Action 只负责上传 `out/`。仍须在 GitHub **Settings → Pages** 里把源设为对应分支与目录（通常为根目录 `/`）。

---

## 6. 自定义域名（可选）

在仓库 **Settings → Pages → Custom domain** 填写域名，并按提示配置 DNS。Next 静态导出一般无需额外改 `next.config`；若使用 Project site 且曾设置 `basePath`，自定义域名若指向根路径，需重新评估是否去掉 `basePath`（以实际访问路径为准）。

---

## 7. 常见问题

| 现象 | 可能原因 |
|------|----------|
| 页面空白、资源 404 | Project site 未设置 `basePath` 与仓库名一致，或 `basePath` 写错。 |
| 构建报错与 Image 相关 | 未设置 `images.unoptimized: true`。 |
| 表单/邮件不工作 | 构建时未注入 `NEXT_PUBLIC_*` Secrets，或 Key 与 EmailJS 控制台不一致。 |
| 只更新了代码但线上没变 | 检查 Actions 是否成功；Pages 有时有几分钟缓存。 |

---

## 8. 与本仓库 `package.json` 的对应关系

- 构建命令：`npm run build`（若你固定使用 Yarn，可改为 `yarn build` 并相应调整 CI）。
- 产出目录：**`out/`**（启用 `output: 'export'` 后由 Next 生成）。

完成以上配置并推送后，即可在 GitHub 仓库的 **Settings → Pages** 中查看分配的站点 URL。
