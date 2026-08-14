import type { ReactNode } from "react";

import { MarketingShell } from "@/components/layout/marketing-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd } from "@/lib/structured-data";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <MarketingShell>{children}</MarketingShell>
    </>
  );
}
