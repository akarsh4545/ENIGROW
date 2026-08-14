"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const schemeBadges = ["PMEGP", "CGTMSE", "MUDRA"] as const;

export function HomeFundingHero({
  onCheckEligibility,
}: {
  onCheckEligibility?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const { schemeSupport, hero } = homeContent;

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
    "h-12 rounded-[1.15rem] px-6 text-base shadow-[0_16px_36px_-16px_color-mix(in_oklch,var(--primary)_45%,transparent)]",
  );

  return (
    <section className="relative isolate overflow-hidden bg-[#f7f8fb]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_55%),radial-gradient(ellipse_at_bottom_right,color-mix(in_oklch,var(--accent)_14%,transparent),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in oklch, var(--primary) 70%, transparent) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24">
        <div className="max-w-xl">
          <motion.p
            className="text-primary text-sm font-medium tracking-[0.18em] uppercase"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: homeEase }}
          >
            Business funding &amp; growth advisory
          </motion.p>

          <motion.h1
            className="font-heading text-foreground mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-[3.15rem] md:leading-[1.12]"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: homeEase }}
          >
            Turn Your Business Ambition Into Funded Growth.
          </motion.h1>

          <motion.p
            className="text-muted-foreground mt-5 max-w-lg text-base leading-relaxed sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: homeEase }}
          >
            {hero.support}
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
                Check Your Eligibility
                <ArrowRight className="size-4 transition group-hover/button:translate-x-0.5" />
              </button>
            ) : (
              <Link href={ROUTES.eligibility} className={primaryCtaClass}>
                Check Your Eligibility
                <ArrowRight className="size-4 transition group-hover/button:translate-x-0.5" />
              </Link>
            )}
            <Link
              href={ROUTES.funding}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                homeCtaClass,
                "h-12 rounded-[1.15rem] px-5 text-base",
              )}
            >
              Explore Funding Options
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: homeEase }}
        >
          <div className="border-border/60 relative overflow-hidden rounded-[1.75rem] border bg-[linear-gradient(160deg,#001848_0%,#0a2a6e_48%,#123a7a_100%)] p-6 shadow-[0_32px_70px_-30px_color-mix(in_oklch,var(--primary)_55%,transparent)] sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-[color-mix(in_oklch,var(--accent)_28%,transparent)] blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 size-40 rounded-full bg-[color-mix(in_oklch,white_8%,transparent)] blur-2xl"
            />

            <p className="relative text-[11px] font-medium tracking-[0.18em] text-white/55 uppercase">
              Funding solutions
            </p>
            <p className="font-heading relative mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {fundingRange}
            </p>
            <p className="relative mt-2 text-sm text-white/70">
              Government schemes &amp; institutional pathways
            </p>

            <div className="relative mt-6 flex flex-wrap gap-2">
              {schemeBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="relative mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <svg viewBox="0 0 320 120" className="h-auto w-full" aria-hidden>
                <defs>
                  <linearGradient
                    id="heroChartFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#c08418" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#c08418" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 92 C40 88 55 70 90 66 C125 62 140 78 175 52 C210 26 235 34 270 22 C295 14 310 18 320 12 L320 120 L0 120 Z"
                  fill="url(#heroChartFill)"
                />
                <path
                  d="M0 92 C40 88 55 70 90 66 C125 62 140 78 175 52 C210 26 235 34 270 22 C295 14 310 18 320 12"
                  fill="none"
                  stroke="#c08418"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="175" cy="52" r="4" fill="#c08418" />
                <circle cx="270" cy="22" r="4" fill="#fff" />
              </svg>
              <p className="mt-2 text-xs text-white/55">
                Illustrative growth trajectory — not a performance guarantee
              </p>
            </div>
          </div>

          <motion.div
            className="border-border/50 absolute -top-3 right-2 rounded-2xl border bg-white px-3.5 py-2.5 shadow-[0_14px_34px_-18px_color-mix(in_oklch,var(--primary)_35%,transparent)] sm:top-6 sm:-right-3"
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="text-muted-foreground text-[10px] tracking-[0.14em] uppercase">
              PMEGP subsidy
            </p>
            <p className="font-heading text-primary text-lg font-semibold tracking-tight">
              {pmegp}
            </p>
          </motion.div>

          <motion.div
            className="border-border/50 absolute bottom-[38%] -left-2 hidden rounded-2xl border bg-white px-3.5 py-2.5 shadow-[0_14px_34px_-18px_color-mix(in_oklch,var(--primary)_35%,transparent)] sm:block lg:-left-5"
            animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={{
              duration: 6.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          >
            <p className="text-muted-foreground text-[10px] tracking-[0.14em] uppercase">
              CGTMSE cover
            </p>
            <p className="font-heading text-primary text-lg font-semibold tracking-tight">
              Up to {cgtmse}
            </p>
          </motion.div>

          <motion.div
            className="border-border/50 absolute right-4 -bottom-4 rounded-2xl border bg-white px-3.5 py-2.5 shadow-[0_14px_34px_-18px_color-mix(in_oklch,var(--primary)_35%,transparent)] sm:right-8 sm:-bottom-5"
            animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={{
              duration: 5.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <p className="text-muted-foreground text-[10px] tracking-[0.14em] uppercase">
              Typical timeline
            </p>
            <p className="font-heading text-foreground text-lg font-semibold tracking-tight">
              {processing}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
