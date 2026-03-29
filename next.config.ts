import type { NextConfig } from "next";

/** GitHub Project Pages (`/repo/`)：构建前设置 `BASE_PATH=/仓库名`（含前导斜杠）。用户站省略即可。 */
const basePath = (process.env.BASE_PATH ?? "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath ? { basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
