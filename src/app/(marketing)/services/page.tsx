import type { Metadata } from "next";

import { ServicesPageContent } from "@/components/marketing/services-page";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Services | Registration, Compliance, Funding & Growth`,
  description: `Explore ${siteConfig.name} services for company registration, GST, MSME, trademark, government schemes, business funding, and compliance advisory.`,
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesPageContent />;
}
