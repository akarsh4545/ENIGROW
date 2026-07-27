import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Roles",
};

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Roles
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Role-based access controls and permissions.
        </p>
      </div>
      <div className="border-border/80 bg-card rounded-2xl border border-dashed p-8">
        <p className="text-muted-foreground text-sm">
          Module scaffolded for the next admin build phase.
        </p>
        <Link
          href="/admin/leads"
          className={cn(buttonVariants({ variant: "outline" }), "mt-5")}
        >
          Go to CRM / Leads
        </Link>
      </div>
    </div>
  );
}
