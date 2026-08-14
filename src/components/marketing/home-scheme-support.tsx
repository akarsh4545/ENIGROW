"use client";

import { motion, useReducedMotion } from "framer-motion";

import {
  revealContainer,
  revealItemFast,
} from "@/components/marketing/home-motion";
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
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.35 }}
          variants={revealContainer}
        >
          {schemeSupport.metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              variants={revealItemFast}
              className={cn(
                "group px-2 py-6 transition duration-200 sm:px-5 sm:py-2",
                index > 0 &&
                  "border-t border-[#e2e6ef] sm:border-t-0 sm:border-l",
              )}
            >
              <dd className="font-heading text-3xl font-bold tracking-tight text-[#001848] transition duration-200 group-hover:text-[#0a2a6e] sm:text-[2.15rem]">
                {metric.value}
              </dd>
              <dt className="mt-2 text-sm font-semibold text-[#0b1220]">
                {metric.label}
              </dt>
              <p className="mt-1 text-xs text-[#5b6577]">{metric.note}</p>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
