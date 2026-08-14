"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { cn } from "@/lib/utils";

export function HomeProcess() {
  const reduceMotion = useReducedMotion();
  const { process } = homeContent;

  return (
    <section className="relative overflow-hidden border-b border-[#0B1F33]/[0.06] bg-white">
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-16">
        <motion.div
          className="lg:sticky lg:top-28 lg:self-start"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: homeEase }}
        >
          <p className="text-sm font-semibold tracking-[0.18em] text-[#18B878] uppercase">
            {process.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-balance text-[#0B1F33] sm:text-4xl md:text-5xl">
            {process.title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#5A6B7A] sm:text-lg">
            {process.support}
          </p>
          <Link
            href={process.cta.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "home-v2-cta mt-8 rounded-full font-semibold",
            )}
          >
            {process.cta.label}
          </Link>
        </motion.div>

        <ol className="relative space-y-0">
          <div
            aria-hidden
            className="absolute top-3 bottom-3 left-[1.15rem] w-px bg-[#D5E2D9] sm:left-[1.35rem]"
          />
          {process.steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={reduceMotion ? false : { opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                duration: 0.5,
                delay: index * 0.07,
                ease: homeEase,
              }}
              className="group relative grid gap-4 py-6 pl-12 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-8 sm:py-8 sm:pl-16"
            >
              <span
                aria-hidden
                className="absolute top-7 left-0 grid size-9 place-items-center rounded-full bg-[#0B1F33] text-xs font-semibold text-white sm:top-8 sm:size-11 sm:text-sm"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="font-heading hidden text-5xl font-bold tracking-tight text-[#E7F7EF] sm:block md:text-6xl">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div>
                <h3 className="font-heading text-xl font-bold tracking-tight text-[#0B1F33] sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5A6B7A] sm:text-base">
                  {step.copy}
                </p>
                <p className="mt-3 text-sm font-semibold tracking-tight text-[#18B878]">
                  {step.outcome}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
