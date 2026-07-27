"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { apiFetch } from "@/lib/api";
import { LEAD_STATUSES, type LeadStatus } from "@/constants/leads";

type LeadRow = {
  _id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  serviceInterest?: string | null;
  status: LeadStatus;
  createdAt: string;
};

export function LeadsTable({ leads }: { leads: LeadRow[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const onStatusChange = async (id: string, status: LeadStatus) => {
    setPendingId(id);
    try {
      await apiFetch(`/api/v1/admin/leads?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      toast.success("Lead status updated.");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to update lead.",
      );
    } finally {
      setPendingId(null);
    }
  };

  if (leads.length === 0) {
    return (
      <div className="border-border/80 bg-card text-muted-foreground rounded-2xl border border-dashed p-8 text-sm">
        No leads yet. Submissions from the contact form will appear here.
      </div>
    );
  }

  return (
    <div className="border-border/70 bg-card overflow-hidden rounded-2xl border">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-border/70 bg-muted/40 text-muted-foreground border-b text-xs tracking-wide uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Lead</th>
              <th className="px-4 py-3 font-medium">Interest</th>
              <th className="px-4 py-3 font-medium">Message</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Received</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="border-border/60 border-b align-top"
              >
                <td className="px-4 py-4">
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-muted-foreground text-xs">{lead.email}</p>
                  {lead.phone ? (
                    <p className="text-muted-foreground text-xs">
                      {lead.phone}
                    </p>
                  ) : null}
                </td>
                <td className="px-4 py-4">
                  <p>{lead.subject || "—"}</p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {lead.serviceInterest || "General"}
                  </p>
                </td>
                <td className="max-w-xs px-4 py-4">
                  <p className="text-muted-foreground line-clamp-3">
                    {lead.message}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-2">
                    <Badge variant="secondary">{lead.status}</Badge>
                    <select
                      className="border-input bg-background h-8 w-full rounded-md border px-2 text-xs"
                      value={lead.status}
                      disabled={pendingId === lead._id}
                      onChange={(event) =>
                        onStatusChange(
                          lead._id,
                          event.target.value as LeadStatus,
                        )
                      }
                    >
                      {LEAD_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="text-muted-foreground px-4 py-4 text-xs whitespace-nowrap">
                  {new Date(lead.createdAt).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
