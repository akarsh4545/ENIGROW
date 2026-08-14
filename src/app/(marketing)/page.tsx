import type { Metadata } from "next";

import { HomePageClient } from "@/components/marketing/home-page-client";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Build. Fund. Grow.",
  description:
    "From business registration and government schemes to funding and compliance, Enigrow helps Indian businesses navigate the process and unlock the opportunities behind it.",
  path: "/",
  ogTitle: "Enigrow | Build. Fund. Grow.",
});

export default function HomePage() {
  return <HomePageClient />;
}
