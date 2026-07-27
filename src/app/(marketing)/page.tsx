import type { Metadata } from "next";

import { HomePageClient } from "@/components/marketing/home-page-client";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Check your business funding eligibility free",
  description:
    "Instantly discover which government grants, MSME loans, startup schemes, and business funding options your business may qualify for. Free, no paperwork.",
  openGraph: {
    title: `Funding Eligibility Checker | ${siteConfig.name}`,
    description: siteConfig.description,
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
