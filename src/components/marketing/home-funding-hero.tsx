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
            "linear-gradient(165deg, #ffffff 0%, #f7f8fc 48%, #eef1f8 100%)",
        }}
      />
      {/* Soft left dot pattern like reference */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[42%] opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.55) 1px, transparent 1.2px)",
          backgroundSize: "18px 18px",
          maskImage:
            "linear-gradient(to right, black 0%, black 35%, transparent 85%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 35%, transparent 85%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[90rem] px-4 pt-10 pb-8 sm:px-6 sm:pt-12 sm:pb-10 lg:px-10 lg:pt-12 lg:pb-12 xl:px-12">
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-3 xl:gap-5">
          {/* Left copy */}
          <div className="relative z-[2] max-w-xl lg:col-span-5 lg:max-w-none lg:translate-x-6 xl:col-span-5 xl:translate-x-10">
            <motion.p
              className="inline-flex items-center gap-1.5 rounded-full border border-[#c08418]/45 bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#001848] shadow-[0_1px_2px_rgba(0,24,72,0.04)] sm:text-xs"
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
              className="font-heading mt-4 text-[2.35rem] leading-[1.12] font-bold tracking-tight text-balance text-[#001848] sm:text-[2.75rem] lg:text-[3.05rem] lg:leading-[1.08] xl:text-[3.35rem]"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: homeEase }}
            >
              Turn Your Business Ambition Into{" "}
              <span className="bg-gradient-to-r from-[#3b82f6] via-[#c08418] to-[#ea580c] bg-clip-text text-transparent">
                Funded Growth.
              </span>
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
                <ArrowRight className="size-4 transition duration-200 group-hover/button:translate-x-0.5" />
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

          {/* Right visual */}
          <motion.div
            className="relative z-[1] w-full lg:col-span-7"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: homeEase }}
          >
            <div className="relative mx-auto aspect-[4/3] w-full sm:aspect-[5/4] lg:aspect-auto lg:min-h-[500px] xl:min-h-[560px]">
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={HERO_PHOTO.src}
                  alt={HERO_PHOTO.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="scale-[1.06] object-cover object-[76%_34%]"
                />
                {/* Soft left merge — top-biased so desk mug stays clear */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-[14%] bg-gradient-to-r from-[#f7f8fc]/70 via-[#f7f8fc]/25 to-transparent"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, black 0%, black 36%, transparent 68%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 0%, black 36%, transparent 68%)",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#eef1f8]/40 to-transparent"
                />
              </div>

              {/*
                Growth chart — gap between headline & shoulder,
                ~1.5 headline lines tall
              */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-[18%] left-[-2%] z-[3] hidden w-[78px] sm:block md:w-[86px] lg:top-[20%] lg:left-[2%] lg:w-[92px] xl:left-[4%] xl:w-[100px]"
              >
                <Image
                  src="/images/hero-growth-chart.png"
                  alt=""
                  width={192}
                  height={200}
                  className="h-auto w-full drop-shadow-[0_12px_24px_rgba(0,24,72,0.25)]"
                />
              </div>

              {/* Funding Approved */}
              <motion.div
                className="absolute top-[3%] right-[2%] z-[4] w-[156px] rounded-2xl bg-white p-3 shadow-[0_16px_40px_-18px_rgba(0,24,72,0.32)] ring-1 ring-black/[0.05] sm:w-[172px] sm:p-3.5"
                animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <p className="font-heading text-xl font-bold tracking-tight text-[#001848] sm:text-[1.35rem]">
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
                <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#16a34a]/10 px-2 py-0.5 text-[10px] font-semibold text-[#16a34a]">
                  <CheckCircle2 className="size-3 shrink-0" aria-hidden />
                  Funding Approved
                </p>
              </motion.div>

              {/* Verification Status */}
              <motion.div
                className="absolute top-[40%] right-[2%] z-[4] hidden w-[168px] rounded-2xl bg-white p-3 shadow-[0_14px_36px_-16px_rgba(0,24,72,0.28)] ring-1 ring-black/[0.05] sm:block sm:w-[178px] sm:p-3.5"
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

              {/* Growth Partner pill */}
              <motion.div
                className="absolute right-[3%] bottom-[5%] z-[4] flex w-[min(92%,260px)] items-center gap-2.5 rounded-full bg-[#001848] py-2.5 pr-2.5 pl-3 text-white shadow-[0_16px_40px_-18px_rgba(0,24,72,0.45)]"
                animate={reduceMotion ? undefined : { y: [0, -2.5, 0] }}
                transition={{
                  duration: 5.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7,
                }}
              >
                <div className="relative size-7 shrink-0 overflow-hidden rounded-full bg-white/10 p-0.5">
                  <Image
                    src="/brand/enigrow-logo.png"
                    alt=""
                    width={28}
                    height={28}
                    className="size-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] leading-tight font-bold sm:text-xs">
                    Your Growth Partner
                  </p>
                  <p className="mt-0.5 text-[9px] leading-snug text-white/70 sm:text-[10px]">
                    From Registration to Funding, We&apos;ve Got You Covered!
                  </p>
                </div>
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/15">
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Metrics bar */}
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
