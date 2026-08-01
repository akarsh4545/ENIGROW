"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { HomeBackdrop } from "@/components/marketing/home-backdrop";
import { ServiceCard } from "@/components/marketing/service-card";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { servicesContent } from "@/data/services";
import { ROUTES } from "@/constants/routes";
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

const featured = servicesContent.items.slice(0, 8);

export function HomeServices() {
  const reduceMotion = useReducedMotion();
  const { services } = homeContent;

  return (
    <section className="border-border/70 relative overflow-hidden border-b bg-[color-mix(in_oklch,var(--secondary)_28%,var(--background))]">
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

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {featured.map((item, index) => (
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
