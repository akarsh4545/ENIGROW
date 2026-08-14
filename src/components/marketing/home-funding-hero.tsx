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

  return (
    <section className="relative isolate overflow-hidden bg-[#020817]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 15% 20%, rgba(0,24,72,0.95), transparent 60%), radial-gradient(ellipse 55% 50% at 85% 30%, rgba(192,132,24,0.18), transparent 55%), radial-gradient(ellipse 40% 40% at 60% 90%, rgba(0,40,100,0.45), transparent 50%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at 70% 40%, black 10%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-24">
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
            className="font-heading mt-5 text-[2.75rem] leading-[1.05] font-bold tracking-tight text-balance text-white sm:text-5xl md:text-[3.65rem] md:leading-[1.04]"
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

        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: homeEase }}
        >
          {/* Growth chart backdrop */}
          <div
            aria-hidden
            className="absolute inset-[8%] overflow-hidden rounded-[1.75rem] opacity-40"
          >
            <svg viewBox="0 0 400 320" className="h-full w-full">
              <defs>
                <linearGradient id="pass2Fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c08418" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#c08418" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[60, 120, 180, 240].map((y) => (
                <line
                  key={y}
                  x1="20"
                  x2="380"
                  y1={y}
                  y2={y}
                  stroke="white"
                  strokeOpacity="0.08"
                />
              ))}
              <path
                d="M20 250 C80 240 110 200 160 180 C210 160 240 190 280 120 C320 50 350 70 380 40 L380 300 L20 300 Z"
                fill="url(#pass2Fill)"
              />
              <path
                d="M20 250 C80 240 110 200 160 180 C210 160 240 190 280 120 C320 50 350 70 380 40"
                fill="none"
                stroke="#c08418"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Central funding card */}
          <div className="relative z-[1] mx-auto max-w-sm overflow-hidden rounded-[1.75rem] border border-white/15 bg-gradient-to-br from-[#001848] to-[#0a2a6e] p-7 shadow-[0_32px_70px_-28px_rgba(0,0,0,0.7)] sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-12 -right-10 size-44 rounded-full bg-[#c08418]/25 blur-3xl"
            />
            <p className="relative text-[11px] font-semibold tracking-[0.18em] text-white/50 uppercase">
              Funding solutions
            </p>
            <p className="font-heading relative mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {fundingRange}
            </p>
            <p className="relative mt-2 text-sm text-white/65">
              Government schemes &amp; institutional pathways
            </p>
            <div className="relative mt-6 flex flex-wrap gap-2">
              {["PMEGP", "CGTMSE", "MUDRA"].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            className="absolute top-2 right-0 z-[2] rounded-2xl border border-white/10 bg-white px-3.5 py-2.5 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.45)] sm:top-8 sm:-right-2"
            animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="text-[10px] font-semibold tracking-[0.14em] text-[#5b6577] uppercase">
              PMEGP
            </p>
            <p className="font-heading text-lg font-bold tracking-tight text-[#001848]">
              {pmegp}{" "}
              <span className="text-sm font-semibold text-[#5b6577]">
                subsidy
              </span>
            </p>
          </motion.div>

          <motion.div
            className="absolute bottom-[36%] -left-1 z-[2] hidden rounded-2xl border border-white/10 bg-white px-3.5 py-2.5 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.45)] sm:block lg:-left-4"
            animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.25,
            }}
          >
            <p className="text-[10px] font-semibold tracking-[0.14em] text-[#5b6577] uppercase">
              CGTMSE
            </p>
            <p className="font-heading text-lg font-bold tracking-tight text-[#001848]">
              Up to {cgtmse}{" "}
              <span className="text-sm font-semibold text-[#5b6577]">
                coverage
              </span>
            </p>
          </motion.div>

          <motion.div
            className="absolute right-3 -bottom-3 z-[2] rounded-2xl border border-white/10 bg-white px-3.5 py-2.5 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.45)] sm:right-6 sm:-bottom-4"
            animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
            transition={{
              duration: 5.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.45,
            }}
          >
            <p className="text-[10px] font-semibold tracking-[0.14em] text-[#5b6577] uppercase">
              MUDRA · Timeline
            </p>
            <p className="font-heading text-lg font-bold tracking-tight text-[#001848]">
              {processing}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
