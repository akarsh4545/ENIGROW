"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Coins,
  Headset,
  Percent,
  Star,
  TrendingUp,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const HERO_PHOTO = {
  src: "/images/hero-entrepreneur.jpg",
  alt: "Indian entrepreneur in a navy blazer working on a laptop in a modern office",
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
    {
      value: fundingRange,
      label: "Funding Support",
      icon: Coins,
      iconClass: "text-[#c08418] bg-[#c08418]/10",
    },
    {
      value: `Up to ${cgtmse}`,
      label: "CGTMSE Coverage",
      icon: BarChart3,
      iconClass: "text-[#2563eb] bg-[#2563eb]/10",
    },
    {
      value: pmegp,
      label: "PMEGP Subsidy",
      icon: Percent,
      iconClass: "text-[#7c3aed] bg-[#7c3aed]/10",
    },
    {
      value: processing,
      label: "Quick Turnaround",
      icon: CalendarDays,
      iconClass: "text-[#5b6577] bg-[#5b6577]/10",
    },
  ] as const;

  const verificationItems = [
    { label: "MSME Registration", status: "Verified" },
    { label: "Business Documents", status: "Verified" },
    { label: "KYC Verification", status: "Completed" },
    { label: "Loan Eligibility", status: "Approved" },
  ] as const;

  return (
    <section className="relative isolate overflow-hidden border-b border-[#e2e6ef] bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, #ffffff 0%, #f8f9fc 50%, #eef0fa 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-10%] right-[0%] size-[26rem] rounded-full bg-[#6366f1]/[0.07] blur-3xl"
      />

      {/* Same max-w + gutters as the navbar — reference “spread” */}
      <div className="relative mx-auto w-full max-w-6xl px-4 pt-12 pb-10 sm:px-6 sm:pt-14 sm:pb-12 lg:pt-16 lg:pb-14">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8 xl:gap-10">
          {/* Left ~50% — copy */}
          <div className="relative z-[2] max-w-xl lg:max-w-none">
            <motion.p
              className="inline-flex items-center gap-2 rounded-full border border-[#001848]/10 bg-[#eef0fa] px-3.5 py-1.5 text-xs font-semibold text-[#001848]"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: homeEase }}
            >
              <Star
                className="size-3.5 fill-[#c08418] text-[#c08418]"
                aria-hidden
              />
              Trusted by 5000+ Businesses Across India
            </motion.p>

            <motion.h1
              className="font-heading mt-5 text-[2.35rem] leading-[1.12] font-bold tracking-tight text-balance text-[#001848] sm:text-[2.75rem] lg:text-[3rem] lg:leading-[1.1] xl:text-[3.25rem]"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: homeEase }}
            >
              Turn Your Business Ambition Into{" "}
              <span className="text-[#c08418]">Funded</span>{" "}
              <span className="text-[#7c3aed]">Growth.</span>
            </motion.h1>

            <motion.p
              className="mt-5 max-w-md text-base leading-relaxed text-[#5b6577] sm:text-lg"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: homeEase }}
            >
              ENIGROW helps Indian businesses unlock the right opportunities,
              registrations, and funding to grow faster and stronger.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: homeEase }}
            >
              <Link
                href={ROUTES.funding}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  homeCtaClass,
                  "group/button h-12 rounded-full bg-[#001848] px-7 text-base text-white hover:bg-[#0a2a6e]",
                )}
              >
                Explore Funding Options
                <span className="ml-1 grid size-6 place-items-center rounded-full bg-white/15">
                  <ArrowRight className="size-3.5 transition duration-200 group-hover/button:translate-x-0.5" />
                </span>
              </Link>
              <Link
                href={ROUTES.contact}
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  homeCtaClass,
                  "h-12 rounded-full border-[#001848]/25 bg-white px-6 text-base text-[#001848] hover:border-[#001848]/40 hover:bg-white",
                )}
              >
                <Headset className="size-4 text-[#001848]" aria-hidden />
                Talk to an Expert
              </Link>
            </motion.div>
          </div>

          {/* Right ~50% — photo + floating cards (reference positions) */}
          <motion.div
            className="relative z-[1] w-full"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: homeEase }}
          >
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[540px] sm:aspect-[5/4] lg:ml-auto lg:aspect-[5/4] lg:max-w-none xl:aspect-[4/3]">
              {/* Soft-bleed photo plane */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={HERO_PHOTO.src}
                  alt={HERO_PHOTO.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[62%_30%]"
                />
                {/* Left soft merge into page — reference style */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-[28%] bg-gradient-to-r from-[#f8f9fc] via-[#f8f9fc]/70 to-transparent"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#eef0fa]/65 to-transparent"
                />
              </div>

              {/* Mini chart — left of subject / near laptop */}
              <div
                aria-hidden
                className="absolute top-[42%] left-[6%] z-[3] hidden rounded-xl bg-white/95 p-2 shadow-[0_12px_28px_-14px_rgba(0,24,72,0.28)] ring-1 ring-black/[0.04] sm:block"
              >
                <div className="flex items-end gap-1">
                  {[11, 16, 13, 22, 18, 28].map((h, i) => (
                    <span
                      key={i}
                      className="w-1.5 rounded-t-sm bg-[#3b82f6]"
                      style={{ height: h }}
                    />
                  ))}
                  <TrendingUp className="mb-0.5 ml-0.5 size-3.5 text-[#c08418]" />
                </div>
              </div>

              {/* Funding Approved — top right */}
              <motion.div
                className="absolute top-[3%] right-[2%] z-[4] w-[148px] rounded-2xl bg-white p-3 shadow-[0_16px_40px_-18px_rgba(0,24,72,0.32)] ring-1 ring-black/[0.05] sm:w-[168px] sm:p-3.5"
                animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.08em] text-[#16a34a] uppercase">
                  <CheckCircle2 className="size-3.5 shrink-0" aria-hidden />
                  Funding Approved
                </p>
                <p className="font-heading mt-1.5 text-xl font-bold tracking-tight text-[#001848]">
                  ₹25,00,000
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-[#5b6577]">
                  Business Expansion Loan
                </p>
                <svg
                  viewBox="0 0 140 28"
                  className="mt-2 h-6 w-full"
                  aria-hidden
                >
                  <path
                    d="M2 22 C20 20 32 12 48 10 C66 8 80 18 98 9 C110 4 124 6 138 4 L138 28 L2 28 Z"
                    fill="#6366f1"
                    opacity="0.12"
                  />
                  <path
                    d="M2 22 C20 20 32 12 48 10 C66 8 80 18 98 9 C110 4 124 6 138 4"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

              {/* Verification Status — mid right */}
              <motion.div
                className="absolute top-[38%] right-[1%] z-[4] hidden w-[168px] rounded-2xl bg-white p-3 shadow-[0_14px_36px_-16px_rgba(0,24,72,0.28)] ring-1 ring-black/[0.05] sm:block sm:w-[178px] sm:p-3.5"
                animate={reduceMotion ? undefined : { y: [0, 3, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.35,
                }}
              >
                <p className="text-sm font-bold text-[#001848]">
                  Verification Status
                </p>
                <ul className="mt-2 space-y-1.5">
                  {verificationItems.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center justify-between gap-2 text-[10px] sm:text-[11px]"
                    >
                      <span className="font-medium text-[#0b1220]">
                        {item.label}
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-[#16a34a]">
                        {item.status}
                        <CheckCircle2 className="size-3" aria-hidden />
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Growth Partner — bottom overlap */}
              <motion.div
                className="absolute right-[4%] bottom-[3%] z-[4] flex w-[min(90%,240px)] items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#001848] to-[#1e3a6e] p-3 text-white shadow-[0_16px_40px_-18px_rgba(0,24,72,0.45)]"
                animate={reduceMotion ? undefined : { y: [0, -2.5, 0] }}
                transition={{
                  duration: 5.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7,
                }}
              >
                <div className="relative size-8 shrink-0 overflow-hidden rounded-lg bg-white/10 p-0.5">
                  <Image
                    src="/brand/enigrow-logo.png"
                    alt=""
                    width={32}
                    height={32}
                    className="size-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold">Your Growth Partner</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-white/70">
                    From Registration to Funding, We&apos;ve Got You Covered!
                  </p>
                </div>
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/15">
                  <ArrowUpRight className="size-3" aria-hidden />
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Metrics — same container width as nav + hero */}
        <motion.div
          className="relative z-[2] mt-10 rounded-2xl border border-[#e2e6ef]/90 bg-white p-4 shadow-[0_16px_40px_-24px_rgba(0,24,72,0.28)] sm:mt-12 sm:p-5"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28, ease: homeEase }}
        >
          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-0">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className={cn(
                    "flex items-center gap-3 px-1 sm:px-3 lg:px-5",
                    index > 0 && "lg:border-l lg:border-[#e2e6ef]",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-xl",
                      metric.iconClass,
                    )}
                  >
                    <Icon className="size-4.5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <dd className="font-heading text-base font-bold tracking-tight text-[#001848] sm:text-lg">
                      {metric.value}
                    </dd>
                    <dt className="mt-0.5 text-[11px] font-medium text-[#5b6577] sm:text-xs">
                      {metric.label}
                    </dt>
                  </div>
                </div>
              );
            })}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
