"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { homeContent } from "@/data/home";
import { cn } from "@/lib/utils";

export function HomeCta() {
  const reduceMotion = useReducedMotion();
  const { cta } = homeContent;

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,color-mix(in_oklch,var(--accent)_30%,transparent),transparent_40%),linear-gradient(135deg,color-mix(in_oklch,var(--primary)_92%,black),color-mix(in_oklch,var(--primary)_70%,oklch(0.35_0.04_210)))]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 sm:py-24 md:flex-row md:items-end md:justify-between">
        <motion.div
          className="text-primary-foreground max-w-xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            {cta.title}
          </h2>
          <p className="text-primary-foreground/80 mt-4 text-base leading-relaxed sm:text-lg">
            {cta.support}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-3"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={cta.primaryCta.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-accent text-accent-foreground hover:bg-accent/90",
            )}
          >
            {cta.primaryCta.label}
          </Link>
          <Link
            href={cta.secondaryCta.href}
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "border-primary-foreground/35 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent",
            )}
          >
            {cta.secondaryCta.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
