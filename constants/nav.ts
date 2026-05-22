import { LOAN_SUB_ROUTES } from "@/constants/loans";

export const NAV_ITEMS = [
  {
    name: "Home",
    href: "/home",
  },
  ...LOAN_SUB_ROUTES.map((route) => ({
    name: route.navLabel,
    href: `/loans/${route.slug}`,
  })),
  {
    name: "Contact Us",
    href: "/contact-us",
  },
];
