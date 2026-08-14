"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function HomeCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#001848]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 40%, rgba(192,132,24,0.22), transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(255,255,255,0.06), transparent 45%)",
        }}
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 sm:py-24 md:flex-row md:items-end md:justify-between">
        <motion.div
          className="max-w-xl text-white"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: homeEase }}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Ready to Take the Next Step?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            Tell us where you are — registration, schemes, or funding readiness.
            We&apos;ll help you choose a practical path forward.
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
            href={ROUTES.contact}
            className={cn(
              buttonVariants({ size: "lg" }),
              homeCtaClass,
              "h-12 rounded-full bg-[#c08418] px-6 font-semibold text-[#1a1408] hover:bg-[#c08418]/90",
            )}
          >
            Get Started
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={ROUTES.eligibility}
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              homeCtaClass,
              "h-12 rounded-full border-white/30 bg-transparent px-5 font-semibold text-white hover:bg-white/10 hover:text-white",
            )}
          >
            Check Eligibility
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
