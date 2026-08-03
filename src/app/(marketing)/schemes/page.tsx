import type { Metadata } from "next";

import { SchemesPageContent } from "@/components/marketing/schemes-page";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Government Schemes",
  description: `Explore government scheme pathways with ${siteConfig.name} — MSME, startup, funding, manufacturing, and export support.`,
  path: "/schemes",
});

export default function SchemesPage() {
  return <SchemesPageContent />;
}
