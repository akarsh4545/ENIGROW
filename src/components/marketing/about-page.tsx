"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { aboutContent } from "@/data/about";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function AboutPageContent() {
  const reduceMotion = useReducedMotion();
  const content = aboutContent;

  return (
    <>
      <section className="border-border/70 relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,color-mix(in_oklch,var(--accent)_24%,transparent),transparent_42%),radial-gradient(circle_at_90%_20%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_40%),linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_70%,transparent),transparent)]"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
              {content.title}
            </p>
            <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              {content.headline}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              {content.intro}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-border/70 border-b">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            {content.identity.title}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border-border/70 rounded-2xl border p-5">
              <p className="text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase">
                {content.identity.brandLabel}
              </p>
              <p className="font-heading mt-2 text-xl font-semibold tracking-tight">
                {content.identity.brandValue}
              </p>
            </div>
            <div className="border-border/70 rounded-2xl border p-5 sm:col-span-2 lg:col-span-2">
              <p className="text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase">
                {content.identity.legalLabel}
              </p>
              <p className="font-heading mt-2 text-xl font-semibold tracking-tight">
                {content.identity.legalValue}
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                {content.identity.cinLabel}: {siteConfig.cin}
              </p>
            </div>
            <div className="border-border/70 rounded-2xl border p-5 sm:col-span-2 lg:col-span-3">
              <p className="text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase">
                {content.identity.locationLabel}
              </p>
              <p className="mt-2 text-sm leading-relaxed sm:text-base">
                {siteConfig.registeredOffice}
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
              {content.identity.whoWeHelp}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
              {content.identity.whatWeDo}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Contact ENIGROW
            </Link>
            <Link
              href="/funding"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              Business Funding
            </Link>
            <Link
              href="/schemes"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              Government Schemes
            </Link>
          </div>
        </div>
      </section>

      <section className="border-border/70 border-b">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.h2
            className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.story.title}
          </motion.h2>
          <div className="space-y-5">
            {content.story.paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                className="text-muted-foreground text-base leading-relaxed sm:text-lg"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border/70 border-b">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <motion.div
            className="max-w-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {content.values.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base sm:text-lg">
              {content.values.support}
            </p>
          </motion.div>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {content.values.items.map((item, index) => (
              <motion.li
                key={item.title}
                className="border-border/70 border-t pt-6"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h3 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
                  {item.copy}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-border/70 border-b bg-[linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_45%,transparent),transparent)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <motion.div
            className="max-w-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {content.principles.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-base sm:text-lg">
              {content.principles.support}
            </p>
          </motion.div>

          <ol className="divide-border/80 border-border/80 mt-12 divide-y border-y">
            {content.principles.items.map((item, index) => (
              <motion.li
                key={item.title}
                className="grid gap-3 py-7 sm:grid-cols-[4rem_1fr] sm:gap-8"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="font-heading text-accent-foreground/90 text-2xl font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-2xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed sm:text-base">
                    {item.copy}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-border/70 border-b">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            {content.focus.title}
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.focus.items.map((item) => (
              <li
                key={item}
                className="border-primary/40 text-muted-foreground border-l-2 pl-4 text-sm leading-relaxed sm:text-base"
              >
                {item}
              </li>
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
              {content.cta.title}
            </h2>
            <p className="text-primary-foreground/80 mt-4 text-base leading-relaxed sm:text-lg">
              {content.cta.support}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={content.cta.primary.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-accent text-accent-foreground hover:bg-accent/90",
              )}
            >
              {content.cta.primary.label}
            </Link>
            <Link
              href={content.cta.secondary.href}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-primary-foreground/35 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent",
              )}
            >
              {content.cta.secondary.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
