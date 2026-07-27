"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getEligibilityRecommendations } from "@/lib/eligibility/engine";
import { cn } from "@/lib/utils";
import {
  eligibilityFormSchema,
  type EligibilityFormValues,
  type EligibilityRecommendation,
} from "@/validations/eligibility";

const stageOptions = [
  { value: "idea", label: "Idea / pre-launch" },
  { value: "early", label: "Early operations" },
  { value: "operating", label: "Operating business" },
  { value: "scaling", label: "Scaling" },
] as const;

const typeOptions = [
  { value: "services", label: "Services" },
  { value: "trading", label: "Trading" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "food", label: "Food business" },
  { value: "export", label: "Import / Export" },
  { value: "other", label: "Other" },
] as const;

const goalOptions = [
  { value: "registration", label: "Business registration" },
  { value: "gst_compliance", label: "GST / compliance" },
  { value: "msme_schemes", label: "MSME / schemes" },
  { value: "funding", label: "Funding / loans" },
  { value: "brand_protection", label: "Brand protection" },
  { value: "export_setup", label: "Export setup" },
] as const;

const yesNo = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

const yesNoUnsure = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
] as const;

const fundingOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "maybe", label: "Maybe later" },
] as const;

function OptionGrid<T extends string>({
  value,
  onChange,
  options,
}: {
  value?: T;
  onChange: (value: T) => void;
  options: readonly { value: T; label: string }[];
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-xl border px-4 py-3 text-left text-sm transition",
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

export function EligibilityChecker() {
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<EligibilityRecommendation[] | null>(
    null,
  );

  const form = useForm<EligibilityFormValues>({
    resolver: zodResolver(eligibilityFormSchema),
    defaultValues: {
      stage: undefined,
      businessType: undefined,
      hasEntity: undefined,
      hasGst: undefined,
      hasMsme: undefined,
      needsFunding: undefined,
      goal: undefined,
      name: "",
      email: "",
    },
    mode: "onChange",
  });

  const values = form.watch();

  const steps = useMemo(
    () => [
      {
        key: "stage",
        title: "What stage is your business in?",
        content: (
          <OptionGrid
            value={values.stage}
            onChange={(value) =>
              form.setValue("stage", value, { shouldValidate: true })
            }
            options={stageOptions}
          />
        ),
        isValid: Boolean(values.stage),
      },
      {
        key: "businessType",
        title: "What best describes your business?",
        content: (
          <OptionGrid
            value={values.businessType}
            onChange={(value) =>
              form.setValue("businessType", value, { shouldValidate: true })
            }
            options={typeOptions}
          />
        ),
        isValid: Boolean(values.businessType),
      },
      {
        key: "hasEntity",
        title: "Do you already have a registered business entity?",
        content: (
          <OptionGrid
            value={values.hasEntity}
            onChange={(value) =>
              form.setValue("hasEntity", value, { shouldValidate: true })
            }
            options={yesNo}
          />
        ),
        isValid: Boolean(values.hasEntity),
      },
      {
        key: "compliance",
        title: "Current compliance snapshot",
        content: (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>GST registration</Label>
              <OptionGrid
                value={values.hasGst}
                onChange={(value) =>
                  form.setValue("hasGst", value, { shouldValidate: true })
                }
                options={yesNoUnsure}
              />
            </div>
            <div className="space-y-2">
              <Label>MSME / Udyam registration</Label>
              <OptionGrid
                value={values.hasMsme}
                onChange={(value) =>
                  form.setValue("hasMsme", value, { shouldValidate: true })
                }
                options={yesNoUnsure}
              />
            </div>
          </div>
        ),
        isValid: Boolean(values.hasGst && values.hasMsme),
      },
      {
        key: "goal",
        title: "What is your primary goal right now?",
        content: (
          <div className="space-y-6">
            <OptionGrid
              value={values.goal}
              onChange={(value) =>
                form.setValue("goal", value, { shouldValidate: true })
              }
              options={goalOptions}
            />
            <div className="space-y-2">
              <Label>Do you need funding support?</Label>
              <OptionGrid
                value={values.needsFunding}
                onChange={(value) =>
                  form.setValue("needsFunding", value, { shouldValidate: true })
                }
                options={fundingOptions}
              />
            </div>
          </div>
        ),
        isValid: Boolean(values.goal && values.needsFunding),
      },
      {
        key: "contact",
        title: "Optional: where should we follow up?",
        content: (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="eligibility-name">Name</Label>
              <Input
                id="eligibility-name"
                placeholder="Your name"
                {...form.register("name")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eligibility-email">Email</Label>
              <Input
                id="eligibility-email"
                type="email"
                placeholder="you@company.com"
                {...form.register("email")}
              />
              {form.formState.errors.email ? (
                <p className="text-destructive text-xs">
                  {form.formState.errors.email.message}
                </p>
              ) : null}
            </div>
          </div>
        ),
        isValid: true,
      },
    ],
    [form, values],
  );

  const current = steps[step]!;
  const isLast = step === steps.length - 1;

  const onNext = () => {
    if (!current.isValid) return;
    if (!isLast) {
      setStep((value) => value + 1);
      return;
    }

    const parsed = eligibilityFormSchema.safeParse(form.getValues());
    if (!parsed.success) {
      form.trigger();
      return;
    }

    setResults(getEligibilityRecommendations(parsed.data));
  };

  if (results) {
    return (
      <div className="border-border/80 bg-card rounded-2xl border p-6 sm:p-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Your recommended next steps
        </h2>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
          Based on your answers, these pathways are the strongest starting
          points. This is guidance — not a guarantee of scheme or loan approval.
        </p>

        <ul className="divide-border/80 border-border/80 mt-8 divide-y border-y">
          {results.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="group flex items-start justify-between gap-4 py-5"
              >
                <div>
                  <p className="text-primary text-xs font-medium tracking-[0.14em] uppercase">
                    {item.priority} priority · {item.kind}
                  </p>
                  <h3 className="font-heading group-hover:text-primary mt-1 text-xl font-semibold tracking-tight transition">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {item.reason}
                  </p>
                </div>
                <ArrowRight className="text-muted-foreground group-hover:text-primary mt-1 size-5 shrink-0 transition group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
            Talk to an advisor
          </Link>
          <Button
            type="button"
            size="lg"
            variant="outline"
            onClick={() => {
              setResults(null);
              setStep(0);
              form.reset();
            }}
          >
            Start over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-border/80 bg-card rounded-2xl border p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase">
          Step {step + 1} of {steps.length}
        </p>
        <div className="bg-muted h-1.5 flex-1 overflow-hidden rounded-full">
          <div
            className="bg-primary h-full rounded-full transition-all"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
        {current.title}
      </h2>
      <div className="mt-6">{current.content}</div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={step === 0}
          onClick={() => setStep((value) => Math.max(0, value - 1))}
        >
          Back
        </Button>
        <Button type="button" disabled={!current.isValid} onClick={onNext}>
          {isLast ? "See recommendations" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
