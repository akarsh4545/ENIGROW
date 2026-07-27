import type { Metadata } from "next";

import { EligibilityPageContent } from "@/components/marketing/eligibility-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Business Eligibility Checker",
  description: `Check recommended registrations, schemes, and funding pathways with ${siteConfig.name}.`,
};

export default function EligibilityToolPage() {
  return <EligibilityPageContent />;
}
