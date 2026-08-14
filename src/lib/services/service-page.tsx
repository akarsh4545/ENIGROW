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

  const titleBySlug: Record<string, string> = {
    funding: "Business Funding | Funding Readiness & Advisory",
    loans: "Loan Services | Documentation & Application Support",
    "company-registration": "Company Registration | Business Incorporation",
    "gst-registration": "GST Registration & Compliance",
    "msme-registration": "MSME Registration | Scheme Eligibility Pathways",
    trademark: "Trademark Registration",
    "iso-certification": "ISO Certification Readiness",
    "import-export-code": "Import Export Code (IEC)",
    fssai: "FSSAI Food Business Licensing",
    accounting: "Accounting & Bookkeeping Support",
    taxation: "Taxation Planning & Filing Support",
    "startup-support": "Startup Support | Recognition & Scheme Fit",
    "digital-marketing": "Digital Marketing for Business Growth",
    "website-development": "Website Development for Business Enquiries",
  };

  return buildPageMetadata({
    title: titleBySlug[slug] ?? service.title,
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
