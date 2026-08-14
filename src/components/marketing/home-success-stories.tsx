"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { HomeBackdrop } from "@/components/marketing/home-backdrop";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { cn } from "@/lib/utils";

export function HomeSuccessStories() {
  const reduceMotion = useReducedMotion();
  const { successStories } = homeContent;
  const [featured, ...rest] = successStories.items;

  return (
    <section className="border-border/70 relative overflow-hidden border-b bg-[#f7f8fb]">
      <HomeBackdrop variant="stories" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <motion.div
          className="max-w-2xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: homeEase }}
        >
          <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
            {successStories.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
            {successStories.title}
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
            {successStories.support}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          {featured ? (
            <motion.article
              className="border-border/70 bg-card relative overflow-hidden rounded-[1.5rem] border p-7 shadow-[0_18px_48px_-28px_color-mix(in_oklch,var(--primary)_32%,transparent)] sm:p-9"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: homeEase }}
            >
              <Quote
                className="text-primary/15 absolute top-6 right-6 size-12"
                aria-hidden
              />
              <div className="flex items-center gap-3">
                <span className="bg-primary text-primary-foreground grid size-12 place-items-center rounded-xl text-sm font-semibold">
                  {featured.initials}
                </span>
                <div>
                  <p className="font-heading text-xl font-semibold tracking-tight">
                    {featured.name}
                  </p>
                  <p className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
                    {featured.role}
                  </p>
                </div>
              </div>
              <p className="text-foreground/85 mt-7 text-lg leading-relaxed sm:text-xl">
                “{featured.quote}”
              </p>
              <dl className="border-border/70 mt-8 grid grid-cols-3 gap-3 border-t pt-5">
                {featured.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dd className="font-heading text-base font-semibold tracking-tight sm:text-lg">
                      {metric.value}
                    </dd>
                    <dt className="text-muted-foreground mt-1 text-[0.65rem] tracking-[0.12em] uppercase">
                      {metric.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </motion.article>
          ) : null}

          <ul className="flex flex-col gap-5">
            {rest.map((item, index) => (
              <motion.li
                key={item.name}
                className="border-border/70 bg-card/90 flex flex-1 flex-col rounded-[1.25rem] border p-5 sm:p-6"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.45,
                  delay: 0.08 + index * 0.06,
                  ease: homeEase,
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-10 place-items-center rounded-xl text-xs font-semibold",
                      index % 2 === 0
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    {item.initials}
                  </span>
                  <div>
                    <p className="font-heading text-base font-semibold tracking-tight">
                      {item.name}
                    </p>
                    <p className="text-muted-foreground text-[10px] font-medium tracking-[0.14em] uppercase">
                      {item.role}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 flex-1 text-sm leading-relaxed">
                  “{item.quote}”
                </p>
                <dl className="border-border/60 mt-4 grid grid-cols-3 gap-2 border-t pt-3">
                  {item.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dd className="font-heading text-sm font-semibold tracking-tight">
                        {metric.value}
                      </dd>
                      <dt className="text-muted-foreground mt-0.5 text-[0.6rem] tracking-[0.1em] uppercase">
                        {metric.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <Link
            href={successStories.cta.href}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              homeCtaClass,
              "h-11 rounded-[1.1rem] px-5",
            )}
          >
            {successStories.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
