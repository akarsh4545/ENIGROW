"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

function HeroGrowthChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 160" className={className} aria-hidden fill="none">
      <defs>
        <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c08418" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#c08418" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="heroChartStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#001848" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#c08418" />
        </linearGradient>
      </defs>
      <path
        d="M8 128 C48 122 72 98 108 88 C148 76 168 102 208 64 C236 40 268 48 312 22 L312 152 L8 152 Z"
        fill="url(#heroChartFill)"
      />
      <path
        d="M8 128 C48 122 72 98 108 88 C148 76 168 102 208 64 C236 40 268 48 312 22"
        stroke="url(#heroChartStroke)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="312" cy="22" r="5" fill="#c08418" />
    </svg>
  );
}

function EntrepreneurIllustration() {
  return (
    <div className="relative flex h-full min-h-[320px] w-full items-end justify-center overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#001848] via-[#0a2a6e] to-[#163a8a] sm:min-h-[380px] lg:min-h-[440px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(192,132,24,0.35), transparent 42%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.12), transparent 40%)",
        }}
      />
      <HeroGrowthChart className="pointer-events-none absolute right-[-6%] bottom-[18%] h-[42%] w-[70%] opacity-70" />

      {/* Stylized entrepreneur — brand-safe SVG composition (no stock photo) */}
      <svg
        viewBox="0 0 280 340"
        className="relative z-[1] h-[92%] w-auto max-w-[78%]"
        role="img"
        aria-label="Illustration of an Indian entrepreneur growing a business"
      >
        <defs>
          <linearGradient id="heroFigure" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7f8fb" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#dbe2f0" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {/* Soft podium */}
        <ellipse cx="140" cy="318" rx="92" ry="14" fill="rgba(0,0,0,0.18)" />
        {/* Body */}
        <path
          d="M78 310 C78 230 92 188 140 188 C188 188 202 230 202 310 Z"
          fill="url(#heroFigure)"
        />
        {/* Jacket lapel */}
        <path
          d="M118 210 C128 236 132 270 134 310 L106 310 C104 268 98 232 88 208 Z"
          fill="#001848"
          opacity="0.55"
        />
        <path
          d="M162 210 C152 236 148 270 146 310 L174 310 C176 268 182 232 192 208 Z"
          fill="#001848"
          opacity="0.55"
        />
        {/* Head */}
        <circle cx="140" cy="138" r="46" fill="#f0d5b8" />
        {/* Hair */}
        <path
          d="M96 132 C98 96 118 84 140 84 C162 84 182 96 184 132 C168 118 152 114 140 114 C128 114 112 118 96 132 Z"
          fill="#1a1408"
        />
        {/* Shirt collar */}
        <path
          d="M118 188 L140 208 L162 188 L152 198 L140 192 L128 198 Z"
          fill="#ffffff"
          opacity="0.9"
        />
        {/* Gold accent pin */}
        <circle cx="152" cy="236" r="4" fill="#c08418" />
      </svg>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#001848]/50 to-transparent"
      />
    </div>
  );
}

