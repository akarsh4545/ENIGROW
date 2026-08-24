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
      {/* Page background only — never painted over the person */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #ffffff 0%, #f8f7fc 45%, #eef0fa 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-8%] right-[0%] size-[28rem] rounded-full bg-[#6366f1]/[0.09] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[8%] left-[-10%] size-[22rem] rounded-full bg-[#001848]/[0.04] blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-12 pb-8 sm:px-6 sm:pt-14 sm:pb-10 lg:pt-16 lg:pb-12">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.15fr] lg:gap-6 xl:gap-8">
          {/* LEFT — unchanged structure */}
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

          {/* RIGHT — crisp foreground photo + cards around (not over) the face */}
          <motion.div
            className="relative z-[1] w-full min-w-0"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: homeEase }}
          >
            <div className="relative mx-auto w-full max-w-[560px] lg:mr-0 lg:ml-auto lg:max-w-none">
              {/* Soft glow behind photo only */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-[8%] right-[10%] left-[10%] h-[75%] rounded-full bg-[#6366f1]/[0.14] blur-3xl"
              />

              {/*
                Foreground image: real <Image>, full contrast, NO white overlay.
                Sized as the main visual — not a faded background fill.
              */}
              <div className="relative z-[2] mx-auto w-[92%] sm:w-[88%] lg:w-[86%]">
                <Image
                  src={HERO_PHOTO.src}
                  alt={HERO_PHOTO.alt}
                  width={720}
                  height={900}
                  priority
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="h-auto w-full object-contain object-bottom drop-shadow-[0_28px_50px_-28px_rgba(0,24,72,0.45)]"
                />
              </div>

              {/* Small growth chart — beside shoulder, not across face */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-[28%] right-[2%] z-[3] hidden rounded-xl bg-white/90 p-2 shadow-[0_10px_28px_-14px_rgba(0,24,72,0.3)] ring-1 ring-black/[0.04] sm:block"
              >
                <div className="flex items-end gap-1">
                  {[14, 20, 17, 26, 22, 32].map((h, i) => (
                    <span
                      key={i}
                      className="w-1.5 rounded-t-sm bg-[#3b82f6]/75"
                      style={{ height: h }}
                    />
                  ))}
                  <TrendingUp className="mb-0.5 ml-0.5 size-3.5 text-[#c08418]" />
                </div>
              </div>

              {/* Funding Approved — top-right, clear of face */}
              <motion.div
                className="absolute top-2 right-0 z-[4] w-[180px] rounded-2xl bg-white/95 p-3 shadow-[0_16px_40px_-16px_rgba(0,24,72,0.3)] ring-1 ring-black/[0.05] backdrop-blur-sm sm:top-4 sm:right-0 sm:w-[200px] sm:p-3.5"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3, ease: homeEase }}
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] text-[#16a34a] uppercase">
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
                    viewBox="0 0 120 28"
                    className="mt-2 h-6 w-full"
                    aria-hidden
                  >
                    <path
                      d="M2 22 C18 20 28 12 42 11 C58 9 70 18 88 8 C100 2 110 6 118 4"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Verification — lower right, torso/desk only */}
              <motion.div
                className="absolute right-0 bottom-[22%] z-[4] hidden w-[200px] rounded-2xl bg-white/95 p-3 shadow-[0_14px_36px_-16px_rgba(0,24,72,0.28)] ring-1 ring-black/[0.05] backdrop-blur-sm sm:bottom-[20%] sm:block sm:w-[210px] sm:p-3.5 lg:right-[-2%]"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.4, ease: homeEase }}
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, 2.5, 0] }}
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
              </motion.div>

              {/* Growth Partner — bottom edge of photo */}
              <motion.div
                className="absolute bottom-1 left-[4%] z-[4] flex w-[min(92%,250px)] items-start gap-2.5 rounded-2xl bg-gradient-to-br from-[#001848] to-[#1e3a6e] p-3 text-white shadow-[0_16px_40px_-18px_rgba(0,24,72,0.45)] sm:bottom-2 sm:left-[6%] sm:w-[255px] sm:p-3.5"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.48, ease: homeEase }}
              >
                <motion.div
                  className="flex w-full items-start gap-2.5"
                  animate={reduceMotion ? undefined : { y: [0, -2.5, 0] }}
                  transition={{
                    duration: 5.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.7,
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

        {/* Metrics bar */}
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
