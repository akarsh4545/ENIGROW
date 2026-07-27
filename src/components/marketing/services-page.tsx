"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { servicesContent } from "@/data/services";
import { cn } from "@/lib/utils";

export function ServicesPageContent() {
  const reduceMotion = useReducedMotion();
  const { title, headline, support, categories, items, cta } = servicesContent;

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
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
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

      <section className="border-border/70 border-b">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="border-border/70 text-muted-foreground flex flex-wrap gap-x-6 gap-y-2 border-b pb-4 text-sm">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="hover:text-foreground transition"
              >
                {category.label}
              </a>
            ))}
          </div>

          <div className="mt-12 space-y-16">
            {categories.map((category) => {
              const grouped = items.filter(
                (item) => item.category === category.id,
              );
              if (grouped.length === 0) return null;

              return (
                <div
                  key={category.id}
                  id={category.id}
                  className="scroll-mt-24"
                >
                  <motion.h2
                    className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {category.label}
                  </motion.h2>

                  <ul className="divide-border/80 border-border/80 mt-6 divide-y border-y">
                    {grouped.map((item, index) => (
                      <motion.li
                        key={item.slug}
                        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.04,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          className="group grid gap-2 py-6 transition sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] sm:items-center sm:gap-8"
                        >
                          <span className="font-heading group-hover:text-primary text-xl font-semibold tracking-tight transition sm:text-2xl">
                            {item.title}
                          </span>
                          <span className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                            {item.summary}
                          </span>
                          <ArrowUpRight className="text-muted-foreground group-hover:text-primary size-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
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
