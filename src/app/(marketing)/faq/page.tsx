import type { Metadata } from "next";

import { FaqPageContent } from "@/components/marketing/faq-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions about ${siteConfig.name} services, schemes, funding support, and process.`,
};

export default function FaqPage() {
  return <FaqPageContent />;
}
