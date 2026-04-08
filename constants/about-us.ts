export type AboutSubRoute = {
  slug: string;
  navLabel: string;
};

export const ABOUT_SUB_ROUTES: readonly AboutSubRoute[] = [
  {
    slug: "our-team",
    navLabel: "OUR TEAM",
  },
  {
    slug: "about-us",
    navLabel: "ABOUT US",
  },
] as const;

export const ABOUT_SLUGS = ABOUT_SUB_ROUTES.map((r) => r.slug);

export function getAboutSubRouteBySlug(
  slug: string,
): AboutSubRoute | undefined {
  return ABOUT_SUB_ROUTES.find((r) => r.slug === slug);
}
