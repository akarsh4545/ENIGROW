"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function HomeFundingHero({
  onCheckEligibility,
}: {
  onCheckEligibility?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const { schemeSupport } = homeContent;

  const fundingRange =
    schemeSupport.metrics.find((m) => /funding/i.test(m.label))?.value ??
    "₹10L–₹5Cr";
  const processing =
    schemeSupport.metrics.find((m) => /processing/i.test(m.label))?.value ??
    "7–45 Days";
  const cgtmse =
    schemeSupport.metrics.find((m) => /cgtmse/i.test(m.label))?.value ?? "85%";
  const pmegp =
    schemeSupport.metrics.find((m) => /pmegp/i.test(m.label))?.value ??
    "15–35%";

  const primaryCtaClass = cn(
    buttonVariants({ size: "lg" }),
    homeCtaClass,
    "h-12 bg-[#c08418] px-7 text-base text-[#1a1408] hover:bg-[#c08418]/90",
  );

  const supportMetrics = [
    {
      value: `Up to ${cgtmse}`,
      label: "CGTMSE Coverage",
    },
    {
      value: pmegp,
      label: "PMEGP Subsidy",
    },
    {
      value: processing,
      label: "Typical Timeline",
    },
  ] as const;

  return (
    <section className="relative isolate overflow-hidden bg-[#020817]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 15% 20%, rgba(0,24,72,0.95), transparent 60%), radial-gradient(ellipse 55% 50% at 85% 30%, rgba(192,132,24,0.16), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at 75% 35%, black 8%, transparent 68%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24">
        <div className="max-w-xl">
          <motion.p
            className="text-sm font-semibold tracking-[0.2em] text-[#c08418] uppercase"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: homeEase }}
          >
            Business funding &amp; growth
          </motion.p>

          <motion.h1
            className="font-heading mt-4 text-[2.6rem] leading-[1.06] font-bold tracking-tight text-balance text-white sm:text-5xl md:text-[3.5rem] md:leading-[1.05]"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: homeEase }}
          >
            Turn Your Business Ambition
            <br className="hidden sm:block" /> Into Funded Growth.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: homeEase }}
          >
            Registrations, government schemes, funding readiness, and compliance
            — guided so you can move forward with clarity.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: homeEase }}
          >
            {onCheckEligibility ? (
              <button
                type="button"
                onClick={onCheckEligibility}
                className={primaryCtaClass}
              >
                Check Eligibility
                <ArrowRight className="size-4 transition group-hover/button:translate-x-0.5" />
              </button>
            ) : (
              <Link href={ROUTES.eligibility} className={primaryCtaClass}>
                Check Eligibility
                <ArrowRight className="size-4 transition group-hover/button:translate-x-0.5" />
              </Link>
            )}
            <Link
              href={ROUTES.funding}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                homeCtaClass,
                "h-12 border-white/25 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white",
              )}
            >
              Explore Solutions
            </Link>
          </motion.div>
        </div>

        {/* Metric stack — each figure is a separate labeled card */}
        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: homeEase }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 opacity-30"
          >
            <svg viewBox="0 0 420 280" className="h-full w-full">
              <defs>
                <linearGradient id="heroPolishFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c08418" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#c08418" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M20 220 C90 210 120 170 180 150 C240 130 270 160 320 100 C360 55 390 70 400 50 L400 260 L20 260 Z"
                fill="url(#heroPolishFill)"
              />
              <path
                d="M20 220 C90 210 120 170 180 150 C240 130 270 160 320 100 C360 55 390 70 400 50"
                fill="none"
                stroke="#c08418"
                strokeWidth="2"
                strokeLinecap="round"
                strokeOpacity="0.7"
              />
            </svg>
          </div>

          <div className="relative z-[1] space-y-4">
            {/* Primary metric — funding range only */}
            <div className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-gradient-to-br from-[#001848] to-[#0a2a6e] p-6 shadow-[0_28px_60px_-28px_rgba(0,0,0,0.65)] sm:p-7">
              <p className="font-heading text-4xl font-bold tracking-tight text-white sm:text-[2.75rem]">
                {fundingRange}
              </p>
              <p className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-[#c08418] uppercase">
                Funding Range
              </p>
            </div>

            {/* Supporting metrics — clearly separate cards */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
              {supportMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className="rounded-[1.15rem] border border-white/10 bg-white px-3.5 py-3 shadow-[0_14px_36px_-20px_rgba(0,0,0,0.4)] sm:rounded-[1.2rem] sm:px-4 sm:py-3.5"
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + index * 0.06,
                    ease: homeEase,
                  }}
                >
                  <p className="font-heading text-lg font-bold tracking-tight text-[#001848] sm:text-xl">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold tracking-[0.08em] text-[#5b6577] uppercase sm:text-[11px]">
                    {metric.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
