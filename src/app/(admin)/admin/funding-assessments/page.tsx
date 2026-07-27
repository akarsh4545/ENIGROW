import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  FundingAssessmentsTable,
  type AssessmentRow,
} from "@/components/admin/funding-assessments-table";
import { buttonVariants } from "@/components/ui/button-variants";
import { auth } from "@/auth";
import { LEADS_ACCESS_ROLES } from "@/config/admin-nav";
import { listFundingAssessments } from "@/services/funding-assessment";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { fundingLabels } from "@/components/funding/labels";
import type { FundingAssessmentInput } from "@/validations/funding-assessment";

export const metadata: Metadata = {
  title: "Funding Assessments",
};

export default async function AdminFundingAssessmentsPage() {
  const session = await auth();
  const role = session?.user?.role;
  if (!role || !(LEADS_ACCESS_ROLES as readonly string[]).includes(role)) {
    redirect(ROUTES.admin);
  }

  try {
    const docs = await listFundingAssessments();
    const rows: AssessmentRow[] = docs.map((doc) => {
      const input = doc.input as FundingAssessmentInput;
      const report = doc.report;
      return {
        _id: String(doc._id),
        businessName: input.businessName,
        founderName: input.founderName,
        email: input.email,
        phone: input.phone,
        fundingRequired:
          fundingLabels[input.fundingRequired] ?? input.fundingRequired,
        overallScore: report.scores.overall,
        bestCategory: report.bestCategory,
        estimatedMaxFunding: report.estimatedMaxFunding,
        topSchemes: report.programs
          .slice(0, 3)
          .map((p) => `${p.name} (${p.approvalProbability}%)`)
          .join("; "),
        status: doc.status,
        notes: doc.notes ?? null,
        createdAt: new Date(doc.createdAt).toISOString(),
      };
    });

    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Funding Assessments
          </h1>
          <p className="text-muted-foreground mt-2">
            Homepage eligibility checker submissions with scores, schemes, and
            lead status.
          </p>
        </div>
        <FundingAssessmentsTable rows={rows} />
      </div>
    );
  } catch {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Funding Assessments
          </h1>
          <p className="text-muted-foreground mt-2">
            Homepage eligibility checker submissions.
          </p>
        </div>
        <div className="border-border/70 bg-card rounded-2xl border p-6">
          <p className="font-heading text-xl font-semibold tracking-tight">
            Can’t load assessments
          </p>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            Database is unreachable. Fix MongoDB Atlas Network Access, then
            refresh.
          </p>
          <Link
            href="/admin/funding-assessments"
            className={cn(buttonVariants({ className: "mt-5" }))}
          >
            Try again
          </Link>
        </div>
      </div>
    );
  }
}
