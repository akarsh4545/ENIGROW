"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  FileCheck2,
  Landmark,
  Shield,
  type LucideIcon,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import {
  homeCardHover,
  homeCtaClass,
  homeEase,
} from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { servicesContent, type ServiceItem } from "@/data/services";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const iconBySlug: Record<string, LucideIcon> = {
  funding: Landmark,
  "company-registration": Building2,
  "gst-registration": FileCheck2,
  trademark: Shield,
};

function BentoCard({
  item,
  className,
  featured = false,
  icon: Icon,
}: {
  item: { title: string; summary: string; href: string; category?: string };
  className?: string;
  featured?: boolean;
  icon?: LucideIcon;
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border p-5 sm:p-6",
        "focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none",
        homeCardHover,
        featured
          ? "border-transparent bg-[#001848] text-white shadow-[0_24px_56px_-28px_rgba(0,24,72,0.75)]"
          : "border-[#e2e6ef] bg-white shadow-[0_12px_36px_-28px_rgba(0,24,72,0.22)] hover:border-[#001848]/20",
        className,
      )}
    >
      {featured ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-16 size-64 rounded-full bg-[#c08418]/25 blur-3xl transition duration-500 group-hover:scale-110"
        />
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#001848]/[0.03] to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
        />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <span
          className={cn(
            "grid size-11 place-items-center rounded-2xl transition duration-300 group-hover:-translate-y-0.5",
            featured
              ? "bg-white/10 text-white"
              : "bg-[#001848]/[0.06] text-[#001848]",
          )}
        >
          {Icon ? <Icon className="size-5" aria-hidden /> : null}
        </span>
        <span
          className={cn(
            "grid size-8 place-items-center rounded-full transition duration-300",
            featured
              ? "bg-white/10 group-hover:bg-[#c08418] group-hover:text-[#1a1408]"
              : "bg-[#f2f4f9] text-[#5b6577] group-hover:bg-[#001848] group-hover:text-white",
          )}
        >
          <ArrowUpRight className="size-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      {item.category ? (
        <p
          className={cn(
            "relative mt-5 text-[11px] font-semibold tracking-[0.14em] uppercase",
            featured ? "text-[#c08418]" : "text-[#5b6577]",
          )}
        >
          {item.category}
        </p>
      ) : null}

      <h3
        className={cn(
          "font-heading relative mt-2 text-xl font-bold tracking-tight sm:text-2xl",
          featured ? "text-white" : "text-[#001848]",
        )}
      >
        {item.title}
      </h3>
      <p
        className={cn(
          "relative mt-2 flex-1 text-sm leading-relaxed",
          featured ? "text-white/70" : "text-[#5b6577]",
        )}
      >
        {item.summary}
      </p>
    </Link>
  );
}

export function HomeServices() {
  const reduceMotion = useReducedMotion();
  const { services } = homeContent;

  const funding = servicesContent.items.find((i) => i.slug === "funding");
  const companyReg = servicesContent.items.find(
    (i) => i.slug === "company-registration",
  );
  const gst = servicesContent.items.find((i) => i.slug === "gst-registration");
  const featuredSlugs = new Set(
    [funding?.slug, companyReg?.slug, gst?.slug].filter(Boolean) as string[],
  );
  const remaining = servicesContent.items
    .slice(0, 8)
    .filter((item) => !featuredSlugs.has(item.slug));

  const categoryLabels: Record<ServiceItem["category"], string> = {
    registration: "Registration",
    compliance: "Compliance",
    finance: "Finance",
    growth: "Growth",
  };

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

        <div className="mt-12 grid auto-rows-[minmax(10.5rem,auto)] gap-4 sm:gap-5 lg:grid-cols-4">
          {funding ? (
            <motion.div
              className="lg:col-span-2 lg:row-span-2"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: homeEase }}
            >
              <BentoCard
                featured
                icon={iconBySlug[funding.slug]}
                item={{
                  ...funding,
                  category: categoryLabels[funding.category],
                }}
                className="min-h-[17rem] lg:min-h-full"
              />
            </motion.div>
          ) : null}

          {companyReg ? (
            <motion.div
              className="lg:col-span-2"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.05, ease: homeEase }}
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

          <motion.div
            className="lg:col-span-1"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.08, ease: homeEase }}
          >
            <BentoCard
              icon={Landmark}
              item={{
                title: "Government Schemes",
                summary:
                  "Explore PMEGP, CGTMSE, MUDRA, and other pathways mapped to your stage.",
                href: ROUTES.schemes,
                category: "Schemes",
              }}
            />
          </motion.div>

          {gst ? (
            <motion.div
              className="lg:col-span-1"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.1, ease: homeEase }}
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

          {remaining.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: 0.06 + index * 0.04,
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
          ))}
        </div>
      </div>
    </section>
  );
}
