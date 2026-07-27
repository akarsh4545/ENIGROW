import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { auth } from "@/auth";
import { LEADS_ACCESS_ROLES } from "@/config/admin-nav";
import { getAdminOverviewMetrics } from "@/services/admin";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminHomePage() {
  const session = await auth();
  const canSeeLeads =
    !!session?.user?.role &&
    (LEADS_ACCESS_ROLES as readonly string[]).includes(session.user.role);

  let metrics: Awaited<ReturnType<typeof getAdminOverviewMetrics>> | null =
    null;
  try {
    metrics = await getAdminOverviewMetrics();
  } catch {
    metrics = null;
  }

  const cards = [
    ...(canSeeLeads && metrics
      ? [
          { label: "Total leads", value: metrics.leadsTotal },
          { label: "New leads", value: metrics.leadsNew },
        ]
      : []),
    ...(metrics
      ? [
          { label: "Users", value: metrics.usersTotal },
          { label: "Applications", value: metrics.applicationsTotal },
          {
            label: "Requested appointments",
            value: metrics.appointmentsRequested,
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-primary text-sm font-medium tracking-[0.16em] uppercase">
          Admin overview
        </p>
        <h1 className="font-heading mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Operations console
        </h1>
        <p className="text-muted-foreground mt-2">
          Monitor applications and appointment demand
          {canSeeLeads ? ", plus CRM leads" : ""}.
        </p>
      </div>

      {cards.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {cards.map((item) => (
            <div
              key={item.label}
              className="border-border/70 bg-card rounded-2xl border p-5"
            >
              <p className="text-muted-foreground text-sm">{item.label}</p>
              <p className="font-heading mt-2 text-3xl font-semibold tracking-tight">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          Metrics unavailable right now. Check the database connection.
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        {canSeeLeads ? (
          <Link href="/admin/leads" className={cn(buttonVariants())}>
            Open CRM / Leads
          </Link>
        ) : null}
        <Link
          href="/admin/applications"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Review applications
        </Link>
      </div>
    </div>
  );
}
