import type { Metadata } from "next";

import { ServicesPageContent } from "@/components/marketing/services-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Explore ${siteConfig.name} services for registration, compliance, funding, and growth.`,
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
