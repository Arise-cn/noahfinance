import type { Config } from "tailwindcss";

/**
 * Tailwind v4 不会自动读取本文件，需在 CSS 中写 `@config` 引入。
 * 实际字体文件在 `app/globals.css` 的 @font-face（对应 public/font）。
 */
const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        inter: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        misans: [
          "MiSans",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
};

export default config;
