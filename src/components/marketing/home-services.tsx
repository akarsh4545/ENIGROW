"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Building2,
  FileCheck2,
  Globe2,
  Landmark,
  Shield,
  Stamp,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import {
  homeCtaClass,
  revealContainer,
  revealItem,
  revealItemFast,
} from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { schemesContent } from "@/data/schemes";
import { servicesContent, type ServiceItem } from "@/data/services";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const iconBySlug: Record<string, LucideIcon> = {
  funding: Landmark,
  "company-registration": Building2,
  "gst-registration": FileCheck2,
  "msme-registration": BadgeCheck,
  trademark: Shield,
  "iso-certification": Stamp,
  "import-export-code": Globe2,
  fssai: Utensils,
  accounting: BookOpen,
};

const categoryLabels: Record<ServiceItem["category"], string> = {
  registration: "Registration",
  compliance: "Compliance",
  finance: "Finance",
  growth: "Growth",
};

/** Homepage bento order — featured first, then medium, then compact. */
const homepageServiceSlugs = [
  "funding",
  "company-registration",
  "gst-registration",
  "msme-registration",
  "trademark",
  "iso-certification",
  "import-export-code",
  "fssai",
  "accounting",
] as const;

function BentoCard({
  item,
  className,
  icon: Icon,
}: {
  item: { title: string; summary: string; href: string; category?: string };
  className?: string;
  icon?: LucideIcon;
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[#e2e6ef] bg-white p-5",
        "shadow-[0_12px_36px_-28px_rgba(0,24,72,0.18)]",
        "transition duration-200 ease-out",
        "hover:-translate-y-1 hover:border-[#001848]/25 hover:shadow-[0_20px_44px_-22px_rgba(0,24,72,0.3)]",
        "focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
    >
      <div className="relative z-[1] flex items-start justify-between gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-[#001848]/[0.06] text-[#001848] transition duration-200 ease-out group-hover:-translate-y-0.5">
          {Icon ? <Icon className="size-4.5" aria-hidden /> : null}
        </span>
        <span className="grid size-8 place-items-center rounded-full bg-[#f2f4f9] text-[#5b6577] transition duration-200 ease-out group-hover:translate-x-1 group-hover:bg-[#001848] group-hover:text-white">
          <ArrowUpRight className="size-3.5" aria-hidden />
        </span>
      </div>
      {item.category ? (
        <p className="relative z-[1] mt-4 text-[10px] font-semibold tracking-[0.14em] text-[#5b6577] uppercase">
          {item.category}
        </p>
      ) : null}
      <h3 className="font-heading relative z-[1] mt-1.5 text-lg font-bold tracking-tight text-[#001848]">
        {item.title}
      </h3>
      <p className="relative z-[1] mt-1.5 flex-1 text-sm leading-relaxed text-[#5b6577]">
        {item.summary}
      </p>
    </Link>
  );
}

/**
 * Featured Business Funding card.
 * Explicit stacking: background → decor → graph → content → CTA
 * so text never loses contrast against the light services section.
 */
function FundingFeatureCard({
  href,
  summary,
  fundingRange,
}: {
  href: string;
  summary: string;
  fundingRange: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative isolate block overflow-hidden rounded-[1.4rem] border border-[#001848]/80",
        "shadow-[0_20px_44px_-24px_rgba(0,24,72,0.55)]",
        "transition duration-200 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_26px_52px_-24px_rgba(0,24,72,0.6)]",
        "focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none",
      )}
    >
      {/* Layer 1 — solid background (never transparent) */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-[#001848] transition-colors duration-300 group-hover:bg-[#0a2a6e]"
      />

      {/* Layer 2 — decorative glow (below content) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-8 z-[1] size-32 rounded-full bg-[#c08418]/20 blur-3xl transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:bg-[#c08418]/28"
      />

      {/* Layer 3 — subtle graph (below content) */}
      <svg
        aria-hidden
        viewBox="0 0 280 72"
        className="pointer-events-none absolute right-3 bottom-3 z-[2] h-12 w-40 opacity-40 transition duration-300 group-hover:opacity-70 sm:h-14 sm:w-48"
      >
        <path
          d="M4 58 C36 54 48 34 84 32 C120 30 132 48 168 24 C204 0 228 18 276 10"
          fill="none"
          stroke="#c08418"
          strokeWidth="2"
          strokeLinecap="round"
          className="transition-[stroke-opacity] duration-300"
        />
        <circle
          cx="276"
          cy="10"
          r="3"
          fill="#c08418"
          className="origin-center transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </svg>

      {/* Layer 4+5 — content + CTA (always above decor) */}
      <div className="relative z-10 p-5 text-white sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-white/10 text-white transition duration-200 group-hover:-translate-y-0.5">
            <Landmark className="size-4" aria-hidden />
          </span>
          <span className="grid size-8 place-items-center rounded-full bg-white/10 text-white transition duration-200 group-hover:translate-x-1 group-hover:bg-[#c08418] group-hover:text-[#1a1408]">
            <ArrowUpRight className="size-3.5" aria-hidden />
          </span>
        </div>

        <p className="mt-3.5 text-[10px] font-semibold tracking-[0.14em] text-[#c08418] uppercase">
          Finance
        </p>
        <h3 className="font-heading mt-1 text-xl font-bold tracking-tight text-white">
          Business Funding
        </h3>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/75">
          {summary}
        </p>

        <div className="mt-4 inline-flex flex-col rounded-xl border border-white/15 bg-black/20 px-3 py-2">
          <p className="font-heading text-base font-bold text-white">
            {fundingRange}
          </p>
          <p className="mt-0.5 text-[10px] font-semibold tracking-[0.12em] text-white/55 uppercase">
            Funding range
          </p>
        </div>

        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#c08418]">
          Explore Funding
          <ArrowRight className="size-3.5 transition duration-200 group-hover:translate-x-1" />
        </p>
      </div>
    </Link>
  );
}

export function HomeServices() {
  const reduceMotion = useReducedMotion();
  const { services, schemeSupport } = homeContent;

  const bySlug = Object.fromEntries(
    servicesContent.items.map((item) => [item.slug, item]),
  ) as Record<string, ServiceItem>;

  const funding = bySlug.funding;
  const companyReg = bySlug["company-registration"];
  const compactSlugs = homepageServiceSlugs.filter(
    (slug) =>
      slug !== "funding" &&
      slug !== "company-registration" &&
      slug !== "gst-registration",
  );
  const gst = bySlug["gst-registration"];

  const fundingRange =
    schemeSupport.metrics.find((m) => /funding/i.test(m.label))?.value ??
    "₹10L–₹5Cr";

  return (
    <section className="relative overflow-hidden border-b border-[#e2e6ef] bg-[#f7f8fb]">
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.35 }}
          variants={revealContainer}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <motion.p
              variants={revealItemFast}
              className="text-sm font-semibold tracking-[0.18em] text-[#c08418] uppercase"
            >
              What we do
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading mt-3 text-3xl font-bold tracking-tight text-[#001848] sm:text-4xl"
            >
              {services.title}
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mt-4 text-base leading-relaxed text-[#5b6577] sm:text-lg"
            >
              {services.support}
            </motion.p>
          </div>
          <motion.div variants={revealItemFast}>
            <Link
              href={ROUTES.services}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                homeCtaClass,
                "h-11 shrink-0 px-5",
              )}
            >
              View all
              <ArrowRight className="size-4 transition duration-250 group-hover/button:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 grid items-start gap-4 sm:gap-5 lg:grid-cols-4"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.15 }}
          variants={revealContainer}
        >
          {funding ? (
            <motion.div className="lg:col-span-2" variants={revealItem}>
              <FundingFeatureCard
                href={funding.href}
                summary={funding.summary}
                fundingRange={fundingRange}
              />
            </motion.div>
          ) : null}

          <motion.div variants={revealItem}>
            <BentoCard
              icon={Landmark}
              item={{
                title: schemesContent.title,
                summary: schemesContent.headline,
                href: ROUTES.schemes,
                category: "Schemes",
              }}
            />
          </motion.div>

          {companyReg ? (
            <motion.div variants={revealItem}>
              <BentoCard
                icon={iconBySlug[companyReg.slug]}
                item={{
                  ...companyReg,
                  category: categoryLabels[companyReg.category],
                }}
              />
            </motion.div>
          ) : null}

          {gst ? (
            <motion.div variants={revealItem}>
              <BentoCard
                icon={iconBySlug[gst.slug]}
                item={{
                  ...gst,
                  category: categoryLabels[gst.category],
                }}
              />
            </motion.div>
          ) : null}

          {compactSlugs.map((slug) => {
            const item = bySlug[slug];
            if (!item) return null;
            return (
              <motion.div key={item.slug} variants={revealItem}>
                <BentoCard
                  icon={iconBySlug[item.slug]}
                  item={{
                    ...item,
                    category: categoryLabels[item.category],
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
