"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const trust = [
  "Free Assessment",
  "Get Answers Instantly",
  "No Documents Required",
  "Instant Results",
] as const;

type Props = {
  onStart: () => void;
};

export function HomeFundingHero({ onStart }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-border/70 relative isolate overflow-hidden border-b bg-[linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_55%,white),transparent)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,color-mix(in_oklch,var(--accent)_18%,transparent),transparent_38%),radial-gradient(circle_at_92%_12%,color-mix(in_oklch,var(--primary)_12%,transparent),transparent_36%)]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:py-28">
        <div className="max-w-xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="border-border/70 bg-background/80 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm shadow-sm backdrop-blur"
          >
            <span
              aria-hidden
              className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_color-mix(in_oklch,var(--color-emerald-500)_25%,transparent)]"
            />
            <span className="text-foreground font-medium">
              Free · Results instantly
            </span>
          </motion.div>

          <motion.h1
            className="font-heading mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-[3.35rem] md:leading-[1.08]"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Check Your Funding Eligibility Instantly
          </motion.h1>

          <motion.p
            className="text-muted-foreground mt-5 text-base leading-relaxed sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Answer a few quick questions to instantly discover which government
            grants, MSME loans, startup schemes, and business funding options
            your business may qualify for. No paperwork. No commitment.
            Completely free.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
          >
            <button
              type="button"
              onClick={onStart}
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-w-[13.5rem] shadow-[0_12px_30px_color-mix(in_oklch,var(--primary)_22%,transparent)]",
              )}
            >
              Check Eligibility Free
            </button>
            <Link
              href={ROUTES.contact}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "bg-background/70 min-w-[11rem]",
              )}
            >
              Talk to an Expert
            </Link>
          </motion.div>

          <ul className="mt-9 grid gap-2.5 sm:grid-cols-2">
            {trust.map((item, index) => (
              <motion.li
                key={item}
                className="text-foreground/80 flex items-center gap-2.5 text-sm"
                initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + index * 0.04 }}
              >
                <span className="grid size-5 place-items-center rounded-full bg-emerald-500/12 text-emerald-700 dark:text-emerald-400">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.aside
          className="border-border/60 bg-card relative overflow-hidden rounded-[1.5rem] border p-6 shadow-[0_24px_60px_color-mix(in_oklch,var(--primary)_8%,transparent)] sm:p-7"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Funding eligibility preview"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase">
                Funding eligibility preview
              </p>
              <p className="font-heading mt-1.5 text-xl font-semibold tracking-tight">
                What you’ll see instantly
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/12 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Free
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              { label: "Overall eligibility", value: "0–100 score" },
              { label: "Estimated funding range", value: "₹10K–₹5 Cr" },
              { label: "Eligible programs", value: "Matched list" },
              { label: "Time required", value: "Instant" },
            ].map((item) => (
              <div
                key={item.label}
                className="border-border/70 bg-background/90 rounded-2xl border p-4"
              >
                <p className="text-muted-foreground text-[11px] leading-snug tracking-[0.12em] uppercase">
                  {item.label}
                </p>
                <p className="font-heading mt-2 text-lg font-semibold tracking-tight sm:text-xl">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="border-border/70 bg-background/90 mt-3 flex items-center justify-between rounded-2xl border px-4 py-3.5">
            <div>
              <p className="text-muted-foreground text-[11px] tracking-[0.12em] uppercase">
                Cost
              </p>
              <p className="font-heading mt-1 text-lg font-semibold tracking-tight">
                Completely free
              </p>
            </div>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              ₹0
            </p>
          </div>

          <button
            type="button"
            onClick={onStart}
            className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full")}
          >
            Check Eligibility Free
          </button>
          <p className="text-muted-foreground mt-3 text-center text-xs">
            No paperwork. No commitment. Results on the spot.
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
