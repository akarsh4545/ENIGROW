"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { HomeBackdrop } from "@/components/marketing/home-backdrop";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

type NeedOption = {
  id: string;
  label: string;
  schemes: string[];
};

type AmountOption = {
  id: string;
  label: string;
  hint: string;
};

const NEED_OPTIONS: NeedOption[] = [
  {
    id: "new-unit",
    label: "Starting a new micro unit",
    schemes: ["PMEGP", "Stand-Up India"],
  },
  {
    id: "working-capital",
    label: "Working capital for an existing business",
    schemes: ["MUDRA Loan", "CGTMSE"],
  },
  {
    id: "expansion",
    label: "Expansion or equipment purchase",
    schemes: ["CGTMSE", "PMEGP"],
  },
  {
    id: "women-scst",
    label: "SC/ST or women entrepreneur pathway",
    schemes: ["Stand-Up India", "PMEGP"],
  },
];

const AMOUNT_OPTIONS: AmountOption[] = [
  {
    id: "under-10l",
    label: "Under ₹10L",
    hint: "Often maps to micro pathways",
  },
  { id: "10-50l", label: "₹10L – ₹50L", hint: "Common MSME conversation band" },
  {
    id: "50l-5cr",
    label: "₹50L – ₹5Cr",
    hint: "Larger institutional pathways",
  },
  { id: "unsure", label: "Not sure yet", hint: "We’ll help narrow it down" },
];

function refineByAmount(schemes: string[], amountId: string): string[] {
  if (amountId === "under-10l") {
    return schemes.includes("MUDRA Loan")
      ? ["MUDRA Loan", ...schemes.filter((s) => s !== "MUDRA Loan")]
      : ["MUDRA Loan", ...schemes];
  }
  if (amountId === "50l-5cr") {
    return schemes.includes("CGTMSE")
      ? ["CGTMSE", ...schemes.filter((s) => s !== "CGTMSE")]
      : ["CGTMSE", ...schemes];
  }
  return schemes;
}

export function HomeFundingFinder() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [needId, setNeedId] = useState<string | null>(null);
  const [amountId, setAmountId] = useState<string | null>(null);

  const need = NEED_OPTIONS.find((o) => o.id === needId);
  const amount = AMOUNT_OPTIONS.find((o) => o.id === amountId);
  const suggestions =
    need && amount ? refineByAmount(need.schemes, amount.id).slice(0, 3) : [];

  const reset = () => {
    setStep(1);
    setNeedId(null);
    setAmountId(null);
  };

  return (
    <section className="border-border/70 relative overflow-hidden border-b bg-[#f7f8fb]">
      <HomeBackdrop variant="light" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: homeEase }}
        >
          <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
            Quick funding finder
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Narrow your funding conversation
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            Two quick questions. We surface schemes that may be relevant based
            on common pathways — not an official eligibility decision.
          </p>
        </motion.div>

        <motion.div
          className="border-border/70 bg-card mx-auto mt-12 max-w-2xl rounded-[1.5rem] border p-6 shadow-[0_18px_48px_-30px_color-mix(in_oklch,var(--primary)_30%,transparent)] sm:p-8"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.06, ease: homeEase }}
        >
          <div className="mb-6 flex items-center gap-2">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition",
                  step >= n ? "bg-primary" : "bg-muted",
                )}
              />
            ))}
          </div>

          {step === 1 ? (
            <div>
              <p className="font-heading text-xl font-semibold tracking-tight">
                What do you need funding for?
              </p>
              <ul className="mt-5 grid gap-2.5">
                {NEED_OPTIONS.map((option) => (
                  <li key={option.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setNeedId(option.id);
                        setStep(2);
                      }}
                      className={cn(
                        "border-border/70 hover:border-primary/40 hover:bg-primary/5 w-full rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition",
                        needId === option.id &&
                          "border-primary bg-primary/5 text-primary",
                      )}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {step === 2 ? (
            <div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1 text-sm transition"
              >
                <ChevronLeft className="size-4" />
                Back
              </button>
              <p className="font-heading text-xl font-semibold tracking-tight">
                Roughly how much capital are you exploring?
              </p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {AMOUNT_OPTIONS.map((option) => (
                  <li key={option.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setAmountId(option.id);
                        setStep(3);
                      }}
                      className={cn(
                        "border-border/70 hover:border-primary/40 hover:bg-primary/5 flex h-full w-full flex-col rounded-xl border px-4 py-3.5 text-left transition",
                        amountId === option.id && "border-primary bg-primary/5",
                      )}
                    >
                      <span className="text-sm font-semibold">
                        {option.label}
                      </span>
                      <span className="text-muted-foreground mt-1 text-xs">
                        {option.hint}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {step === 3 && need && amount ? (
            <div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1 text-sm transition"
              >
                <ChevronLeft className="size-4" />
                Back
              </button>
              <p className="font-heading text-xl font-semibold tracking-tight">
                May be relevant
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Based on “{need.label}” around {amount.label.toLowerCase()}.
                This is informational guidance only — not confirmation of
                eligibility.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {suggestions.map((scheme) => (
                  <li
                    key={scheme}
                    className="bg-primary/8 text-primary rounded-full px-3.5 py-1.5 text-sm font-semibold"
                  >
                    {scheme}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={ROUTES.eligibility}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    homeCtaClass,
                    "h-11 rounded-[1.1rem] px-5",
                  )}
                >
                  Check My Eligibility
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href={ROUTES.contact}
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    homeCtaClass,
                    "h-11 rounded-[1.1rem] px-5",
                  )}
                >
                  Talk to an advisor
                </Link>
                <button
                  type="button"
                  onClick={reset}
                  className="text-muted-foreground hover:text-foreground text-sm font-medium transition"
                >
                  Start over
                </button>
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
