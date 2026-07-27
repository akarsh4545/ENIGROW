"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { eventsContent } from "@/data/gallery-events";
import { ROUTES } from "@/constants/routes";

export function EventsIndexContent() {
  const reduceMotion = useReducedMotion();
  const upcoming = eventsContent.items.filter(
    (item) => item.status === "upcoming",
  );
  const past = eventsContent.items.filter((item) => item.status === "past");

  return (
    <>
      <section className="border-border/70 relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,color-mix(in_oklch,var(--accent)_22%,transparent),transparent_40%),linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_65%,transparent),transparent)]"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <motion.div
            className="max-w-3xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
              {eventsContent.title}
            </p>
            <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              {eventsContent.headline}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              {eventsContent.support}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-border/70 border-b">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Upcoming
          </h2>
          <ul className="divide-border/80 border-border/80 mt-6 divide-y border-y">
            {upcoming.map((item, index) => (
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
                  href={`${ROUTES.events}/${item.slug}`}
                  className="group grid gap-3 py-6 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:items-center sm:gap-8"
                >
                  <span className="text-muted-foreground text-xs">
                    {new Date(item.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span>
                    <span className="font-heading group-hover:text-primary block text-xl font-semibold tracking-tight transition sm:text-2xl">
                      {item.title}
                    </span>
                    <span className="text-muted-foreground mt-2 block text-sm">
                      {item.summary}
                    </span>
                    <span className="text-primary mt-2 block text-xs">
                      {item.format} · {item.location}
                    </span>
                  </span>
                  <ArrowUpRight className="text-muted-foreground group-hover:text-primary size-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Past events
          </h2>
          <ul className="mt-6 space-y-4">
            {past.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`${ROUTES.events}/${item.slug}`}
                  className="text-primary text-sm font-medium underline-offset-4 hover:underline"
                >
                  {item.title}
                </Link>
                <p className="text-muted-foreground text-sm">{item.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
