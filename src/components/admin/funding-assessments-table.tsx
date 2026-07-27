"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { AssessmentStatus } from "@/models/funding-assessment";

export type AssessmentRow = {
  _id: string;
  businessName: string;
  founderName: string;
  email: string;
  phone: string;
  fundingRequired: string;
  overallScore: number;
  bestCategory: string;
  estimatedMaxFunding: string;
  topSchemes: string;
  status: AssessmentStatus;
  notes: string | null;
  createdAt: string;
};

const STATUSES: AssessmentStatus[] = [
  "new",
  "contacted",
  "qualified",
  "closed",
];

export function FundingAssessmentsTable({
  rows: initial,
}: {
  rows: AssessmentRow[];
}) {
  const [rows, setRows] = useState(initial);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | AssessmentStatus>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (status !== "all" && row.status !== status) return false;
      if (!q) return true;
      return (
        row.businessName.toLowerCase().includes(q) ||
        row.founderName.toLowerCase().includes(q) ||
        row.email.toLowerCase().includes(q) ||
        row.phone.includes(q)
      );
    });
  }, [rows, query, status]);

  const updateStatus = async (id: string, next: AssessmentStatus) => {
    try {
      await apiFetch(`/api/v1/admin/funding-assessments?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: next }),
      });
      setRows((prev) =>
        prev.map((row) => (row._id === id ? { ...row, status: next } : row)),
      );
      toast.success("Status updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed");
    }
  };

  const exportCsv = () => {
    const header = [
      "Business",
      "Founder",
      "Email",
      "Phone",
      "Funding Required",
      "Score",
      "Category",
      "Est Max",
      "Top Schemes",
      "Status",
      "Date",
    ];
    const lines = filtered.map((row) =>
      [
        row.businessName,
        row.founderName,
        row.email,
        row.phone,
        row.fundingRequired,
        row.overallScore,
        row.bestCategory,
        row.estimatedMaxFunding,
        row.topSchemes,
        row.status,
        row.createdAt,
      ]
        .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
        .join(","),
    );
    const blob = new Blob([[header.join(","), ...lines].join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enigrow-funding-assessments-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search business, founder, email, phone…"
          className="border-input bg-background h-9 min-w-[16rem] flex-1 rounded-lg border px-3 text-sm"
        />
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "all" | AssessmentStatus)
          }
          className="border-input bg-background h-9 rounded-lg border px-3 text-sm"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <Button type="button" variant="outline" onClick={exportCsv}>
          Export CSV
        </Button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No funding assessments yet. Submissions from the homepage checker will
          appear here.
        </p>
      ) : (
        <div className="border-border/70 overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-muted/40 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Lead</th>
                <th className="px-4 py-3 font-medium">Scores</th>
                <th className="px-4 py-3 font-medium">Schemes</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={row._id}
                  className="border-border/60 border-t align-top"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium">{row.businessName}</p>
                    <p className="text-muted-foreground text-xs">
                      {row.founderName}
                    </p>
                    <p className="text-muted-foreground text-xs">{row.email}</p>
                    <p className="text-muted-foreground text-xs">{row.phone}</p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Ask: {row.fundingRequired}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-heading text-lg font-semibold">
                      {row.overallScore}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {row.bestCategory}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {row.estimatedMaxFunding}
                    </p>
                  </td>
                  <td className="text-muted-foreground px-4 py-3 text-xs">
                    {row.topSchemes}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={row.status}
                      onChange={(e) =>
                        void updateStatus(
                          row._id,
                          e.target.value as AssessmentStatus,
                        )
                      }
                      className={cn(
                        "border-input bg-background h-8 rounded-lg border px-2 text-xs",
                      )}
                    >
                      {STATUSES.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {row.notes ? (
                      <p className="text-muted-foreground mt-2 text-xs">
                        {row.notes}
                      </p>
                    ) : null}
                  </td>
                  <td className="text-muted-foreground px-4 py-3 text-xs whitespace-nowrap">
                    {new Date(row.createdAt).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
