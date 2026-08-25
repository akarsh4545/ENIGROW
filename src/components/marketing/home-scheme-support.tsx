"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  FileCheck2,
  Landmark,
  PiggyBank,
  Shield,
  ShieldCheck,
  Stamp,
  type LucideIcon,
} from "lucide-react";

import {
  revealContainer,
  revealItemFast,
  useCountUp,
} from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { cn } from "@/lib/utils";

function MetricValue({ value, label }: { value: string; label: string }) {
  const reduceMotion = useReducedMotion();

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

const HELP_ITEMS: ReadonlyArray<{ label: string; icon: LucideIcon }> = [
  { label: "PMEGP", icon: Landmark },
  { label: "CGTMSE", icon: ShieldCheck },
  { label: "MUDRA", icon: PiggyBank },
  { label: "Stand-Up India", icon: Landmark },
  { label: "MSME Registration", icon: BadgeCheck },
  { label: "GST", icon: FileCheck2 },
  { label: "Company Registration", icon: Building2 },
  { label: "Trademark", icon: Shield },
  { label: "ISO Certification", icon: Stamp },
];

export function HomeSchemeSupport() {
  const reduceMotion = useReducedMotion();
  const { schemeSupport } = homeContent;
  const loop = [...HELP_ITEMS, ...HELP_ITEMS];

  return (
    <section className="relative overflow-hidden border-b border-[#e2e6ef] bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.06),_transparent_55%)]"
      />

      {/* Funding range / metrics layer */}
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

      {/* We help with — below funding metrics */}
      <div className="relative border-t border-[#e2e6ef]/90 bg-gradient-to-r from-[#001848] via-[#0a2a6e] to-[#001848]">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(192,132,24,0.35), transparent 40%), radial-gradient(circle at 80% 50%, rgba(124,58,237,0.25), transparent 42%)",
          }}
          animate={reduceMotion ? undefined : { opacity: [0.28, 0.5, 0.28] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto flex max-w-6xl items-center gap-4 overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
          <motion.p
            className="shrink-0 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-[#c08418] uppercase backdrop-blur-sm"
            animate={
              reduceMotion
                ? undefined
                : {
                    boxShadow: [
                      "0 0 0 0 rgba(192,132,24,0)",
                      "0 0 0 6px rgba(192,132,24,0.12)",
                      "0 0 0 0 rgba(192,132,24,0)",
                    ],
                  }
            }
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            We help with
          </motion.p>

          <div
            className="relative min-w-0 flex-1 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }}
          >
            <motion.div
              className="flex w-max gap-3"
              animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 22, repeat: Infinity, ease: "linear" }
              }
            >
              {loop.map((item, i) => {
                const Icon = item.icon;
                return (
                  <span
                    key={`${item.label}-${i}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap text-white/90 backdrop-blur-sm"
                  >
                    <Icon className="size-3.5 text-[#c08418]" aria-hidden />
                    {item.label}
                  </span>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
