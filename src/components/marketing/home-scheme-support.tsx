"use client";

import { motion, useReducedMotion } from "framer-motion";

import {
  revealContainer,
  revealItemFast,
  useCountUp,
} from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { cn } from "@/lib/utils";

function MetricValue({ value, label }: { value: string; label: string }) {
  const reduceMotion = useReducedMotion();

  // Animate simple percentage metrics; leave ranges as static brand copy.
  const percentMatch = value.match(/^(\d+(?:\.\d+)?)%$/);
  const { ref, value: counted } = useCountUp({
    end: percentMatch ? Number(percentMatch[1]) : 0,
    duration: 1.35,
    enabled: Boolean(percentMatch) && !reduceMotion,
  });

  if (percentMatch) {
    return (
      <dd
        ref={ref}
        className="font-heading text-3xl font-bold tracking-tight text-[#001848] transition duration-200 group-hover:text-[#0a2a6e] sm:text-[2.15rem]"
      >
        {Math.round(counted)}%<span className="sr-only"> {label}</span>
      </dd>
    );
  }

  return (
    <dd className="font-heading text-3xl font-bold tracking-tight text-[#001848] transition duration-200 group-hover:text-[#0a2a6e] sm:text-[2.15rem]">
      {value}
    </dd>
  );
}

const TICKER_ITEMS = [
  "PMEGP",
  "CGTMSE",
  "MUDRA",
  "Stand-Up India",
  "MSME Registration",
  "GST",
  "Company Registration",
  "Trademark",
] as const;

export function HomeSchemeSupport() {
  const reduceMotion = useReducedMotion();
  const { schemeSupport } = homeContent;
  const loop = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section className="relative overflow-hidden border-b border-[#e2e6ef] bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.06),_transparent_55%)]"
      />

      {/* Quiet motion strip — schemes & services */}
      <div className="relative border-b border-[#e2e6ef]/80 bg-[#f7f8fc]/90">
        <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-hidden px-4 py-3 sm:px-6">
          <p className="shrink-0 text-[10px] font-semibold tracking-[0.16em] text-[#5b6577] uppercase">
            We help with
          </p>
          <div
            className="relative min-w-0 flex-1 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <motion.div
              className="flex w-max gap-8"
              animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 28, repeat: Infinity, ease: "linear" }
              }
            >
              {loop.map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="text-sm font-semibold whitespace-nowrap text-[#001848]/75"
                >
                  {item}
                  <span className="ml-8 text-[#c08418]/50" aria-hidden>
                    •
                  </span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

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
              whileHover={reduceMotion ? undefined : { y: -3 }}
              className={cn(
                "group relative px-2 py-6 transition duration-200 sm:px-5 sm:py-2",
                index > 0 &&
                  "border-t border-[#e2e6ef] sm:border-t-0 sm:border-l",
              )}
            >
              <span
                aria-hidden
                className="absolute top-0 left-5 h-0.5 w-0 rounded-full bg-gradient-to-r from-[#c08418] to-[#7c3aed] transition-all duration-300 group-hover:w-10 sm:left-5"
              />
              <MetricValue value={metric.value} label={metric.label} />
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
