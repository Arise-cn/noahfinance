/**
 * 在 `.env.local` 中配置（需 `NEXT_PUBLIC_` 前缀以便浏览器端使用）：
 * NEXT_PUBLIC_EMAILJS_SERVICE_ID=
 * NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
 * NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
 */
export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
} as const;

export function isEmailJsConfigured(): boolean {
  return Boolean(
    EMAILJS_CONFIG.serviceId &&
      EMAILJS_CONFIG.templateId &&
      EMAILJS_CONFIG.publicKey,
  );
}
