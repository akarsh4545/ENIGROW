import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SchemeDetailPage } from "@/components/marketing/scheme-detail-page";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllSchemeSlugs, getSchemeDetail } from "@/data/schemes";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/structured-data";

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

  return buildPageMetadata({
    title: scheme.title,
    description: scheme.summary,
    path: `/schemes/${slug}`,
  });
}

export default async function SchemeSlugPage({ params }: Props) {
  const { slug } = await params;
  const scheme = getSchemeDetail(slug);
  if (!scheme) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Schemes", path: "/schemes" },
            { name: scheme.title, path: `/schemes/${slug}` },
          ]),
          ...(scheme.faqs.length ? [faqPageJsonLd(scheme.faqs)] : []),
        ]}
      />
      <SchemeDetailPage scheme={scheme} />
    </>
  );
}
