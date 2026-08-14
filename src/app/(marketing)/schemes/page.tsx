import type { Metadata } from "next";

import { SchemesPageContent } from "@/components/marketing/schemes-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Government Schemes | PMEGP, CGTMSE, MUDRA",
  description:
    "Explore government scheme pathways with ENIGROW — including PMEGP, CGTMSE, MUDRA, Stand-Up India, and related MSME funding support across India.",
  path: "/schemes",
});

export default function SchemesPage() {
  return <SchemesPageContent />;
}
