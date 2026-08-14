"use client";

import { motion, useReducedMotion } from "framer-motion";

import { homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { cn } from "@/lib/utils";

export function HomeSchemeSupport() {
  const reduceMotion = useReducedMotion();
  const { schemeSupport } = homeContent;

  return (
    <section className="relative overflow-hidden border-b border-[#e2e6ef] bg-white">
      <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <motion.dl
          className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: homeEase }}
        >
          {schemeSupport.metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={cn(
                "px-2 py-6 sm:px-5 sm:py-2",
                index > 0 &&
                  "border-t border-[#e2e6ef] sm:border-t-0 sm:border-l",
              )}
            >
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.07,
                  ease: homeEase,
                }}
              >
                <dd className="font-heading text-3xl font-bold tracking-tight text-[#001848] sm:text-[2.15rem]">
                  {metric.value}
                </dd>
                <dt className="mt-2 text-sm font-semibold text-[#0b1220]">
                  {metric.label}
                </dt>
                <p className="mt-1 text-xs text-[#5b6577]">{metric.note}</p>
              </motion.div>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
