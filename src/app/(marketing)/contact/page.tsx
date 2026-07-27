import type { Metadata } from "next";

import { ContactPageContent } from "@/components/marketing/contact-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} for business registrations, schemes, funding, and compliance support.`,
};

export default function ContactPage() {
  return <ContactPageContent />;
}
