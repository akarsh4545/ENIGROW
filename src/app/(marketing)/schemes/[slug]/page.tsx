import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SchemeDetailPage } from "@/components/marketing/scheme-detail-page";
import { getAllSchemeSlugs, getSchemeDetail } from "@/data/schemes";
import { siteConfig } from "@/config/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSchemeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const scheme = getSchemeDetail(slug);
  if (!scheme) return { title: "Scheme" };

  return {
    title: scheme.title,
    description: scheme.summary,
    openGraph: {
      title: `${scheme.title} | ${siteConfig.name}`,
      description: scheme.summary,
    },
  };
}

export default async function SchemeSlugPage({ params }: Props) {
  const { slug } = await params;
  const scheme = getSchemeDetail(slug);
  if (!scheme) notFound();
  return <SchemeDetailPage scheme={scheme} />;
}
