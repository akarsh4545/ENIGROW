"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button-variants";
import { testimonialsContent } from "@/data/testimonials";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function TestimonialsPageContent() {
  const reduceMotion = useReducedMotion();
  const { title, headline, support, items } = testimonialsContent;

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

      <section>
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <ul className="grid gap-8 md:grid-cols-2">
            {items.map((item, index) => (
              <motion.li
                key={item.name}
                className="border-primary/35 border-l-2 pl-5"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                  “{item.quote}”
                </p>
                <p className="mt-4 text-sm font-medium">{item.name}</p>
                <p className="text-muted-foreground text-sm">
                  {item.company} · {item.context}
                </p>
                {"metrics" in item && item.metrics ? (
                  <dl className="mt-4 grid grid-cols-2 gap-3">
                    {item.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
                          {metric.label}
                        </dt>
                        <dd className="mt-1 text-sm font-medium">
                          {metric.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </motion.li>
            ))}
          </ul>

          <div className="mt-12">
            <Link href={ROUTES.contact} className={cn(buttonVariants())}>
              Start your engagement
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