export function HomeFundingHero({
  onCheckEligibility: _onCheckEligibility,
}: {
  /** Kept for API compatibility; eligibility stays in navbar / visit popup — not in hero CTAs. */
  onCheckEligibility?: () => void;
}) {
  void _onCheckEligibility;
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

  const metrics = [
    { value: fundingRange, label: "Funding Support" },
    { value: `Up to ${cgtmse}`, label: "CGTMSE Coverage" },
    { value: pmegp, label: "PMEGP Subsidy" },
    { value: processing, label: "Quick Turnaround" },
  ] as const;

  const verificationItems = [
    "MSME Registration — Verified",
    "Business Documents — Verified",
    "KYC Verification — Completed",
    "Loan Eligibility — Approved",
  ] as const;

  return (
    <section className="relative isolate overflow-hidden border-b border-[#e2e6ef]">
      {/* Soft white → light navy/blue wash (brand-aligned, not purple) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, #ffffff 0%, #f7f8fb 38%, #eef1f8 72%, #e4eaf8 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-16 size-[28rem] rounded-full bg-[#001848]/[0.06] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 right-[-8%] size-[26rem] rounded-full bg-[#c08418]/[0.10] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,24,72,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at 70% 40%, black 10%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid min-h-[min(780px,92dvh)] w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:py-20 xl:gap-14">
        {/* Left copy */}
        <div className="relative z-[2] max-w-xl">
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-[#001848]/10 bg-white/80 px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-[#001848] uppercase shadow-[0_8px_24px_-16px_rgba(0,24,72,0.35)] backdrop-blur-sm"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: homeEase }}
          >
            <BadgeCheck className="size-3.5 text-[#c08418]" aria-hidden />
            Business funding &amp; growth across India
          </motion.p>

          <motion.h1
            className="font-heading mt-5 text-[2.35rem] leading-[1.08] font-bold tracking-tight text-balance text-[#001848] sm:text-5xl md:text-[3.25rem] md:leading-[1.05]"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: homeEase }}
          >
            Turn Your Business Ambition Into{" "}
            <span className="bg-gradient-to-r from-[#c08418] via-[#d4a017] to-[#c08418] bg-clip-text text-transparent">
              Funded Growth.
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-lg text-base leading-relaxed text-[#5b6577] sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: homeEase }}
          >
            ENIGROW helps Indian businesses unlock the right opportunities,
            registrations, and funding to grow faster and stronger.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: homeEase }}
          >
            <Link
              href={ROUTES.funding}
              className={cn(
                buttonVariants({ size: "lg" }),
                homeCtaClass,
                "group/button h-12 bg-[#001848] px-7 text-base text-white hover:bg-[#0a2a6e]",
              )}
            >
              Explore Funding Options
              <ArrowRight className="size-4 transition duration-200 group-hover/button:translate-x-1" />
            </Link>
            <Link
              href={ROUTES.contact}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                homeCtaClass,
                "h-12 border-[#001848]/20 bg-white/80 px-6 text-base text-[#001848] hover:border-[#001848]/35 hover:bg-white",
              )}
            >
              Talk to an Expert
            </Link>
          </motion.div>

          <motion.dl
            className="mt-10 grid grid-cols-2 gap-3 sm:gap-4"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: homeEase }}
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="rounded-2xl border border-[#e2e6ef] bg-white/90 px-4 py-3.5 shadow-[0_12px_32px_-22px_rgba(0,24,72,0.28)] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-20px_rgba(0,24,72,0.35)]"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.28 + index * 0.05,
                  ease: homeEase,
                }}
              >
                <dd className="font-heading text-lg font-bold tracking-tight text-[#001848] sm:text-xl">
                  {metric.value}
                </dd>
                <dt className="mt-1 text-[10px] font-semibold tracking-[0.12em] text-[#5b6577] uppercase sm:text-[11px]">
                  {metric.label}
                </dt>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        {/* Right visual composition */}
        <motion.div
          className="relative z-[1] mx-auto w-full max-w-lg lg:max-w-none lg:justify-self-end"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: homeEase }}
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] sm:aspect-[5/6] lg:ml-auto lg:aspect-[4/4.6] lg:max-w-none">
            {/* Glow behind stage */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-[12%] right-[8%] left-[8%] h-[70%] rounded-[2rem] bg-[#001848]/[0.08] blur-2xl"
            />

            <div className="absolute inset-x-[6%] inset-y-[4%] sm:inset-x-[8%]">
              <EntrepreneurIllustration />
            </div>

            {/* Funding Approved card */}
            <motion.div
              className="absolute top-[6%] right-0 z-[3] w-[min(100%,220px)] rounded-2xl border border-white/70 bg-white/95 p-3.5 shadow-[0_18px_44px_-20px_rgba(0,24,72,0.4)] backdrop-blur-md sm:top-[8%] sm:right-[-2%] sm:w-[240px] sm:p-4"
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10px] font-semibold tracking-[0.14em] text-[#c08418] uppercase">
                  Funding Approved
                </p>
                <span className="grid size-7 place-items-center rounded-full bg-[#001848]/[0.06] text-[#001848]">
                  <TrendingUp className="size-3.5" aria-hidden />
                </span>
              </div>
              <p className="font-heading mt-2 text-2xl font-bold tracking-tight text-[#001848]">
                ₹25,00,000
              </p>
              <p className="mt-0.5 text-xs font-medium text-[#5b6577]">
                Business Expansion Loan
              </p>
              <svg viewBox="0 0 180 36" className="mt-3 h-8 w-full" aria-hidden>
                <path
                  d="M2 28 C28 26 40 18 58 16 C82 13 96 24 118 12 C136 3 152 8 178 4"
                  fill="none"
                  stroke="#c08418"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M2 28 C28 26 40 18 58 16 C82 13 96 24 118 12 C136 3 152 8 178 4 L178 36 L2 36 Z"
                  fill="#c08418"
                  opacity="0.12"
                />
              </svg>
            </motion.div>

            {/* Verification card */}
            <motion.div
              className="absolute bottom-[18%] left-0 z-[3] w-[min(100%,230px)] rounded-2xl border border-white/70 bg-white/95 p-3.5 shadow-[0_18px_44px_-20px_rgba(0,24,72,0.38)] backdrop-blur-md sm:bottom-[16%] sm:left-[-2%] sm:w-[250px] sm:p-4"
              animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
              transition={{
                duration: 6.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            >
              <p className="text-[10px] font-semibold tracking-[0.14em] text-[#001848] uppercase">
                Verification Status
              </p>
              <ul className="mt-2.5 space-y-2">
                {verificationItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[11px] leading-snug font-medium text-[#0b1220] sm:text-xs"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-3.5 shrink-0 text-[#c08418]"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Growth partner card */}
            <motion.div
              className="absolute right-0 bottom-[4%] z-[3] flex w-[min(100%,240px)] items-start gap-3 rounded-2xl border border-[#001848]/10 bg-[#001848] p-3.5 text-white shadow-[0_20px_48px_-22px_rgba(0,24,72,0.55)] sm:right-[4%] sm:bottom-[2%] sm:w-[260px] sm:p-4"
              animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={{
                duration: 5.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
            >
              <div className="relative mt-0.5 size-10 shrink-0 overflow-hidden rounded-xl bg-white/10 p-1.5">
                <Image
                  src="/brand/enigrow-logo.png"
                  alt=""
                  width={40}
                  height={40}
                  className="size-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-1 text-xs font-bold tracking-tight">
                  Your Growth Partner
                  <ArrowUpRight
                    className="size-3.5 text-[#c08418]"
                    aria-hidden
                  />
                </p>
                <p className="mt-1 text-[11px] leading-snug text-white/70">
                  From Registration to Funding, We&apos;ve Got You Covered!
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
