/**
 * 在 `.env.local` 中配置（需 `NEXT_PUBLIC_` 前缀以便浏览器端使用）：
 * NEXT_PUBLIC_EMAILJS_SERVICE_ID=
 * NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
 * NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=（联系页 /contact-us，专用）
 * NEXT_PUBLIC_EMAILJS_GET_IN_TOUCH_TEMPLATE_ID=（首页 Get in touch，专用）
 * 兼容旧变量：若未设置 CONTACT，仍可读 NEXT_PUBLIC_EMAILJS_TEMPLATE_ID 作为联系页模板
 */
export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
} as const;

/** 联系页 `/contact-us` 专用模板 ID */
export const EMAILJS_CONTACT_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID ??
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ??
  "";

/** 首页 Get in touch 专用模板 ID（与联系页分开配置） */
export const EMAILJS_GET_IN_TOUCH_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_GET_IN_TOUCH_TEMPLATE_ID ?? "";

/** 联系页表单：与后台 `{{name}}`、`{{phone}}`、`{{email}}`、`{{message}}` 一致 */
export const CONTACT_FORM_EMAILJS_PARAMS = {
  name: "name",
  phone: "phone",
  email: "email",
  message: "message",
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
