import type { Metadata } from "next";

import { ServicesPageContent } from "@/components/marketing/services-page";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Services",
  description: `Explore ${siteConfig.name} services for registration, compliance, funding, and growth.`,
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesPageContent />;
}
