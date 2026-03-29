---
name: metal-gradient-chrome-frame
description: >-
  Implements Figma-style gold/metal UI chrome as a true gradient “ring” (not a flat border).
  Use when integrating Figma designs with luxury gold frames, metallic pill or rounded-rect
  outlines, header capsules, or 金属渐变描边 / 金色描边 that cannot be matched with
  border + single linear-gradient.
---

# 金属渐变描边（Chrome Frame）

## 何时用

- 设计稿是 **金色/黄铜金属感描边**、**左上–右下高光**、**绕边色带变化**（接近 Figma 里多层渐变 + conic）。
- **`border: 1px solid #e8d587` 还原不了** 或显得扁平、与电话胶囊 / Tab 外框不一致时。

## 不要用

- **单层 `border` + 单色/单条 `linear-gradient`** 冒充金属边（与设计偏差大）。
- **`outline` / `box-shadow` 单阴影** 模拟复杂金属环（难对齐 Figma）。

## 核心做法（与 Header 电话胶囊一致）

1. **外框（frame）**  
   - `padding: 1px`（描边厚度）。  
   - `border-radius` = 设计圆角（胶囊用 `9999px`，卡片用 `24px` 等）。  
   - **`background` 叠三层（自上而下绘制，先写的在上层）**：  
     - 椭圆 **`radial-gradient`** 在 **左上**（高光 `#fff2ba` → 透明）。  
     - 椭圆 **`radial-gradient`** 在 **右下**（`#e8d587` → 透明）。  
     - **`conic-gradient`** 铺满（深金棕环带，角度 `from 215deg at 50% 50%`）。  
   - 可加 `overflow: hidden` 便于内层圆角贴合。

2. **内层（inner）**  
   - `border-radius` = **外框圆角 − 1px**（例如外 `24px` → 内 `23px`）。  
   - **`background`**：深色线性渐变底（如 `162deg, #1e1c18 → #0a0a09 → #12110f`），与设计一致时可改 **半透明 + `backdrop-filter: blur(...)`** 做玻璃感。  
   - 内容、padding、毛玻璃都写在内层，不要写在外框的 `padding: 1px` 里塞内容（外框只负责“环”）。

3. **DOM 结构**

```tsx
<div className="my-chrome-frame">
  <div className="my-chrome-inner">{children}</div>
</div>
```

## 在 Tailwind / 全局 CSS 中的落位

- 将 frame + inner 的 **`background` 长声明放在 `app/globals.css` 的 `@layer components`**，避免在 JSX 里重复几十行渐变。  
- **命名**：`…-frame` / `…-inner` 成对出现；同一产品内 **强金属** 与 **弱金属** 可两套 class（参考本仓库 `header-phone-pill-*` 与 `header-nav-chrome-*`：弱版 radial 更淡、conic 色带略浅）。

## 弱一档金属（次要容器）

- 仍用 **1px padding + 双层 radial + conic**，但 **radial 透明度降低**、conic 色阶 **略灰**，避免抢主按钮/选中态。

## 从 Figma 对稿时的检查清单

- [ ] 圆角是 **全圆** 还是 **固定 px**？frame / inner 各写对半径。  
- [ ] 是否需要 **`backdrop-blur`**？需要则放在 **inner**，frame 仍只负责金属环。  
- [ ] 展开/布局动画（如 `motion` `layout`）包在 **frame 外层**，避免打断 `padding: 1px` 的环。

## 本仓库参考实现

- 强金属 + 圆角胶囊：`app/globals.css` → `.header-phone-pill-frame` / `.header-phone-pill-inner`。  
- 弱金属 Tab 外框：`.header-nav-chrome` / `.header-nav-chrome-inner`。  
- 圆角卡片 + 玻璃内底：`.home-service-expanded-frame` / `.home-service-expanded-inner`。  
- 使用处示例：`components/Header.tsx`（电话）、`app/home/_components/WhatWeDoSection.tsx`（首条展开卡）。

新增页面时：**复制 frame 三层渐变与 inner 渐变**，只改 **圆角与 inner 透明度/blur**，保持全站金属语言一致。
