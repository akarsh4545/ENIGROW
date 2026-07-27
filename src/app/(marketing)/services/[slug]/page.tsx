import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetailPage } from "@/components/marketing/service-detail-page";
import { getAllServiceSlugs, getServiceDetail } from "@/data/service-details";
import { siteConfig } from "@/config/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: service.summary,
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.summary,
    },
  };
}

export default async function ServiceSlugPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
