"use client";

import { motion, useReducedMotion } from "framer-motion";

import { HomeBackdrop } from "@/components/marketing/home-backdrop";
import { homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";

export function HomeSchemeSupport() {
  const reduceMotion = useReducedMotion();
  const { schemeSupport } = homeContent;

  return (
    <section className="border-border/70 bg-primary text-primary-foreground relative overflow-hidden border-b">
      <HomeBackdrop variant="teal" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <motion.div
          className="max-w-2xl"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: homeEase }}
        >
          <p className="text-accent text-sm font-medium tracking-[0.18em] uppercase">
            {schemeSupport.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {schemeSupport.title}
          </h2>
          <p className="text-primary-foreground/80 mt-4 max-w-xl text-base leading-relaxed">
            {schemeSupport.support}
          </p>
        </motion.div>

        <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {schemeSupport.metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
                ease: homeEase,
              }}
              className="border-primary-foreground/10 border-t pt-5"
            >
              <dt className="text-primary-foreground/55 text-[11px] font-medium tracking-[0.16em] uppercase">
                {metric.label}
              </dt>
              <dd className="font-heading mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.65rem]">
                {metric.value}
              </dd>
              <p className="text-primary-foreground/55 mt-2 text-xs">
                {metric.note}
              </p>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
