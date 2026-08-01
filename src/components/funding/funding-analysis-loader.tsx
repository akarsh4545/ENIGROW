"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Sparkles } from "lucide-react";

const STEPS = [
  "Reading Business Profile",
  "Matching Government Schemes",
  "Checking MSME Benefits",
  "Searching Startup Programs",
  "Checking Bank Loan Eligibility",
  "Checking NBFC Funding",
  "Evaluating Financial Strength",
  "Risk Assessment",
  "Calculating Funding Potential",
  "Generating Personalized Report",
] as const;

type Props = {
  onDone: () => void;
};

export function FundingAnalysisLoader({ onDone }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const totalMs = 9000;
    const stepMs = totalMs / STEPS.length;
    const timers: number[] = [];

    STEPS.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => setActive(index + 1), stepMs * (index + 1)),
      );
    });
    timers.push(window.setTimeout(onDone, totalMs + 400));

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [onDone]);

  const progress = Math.min(100, (active / STEPS.length) * 100);

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 py-10">
      <div className="border-border/70 bg-card/80 w-full max-w-lg rounded-[1.75rem] border p-6 shadow-xl backdrop-blur-xl sm:p-8">
        <div className="flex items-center gap-3">
          <span className="bg-primary text-primary-foreground grid size-11 place-items-center rounded-2xl">
            <Sparkles className="size-5" />
          </span>
          <div>
            <p className="font-heading text-xl font-semibold tracking-tight">
              Building your report
            </p>
            <p className="text-muted-foreground text-sm">
              Matching schemes and funding pathways for your profile…
            </p>
          </div>
        </div>

        <div className="bg-muted mt-6 h-2 overflow-hidden rounded-full">
          <motion.div
            className="bg-primary h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.35 }}
          />
        </div>

        <ul className="mt-6 space-y-2.5">
          {STEPS.map((label, index) => {
            const done = index < active;
            const current = index === active;
            return (
              <li key={label} className="flex items-center gap-3 text-sm">
                <span
                  className={
                    done
                      ? "grid size-6 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                      : current
                        ? "bg-primary/15 text-primary grid size-6 place-items-center rounded-full"
                        : "bg-muted text-muted-foreground grid size-6 place-items-center rounded-full"
                  }
                >
                  {done ? (
                    <Check className="size-3.5" />
                  ) : current ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <span className="size-1.5 rounded-full bg-current opacity-40" />
                  )}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${label}-${done}-${current}`}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className={
                      done || current
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }
                  >
                    {label}
                  </motion.span>
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
