import type { Metadata } from "next";

import { LegalPageContent } from "@/components/marketing/legal-page";
import { refundContent } from "@/data/legal";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Enigrow refund policy for advisory and service engagements.",
};

export default function RefundPolicyPage() {
  return <LegalPageContent page={refundContent} />;
}
