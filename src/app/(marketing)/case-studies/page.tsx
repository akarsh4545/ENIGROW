import type { Metadata } from "next";

import { CaseStudiesIndexContent } from "@/components/marketing/case-studies-index";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Case Studies | Business Outcomes",
  description: `Case studies from ${siteConfig.name} engagements.`,
};

export default function CaseStudiesPage() {
  return <CaseStudiesIndexContent />;
}
