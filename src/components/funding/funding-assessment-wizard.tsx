"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { toast } from "sonner";

import { FundingAnalysisLoader } from "@/components/funding/funding-analysis-loader";
import { FundingReportDashboard } from "@/components/funding/funding-report-dashboard";
import {
  STORAGE_KEY,
  employeeLabels,
  entityLabels,
  fundingLabels,
  industryLabels,
  purposeLabels,
  stageLabels,
  turnoverLabels,
  yearsLabels,
} from "@/components/funding/labels";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateFundingReport } from "@/lib/funding/engine";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  BUSINESS_ENTITY_TYPES,
  BUSINESS_STAGES_FUNDING,
  EMPLOYEE_BANDS,
  FUNDING_BANDS,
  FUNDING_PURPOSES,
  INDIAN_STATES,
  INDUSTRIES,
  TURNOVER_BANDS,
  YEARS_BANDS,
  fundingAssessmentSchema,
  type FundingAssessmentInput,
  type FundingReport,
} from "@/validations/funding-assessment";

type Phase = "form" | "analyzing" | "report";

const stepFields: (keyof FundingAssessmentInput)[][] = [
  [
    "businessName",
    "founderName",
    "email",
    "phone",
    "state",
    "city",
    "industry",
    "businessCategory",
    "businessType",
  ],
  [
    "businessStage",
    "yearsInBusiness",
    "annualTurnover",
    "monthlyRevenue",
    "employees",
    "fundingRequired",
    "fundingPurpose",
    "existingLoan",
  ],
  [
    "gstRegistered",
    "udyamRegistered",
    "dpiitStartup",
    "womanFounder",
    "scStFounder",
    "exportBusiness",
    "manufacturingUnit",
    "creditScore",
  ],
];

const defaults: FundingAssessmentInput = {
  businessName: "",
  founderName: "",
  email: "",
  phone: "",
  state: "Maharashtra",
  city: "",
  industry: "services",
  businessCategory: "",
  businessType: "proprietorship",
  businessStage: "early_revenue",
  yearsInBusiness: "1_2",
  annualTurnover: "10l_50l",
  monthlyRevenue: "under_10l",
  employees: "2_5",
  fundingRequired: "10l_25l",
  fundingPurpose: "working_capital",
  existingLoan: "no",
  gstRegistered: "no",
  udyamRegistered: "no",
  dpiitStartup: "no",
  womanFounder: "no",
  scStFounder: "no",
  exportBusiness: "no",
  manufacturingUnit: "no",
  creditScore: undefined,
};

