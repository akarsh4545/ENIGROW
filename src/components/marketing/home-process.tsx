"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeContent } from "@/data/home";
import { cn } from "@/lib/utils";

export function HomeProcess() {
  const reduceMotion = useReducedMotion();
  const { process } = homeContent;

  return (
    <section className="border-border/70 border-b">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-16">
        <motion.div
          className="lg:sticky lg:top-28 lg:self-start"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
            {process.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
            {process.title}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md text-base leading-relaxed sm:text-lg">
            {process.support}
          </p>
          <Link
            href={process.cta.href}
            className={cn(buttonVariants({ size: "lg" }), "mt-8")}
          >
            {process.cta.label}
          </Link>
        </motion.div>

        <ol className="relative space-y-0">
          <div
            aria-hidden
            className="bg-border absolute top-3 bottom-3 left-[1.15rem] w-px sm:left-[1.35rem]"
          />
          {process.steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={reduceMotion ? false : { opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative grid gap-4 py-6 pl-12 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-8 sm:py-8 sm:pl-16"
            >
              <span
                aria-hidden
                className="border-background bg-primary text-primary-foreground absolute top-7 left-0 grid size-9 place-items-center rounded-full text-xs font-semibold shadow-sm sm:top-8 sm:size-11 sm:text-sm"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="font-heading text-accent-foreground/70 hidden text-5xl font-semibold tracking-tight sm:block md:text-6xl">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="border-border/60 bg-card/60 rounded-2xl border p-5 sm:border-0 sm:bg-transparent sm:p-0">
                <h3 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-base">
                  {step.copy}
                </p>
                <p className="text-primary mt-3 text-sm font-medium tracking-tight">
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
