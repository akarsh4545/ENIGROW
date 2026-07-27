"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button-variants";
import { teamContent } from "@/data/team";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function TeamPageContent() {
  const reduceMotion = useReducedMotion();
  const { title, headline, support, members } = teamContent;

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
          <ul className="divide-border/80 border-border/80 divide-y border-y">
            {members.map((member, index) => (
              <motion.li
                key={member.name}
                className="grid gap-2 py-7 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-10"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div>
                  <h2 className="font-heading text-2xl font-semibold tracking-tight">
                    {member.name}
                  </h2>
                  <p className="text-primary mt-1 text-sm">{member.role}</p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                  {member.focus}
                </p>
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
              Prefer to talk to someone directly?
            </h2>
            <p className="text-primary-foreground/80 mt-3">
              Share your goal and we will route you to the right advisory desk.
            </p>
          </div>
          <Link
            href={ROUTES.contact}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-accent text-accent-foreground hover:bg-accent/90",
            )}
          >
            Contact the team
          </Link>
        </div>
      </section>
    </>
  );
}
