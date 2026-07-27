import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyDetailContent } from "@/components/marketing/case-study-detail";
import {
  getAllCaseStudySlugs,
  getCaseStudy,
} from "@/data/careers-case-studies";
import { siteConfig } from "@/config/site";

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
  return {
    title: study.title,
    description: study.summary,
    openGraph: {
      title: `${study.title} | ${siteConfig.name}`,
      description: study.summary,
    },
  };
}

export default async function CaseStudySlugPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CaseStudyDetailContent study={study} />;
}
