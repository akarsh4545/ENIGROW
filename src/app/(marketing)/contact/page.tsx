import type { Metadata } from "next";

import { ContactPageContent } from "@/components/marketing/contact-page";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Contact ${siteConfig.name} | Talk to a Business Advisor`,
  absoluteTitle: true,
  description: `Contact ${siteConfig.name} (${siteConfig.legalName}) for business funding, government schemes, registrations, and compliance support. Registered office in Noida.`,
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageContent />;
}
