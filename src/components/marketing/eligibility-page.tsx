"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EligibilityChecker } from "@/components/calculators/eligibility-checker";

export function EligibilityPageContent() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="border-border/70 relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklch,var(--accent)_24%,transparent),transparent_40%),linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_65%,transparent),transparent)]"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <motion.div
            className="max-w-3xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
              Eligibility checker
            </p>
            <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Find your strongest next formalities.
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              Answer a few questions about your business stage and goals. We
              will recommend practical service and scheme pathways to explore
              first.
            </p>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="space-y-4">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              What this tool does
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              It shortlists likely next steps from your inputs. It does not
              replace official eligibility rules or lender assessment.
            </p>
            <ul className="text-muted-foreground space-y-3 text-sm">
              <li className="border-primary/35 border-l-2 pl-4">
                Best used before registrations or scheme applications
              </li>
              <li className="border-primary/35 border-l-2 pl-4">
                Recommendations link directly to relevant Enigrow pages
              </li>
              <li className="border-primary/35 border-l-2 pl-4">
                You can talk to an advisor after reviewing results
              </li>
            </ul>
          </aside>
          <EligibilityChecker />
        </div>
      </section>
    </>
  );
}
