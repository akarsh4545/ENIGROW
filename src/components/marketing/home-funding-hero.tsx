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
  alt: "Indian entrepreneur in a navy suit working on a laptop in a modern office",
} as const;

function IndiaMapWatermark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 240" className={className} aria-hidden fill="none">
      <path
        d="M98 18 C108 22 118 28 124 40 C132 56 138 62 148 68 C156 74 162 86 158 98 C154 108 160 118 166 128 C172 140 168 152 158 158 C150 162 146 172 148 184 C150 196 142 208 128 214 C116 218 108 226 98 228 C88 226 80 218 68 214 C54 208 46 196 48 184 C50 172 46 162 38 158 C28 152 24 140 30 128 C36 118 42 108 38 98 C34 86 40 74 48 68 C58 62 64 56 72 40 C78 28 88 22 98 18 Z"
        stroke="rgba(0,24,72,0.08)"
        strokeWidth="2"
        fill="rgba(0,24,72,0.03)"
      />
    </svg>
  );
}

function GrowthBars({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-end gap-1.5", className)} aria-hidden>
      {[28, 40, 34, 52, 46, 64, 58, 78].map((h, i) => (
        <motion.span
          key={i}
          className="w-2 origin-bottom rounded-t-sm bg-[#3b82f6]/70 sm:w-2.5"
          style={{ height: h }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            duration: 0.55,
            delay: 0.45 + i * 0.04,
            ease: homeEase,
          }}
        />
      ))}
      <TrendingUp className="mb-1 ml-1 size-5 text-[#c08418]" />
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
      iconClass: "text-[#001848] bg-[#001848]/10",
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
    <section className="relative isolate overflow-hidden border-b border-[#e2e6ef]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #ffffff 0%, #f8f7fc 42%, #eef0fa 78%, #e8ebf8 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-10%] right-[5%] size-[32rem] rounded-full bg-[#6366f1]/[0.08] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[5%] left-[-8%] size-[26rem] rounded-full bg-[#001848]/[0.05] blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-12 pb-8 sm:px-6 sm:pt-14 sm:pb-10 lg:pt-16 lg:pb-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-8 xl:gap-10">
          {/* LEFT */}
          <div className="relative z-[2] max-w-xl">
            <motion.p
              className="inline-flex items-center gap-2 rounded-full border border-[#001848]/8 bg-[#eef0fa]/90 px-3.5 py-1.5 text-xs font-semibold text-[#001848] shadow-[0_8px_24px_-18px_rgba(0,24,72,0.35)]"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: homeEase }}
            >
              <Star
                className="size-3.5 fill-[#001848] text-[#001848]"
                aria-hidden
              />
              Trusted by 5000+ Businesses Across India
            </motion.p>

            <motion.h1
              className="font-heading mt-5 text-[2.4rem] leading-[1.08] font-bold tracking-tight text-balance text-[#001848] sm:text-5xl md:text-[3.35rem] md:leading-[1.04]"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: homeEase }}
            >
              Turn Your Business Ambition Into{" "}
              <span className="text-[#c08418]">Funded Growth.</span>
            </motion.h1>

            <motion.p
              className="mt-5 max-w-lg text-base leading-relaxed text-[#5b6577] sm:text-lg"
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
                  "h-12 rounded-full border-[#001848]/20 bg-white px-6 text-base text-[#001848] hover:border-[#001848]/35 hover:bg-white",
                )}
              >
                <Headset className="size-4 text-[#001848]" aria-hidden />
                Talk to an Expert
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — photo + cards */}
          <motion.div
            className="relative z-[1] mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: homeEase }}
          >
            <div className="relative mx-auto aspect-[5/6] w-full max-w-[500px] lg:ml-auto lg:max-w-[520px]">
              <IndiaMapWatermark className="pointer-events-none absolute top-[8%] right-[2%] h-[70%] w-auto opacity-90" />

              <div
                aria-hidden
                className="pointer-events-none absolute top-[12%] right-[8%] left-[12%] h-[70%] rounded-full bg-[#6366f1]/[0.12] blur-3xl"
              />

              {/* Soft growth bars behind shoulder area */}
              <div className="pointer-events-none absolute top-[38%] right-[6%] z-[1] hidden opacity-90 sm:block">
                <GrowthBars />
              </div>

              {/* Photo with soft edge blend — no navy box */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={HERO_PHOTO.src}
                  alt={HERO_PHOTO.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 520px"
                  className="object-cover object-[center_15%]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `
                      linear-gradient(90deg, #f8f7fc 0%, rgba(248,247,252,0.75) 10%, transparent 32%),
                      linear-gradient(270deg, #eef0fa 0%, rgba(238,240,250,0.45) 8%, transparent 28%),
                      linear-gradient(180deg, #f8f7fc 0%, transparent 16%),
                      linear-gradient(0deg, #eef0fa 0%, rgba(238,240,250,0.9) 10%, transparent 36%)
                    `,
                  }}
                />
              </div>

              {/* Funding Approved — top right */}
              <motion.div
                className="absolute top-[4%] right-0 z-[3] w-[min(92%,210px)] rounded-2xl bg-white p-3 shadow-[0_16px_40px_-16px_rgba(0,24,72,0.28)] ring-1 ring-black/[0.04] sm:top-[6%] sm:right-[-2%] sm:w-[228px] sm:p-3.5"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32, ease: homeEase }}
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] text-[#16a34a] uppercase">
                        <CheckCircle2 className="size-3.5" aria-hidden />
                        Funding Approved
                      </p>
                      <p className="font-heading mt-1.5 text-xl font-bold tracking-tight text-[#001848] sm:text-2xl">
                        ₹25,00,000
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium text-[#5b6577]">
                        Business Expansion Loan
                      </p>
                    </div>
                    <svg
                      viewBox="0 0 56 36"
                      className="mt-1 h-8 w-12 shrink-0"
                      aria-hidden
                    >
                      <path
                        d="M2 28 C12 26 18 18 26 16 C34 14 40 22 48 8 L54 4"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>

              {/* Verification Status — mid right */}
              <motion.div
                className="absolute top-[42%] right-0 z-[3] hidden w-[220px] rounded-2xl bg-white p-3 shadow-[0_14px_36px_-16px_rgba(0,24,72,0.26)] ring-1 ring-black/[0.04] sm:right-[-4%] sm:block sm:w-[236px] sm:p-3.5 md:top-[40%]"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.42, ease: homeEase }}
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, 3, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                >
                  <p className="text-sm font-bold text-[#001848]">
                    Verification Status
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {verificationItems.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center justify-between gap-2 text-[11px]"
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
              </motion.div>

              {/* Growth Partner — bottom */}
              <motion.div
                className="absolute bottom-[4%] left-[4%] z-[3] flex w-[min(94%,250px)] items-start gap-2.5 rounded-2xl bg-gradient-to-br from-[#001848] to-[#1e3a6e] p-3 text-white shadow-[0_16px_40px_-18px_rgba(0,24,72,0.45)] sm:bottom-[3%] sm:left-[6%] sm:w-[260px] sm:p-3.5"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.52, ease: homeEase }}
              >
                <motion.div
                  className="flex w-full items-start gap-2.5"
                  animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                  transition={{
                    duration: 5.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
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
                    <p className="flex items-center gap-1 text-xs font-bold">
                      Your Growth Partner
                      <ArrowUpRight
                        className="size-3 text-white/80"
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

        {/* Metrics — horizontal bar like reference */}
        <motion.div
          className="relative z-[2] mt-8 rounded-2xl border border-[#e2e6ef]/80 bg-white/95 p-4 shadow-[0_16px_40px_-24px_rgba(0,24,72,0.28)] backdrop-blur-sm sm:mt-10 sm:p-5"
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
