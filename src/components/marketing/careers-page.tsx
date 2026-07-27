"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { careersContent } from "@/data/careers-case-studies";
import { cn } from "@/lib/utils";

export function CareersPageContent() {
  const reduceMotion = useReducedMotion();
  const { title, headline, support, culture, roles, cta } = careersContent;

  return (
    <>
      <section className="border-border/70 relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,color-mix(in_oklch,var(--accent)_22%,transparent),transparent_40%),linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_65%,transparent),transparent)]"
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
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            How we work
          </h2>
          <ul className="space-y-4">
            {culture.map((item) => (
              <li
                key={item}
                className="border-primary/35 text-muted-foreground border-l-2 pl-4 text-sm sm:text-base"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-border/70 border-b">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            Open roles
          </h2>
          <ul className="divide-border/80 border-border/80 mt-8 divide-y border-y">
            {roles.map((role, index) => (
              <motion.li
                key={role.id}
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
                  href={`${cta.href}`}
                  className="group grid gap-2 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] sm:items-center sm:gap-8"
                >
                  <span>
                    <span className="font-heading group-hover:text-primary block text-xl font-semibold tracking-tight transition sm:text-2xl">
                      {role.title}
                    </span>
                    <span className="text-muted-foreground mt-1 block text-xs">
                      {role.type} · {role.location}
                    </span>
                  </span>
                  <span className="text-muted-foreground text-sm leading-relaxed">
                    {role.summary}
                  </span>
                  <ArrowUpRight className="text-muted-foreground group-hover:text-primary size-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_oklch,var(--primary)_92%,black),color-mix(in_oklch,var(--primary)_70%,oklch(0.35_0.04_210)))]"
        />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-20 sm:px-6 md:flex-row md:items-end md:justify-between">
          <div className="text-primary-foreground max-w-xl">
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              {cta.title}
            </h2>
            <p className="text-primary-foreground/80 mt-3">{cta.support}</p>
          </div>
          <Link
            href={cta.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-accent text-accent-foreground hover:bg-accent/90",
            )}
          >
            Apply via contact
          </Link>
        </div>
      </section>
    </>
  );
}
