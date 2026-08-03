import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetailPage } from "@/components/marketing/service-detail-page";
import { JsonLd } from "@/components/seo/json-ld";
import { getServiceDetail } from "@/data/service-details";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";

type CreateServicePageOptions = {
  slug: string;
};

export function createServiceMetadata(slug: string): Metadata {
  const service = getServiceDetail(slug);
  if (!service) {
    return { title: "Service" };
  }

  return buildPageMetadata({
    title: service.title,
    description: service.summary,
    path: `/${slug}`,
  });
}

export function ServiceRoutePage({ slug }: CreateServicePageOptions) {
  const service = getServiceDetail(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: service.title,
            description: service.summary,
            path: `/${slug}`,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/${slug}` },
          ]),
        ]}
      />
      <ServiceDetailPage service={service} />
    </>
  );
}
