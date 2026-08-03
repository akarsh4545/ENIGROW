import type { Metadata } from "next";

import { ContactPageContent } from "@/components/marketing/contact-page";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description: `Contact ${siteConfig.name} for business registrations, schemes, funding, and compliance support.`,
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageContent />;
}
