"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { caseStudiesContent } from "@/data/careers-case-studies";
import { ROUTES } from "@/constants/routes";

export function CaseStudiesIndexContent() {
  const reduceMotion = useReducedMotion();
  const { title, headline, support, items } = caseStudiesContent;

  return (
    <>
      <section className="border-border/70 relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,color-mix(in_oklch,var(--accent)_22%,transparent),transparent_40%),linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_65%,transparent),transparent)]"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <motion.div
            className="max-w-3xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
              {title}
            </p>
            <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              {headline}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              {support}
            </p>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <ul className="divide-border/80 border-border/80 divide-y border-y">
            {items.map((item, index) => (
              <motion.li
                key={item.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={`${ROUTES.caseStudies}/${item.slug}`}
                  className="group grid gap-3 py-7 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:items-center sm:gap-8"
                >
                  <span className="text-muted-foreground text-xs tracking-wide uppercase">
                    {item.industry}
                  </span>
                  <span>
                    <span className="font-heading group-hover:text-primary block text-2xl font-semibold tracking-tight transition">
                      {item.title}
                    </span>
                    <span className="text-muted-foreground mt-2 block text-sm">
                      {item.summary}
                    </span>
                    <span className="text-primary mt-2 block text-xs">
                      {item.outcome}
                    </span>
                  </span>
                  <ArrowUpRight className="text-muted-foreground group-hover:text-primary size-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
