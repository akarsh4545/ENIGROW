import type { Metadata } from "next";

import { SchemesPageContent } from "@/components/marketing/schemes-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Government Schemes",
  description: `Explore government scheme pathways with ${siteConfig.name} — MSME, startup, funding, manufacturing, and export support.`,
};

export default function SchemesPage() {
  return <SchemesPageContent />;
}
