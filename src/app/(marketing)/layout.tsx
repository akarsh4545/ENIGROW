import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactFabs } from "@/components/shared/contact-fabs";
import { SchemeChatbotFab } from "@/components/shared/scheme-chatbot-fab";
import { organizationJsonLd } from "@/lib/structured-data";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <JsonLd data={organizationJsonLd()} />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <SchemeChatbotFab />
      <ContactFabs />
    </div>
  );
}
