"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ContactFabs } from "@/components/shared/contact-fabs";
import { SchemeChatbotFab } from "@/components/shared/scheme-chatbot-fab";

export function MarketingShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="flex min-h-dvh flex-col">
      {!isHome ? <SiteHeader /> : null}
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <SchemeChatbotFab />
      <ContactFabs />
    </div>
  );
}
