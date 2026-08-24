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

const HERO_PHOTO = {
  src: "/images/hero-entrepreneur.jpg",
  alt: "Indian entrepreneur in a modern office preparing for business growth",
} as const;

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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, #ffffff 0%, #f7f8fb 40%, #eef1f8 78%, #e8ecf8 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-16 size-[28rem] rounded-full bg-[#001848]/[0.05] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[8%] right-[-6%] size-[24rem] rounded-full bg-[#c08418]/[0.08] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,24,72,0.1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at 72% 42%, black 8%, transparent 68%)",
        }}
      />

      <div className="relative mx-auto grid min-h-[min(760px,90dvh)] w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:py-20 xl:gap-12">
        {/* Left copy — largely unchanged */}
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
                className="rounded-2xl border border-[#e2e6ef] bg-white/90 px-4 py-3.5 shadow-[0_12px_32px_-22px_rgba(0,24,72,0.22)] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5"
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

        {/* Right visual — realistic photo + refined floating cards */}
        <motion.div
          className="relative z-[1] mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none lg:justify-self-end"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: homeEase }}
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[480px] sm:aspect-[5/6] lg:ml-auto lg:aspect-[4/4.8] lg:max-w-[540px]">
            {/* Soft glow — not a solid navy box */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-[10%] right-[6%] left-[10%] h-[72%] rounded-full bg-[#001848]/[0.07] blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute top-[28%] right-[18%] size-40 rounded-full bg-[#c08418]/[0.12] blur-3xl"
            />

            {/* Photo stage — edge fade into page background */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute inset-0"
                initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.85, ease: homeEase }}
              >
                <Image
                  src={HERO_PHOTO.src}
                  alt={HERO_PHOTO.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 540px"
                  className="object-cover object-[center_12%]"
                />
              </motion.div>
              {/* Blend edges into light hero background */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `
                    linear-gradient(90deg, #f7f8fb 0%, rgba(247,248,251,0.72) 8%, transparent 28%),
                    linear-gradient(270deg, #eef1f8 0%, rgba(238,241,248,0.55) 10%, transparent 32%),
                    linear-gradient(180deg, #f7f8fb 0%, transparent 14%),
                    linear-gradient(0deg, #eef1f8 0%, rgba(238,241,248,0.85) 12%, transparent 38%)
                  `,
                }}
              />
            </div>

            {/* Tiny growth accent — not a large crossing chart */}
            <motion.svg
              viewBox="0 0 120 40"
              className="pointer-events-none absolute top-[42%] right-[8%] z-[2] hidden h-9 w-28 opacity-80 sm:block"
              aria-hidden
              initial={reduceMotion ? false : { opacity: 0, pathLength: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.path
                d="M4 32 C24 30 34 18 52 16 C72 13 84 24 100 8 L116 4"
                fill="none"
                stroke="#c08418"
                strokeWidth="2.25"
                strokeLinecap="round"
                initial={reduceMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 0.55, ease: homeEase }}
              />
              <circle cx="116" cy="4" r="3" fill="#c08418" />
            </motion.svg>

            {/* Funding Approved */}
            <motion.div
              className="absolute top-[5%] right-0 z-[3] w-[min(92%,200px)] rounded-2xl bg-white/95 p-3 shadow-[0_16px_40px_-18px_rgba(0,24,72,0.35)] ring-1 ring-[#001848]/[0.06] backdrop-blur-md sm:top-[7%] sm:right-[-1%] sm:w-[214px] sm:p-3.5"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: homeEase }}
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-[#c08418] uppercase">
                    Funding Approved
                  </p>
                  <span className="grid size-6 place-items-center rounded-full bg-[#c08418]/10 text-[#c08418]">
                    <TrendingUp className="size-3" aria-hidden />
                  </span>
                </div>
                <p className="font-heading mt-1.5 text-xl font-bold tracking-tight text-[#001848] sm:text-2xl">
                  ₹25,00,000
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-[#5b6577]">
                  Business Expansion Loan
                </p>
                <svg
                  viewBox="0 0 160 28"
                  className="mt-2.5 h-6 w-full"
                  aria-hidden
                >
                  <path
                    d="M2 22 C22 20 34 12 52 11 C74 9 88 18 108 8 C122 2 138 6 158 3"
                    fill="none"
                    stroke="#c08418"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2 22 C22 20 34 12 52 11 C74 9 88 18 108 8 C122 2 138 6 158 3 L158 28 L2 28 Z"
                    fill="#c08418"
                    opacity="0.1"
                  />
                </svg>
              </motion.div>
            </motion.div>

            {/* Verification — smaller, less dominant; hide on very small screens */}
            <motion.div
              className="absolute bottom-[22%] left-0 z-[3] hidden w-[210px] rounded-2xl bg-white/95 p-3 shadow-[0_14px_36px_-18px_rgba(0,24,72,0.32)] ring-1 ring-[#001848]/[0.05] backdrop-blur-md sm:bottom-[20%] sm:left-[-2%] sm:block sm:w-[220px] sm:p-3.5"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48, ease: homeEase }}
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <p className="text-[9px] font-semibold tracking-[0.14em] text-[#5b6577] uppercase">
                  Verification
                </p>
                <ul className="mt-2 space-y-1.5">
                  {verificationItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-1.5 text-[10px] leading-snug font-medium text-[#0b1220] sm:text-[11px]"
                    >
                      <CheckCircle2
                        className="mt-0.5 size-3 shrink-0 text-[#c08418]"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Growth Partner */}
            <motion.div
              className="absolute right-[2%] bottom-[3%] z-[3] flex w-[min(92%,220px)] items-start gap-2.5 rounded-2xl bg-gradient-to-br from-[#001848] to-[#0a2a6e] p-3 text-white shadow-[0_18px_40px_-20px_rgba(0,24,72,0.5)] sm:right-[4%] sm:bottom-[2%] sm:w-[236px] sm:gap-3 sm:p-3.5"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.58, ease: homeEase }}
            >
              <motion.div
                className="flex w-full items-start gap-2.5 sm:gap-3"
                animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                transition={{
                  duration: 5.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.9,
                }}
              >
                <div className="relative mt-0.5 size-9 shrink-0 overflow-hidden rounded-lg bg-white/10 p-1">
                  <Image
                    src="/brand/enigrow-logo.png"
                    alt=""
                    width={36}
                    height={36}
                    className="size-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p className="flex items-center gap-1 text-[11px] font-bold tracking-tight sm:text-xs">
                    Your Growth Partner
                    <ArrowUpRight
                      className="size-3 text-[#c08418]"
                      aria-hidden
                    />
                  </p>
                  <p className="mt-0.5 text-[10px] leading-snug text-white/70 sm:text-[11px]">
                    From Registration to Funding, We&apos;ve Got You Covered!
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
