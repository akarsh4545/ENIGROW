"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
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

const STEPS = [
  { n: 1, label: "Business Need" },
  { n: 2, label: "Funding Amount" },
  { n: 3, label: "Explore Options" },
] as const;

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
    <section className="relative overflow-hidden border-b border-[#e2e6ef] bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,24,72,0.05), transparent 55%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: homeEase }}
        >
          <p className="text-sm font-semibold tracking-[0.18em] text-[#c08418] uppercase">
            Quick funding finder
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-[#001848] sm:text-4xl md:text-[2.75rem]">
            Find the Right Funding Route
            <br className="hidden sm:block" /> for Your Business
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5b6577]">
            Two quick questions. We surface schemes that may be relevant — not
            an official eligibility decision.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-[1.6rem] border border-[#e2e6ef] bg-[#f7f8fb] p-6 shadow-[0_24px_60px_-36px_rgba(0,24,72,0.3)] sm:p-8"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.06, ease: homeEase }}
        >
          <div className="mb-8 grid grid-cols-3 gap-2">
            {STEPS.map((s) => (
              <div key={s.n} className="text-center">
                <div
                  className={cn(
                    "mx-auto mb-2 h-1.5 w-full rounded-full transition",
                    step >= s.n ? "bg-[#001848]" : "bg-[#e2e6ef]",
                  )}
                />
                <p
                  className={cn(
                    "text-[10px] font-semibold tracking-[0.12em] uppercase",
                    step >= s.n ? "text-[#001848]" : "text-[#5b6577]",
                  )}
                >
                  {String(s.n).padStart(2, "0")} · {s.label}
                </p>
              </div>
            ))}
          </div>

          {step === 1 ? (
            <motion.div
              key="step-1"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: homeEase }}
            >
              <p className="font-heading text-xl font-bold tracking-tight text-[#001848]">
                What do you need funding for?
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {NEED_OPTIONS.map((option) => {
                  const selected = needId === option.id;
                  return (
                    <li
                      key={option.id}
                      className="w-full sm:w-[calc(50%-0.35rem)]"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setNeedId(option.id);
                          setStep(2);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 rounded-full border px-4 py-3.5 text-left text-sm font-semibold transition duration-200 ease-out",
                          selected
                            ? "border-[#001848] bg-[#001848] text-white shadow-[0_12px_28px_-16px_rgba(0,24,72,0.45)]"
                            : "border-[#e2e6ef] bg-white text-[#0b1220] hover:-translate-y-0.5 hover:border-[#001848]/30",
                        )}
                      >
                        <span>{option.label}</span>
                        <span
                          className={cn(
                            "grid size-5 shrink-0 place-items-center rounded-full border text-[10px] transition duration-200",
                            selected
                              ? "scale-100 border-white/30 bg-white/15 text-white opacity-100"
                              : "scale-90 border-[#e2e6ef] text-transparent opacity-0",
                          )}
                          aria-hidden
                        >
                          ✓
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ) : null}

          {step === 2 ? (
            <motion.div
              key="step-2"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: homeEase }}
            >
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mb-4 inline-flex items-center gap-1 text-sm text-[#5b6577] transition hover:text-[#001848]"
              >
                <ChevronLeft className="size-4" />
                Back
              </button>
              <p className="font-heading text-xl font-bold tracking-tight text-[#001848]">
                How much funding do you need?
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {AMOUNT_OPTIONS.map((option) => {
                  const selected = amountId === option.id;
                  return (
                    <li
                      key={option.id}
                      className="w-full sm:w-[calc(50%-0.35rem)]"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setAmountId(option.id);
                          setStep(3);
                        }}
                        className={cn(
                          "flex h-full w-full flex-col rounded-[1.1rem] border px-4 py-3.5 text-left transition duration-200 ease-out",
                          selected
                            ? "border-[#001848] bg-[#001848] text-white shadow-[0_12px_28px_-16px_rgba(0,24,72,0.45)]"
                            : "border-[#e2e6ef] bg-white hover:-translate-y-0.5 hover:border-[#001848]/30",
                        )}
                      >
                        <span className="flex items-center justify-between gap-2 text-sm font-bold">
                          {option.label}
                          <span
                            className={cn(
                              "grid size-5 shrink-0 place-items-center rounded-full border text-[10px] transition duration-200",
                              selected
                                ? "scale-100 border-white/30 bg-white/15 text-white opacity-100"
                                : "scale-90 border-transparent text-transparent opacity-0",
                            )}
                            aria-hidden
                          >
                            ✓
                          </span>
                        </span>
                        <span
                          className={cn(
                            "mt-1 text-xs",
                            selected ? "text-white/70" : "text-[#5b6577]",
                          )}
                        >
                          {option.hint}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ) : null}

          {step === 3 && need && amount ? (
            <motion.div
              key="step-3"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: homeEase }}
            >
              <button
                type="button"
                onClick={() => setStep(2)}
                className="mb-4 inline-flex items-center gap-1 text-sm text-[#5b6577] transition hover:text-[#001848]"
              >
                <ChevronLeft className="size-4" />
                Back
              </button>
              <p className="font-heading text-xl font-bold tracking-tight text-[#001848]">
                Potentially suitable options
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#5b6577]">
                Based on “{need.label}” around {amount.label.toLowerCase()}.
                Informational only — not confirmation of eligibility.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {suggestions.map((scheme) => (
                  <li
                    key={scheme}
                    className="rounded-full bg-[#001848]/[0.08] px-3.5 py-1.5 text-sm font-bold text-[#001848]"
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
                    "group/button h-12 bg-[#c08418] px-6 text-[#1a1408] hover:bg-[#c08418]/90",
                  )}
                >
                  Check My Eligibility
                  <ArrowRight className="size-4 transition duration-200 group-hover/button:translate-x-1" />
                </Link>
                <Link
                  href={ROUTES.contact}
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    homeCtaClass,
                    "h-12 px-5",
                  )}
                >
                  Talk to an advisor
                </Link>
                <button
                  type="button"
                  onClick={reset}
                  className="text-sm font-semibold text-[#5b6577] transition hover:text-[#001848]"
                >
                  Start over
                </button>
              </div>
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
