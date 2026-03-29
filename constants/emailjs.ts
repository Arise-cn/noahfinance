/**
 * 在 `.env.local` 中配置（需 `NEXT_PUBLIC_` 前缀以便浏览器端使用）：
 * NEXT_PUBLIC_EMAILJS_SERVICE_ID=
 * NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=（联系页等默认模板）
 * NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
 * 可选：NEXT_PUBLIC_EMAILJS_GET_IN_TOUCH_TEMPLATE_ID（首页表单，默认 template_2h6taks）
 */
export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
} as const;

/**
 * 首页 Get in touch 专用模板 ID（与后台 `{{name}}`、`{{email}}` 等占位符配套）。
 * 可选覆盖：NEXT_PUBLIC_EMAILJS_GET_IN_TOUCH_TEMPLATE_ID
 */
export const EMAILJS_GET_IN_TOUCH_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_GET_IN_TOUCH_TEMPLATE_ID ??
  "template_2h6taks";

export function isEmailJsConfigured(): boolean {
  return Boolean(
    EMAILJS_CONFIG.serviceId &&
      EMAILJS_CONFIG.templateId &&
      EMAILJS_CONFIG.publicKey,
  );
}

/** 联系页表单：模板占位符 {{from_name}}、{{reply_to}}、{{message}} 等 */
export const CONTACT_FORM_EMAILJS_PARAMS = {
  fromName: "from_name",
  replyTo: "reply_to",
  phone: "phone",
  message: "message",
  wechat: "wechat",
  language: "language",
  service: "service",
  preferredDate: "preferred_date",
  preferredTime: "preferred_time",
  subject: "subject",
} as const;

/** 首页 Get in touch：与后台 HTML 中 {{name}}、{{email}}、{{preferred_date}} 等一致 */
export const GET_IN_TOUCH_EMAILJS_PARAMS = {
  name: "name",
  phone: "phone",
  email: "email",
  preferredDate: "preferred_date",
  preferredTime: "preferred_time",
  wechat: "wechat",
  language: "language",
  service: "service",
  subject: "subject",
} as const;
