"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Globe2,
  Receipt,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { HomeBackdrop } from "@/components/marketing/home-backdrop";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const icons: Record<
  (typeof homeContent.services.items)[number]["icon"],
  LucideIcon
> = {
  building: Building2,
  receipt: Receipt,
  shield: ShieldCheck,
  globe: Globe2,
};

export function HomeServices() {
  const reduceMotion = useReducedMotion();
  const { services } = homeContent;

  return (
    <section className="border-border/70 relative overflow-hidden border-b bg-[color-mix(in_oklch,var(--secondary)_35%,var(--background))]">
      <HomeBackdrop variant="services" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: homeEase }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
            What we do
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {services.title}
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
            {services.support}
          </p>
        </motion.div>

        <ul className="mt-14 grid gap-5 sm:gap-6 md:grid-cols-2">
          {services.items.map((item, index) => {
            const Icon = icons[item.icon];

            return (
              <motion.li
                key={item.href}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: homeEase,
                }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "bg-card group border-border/80 relative flex h-full flex-col overflow-hidden rounded-[1.15rem] border p-6 sm:p-7",
                    "shadow-[0_1px_2px_color-mix(in_oklch,var(--foreground)_4%,transparent),0_12px_32px_-20px_color-mix(in_oklch,var(--primary)_22%,transparent)]",
                    "hover:border-primary/40 transition duration-300",
                    "hover:bg-[color-mix(in_oklch,var(--card)_92%,var(--primary)_8%)]",
                    "hover:shadow-[0_18px_40px_-16px_color-mix(in_oklch,var(--primary)_42%,transparent)]",
                    "focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none",
                  )}
                >
                  <span
                    aria-hidden
                    className="bg-accent absolute top-0 left-0 h-full w-1 origin-top scale-y-0 transition duration-300 group-hover:scale-y-100"
                  />

                  <span className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-primary/25 mb-5 inline-flex size-12 items-center justify-center rounded-2xl transition duration-300 group-hover:rotate-6 group-hover:shadow-md">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>

                  <h3 className="font-heading group-hover:text-primary text-xl font-semibold tracking-tight transition">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed sm:text-[0.95rem]">
                    {item.copy}
                  </p>

                  <span className="text-primary mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Learn More
                    <ArrowRight className="size-4 -translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <motion.div
          className="mt-12 flex justify-center"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, delay: 0.12, ease: homeEase }}
        >
          <Link
            href={ROUTES.services}
            className={cn(
              buttonVariants({ size: "lg" }),
              homeCtaClass,
              "shadow-primary/25 h-11 rounded-full px-6 shadow-md",
            )}
          >
            View All Services
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
