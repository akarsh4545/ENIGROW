import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SchemeChatbotFab } from "@/components/shared/scheme-chatbot-fab";
import { WhatsAppFab } from "@/components/shared/whatsapp-fab";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <SchemeChatbotFab />
      <WhatsAppFab />
    </div>
  );
}
