"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { cn } from "@/lib/utils";

export function HomeSuccessStories() {
  const reduceMotion = useReducedMotion();
  const { successStories } = homeContent;

  return (
    <section className="border-border/70 relative overflow-hidden border-b">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,color-mix(in_oklch,var(--accent)_16%,transparent),transparent_42%),linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_55%,transparent),transparent)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: homeEase }}
        >
          <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
            {successStories.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
            {successStories.title}
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
            {successStories.support}
          </p>
        </motion.div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {successStories.items.map((item, index) => (
            <motion.li
              key={item.name}
              className="border-border/70 bg-card group hover:border-primary/30 relative flex flex-col overflow-hidden rounded-[1.25rem] border p-6 shadow-[0_12px_36px_-28px_color-mix(in_oklch,var(--primary)_30%,transparent)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_22px_48px_-22px_color-mix(in_oklch,var(--primary)_42%,transparent)]"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: homeEase,
              }}
            >
              <Quote
                className="text-primary/20 group-hover:text-primary/35 absolute top-5 right-5 size-8 transition"
                aria-hidden
              />

              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className={cn(
                    "grid size-11 place-items-center rounded-xl text-sm font-semibold transition duration-300 group-hover:scale-105",
                    index % 2 === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground",
                  )}
                >
                  {item.initials}
                </span>
                <div>
                  <p className="font-heading text-lg font-semibold tracking-tight">
                    {item.name}
                  </p>
                  <p className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
                    {item.role}
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground mt-5 flex-1 text-sm leading-relaxed sm:text-[0.95rem]">
                “{item.quote}”
              </p>

              <dl className="border-border/70 mt-6 grid grid-cols-3 gap-2 border-t pt-4">
                {item.metrics.map((metric, metricIndex) => (
                  <motion.div
                    key={metric.label}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2 + metricIndex * 0.06,
                      duration: 0.35,
                    }}
                  >
                    <dd className="font-heading text-sm font-semibold tracking-tight sm:text-base">
                      {metric.value}
                    </dd>
                    <dt className="text-muted-foreground mt-1 text-[0.65rem] tracking-[0.12em] uppercase">
                      {metric.label}
                    </dt>
                  </motion.div>
                ))}
              </dl>
            </motion.li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Link
            href={successStories.cta.href}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              homeCtaClass,
            )}
          >
            {successStories.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
