"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Headphones } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { cn } from "@/lib/utils";

/**
 * Company-wide impact stats (₹110Cr+ / 92% / 720+) are intentionally not
 * rendered here — they can read as unverified on a financial-services site.
 * We keep only the advisor-support signal plus a path to testimonials.
 */
export function HomeImpact() {
  const reduceMotion = useReducedMotion();
  const { impact } = homeContent;
  const support = impact.items.find((item) => item.icon === "support");

  return (
    <section className="border-border/70 border-b bg-[#f7f8fb]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-14 text-center sm:flex-row sm:justify-between sm:px-6 sm:py-16 sm:text-left">
        <motion.div
          className="flex max-w-xl flex-col items-center gap-4 sm:flex-row sm:items-start"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: homeEase }}
        >
          <span className="bg-primary text-primary-foreground grid size-12 shrink-0 place-items-center rounded-2xl">
            <Headphones className="size-5" aria-hidden />
          </span>
          <div>
            <p className="font-heading text-2xl font-bold tracking-tight text-[#001848] sm:text-3xl">
              {support?.value ?? "Mon–Sat"} advisor support
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-base">
              Named ownership through registrations, schemes, and funding
              readiness — without overpromising bank or government approvals.
            </p>
          </div>
        </motion.div>

        <Link
          href={impact.cta.href}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            homeCtaClass,
            "h-11 shrink-0 rounded-full px-5 font-semibold",
          )}
        >
          {impact.cta.label} →
        </Link>
      </div>
    </section>
  );
}
