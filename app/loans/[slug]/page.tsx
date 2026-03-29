import { getLoanBySlug, LOAN_SLUGS } from "@/constants/loans";
import { notFound } from "next/navigation";
import LoansSubPageShell from "../_components/LoansSubPageShell";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return LOAN_SLUGS.map((slug) => ({ slug }));
}

export default async function LoanSubPage({ params }: PageProps) {
  const { slug } = await params;
  const loan = getLoanBySlug(slug);
  if (!loan) notFound();
  return <LoansSubPageShell loan={loan} />;
}
