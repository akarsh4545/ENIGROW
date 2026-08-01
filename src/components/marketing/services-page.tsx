"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { ServiceCard } from "@/components/marketing/service-card";
import { homeEase } from "@/components/marketing/home-motion";
import { servicesContent } from "@/data/services";
import { cn } from "@/lib/utils";

const categoryLabels: Record<
  (typeof servicesContent.items)[number]["category"],
  string
> = {
  registration: "Registration",
  compliance: "Compliance",
  finance: "Finance",
  growth: "Growth",
};

export function ServicesPageContent() {
  const reduceMotion = useReducedMotion();
  const { title, headline, support, categories, items, cta } = servicesContent;
  const [active, setActive] = useState<
    "all" | (typeof categories)[number]["id"]
  >("all");

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter((item) => item.category === active);
  }, [active, items]);

  return (
    <>
      <section className="border-border/70 relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,color-mix(in_oklch,var(--accent)_22%,transparent),transparent_40%),linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_65%,transparent),transparent)]"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <motion.div
            className="max-w-3xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: homeEase }}
          >
            <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
              {title}
            </p>
            <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              {headline}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              {support}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-border/70 border-b bg-[color-mix(in_oklch,var(--secondary)_22%,var(--background))]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="border-border/60 bg-card/90 rounded-[1.75rem] border p-4 shadow-sm sm:p-5">
            <p className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-[0.16em] uppercase">
              Filter by category
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActive("all")}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
                  active === "all"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border/80 bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground",
                )}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActive(category.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
                    active === category.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border/80 bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground",
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {filtered.map((item, index) => (
              <ServiceCard
                key={item.slug}
                href={item.href}
                title={item.title}
                summary={item.summary}
                tag={categoryLabels[item.category]}
                index={index}
              />
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_oklch,var(--primary)_92%,black),color-mix(in_oklch,var(--primary)_70%,oklch(0.35_0.04_210)))]"
        />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 sm:py-24 md:flex-row md:items-end md:justify-between">
          <div className="text-primary-foreground max-w-xl">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {cta.title}
            </h2>
            <p className="text-primary-foreground/80 mt-4 text-base leading-relaxed sm:text-lg">
              {cta.support}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={cta.primary.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-accent text-accent-foreground hover:bg-accent/90",
              )}
            >
              {cta.primary.label}
            </Link>
            <Link
              href={cta.secondary.href}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-primary-foreground/35 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent",
              )}
            >
              {cta.secondary.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
