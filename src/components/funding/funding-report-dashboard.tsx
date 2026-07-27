"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CalendarDays, Download, Mail, Share2, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import type {
  EligibilityTier,
  FundingAssessmentInput,
  FundingReport,
} from "@/validations/funding-assessment";

const tierStyles: Record<
  EligibilityTier,
  { label: string; className: string; bar: string }
> = {
  eligible: {
    label: "Eligible",
    className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    bar: "#10b981",
  },
  likely: {
    label: "Likely Eligible",
    className: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    bar: "#eab308",
  },
  needs_improvement: {
    label: "Needs Improvement",
    className: "bg-orange-500/15 text-orange-700 dark:text-orange-300",
    bar: "#f97316",
  },
  not_eligible: {
    label: "Not Eligible Yet",
    className: "bg-red-500/15 text-red-700 dark:text-red-300",
    bar: "#ef4444",
  },
};

function ScoreRing({
  value,
  label,
  size = 140,
}: {
  value: number;
  label: string;
  size?: number;
}) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const color =
    value >= 75
      ? "#10b981"
      : value >= 55
        ? "#eab308"
        : value >= 40
          ? "#f97316"
          : "#ef4444";

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-muted/40"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex h-[140px] w-[140px] flex-col items-center justify-center">
        <p className="font-heading text-3xl font-semibold tracking-tight">
          {value}
        </p>
        <p className="text-muted-foreground text-[11px] tracking-[0.14em] uppercase">
          {label}
        </p>
      </div>
    </div>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  const color =
    value >= 75
      ? "bg-emerald-500"
      : value >= 55
        ? "bg-amber-500"
        : value >= 40
          ? "bg-orange-500"
          : "bg-red-500";
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="bg-muted h-2 overflow-hidden rounded-full">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

type Props = {
  input: FundingAssessmentInput;
  report: FundingReport;
  assessmentId?: string | null;
  onRestart: () => void;
};

