import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyDetailContent } from "@/components/marketing/case-study-detail";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getAllCaseStudySlugs,
  getCaseStudy,
} from "@/data/careers-case-studies";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case Study" };

  return buildPageMetadata({
    title: study.title,
    description: study.summary,
    path: `/case-studies/${slug}`,
  });
}

export default async function CaseStudySlugPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: study.title, path: `/case-studies/${slug}` },
        ])}
      />
      <CaseStudyDetailContent study={study} />
    </>
  );
}
