"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BadgePercent,
  Clock3,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";

const metricIcons: Record<string, LucideIcon> = {
  "Funding range": Wallet,
  "Processing time": Clock3,
  "CGTMSE coverage": ShieldCheck,
  "PMEGP subsidy": BadgePercent,
};

export function HomeSchemeSupport() {
  const reduceMotion = useReducedMotion();
  const { schemeSupport } = homeContent;

  return (
    <section className="relative overflow-hidden border-b border-[#e2e6ef] bg-[#f2f4f9]">
      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: homeEase }}
        >
          <p className="text-sm font-semibold tracking-[0.18em] text-[#c08418] uppercase">
            Funding at a glance
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-balance text-[#001848] sm:text-4xl">
            Numbers that matter to Indian businesses
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5b6577]">
            Typical bands for common MSME pathways — final eligibility and
            timelines depend on scheme rules and reviewing authorities.
          </p>
        </motion.div>

        <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {schemeSupport.metrics.map((metric, index) => {
            const Icon = metricIcons[metric.label] ?? Wallet;
            return (
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
                whileHover={reduceMotion ? undefined : { y: -4 }}
                className="rounded-[1.35rem] border border-[#e2e6ef] bg-white p-6 shadow-[0_12px_40px_-28px_rgba(0,24,72,0.28)] transition duration-300 hover:border-[#001848]/20 hover:shadow-[0_22px_50px_-22px_rgba(0,24,72,0.32)]"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-[#001848]/[0.06] text-[#001848]">
                  <Icon className="size-5" aria-hidden />
                </span>
                <dd className="font-heading mt-5 text-3xl font-bold tracking-tight text-[#001848] sm:text-[2rem]">
                  {metric.value}
                </dd>
                <dt className="mt-2 text-sm font-semibold text-[#0b1220]">
                  {metric.label}
                </dt>
                <p className="mt-1 text-xs text-[#5b6577]">{metric.note}</p>
              </motion.div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
