export type ContactUsSubRoute = {
  slug: string;
  navLabel: string;
};

export const CONTACT_US_SUB_ROUTES: readonly ContactUsSubRoute[] = [
  {
    slug: "",
    navLabel: "CONTACT US",
  },
  {
    slug: "career-opportunity",
    navLabel: "CAREER OPPORTUNITY",
  },
] as const;
