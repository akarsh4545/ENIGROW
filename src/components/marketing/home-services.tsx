"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { HomeBackdrop } from "@/components/marketing/home-backdrop";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { servicesContent, type ServiceItem } from "@/data/services";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const categoryLabels: Record<ServiceItem["category"], string> = {
  registration: "Registration",
  compliance: "Compliance",
  finance: "Finance",
  growth: "Growth",
};

function BentoCard({
  item,
  className,
  featured = false,
}: {
  item: { title: string; summary: string; href: string; category?: string };
  className?: string;
  featured?: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group border-border/70 relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border p-5 transition duration-300 hover:-translate-y-1 sm:p-6",
        "focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none",
        featured
          ? "bg-primary text-primary-foreground border-transparent shadow-[0_22px_50px_-24px_color-mix(in_oklch,var(--primary)_70%,transparent)]"
          : "bg-card hover:border-primary/35 shadow-[0_12px_36px_-28px_color-mix(in_oklch,var(--primary)_28%,transparent)] hover:shadow-[0_20px_44px_-22px_color-mix(in_oklch,var(--primary)_38%,transparent)]",
        className,
      )}
    >
      {featured ? (
        <div
          aria-hidden
          className="absolute -top-20 -right-12 size-56 rounded-full bg-[color-mix(in_oklch,var(--accent)_30%,transparent)] blur-3xl transition duration-500 group-hover:scale-110"
        />
      ) : null}

      <div className="relative flex items-start justify-between gap-3">
        {item.category ? (
          <span
            className={cn(
              "inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase",
              featured
                ? "bg-primary-foreground/10"
                : "bg-secondary text-muted-foreground",
            )}
          >
            {item.category}
          </span>
        ) : (
          <span />
        )}
        <span
          className={cn(
            "grid size-8 place-items-center rounded-full transition duration-300",
            featured
              ? "bg-primary-foreground/10 group-hover:bg-accent group-hover:text-accent-foreground"
              : "bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground",
          )}
        >
          <ArrowUpRight className="size-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      <h3
        className={cn(
          "font-heading relative mt-auto pt-8 text-xl font-semibold tracking-tight sm:text-2xl",
          !featured && "group-hover:text-primary transition",
        )}
      >
        {item.title}
      </h3>
      <p
        className={cn(
          "relative mt-2 text-sm leading-relaxed",
          featured ? "text-primary-foreground/75" : "text-muted-foreground",
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

  return (
    <section className="border-border/70 relative overflow-hidden border-b bg-[#f7f8fb]">
      <HomeBackdrop variant="services" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: homeEase }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
              What we do
            </p>
            <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {services.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {services.support}
            </p>
          </div>
          <Link
            href={ROUTES.services}
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              homeCtaClass,
              "h-11 shrink-0 rounded-[1.1rem] px-5",
            )}
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>

        <div className="mt-12 grid auto-rows-[minmax(11rem,auto)] gap-4 sm:gap-5 lg:grid-cols-4">
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
                item={{
                  ...funding,
                  category: categoryLabels[funding.category],
                }}
                className="min-h-[18rem] lg:min-h-full"
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
                item={{
                  ...companyReg,
                  category: categoryLabels[companyReg.category],
                }}
              />
            </motion.div>
          ) : null}

          {gst ? (
            <motion.div
              className="lg:col-span-1"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.08, ease: homeEase }}
            >
              <BentoCard
                item={{
                  ...gst,
                  category: categoryLabels[gst.category],
                }}
              />
            </motion.div>
          ) : null}

          <motion.div
            className="lg:col-span-1"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.1, ease: homeEase }}
          >
            <BentoCard
              item={{
                title: "Government Schemes",
                summary:
                  "Explore PMEGP, CGTMSE, MUDRA, and other pathways mapped to your stage.",
                href: ROUTES.schemes,
                category: "Schemes",
              }}
            />
          </motion.div>

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
