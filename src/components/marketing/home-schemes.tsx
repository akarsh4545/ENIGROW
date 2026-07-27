"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Landmark } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeContent } from "@/data/home";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function HomeSchemes() {
  const reduceMotion = useReducedMotion();
  const { schemes } = homeContent;
  const [featured, ...rest] = schemes.items;

  if (!featured) return null;

  return (
    <section className="border-border/70 relative overflow-hidden border-b">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,color-mix(in_oklch,var(--accent)_22%,transparent),transparent_36%),linear-gradient(180deg,transparent,color-mix(in_oklch,var(--secondary)_45%,transparent)_100%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
            Government schemes
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {schemes.title}
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
            {schemes.support}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={featured.href}
              className="bg-primary text-primary-foreground group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[1.5rem] p-7 shadow-[0_20px_50px_-28px_color-mix(in_oklch,var(--primary)_70%,transparent)] transition duration-300 hover:-translate-y-1 sm:p-8"
            >
              <div
                aria-hidden
                className="absolute -top-16 -right-10 size-52 rounded-full bg-[color-mix(in_oklch,var(--accent)_35%,transparent)] blur-3xl transition duration-500 group-hover:scale-110"
              />
              <div
                aria-hidden
                className="absolute -bottom-20 -left-10 size-44 rounded-full bg-[color-mix(in_oklch,var(--primary)_40%,black)] opacity-50 blur-3xl"
              />

              <div className="relative flex items-start justify-between gap-3">
                <span className="bg-primary-foreground/10 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide uppercase backdrop-blur">
                  <Landmark className="text-accent size-3.5" />
                  Featured · {featured.tag}
                </span>
                <span className="bg-primary-foreground/10 group-hover:bg-accent group-hover:text-accent-foreground grid size-10 place-items-center rounded-full transition">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>

              <div className="relative mt-auto pt-10">
                <h3 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  {featured.title}
                </h3>
                <p className="text-primary-foreground/80 mt-4 max-w-md text-sm leading-relaxed sm:text-base">
                  {featured.copy}
                </p>
                <p className="text-accent mt-5 text-sm font-medium">
                  {featured.highlight}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {featured.meta.map((row) => (
                    <span
                      key={row.label}
                      className="border-primary-foreground/15 bg-primary-foreground/8 rounded-full border px-3 py-1.5 text-xs"
                    >
                      <span className="text-primary-foreground/65">
                        {row.label}:{" "}
                      </span>
                      <span className="font-semibold">{row.value}</span>
                    </span>
                  ))}
                  <span className="border-primary-foreground/15 bg-primary-foreground/8 rounded-full border px-3 py-1.5 text-xs">
                    Best for:{" "}
                    <span className="font-semibold">{featured.forWhom}</span>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="flex flex-col gap-3">
            {rest.map((item, index) => (
              <motion.div
                key={item.href}
                initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.45,
                  delay: 0.08 + index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex-1"
              >
                <Link
                  href={item.href}
                  className="border-border/70 bg-card/90 group hover:border-accent/60 hover:bg-card flex h-full flex-col justify-between rounded-2xl border p-5 transition duration-300 hover:shadow-[0_16px_36px_-24px_color-mix(in_oklch,var(--accent)_55%,transparent)] sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-accent-foreground/80 bg-accent/25 inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase">
                        {item.tag}
                      </span>
                      <h3 className="font-heading group-hover:text-primary mt-2.5 text-xl font-semibold tracking-tight transition">
                        {item.title}
                      </h3>
                    </div>
                    <ArrowRight className="text-muted-foreground group-hover:text-primary mt-1 size-4 shrink-0 transition group-hover:translate-x-0.5" />
                  </div>

                  <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
                    {item.copy}
                  </p>

                  <div className="border-border/60 mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t pt-3 text-xs">
                    <span className="text-primary font-semibold">
                      {item.highlight}
                    </span>
                    <span className="text-muted-foreground">
                      {item.meta.map((m) => m.value).join(" · ")}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <Link
            href={ROUTES.schemes}
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-11 rounded-full px-5",
            )}
          >
            Browse all schemes
            <ArrowUpRight className="size-4" />
          </Link>
          <Link
            href={ROUTES.eligibility}
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition"
          >
            Not sure which fits? Check eligibility →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
