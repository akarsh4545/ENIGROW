"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import {
  GstCalculator,
  LoanEmiCalculator,
} from "@/components/calculators/finance-calculators";
import { buttonVariants } from "@/components/ui/button-variants";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function CalculatorsPageContent() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="border-border/70 relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklch,var(--accent)_22%,transparent),transparent_40%),linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_65%,transparent),transparent)]"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <motion.div
            className="max-w-3xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
              Calculators
            </p>
            <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Plan EMI and GST numbers before you file.
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              Use Enigrow’s estimators for early planning on loan EMI and GST
              math. Final lender terms, tax treatment, and scheme benefits
              depend on official rules, your documents, and bank or authority
              decisions.
            </p>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 sm:py-20">
          <LoanEmiCalculator />
          <GstCalculator />

          <div className="border-border/70 bg-muted/30 rounded-2xl border p-6">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              Need pathway recommendations too?
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Try the eligibility checker for service and scheme shortlists.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={ROUTES.eligibility} className={cn(buttonVariants())}>
                Open eligibility checker
              </Link>
              <Link
                href={ROUTES.contact}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Talk to an advisor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
