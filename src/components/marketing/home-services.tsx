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
  homeCardHover,
  homeCtaClass,
  homeEase,
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
        "group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[#e2e6ef] bg-white p-5 shadow-[0_12px_36px_-28px_rgba(0,24,72,0.2)]",
        "focus-visible:ring-ring/40 hover:border-[#001848]/20 focus-visible:ring-2 focus-visible:outline-none",
        homeCardHover,
        className,
      )}
    >
      <div className="relative flex items-start justify-between gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-[#001848]/[0.06] text-[#001848] transition duration-300 group-hover:-translate-y-0.5">
          {Icon ? <Icon className="size-4.5" aria-hidden /> : null}
        </span>
        <span className="grid size-8 place-items-center rounded-full bg-[#f2f4f9] text-[#5b6577] transition duration-300 group-hover:bg-[#001848] group-hover:text-white">
          <ArrowUpRight className="size-3.5 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
      {item.category ? (
        <p className="relative mt-4 text-[10px] font-semibold tracking-[0.14em] text-[#5b6577] uppercase">
          {item.category}
        </p>
      ) : null}
      <h3 className="font-heading relative mt-1.5 text-lg font-bold tracking-tight text-[#001848]">
        {item.title}
      </h3>
      <p className="relative mt-1.5 flex-1 text-sm leading-relaxed text-[#5b6577]">
        {item.summary}
      </p>
    </Link>
  );
}

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
        "group relative overflow-hidden rounded-[1.4rem] border border-transparent bg-[#001848] p-5 text-white sm:p-5",
        "shadow-[0_22px_48px_-26px_rgba(0,24,72,0.7)]",
        homeCardHover,
        "focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-14 -right-10 size-36 rounded-full bg-[#c08418]/22 blur-3xl"
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="grid size-9 place-items-center rounded-xl bg-white/10">
          <Landmark className="size-4" aria-hidden />
        </span>
        <span className="grid size-8 place-items-center rounded-full bg-white/10 transition group-hover:bg-[#c08418] group-hover:text-[#1a1408]">
          <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      <div className="relative mt-3 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-6">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-[#c08418] uppercase">
            Finance
          </p>
          <h3 className="font-heading mt-1 text-xl font-bold tracking-tight sm:text-[1.35rem]">
            Business Funding
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-white/70">
            {summary}
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#c08418]">
            Explore Funding
            <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 sm:text-right">
            <p className="font-heading text-base font-bold text-white">
              {fundingRange}
            </p>
            <p className="mt-0.5 text-[10px] font-semibold tracking-[0.12em] text-white/45 uppercase">
              Funding range
            </p>
          </div>
          <svg aria-hidden viewBox="0 0 112 32" className="h-7 w-28 opacity-90">
            <path
              d="M2 26 C18 24 26 14 40 13 C54 12 62 22 76 10 C90 -2 100 10 110 6"
              fill="none"
              stroke="#c08418"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="110" cy="6" r="2.5" fill="#c08418" />
          </svg>
        </div>
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
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: homeEase }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-[#c08418] uppercase">
              What we do
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-[#001848] sm:text-4xl">
              {services.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#5b6577] sm:text-lg">
              {services.support}
            </p>
          </div>
          <Link
            href={ROUTES.services}
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              homeCtaClass,
              "h-11 shrink-0 px-5",
            )}
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>

        {/*
          Balanced bento:
          Row 1 — Funding (featured 2) | Schemes | Company
          Row 2+ — GST + remaining compact cards
        */}
        <div className="mt-12 grid items-start gap-4 sm:gap-5 lg:grid-cols-4">
          {funding ? (
            <motion.div
              className="lg:col-span-2"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: homeEase }}
            >
              <FundingFeatureCard
                href={funding.href}
                summary={funding.summary}
                fundingRange={fundingRange}
              />
            </motion.div>
          ) : null}

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.05, ease: homeEase }}
          >
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
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: 0.08, ease: homeEase }}
            >
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
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.1, ease: homeEase }}
            >
              <BentoCard
                icon={iconBySlug[gst.slug]}
                item={{
                  ...gst,
                  category: categoryLabels[gst.category],
                }}
              />
            </motion.div>
          ) : null}

          {compactSlugs.map((slug, index) => {
            const item = bySlug[slug];
            if (!item) return null;
            return (
              <motion.div
                key={item.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: 0.08 + index * 0.03,
                  ease: homeEase,
                }}
              >
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
        </div>
      </div>
    </section>
  );
}
