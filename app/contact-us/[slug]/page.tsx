import { notFound } from "next/navigation";
import CareerOpportunitySection from "../_components/CareerOpportunitySection";
import ContactUsSubPageShell from "../_components/ContactUsSubPageShell";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [{ slug: "career-opportunity" }];
}

export default async function ContactUsSubPage({ params }: PageProps) {
  const { slug } = await params;

  if (slug !== "career-opportunity") notFound();

  return (
    <ContactUsSubPageShell>
      <CareerOpportunitySection />
    </ContactUsSubPageShell>
  );
}
