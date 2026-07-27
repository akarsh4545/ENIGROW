import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Messages",
};

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Messages
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Advisor conversations and support threads will appear here.
        </p>
      </div>
      <div className="border-border/80 bg-card rounded-2xl border border-dashed p-8">
        <p className="text-muted-foreground text-sm">
          This module is scaffolded and ready for the next build phase.
        </p>
        <Link
          href="/contact"
          className={cn(buttonVariants({ variant: "outline" }), "mt-5")}
        >
          Contact support meanwhile
        </Link>
      </div>
    </div>
  );
}
