export type LoanSubRoute = {
  slug: string;
  /** Header 底部菜单文案（Figma 全大写） */
  navLabel: string;
  /** 页面主标题 */
  heading: string;
  body: string;
};

export const LOAN_SUB_ROUTES: readonly LoanSubRoute[] = [
  {
    slug: "residential",
    navLabel: "RESIDENTIAL",
    heading: "RESIDENTIAL LOAN",
    body:
      "For buying new home, refinancing existing home loan or investing in any residential properties, Noah Finance designs the personalized loan package tailored to your needs with professional advice. Making it simple for you. Contact our specialists today.",
  },
  {
    slug: "commercial",
    navLabel: "COMMERCIAL",
    heading: "COMMERCIAL LOAN",
    body:
      "Whether you are acquiring owner-occupied premises, refinancing, or funding growth, we structure commercial lending with clarity and efficiency. We work across banks and specialist lenders to match your business goals and cash flow.",
  },
  {
    slug: "asset-finance",
    navLabel: "ASSET FINANCE",
    heading: "ASSET FINANCE",
    body:
      "From vehicles to equipment, we help you preserve cash flow with structured asset finance. Competitive options, transparent terms, and guidance through approval and settlement so you can focus on running your business.",
  },
] as const;

export const LOAN_SLUGS = LOAN_SUB_ROUTES.map((r) => r.slug);

export function getLoanBySlug(slug: string): LoanSubRoute | undefined {
  return LOAN_SUB_ROUTES.find((r) => r.slug === slug);
}
