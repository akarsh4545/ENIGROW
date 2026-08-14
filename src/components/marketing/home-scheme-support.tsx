"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { ROUTES } from "@/constants/routes";

export function HomeSchemeSupport() {
  const reduceMotion = useReducedMotion();
  const { schemeSupport } = homeContent;

  return (
    <section className="relative overflow-hidden border-b border-[#0B1F33]/[0.06] bg-[#0B1F33] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 15% 20%, rgba(24,184,120,0.22), transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(231,247,239,0.08), transparent 45%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: homeEase }}
          >
            <p className="text-sm font-semibold tracking-[0.18em] text-[#18B878] uppercase">
              {schemeSupport.eyebrow}
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
              {schemeSupport.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {schemeSupport.support}
            </p>
            <Link
              href={ROUTES.schemes}
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#18B878] transition hover:gap-2.5"
            >
              Explore facilitated schemes
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>

          <motion.p
            className="text-sm leading-relaxed text-white/55 lg:text-right"
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
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition duration-300 hover:border-[#18B878]/40 hover:bg-white/[0.09]"
            >
              <dt className="text-[11px] font-medium tracking-[0.16em] text-white/60 uppercase">
                {metric.label}
              </dt>
              <dd className="font-heading mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                {metric.value}
              </dd>
              <p className="mt-2 text-xs text-white/50">{metric.note}</p>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
