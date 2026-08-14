import type { Metadata } from "next";

import { HomePageClient } from "@/components/marketing/home-page-client";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Start Your Business. Access Government Benefits.",
  description:
    "Register your business, unlock government schemes, stay compliant, and become funding-ready with expert guidance from Enigrow—all in one place.",
  path: "/",
  ogTitle: "Enigrow | Start Your Business. Access Government Benefits.",
});

export default function HomePage() {
  return <HomePageClient />;
}
