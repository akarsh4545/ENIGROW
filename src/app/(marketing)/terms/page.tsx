import type { Metadata } from "next";

import { LegalPageContent } from "@/components/marketing/legal-page";
import { termsContent } from "@/data/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the Enigrow platform and services.",
};

export default function TermsPage() {
  return <LegalPageContent page={termsContent} />;
}