export function FundingReportDashboard({ input, report, onRestart }: Props) {
  const confettiDone = useRef(false);
  const chartData = useMemo(
    () =>
      report.programs.slice(0, 6).map((p) => ({
        name: p.name.length > 14 ? `${p.name.slice(0, 14)}…` : p.name,
        score: p.approvalProbability,
        fill: tierStyles[p.tier].bar,
      })),
    [report.programs],
  );

  useEffect(() => {
    if (report.scores.overall < 85 || confettiDone.current) return;
    confettiDone.current = true;
    const colors = ["#0f766e", "#c9a227", "#10b981", "#eab308"];
    const root = document.createElement("div");
    root.className = "pointer-events-none fixed inset-0 z-[80] overflow-hidden";
    document.body.appendChild(root);
    for (let i = 0; i < 40; i++) {
      const el = document.createElement("span");
      el.style.cssText = `
        position:absolute;top:-10px;left:${Math.random() * 100}%;
        width:8px;height:12px;border-radius:2px;
        background:${colors[i % colors.length]};
        animation:enigrow-confetti ${1.8 + Math.random()}s ease-out forwards;
        transform:rotate(${Math.random() * 360}deg);
      `;
      root.appendChild(el);
    }
    const style = document.createElement("style");
    style.textContent = `@keyframes enigrow-confetti{to{transform:translateY(110vh) rotate(720deg);opacity:0}}`;
    document.head.appendChild(style);
    const t = window.setTimeout(() => {
      root.remove();
      style.remove();
    }, 2800);
    return () => {
      window.clearTimeout(t);
      root.remove();
      style.remove();
    };
  }, [report.scores.overall]);

  const downloadTxt = () => {
    const lines = [
      `Enigrow Funding Eligibility Report`,
      `Business: ${input.businessName}`,
      `Founder: ${input.founderName}`,
      `Generated: ${new Date(report.generatedAt).toLocaleString("en-IN")}`,
      ``,
      `Overall Score: ${report.scores.overall}/100`,
      `Readiness: ${report.scores.readiness}`,
      `Approval Probability: ${report.scores.approvalProbability}`,
      `Est. Max Funding: ${report.estimatedMaxFunding}`,
      `Best Category: ${report.bestCategory}`,
      ``,
      `Programs:`,
      ...report.programs.map(
        (p) =>
          `- ${p.name} [${tierStyles[p.tier].label}] ${p.approvalProbability}% · ${p.amountRange}`,
      ),
      ``,
      `Insights:`,
      ...report.insights.map((i) => `- ${i.text}`),
      ``,
      `Actions:`,
      ...report.actions.map((a) => `- [${a.priority}] ${a.title}: ${a.detail}`),
    ];
    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enigrow-funding-report-${input.businessName.replace(/\s+/g, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const emailReport = () => {
    const subject = encodeURIComponent(
      `My Enigrow funding eligibility report — ${input.businessName}`,
    );
    const body = encodeURIComponent(
      `Overall score: ${report.scores.overall}/100\nEstimated max funding: ${report.estimatedMaxFunding}\nBest category: ${report.bestCategory}\n\nPlease review my assessment and suggest next steps.`,
    );
    window.location.href = `mailto:${input.email}?subject=${subject}&body=${body}`;
  };

  const shareReport = async () => {
    const text = `My Enigrow funding eligibility score is ${report.scores.overall}/100 with estimated potential of ${report.estimatedMaxFunding}.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Enigrow Funding Report", text });
        return;
      } catch {
        /* fall through */
      }
    }
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-primary inline-flex items-center gap-2 text-sm font-medium tracking-[0.16em] uppercase">
            <Sparkles className="size-4" /> Personalized AI Report
          </p>
          <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {input.businessName}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Prepared for {input.founderName} · {input.city}, {input.state}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={downloadTxt}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <Download className="mr-1.5 size-4" /> Download
          </button>
          <button
            type="button"
            onClick={emailReport}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <Mail className="mr-1.5 size-4" /> Email
          </button>
          <button
            type="button"
            onClick={shareReport}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <Share2 className="mr-1.5 size-4" /> Share
          </button>
          <Link
            href={`${ROUTES.contact}?service=Funding%20/%20loans`}
            className={cn(buttonVariants({ size: "sm" }))}
          >
            <CalendarDays className="mr-1.5 size-4" /> Book consultation
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="border-border/70 bg-card/80 relative col-span-1 flex items-center justify-center rounded-2xl border p-6 sm:col-span-2 xl:col-span-1">
          <div className="relative">
            <ScoreRing value={report.scores.overall} label="Overall" />
          </div>
        </div>
        {[
          { label: "Funding readiness", value: report.scores.readiness },
          {
            label: "Approval probability",
            value: report.scores.approvalProbability,
          },
          { label: "Business strength", value: report.scores.businessStrength },
          { label: "Documentation", value: report.scores.documentation },
          { label: "Financial health", value: report.scores.financialHealth },
          { label: "Growth potential", value: report.scores.growthPotential },
        ].map((item) => (
          <div
            key={item.label}
            className="border-border/70 bg-card/80 rounded-2xl border p-5"
          >
            <Meter label={item.label} value={item.value} />
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="border-border/70 bg-primary text-primary-foreground rounded-2xl p-6 md:col-span-1">
          <p className="text-primary-foreground/75 text-xs tracking-[0.16em] uppercase">
            Estimated max funding
          </p>
          <p className="font-heading mt-3 text-4xl font-semibold tracking-tight">
            {report.estimatedMaxFunding}
          </p>
          <p className="text-primary-foreground/80 mt-3 text-sm">
            Best category: {report.bestCategory}
          </p>
        </div>
        <div className="border-border/70 bg-card/80 rounded-2xl border p-5 md:col-span-2">
          <p className="font-heading text-lg font-semibold tracking-tight">
            Scheme match overview
          </p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="font-heading text-2xl font-semibold tracking-tight">
          Eligible programs
        </h3>
        <div className="grid gap-4">
          {report.programs.map((program) => (
            <article
              key={program.id}
              className="border-border/70 bg-card/80 rounded-2xl border p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-heading text-xl font-semibold tracking-tight">
                      {program.name}
                    </h4>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        tierStyles[program.tier].className,
                      )}
                    >
                      {tierStyles[program.tier].label}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {program.category} · {program.amountRange} · Timeline{" "}
                    {program.timeline}
                  </p>
                </div>
                <p className="font-heading text-2xl font-semibold tracking-tight">
                  {program.approvalProbability}%
                  <span className="text-muted-foreground ml-1 text-xs font-normal tracking-normal">
                    match
                  </span>
                </p>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
                    Why it matches
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {program.whyMatches.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
                    Conditions
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {program.conditions.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
                    Documents
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {program.documents.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
                    Next steps
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {program.nextSteps.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                  <Link
                    href={program.href}
                    className="text-primary mt-3 inline-block text-sm font-medium hover:underline"
                  >
                    View scheme details →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="border-border/70 bg-card/80 rounded-2xl border p-5 sm:p-6">
          <h3 className="font-heading text-xl font-semibold tracking-tight">
            AI business insights
          </h3>
          <ul className="mt-4 space-y-3">
            {report.insights.map((insight) => (
              <li
                key={insight.id}
                className="border-primary/30 border-l-2 pl-3 text-sm leading-relaxed"
              >
                {insight.text}
              </li>
            ))}
          </ul>
        </section>
        <section className="border-border/70 bg-card/80 rounded-2xl border p-5 sm:p-6">
          <h3 className="font-heading text-xl font-semibold tracking-tight">
            Prioritized action plan
          </h3>
          <ul className="mt-4 space-y-3">
            {report.actions.map((action) => (
              <li key={action.id} className="flex gap-3">
                <span
                  className={cn(
                    "mt-0.5 h-fit rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
                    action.priority === "high"
                      ? "bg-red-500/15 text-red-700 dark:text-red-300"
                      : action.priority === "medium"
                        ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {action.priority}
                </span>
                <div>
                  <p className="font-medium">{action.title}</p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    {action.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="border-border/70 bg-secondary/40 flex flex-col gap-4 rounded-[1.5rem] border p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-xl font-semibold tracking-tight">
            Ready to act on this report?
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            Book a free funding consultation or restart the assessment anytime.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`${ROUTES.contact}?service=Funding%20/%20loans`}
            className={cn(buttonVariants())}
          >
            Speak to an expert
          </Link>
          <button
            type="button"
            onClick={onRestart}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Run again
          </button>
        </div>
      </div>
    </div>
  );
}
