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
    <section className="relative overflow-hidden bg-[#0B1F33]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 40%, rgba(24,184,120,0.18), transparent 50%)",
        }}
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 sm:py-24 md:flex-row md:items-end md:justify-between">
        <motion.div
          className="max-w-xl text-white"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {cta.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
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
              "home-v2-cta rounded-full font-semibold",
            )}
          >
            {cta.primaryCta.label}
          </Link>
          <Link
            href={cta.secondaryCta.href}
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "rounded-full border-white/30 bg-transparent font-semibold text-white hover:bg-white/10 hover:text-white",
            )}
          >
            {cta.secondaryCta.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
