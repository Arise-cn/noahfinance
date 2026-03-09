/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 设计 token 可在此扩展，与 Figma 变量对齐
      // colors: {},
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        interVar: ['InterVar', 'system-ui', 'sans-serif'],
        misans: ['MiSans', 'system-ui', 'sans-serif'],
      },
      // spacing: {},
    },
  },
  plugins: [],
}
