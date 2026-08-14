"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { cn } from "@/lib/utils";

export function HomeProcess() {
  const reduceMotion = useReducedMotion();
  const { process } = homeContent;

  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 overflow-hidden border-b border-[#001848] bg-[#001848]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 10% 20%, rgba(192,132,24,0.16), transparent 45%), radial-gradient(ellipse at 90% 80%, rgba(255,255,255,0.05), transparent 40%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <motion.div
          className="max-w-2xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: homeEase }}
        >
          <p className="text-sm font-semibold tracking-[0.18em] text-[#c08418] uppercase">
            {process.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl md:text-5xl">
            {process.title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
            {process.support}
          </p>
          <Link
            href={process.cta.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              homeCtaClass,
              "mt-8 h-11 bg-[#c08418] px-5 text-[#1a1408] hover:bg-[#c08418]/90",
            )}
          >
            {process.cta.label}
          </Link>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <ol className="relative mt-14 hidden gap-4 lg:grid lg:grid-cols-4">
          <motion.div
            aria-hidden
            className="absolute top-6 right-4 left-4 h-px origin-left bg-white/15"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: homeEase }}
          />
          {process.steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: homeEase,
              }}
              className="relative pt-2"
            >
              <span className="relative z-[1] grid size-12 place-items-center rounded-full border border-white/20 bg-[#001848] text-sm font-bold text-[#c08418]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading mt-5 text-xl font-bold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {step.copy}
              </p>
              <p className="mt-3 text-sm font-semibold text-[#c08418]">
                {step.outcome}
              </p>
            </motion.li>
          ))}
        </ol>

        {/* Mobile vertical timeline */}
        <ol className="relative mt-12 space-y-0 lg:hidden">
          <motion.div
            aria-hidden
            className="absolute top-3 bottom-3 left-[1.15rem] w-px origin-top bg-white/15"
            initial={reduceMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: homeEase }}
          />
          {process.steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={reduceMotion ? false : { opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
                ease: homeEase,
              }}
              className="relative py-6 pl-12"
            >
              <span className="absolute top-7 left-0 grid size-9 place-items-center rounded-full bg-[#c08418] text-xs font-bold text-[#1a1408]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-xl font-bold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {step.copy}
              </p>
              <p className="mt-3 text-sm font-semibold text-[#c08418]">
                {step.outcome}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
