import type { Metadata } from "next";

import { HomePageClient } from "@/components/marketing/home-page-client";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Turn Your Business Ambition Into Funded Growth",
  description:
    "Register your business, unlock government schemes, stay compliant, and become funding-ready with expert guidance from Enigrow—all in one place.",
  path: "/",
  ogTitle: "Enigrow | Turn Your Business Ambition Into Funded Growth",
});

export default function HomePage() {
  return <HomePageClient />;
}
