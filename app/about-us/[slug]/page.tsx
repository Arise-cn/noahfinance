import {
  ABOUT_SLUGS,
  getAboutSubRouteBySlug,
} from "@/constants/about-us";
import { notFound } from "next/navigation";
import AboutOverviewSection from "../_components/AboutOverviewSection";
import AboutSubPageShell from "../_components/AboutSubPageShell";
import AboutTeamSection from "../_components/AboutTeamSection";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ABOUT_SLUGS.map((slug) => ({ slug }));
}

export default async function AboutSubPage({ params }: PageProps) {
  const { slug } = await params;
  const route = getAboutSubRouteBySlug(slug);

  if (!route) notFound();

  return (
    <AboutSubPageShell>
      {route.slug === "our-team" ? (
        <AboutTeamSection />
      ) : (
        <AboutOverviewSection />
      )}
    </AboutSubPageShell>
  );
}
