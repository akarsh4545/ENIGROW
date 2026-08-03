import type { Metadata } from "next";

import { AboutPageContent } from "@/components/marketing/about-page";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description: `Learn how ${siteConfig.name} helps businesses with registrations, schemes, funding, and compliance.`,
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageContent />;
}
