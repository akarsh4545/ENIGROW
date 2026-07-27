import type { Metadata } from "next";

import { LegalPageContent } from "@/components/marketing/legal-page";
import { privacyContent } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Enigrow collects, uses, and protects personal information.",
};

export default function PrivacyPolicyPage() {
  return <LegalPageContent page={privacyContent} />;
}
