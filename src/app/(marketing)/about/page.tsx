import type { Metadata } from "next";

import { AboutPageContent } from "@/components/marketing/about-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn how ${siteConfig.name} helps businesses with registrations, schemes, funding, and compliance.`,
};

export default function AboutPage() {
  return <AboutPageContent />;
}
