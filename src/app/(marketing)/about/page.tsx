import type { Metadata } from "next";

import { AboutPageContent } from "@/components/marketing/about-page";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `About ${siteConfig.name} | Business Funding & Advisory`,
  absoluteTitle: true,
  description: `Learn who ${siteConfig.name} is, what ${siteConfig.legalName} does, and how we help Indian businesses with funding, government schemes, registrations, and compliance.`,
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageContent />;
}
