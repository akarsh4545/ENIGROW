"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { HomeBackdrop } from "@/components/marketing/home-backdrop";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { cn } from "@/lib/utils";

export function HomeCta() {
  const reduceMotion = useReducedMotion();
  const { cta } = homeContent;

  return (
    <section className="bg-primary relative overflow-hidden">
      <HomeBackdrop variant="cta" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 sm:py-24 md:flex-row md:items-end md:justify-between">
        <motion.div
          className="text-primary-foreground max-w-xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: homeEase }}
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
          transition={{ duration: 0.5, delay: 0.08, ease: homeEase }}
        >
          <Link
            href={cta.primaryCta.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              homeCtaClass,
              "bg-accent text-accent-foreground hover:bg-accent/90 h-12 rounded-[1.15rem] px-6 shadow-[0_14px_34px_-16px_color-mix(in_oklch,var(--accent)_55%,transparent)]",
            )}
          >
            {cta.primaryCta.label}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={cta.secondaryCta.href}
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              homeCtaClass,
              "border-primary-foreground/35 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground h-12 rounded-[1.15rem] bg-transparent px-5",
            )}
          >
            {cta.secondaryCta.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
