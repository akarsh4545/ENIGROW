import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetailPage } from "@/components/marketing/service-detail-page";
import { getServiceDetail } from "@/data/service-details";
import { siteConfig } from "@/config/site";

type CreateServicePageOptions = {
  slug: string;
};

export function createServiceMetadata(slug: string): Metadata {
  const service = getServiceDetail(slug);
  if (!service) {
    return { title: "Service" };
  }

  return {
    title: service.title,
    description: service.summary,
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.summary,
    },
  };
}

export function ServiceRoutePage({ slug }: CreateServicePageOptions) {
  const service = getServiceDetail(slug);
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
