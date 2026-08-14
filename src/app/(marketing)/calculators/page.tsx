import type { Metadata } from "next";

import { CalculatorsPageContent } from "@/components/marketing/calculators-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Calculators | EMI and GST Tools",
  description: `EMI and GST calculators from ${siteConfig.name}.`,
};

export default function CalculatorsPage() {
  return <CalculatorsPageContent />;
}
