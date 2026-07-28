"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { homeEase } from "@/components/marketing/home-motion";
import { HomeBackdrop } from "@/components/marketing/home-backdrop";
import { homeContent } from "@/data/home";
import { ROUTES } from "@/constants/routes";

export function HomeSchemeSupport() {
  const reduceMotion = useReducedMotion();
  const { schemeSupport } = homeContent;

  return (
    <section className="border-border/70 bg-primary text-primary-foreground relative overflow-hidden border-b">
      <HomeBackdrop variant="teal" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: homeEase }}
          >
            <p className="text-accent text-sm font-medium tracking-[0.18em] uppercase">
              {schemeSupport.eyebrow}
            </p>
            <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
              {schemeSupport.title}
            </h2>
            <p className="text-primary-foreground/80 mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
              {schemeSupport.support}
            </p>
            <Link
              href={ROUTES.schemes}
              className="text-accent mt-7 inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-2.5"
            >
              Explore facilitated schemes
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>

          <motion.p
            className="text-primary-foreground/65 text-sm leading-relaxed lg:text-right"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            Typical bands for common MSME pathways — final eligibility and
            timelines always depend on scheme rules and reviewing authorities.
          </motion.p>
        </div>

        <dl className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {schemeSupport.metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
                ease: homeEase,
              }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="border-primary-foreground/12 bg-primary-foreground/8 hover:border-accent/40 hover:bg-primary-foreground/12 rounded-2xl border p-5 transition duration-300"
            >
              <dt className="text-primary-foreground/65 text-[11px] font-medium tracking-[0.16em] uppercase">
                {metric.label}
              </dt>
              <dd className="font-heading mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                {metric.value}
              </dd>
              <p className="text-primary-foreground/60 mt-2 text-xs">
                {metric.note}
              </p>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
