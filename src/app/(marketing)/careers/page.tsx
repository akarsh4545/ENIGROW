import type { Metadata } from "next";

import { CareersPageContent } from "@/components/marketing/careers-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Careers",
  description: `Careers at ${siteConfig.name}.`,
};

export default function CareersPage() {
  return <CareersPageContent />;
}
