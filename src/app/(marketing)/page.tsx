import type { Metadata } from "next";

import { HomePageClient } from "@/components/marketing/home-page-client";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo";
import { homeAdditionalJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "ENIGROW | Business Funding, Government Schemes & Business Advisory",
  absoluteTitle: true,
  description:
    "ENIGROW helps Indian businesses with business funding, government schemes, registrations, compliance, and funding readiness. Registered office: A-143, A Block, Sector 63, Noida, Uttar Pradesh 201309.",
  path: "/",
  ogTitle: "ENIGROW | Business Funding, Government Schemes & Business Advisory",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeAdditionalJsonLd()} />
      <HomePageClient />
    </>
  );
}
