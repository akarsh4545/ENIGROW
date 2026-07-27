import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LeadsTable } from "@/components/admin/leads-table";
import { buttonVariants } from "@/components/ui/button-variants";
import { auth } from "@/auth";
import { LEADS_ACCESS_ROLES } from "@/config/admin-nav";
import { listLeads } from "@/services/admin";
import type { LeadStatus } from "@/constants/leads";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "CRM / Leads",
};

export default async function AdminLeadsPage() {
  const session = await auth();
  const role = session?.user?.role;
  if (!role || !(LEADS_ACCESS_ROLES as readonly string[]).includes(role)) {
    redirect(ROUTES.admin);
  }

  try {
    const leads = await listLeads();

    const rows = leads.map((lead) => ({
      _id: String(lead._id),
      name: lead.name,
      email: lead.email,
      phone: lead.phone ?? null,
      subject: lead.subject ?? null,
      message: lead.message,
      serviceInterest: lead.serviceInterest ?? null,
      status: lead.status as LeadStatus,
      createdAt: new Date(lead.createdAt).toISOString(),
    }));

    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            CRM / Leads
          </h1>
          <p className="text-muted-foreground mt-2">
            Callback and contact form enquiries with status tracking for your
            team.
          </p>
        </div>
        <LeadsTable leads={rows} />
      </div>
    );
  } catch {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            CRM / Leads
          </h1>
          <p className="text-muted-foreground mt-2">
            Callback and contact form enquiries with status tracking for your
            team.
          </p>
        </div>
        <div className="border-border/70 bg-card rounded-2xl border p-6">
          <p className="font-heading text-xl font-semibold tracking-tight">
            Can’t load leads right now
          </p>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            The database is unreachable (often MongoDB Atlas IP whitelist). Fix
            Network Access in Atlas, restart the app, then refresh this page.
          </p>
          <Link
            href="/admin/leads"
            className={cn(buttonVariants({ className: "mt-5" }))}
          >
            Try again
          </Link>
        </div>
      </div>
    );
  }
}
