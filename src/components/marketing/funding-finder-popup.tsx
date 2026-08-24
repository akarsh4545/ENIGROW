"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, X } from "lucide-react";

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

const STORAGE_KEY = "enigrow_funding_finder_dismissed";

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

export function markFundingFinderDismissed() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // ignore
  }
}

export function wasFundingFinderDismissed() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function FundingFinderPopup({
  open,
  onClose,
  onCheckEligibility,
}: {
  open: boolean;
  onClose: () => void;
  onCheckEligibility?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const titleId = useId();
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

  const dismiss = () => {
    markFundingFinderDismissed();
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- dismiss closes via onClose
  }, [open, onClose]);

  useEffect(() => {
    if (open) reset();
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-5 md:p-8">
          <motion.button
            type="button"
            aria-label="Close funding finder"
            className="absolute inset-0 bg-[#020817]/55 backdrop-blur-[3px]"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={dismiss}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-[1] flex max-h-[min(92dvh,720px)] w-full max-w-xl flex-col overflow-hidden rounded-t-[1.6rem] border border-white/10 bg-white shadow-[0_40px_100px_-40px_rgba(0,0,0,0.55)] sm:rounded-[1.6rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.35, ease: homeEase }}
          >
            <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-[#001848] to-[#0a2a6e] px-5 py-5 sm:px-7 sm:py-6">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-10 -right-8 size-40 rounded-full bg-[#c08418]/25 blur-2xl"
              />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-[#c08418] uppercase">
                    Quick funding finder
                  </p>
                  <h2
                    id={titleId}
                    className="font-heading mt-1.5 text-xl font-bold tracking-tight text-balance text-white sm:text-2xl"
                  >
                    Which funding route could your business qualify for?
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
                    Two quick questions — we surface schemes that may fit. Not
                    an official eligibility decision.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={dismiss}
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <div className="mb-6 grid grid-cols-3 gap-2">
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
                        "text-[10px] font-semibold tracking-[0.1em] uppercase",
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
                  transition={{ duration: 0.3, ease: homeEase }}
                >
                  <p className="font-heading text-lg font-bold tracking-tight text-[#001848]">
                    What do you need funding for?
                  </p>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {NEED_OPTIONS.map((option) => {
                      const selected = needId === option.id;
                      return (
                        <li key={option.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setNeedId(option.id);
                              setStep(2);
                            }}
                            className={cn(
                              "flex w-full items-center justify-between gap-3 rounded-full border px-4 py-3.5 text-left text-sm font-semibold transition duration-200",
                              selected
                                ? "border-[#001848] bg-[#001848] text-white"
                                : "border-[#e2e6ef] bg-[#f7f8fb] text-[#0b1220] hover:border-[#001848]/35",
                            )}
                          >
                            <span>{option.label}</span>
                            <span
                              className={cn(
                                "grid size-5 shrink-0 place-items-center rounded-full border text-[10px]",
                                selected
                                  ? "border-white/30 bg-white/15 text-white"
                                  : "border-transparent text-transparent",
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
                  transition={{ duration: 0.3, ease: homeEase }}
                >
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="mb-3 inline-flex items-center gap-1 text-sm text-[#5b6577] transition hover:text-[#001848]"
                  >
                    <ChevronLeft className="size-4" />
                    Back
                  </button>
                  <p className="font-heading text-lg font-bold tracking-tight text-[#001848]">
                    How much funding do you need?
                  </p>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {AMOUNT_OPTIONS.map((option) => {
                      const selected = amountId === option.id;
                      return (
                        <li key={option.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setAmountId(option.id);
                              setStep(3);
                            }}
                            className={cn(
                              "flex h-full w-full flex-col rounded-[1.1rem] border px-4 py-3.5 text-left transition duration-200",
                              selected
                                ? "border-[#001848] bg-[#001848] text-white"
                                : "border-[#e2e6ef] bg-[#f7f8fb] hover:border-[#001848]/35",
                            )}
                          >
                            <span className="text-sm font-bold">
                              {option.label}
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
                  transition={{ duration: 0.3, ease: homeEase }}
                >
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="mb-3 inline-flex items-center gap-1 text-sm text-[#5b6577] transition hover:text-[#001848]"
                  >
                    <ChevronLeft className="size-4" />
                    Back
                  </button>
                  <p className="font-heading text-lg font-bold tracking-tight text-[#001848]">
                    Potentially suitable options
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#5b6577]">
                    Based on “{need.label}” around {amount.label.toLowerCase()}.
                    Informational only — not confirmation of eligibility.
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {suggestions.map((scheme) => (
                      <li
                        key={scheme}
                        className="rounded-full bg-[#001848]/[0.08] px-3.5 py-1.5 text-sm font-bold text-[#001848]"
                      >
                        {scheme}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {onCheckEligibility ? (
                      <button
                        type="button"
                        onClick={() => {
                          markFundingFinderDismissed();
                          onClose();
                          onCheckEligibility();
                        }}
                        className={cn(
                          buttonVariants({ size: "lg" }),
                          homeCtaClass,
                          "group/button h-11 bg-[#c08418] px-5 text-[#1a1408] hover:bg-[#c08418]/90",
                        )}
                      >
                        Full eligibility check
                        <ArrowRight className="size-4 transition duration-200 group-hover/button:translate-x-1" />
                      </button>
                    ) : (
                      <Link
                        href={ROUTES.eligibility}
                        onClick={markFundingFinderDismissed}
                        className={cn(
                          buttonVariants({ size: "lg" }),
                          homeCtaClass,
                          "group/button h-11 bg-[#c08418] px-5 text-[#1a1408] hover:bg-[#c08418]/90",
                        )}
                      >
                        Check My Eligibility
                        <ArrowRight className="size-4 transition duration-200 group-hover/button:translate-x-1" />
                      </Link>
                    )}
                    <Link
                      href={ROUTES.contact}
                      onClick={markFundingFinderDismissed}
                      className={cn(
                        buttonVariants({ size: "lg", variant: "outline" }),
                        homeCtaClass,
                        "h-11 px-5",
                      )}
                    >
                      Talk to an advisor
                    </Link>
                  </div>
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