function ChoiceGrid<T extends string>({
  value,
  onChange,
  options,
}: {
  value?: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-xl border px-3 py-3 text-left text-sm transition",
              active
                ? "border-primary bg-primary/5 text-foreground"
                : "border-border/80 text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

type Props = {
  open: boolean;
  onClose: () => void;
};

export function FundingAssessmentWizard({ open, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("form");
  const [report, setReport] = useState<FundingReport | null>(null);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [pendingInput, setPendingInput] =
    useState<FundingAssessmentInput | null>(null);

  const form = useForm<FundingAssessmentInput>({
    resolver: zodResolver(fundingAssessmentSchema),
    defaultValues: defaults,
    mode: "onChange",
  });

  const values = form.watch();

  useEffect(() => {
    if (!open) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<FundingAssessmentInput>;
        form.reset({ ...defaults, ...parsed });
      }
    } catch {
      /* ignore */
    }
  }, [open, form]);

  useEffect(() => {
    if (!open || phase !== "form") return;
    const id = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
      } catch {
        /* ignore */
      }
    }, 400);
    return () => window.clearTimeout(id);
  }, [values, open, phase]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const progress = useMemo(() => ((step + 1) / 3) * 100, [step]);

  const restart = useCallback(() => {
    setPhase("form");
    setStep(0);
    setReport(null);
    setAssessmentId(null);
    setPendingInput(null);
    form.reset(defaults);
    localStorage.removeItem(STORAGE_KEY);
  }, [form]);

  const next = async () => {
    const fields = stepFields[step];
    const ok = await form.trigger(fields);
    if (!ok) {
      toast.error("Please complete the required fields on this step.");
      return;
    }
    if (step < 2) {
      setStep((s) => s + 1);
      return;
    }

    const formValues = form.getValues();
    const parsed = fundingAssessmentSchema.safeParse({
      ...formValues,
      creditScore:
        formValues.creditScore === undefined ||
        Number.isNaN(formValues.creditScore)
          ? undefined
          : formValues.creditScore,
    });
    if (!parsed.success) {
      toast.error("Please review your answers — some fields look incomplete.");
      return;
    }

    const input = parsed.data;
    const localReport = generateFundingReport(input);
    setPendingInput(input);
    setReport(localReport);
    setPhase("analyzing");

    // Persist lead in background; report still shows if DB is down.
    void apiFetch<{ id: string; report: FundingReport }>(
      "/api/v1/funding-assessments",
      {
        method: "POST",
        body: JSON.stringify(input),
        timeoutMs: 20_000,
      },
    )
      .then((res) => {
        setAssessmentId(res.id);
        if (res.report) setReport(res.report);
      })
      .catch(() => {
        toast.message(
          "Report ready. Lead sync will retry when the database is online.",
        );
      });
  };

  if (!open) return null;

  return (
    <div className="bg-background/95 fixed inset-0 z-[70] overflow-y-auto backdrop-blur-xl">
      <div className="border-border/70 bg-background/80 sticky top-0 z-10 border-b backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div>
            <p className="font-heading text-lg font-semibold tracking-tight">
              Funding Eligibility Checker
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="hover:bg-muted rounded-full p-2 transition"
            aria-label="Close assessment"
          >
            <X className="size-5" />
          </button>
        </div>
        {phase === "form" ? (
          <div className="bg-muted h-1.5 w-full">
            <div
              className="bg-primary h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        ) : null}
      </div>

      <AnimatePresence mode="wait">
        {phase === "form" ? (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10"
          >
            <div className="mb-8 flex items-center gap-2">
              {[0, 1, 2].map((index) => (
                <div key={index} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-full text-xs font-semibold",
                      index <= step
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground hidden text-xs sm:inline">
                    {index === 0
                      ? "Business info"
                      : index === 1
                        ? "Profile"
                        : "Eligibility"}
                  </span>
                  {index < 2 ? (
                    <span className="bg-border hidden h-px w-8 sm:block" />
                  ) : null}
                </div>
              ))}
            </div>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                void next();
              }}
            >
              {step === 0 ? (
                <>
                  <h2 className="font-heading text-3xl font-semibold tracking-tight">
                    Business information
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Business name"
                      error={form.formState.errors.businessName?.message}
                    >
                      <Input
                        {...form.register("businessName")}
                        placeholder="Acme Traders"
                      />
                    </Field>
                    <Field
                      label="Founder name"
                      error={form.formState.errors.founderName?.message}
                    >
                      <Input
                        {...form.register("founderName")}
                        placeholder="Your full name"
                      />
                    </Field>
                    <Field
                      label="Business email"
                      error={form.formState.errors.email?.message}
                    >
                      <Input
                        type="email"
                        {...form.register("email")}
                        placeholder="you@business.com"
                      />
                    </Field>
                    <Field
                      label="Phone number"
                      error={form.formState.errors.phone?.message}
                    >
                      <Input {...form.register("phone")} placeholder="+91…" />
                    </Field>
                    <Field label="State">
                      <select
                        className="border-input bg-background h-9 w-full rounded-lg border px-3 text-sm"
                        {...form.register("state")}
                      >
                        {INDIAN_STATES.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field
                      label="City"
                      error={form.formState.errors.city?.message}
                    >
                      <Input {...form.register("city")} placeholder="City" />
                    </Field>
                    <Field label="Industry">
                      <select
                        className="border-input bg-background h-9 w-full rounded-lg border px-3 text-sm"
                        {...form.register("industry")}
                      >
                        {INDUSTRIES.map((item) => (
                          <option key={item} value={item}>
                            {industryLabels[item]}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field
                      label="Business category"
                      error={form.formState.errors.businessCategory?.message}
                    >
                      <Input
                        {...form.register("businessCategory")}
                        placeholder="e.g. Packaged foods, SaaS, Apparel"
                      />
                    </Field>
                  </div>
                  <div>
                    <Label className="mb-2 block">Business type</Label>
                    <ChoiceGrid
                      value={values.businessType}
                      onChange={(v) =>
                        form.setValue("businessType", v, {
                          shouldValidate: true,
                        })
                      }
                      options={BUSINESS_ENTITY_TYPES.map((v) => ({
                        value: v,
                        label: entityLabels[v],
                      }))}
                    />
                  </div>
                </>
              ) : null}

              {step === 1 ? (
                <>
                  <h2 className="font-heading text-3xl font-semibold tracking-tight">
                    Business profile
                  </h2>
                  <div>
                    <Label className="mb-2 block">Business stage</Label>
                    <ChoiceGrid
                      value={values.businessStage}
                      onChange={(v) =>
                        form.setValue("businessStage", v, {
                          shouldValidate: true,
                        })
                      }
                      options={BUSINESS_STAGES_FUNDING.map((v) => ({
                        value: v,
                        label: stageLabels[v],
                      }))}
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block">Years in business</Label>
                    <ChoiceGrid
                      value={values.yearsInBusiness}
                      onChange={(v) =>
                        form.setValue("yearsInBusiness", v, {
                          shouldValidate: true,
                        })
                      }
                      options={YEARS_BANDS.map((v) => ({
                        value: v,
                        label: yearsLabels[v],
                      }))}
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block">Annual turnover</Label>
                    <ChoiceGrid
                      value={values.annualTurnover}
                      onChange={(v) =>
                        form.setValue("annualTurnover", v, {
                          shouldValidate: true,
                        })
                      }
                      options={TURNOVER_BANDS.map((v) => ({
                        value: v,
                        label: turnoverLabels[v],
                      }))}
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block">Monthly revenue</Label>
                    <ChoiceGrid
                      value={values.monthlyRevenue}
                      onChange={(v) =>
                        form.setValue("monthlyRevenue", v, {
                          shouldValidate: true,
                        })
                      }
                      options={TURNOVER_BANDS.map((v) => ({
                        value: v,
                        label: turnoverLabels[v],
                      }))}
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block">Employees</Label>
                    <ChoiceGrid
                      value={values.employees}
                      onChange={(v) =>
                        form.setValue("employees", v, { shouldValidate: true })
                      }
                      options={EMPLOYEE_BANDS.map((v) => ({
                        value: v,
                        label: employeeLabels[v],
                      }))}
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block">Funding required</Label>
                    <ChoiceGrid
                      value={values.fundingRequired}
                      onChange={(v) =>
                        form.setValue("fundingRequired", v, {
                          shouldValidate: true,
                        })
                      }
                      options={FUNDING_BANDS.map((v) => ({
                        value: v,
                        label: fundingLabels[v],
                      }))}
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block">Funding purpose</Label>
                    <ChoiceGrid
                      value={values.fundingPurpose}
                      onChange={(v) =>
                        form.setValue("fundingPurpose", v, {
                          shouldValidate: true,
                        })
                      }
                      options={FUNDING_PURPOSES.map((v) => ({
                        value: v,
                        label: purposeLabels[v],
                      }))}
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block">Existing loan?</Label>
                    <ChoiceGrid
                      value={values.existingLoan}
                      onChange={(v) =>
                        form.setValue("existingLoan", v, {
                          shouldValidate: true,
                        })
                      }
                      options={[
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },
                      ]}
                    />
                  </div>
                </>
              ) : null}

              {step === 2 ? (
                <>
                  <h2 className="font-heading text-3xl font-semibold tracking-tight">
                    Eligibility details
                  </h2>
                  {(
                    [
                      ["gstRegistered", "GST registered"],
                      ["udyamRegistered", "Udyam registered"],
                      ["dpiitStartup", "DPIIT startup"],
                      ["womanFounder", "Woman founder"],
                      ["scStFounder", "SC/ST founder"],
                      ["exportBusiness", "Export business"],
                      ["manufacturingUnit", "Manufacturing unit"],
                    ] as const
                  ).map(([key, label]) => (
                    <div key={key}>
                      <Label className="mb-2 block">{label}</Label>
                      <ChoiceGrid
                        value={values[key]}
                        onChange={(v) =>
                          form.setValue(key, v, { shouldValidate: true })
                        }
                        options={[
                          { value: "yes", label: "Yes" },
                          { value: "no", label: "No" },
                        ]}
                      />
                    </div>
                  ))}
                  <Field label="Credit score (optional)">
                    <Input
                      type="number"
                      min={300}
                      max={900}
                      placeholder="e.g. 720"
                      value={values.creditScore ?? ""}
                      onChange={(e) => {
                        const raw = e.target.value;
                        form.setValue(
                          "creditScore",
                          raw === "" ? undefined : Number(raw),
                          { shouldValidate: true },
                        );
                      }}
                    />
                  </Field>
                </>
              ) : null}

              <div className="flex flex-wrap justify-between gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                >
                  Back
                </Button>
                <Button type="submit">
                  {step === 2 ? "Generate AI report" : "Continue"}
                </Button>
              </div>
            </form>
          </motion.div>
        ) : null}

        {phase === "analyzing" ? (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[calc(100dvh-4rem)]"
          >
            <FundingAnalysisLoader onDone={() => setPhase("report")} />
          </motion.div>
        ) : null}

        {phase === "report" && report && pendingInput ? (
          <motion.div
            key="report"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <FundingReportDashboard
              input={pendingInput}
              report={report}
              assessmentId={assessmentId}
              onRestart={restart}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-destructive text-xs">{error}</p> : null}
    </div>
  );
}
