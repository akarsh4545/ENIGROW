"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgePercent,
  Clock3,
  Landmark,
  PiggyBank,
  ShieldCheck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeCtaClass, homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const schemeIcons: Record<string, LucideIcon> = {
  PMEGP: Landmark,
  CGTMSE: ShieldCheck,
  "MUDRA Loan": PiggyBank,
  "Stand-Up India": Users,
};

export function HomeSchemes() {
  const reduceMotion = useReducedMotion();
  const { schemes } = homeContent;

  return (
    <section className="border-border/70 relative overflow-hidden border-b bg-[#eef1f7]/70">
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: homeEase }}
          className="max-w-2xl"
        >
          <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
            Government schemes
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Find the Right Funding Route for Your Business
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
            {schemes.support}
          </p>
        </motion.div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {schemes.items.map((item, index) => {
            const Icon = schemeIcons[item.title] ?? BadgePercent;
            const amount =
              item.meta.find((m) => /amount|cover/i.test(m.label))?.value ??
              item.highlight;
            const timeline =
              item.meta.find((m) => /timeline/i.test(m.label))?.value ?? "—";

            return (
              <motion.li
                key={item.href}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : index * 0.07,
                  ease: homeEase,
                }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                className="h-full"
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group border-border/70 bg-card relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border p-6 transition duration-300 sm:p-7",
                    "hover:border-primary/40 shadow-[0_12px_36px_-28px_color-mix(in_oklch,var(--primary)_22%,transparent)] hover:shadow-[0_24px_48px_-20px_color-mix(in_oklch,var(--primary)_40%,transparent)]",
                    "focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none",
                  )}
                >
                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="bg-primary/8 text-primary grid size-11 place-items-center rounded-2xl transition duration-300 group-hover:rotate-6">
                        <Icon className="size-5" />
                      </span>
                      <span className="bg-accent/20 text-accent-foreground/85 inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase">
                        {item.tag}
                      </span>
                    </div>
                    <span className="bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground grid size-9 place-items-center rounded-full transition duration-300">
                      <ArrowUpRight className="size-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  <div className="relative mt-6">
                    <h3 className="font-heading group-hover:text-primary text-2xl font-semibold tracking-tight transition sm:text-[1.7rem]">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                      {item.copy}
                    </p>
                  </div>

                  <div className="relative mt-5 grid grid-cols-2 gap-2.5">
                    <div className="border-border/70 bg-background/80 rounded-xl border px-3 py-2.5">
                      <p className="text-muted-foreground flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase">
                        <Wallet className="size-3" />
                        {item.meta.find((m) => /amount|cover/i.test(m.label))
                          ?.label ?? "Amount"}
                      </p>
                      <p className="mt-1 text-sm font-semibold">{amount}</p>
                    </div>
                    <div className="border-border/70 bg-background/80 rounded-xl border px-3 py-2.5">
                      <p className="text-muted-foreground flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase">
                        <Clock3 className="size-3" />
                        Timeline
                      </p>
                      <p className="mt-1 text-sm font-semibold">{timeline}</p>
                    </div>
                  </div>

                  <div className="relative mt-4">
                    <p className="text-muted-foreground text-[10px] tracking-[0.14em] uppercase">
                      Best for
                    </p>
                    <p className="mt-1 text-sm font-medium">{item.forWhom}</p>
                    <p className="text-primary mt-2 text-sm font-medium">
                      {item.highlight}
                    </p>
                  </div>

                  <div className="relative mt-auto pt-5">
                    <div className="flex flex-wrap gap-1.5">
                      {item.benefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="border-border/70 bg-secondary/50 text-foreground/80 rounded-full border px-2.5 py-1 text-[11px] font-medium"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <motion.div
          className="mt-10"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, delay: 0.08, ease: homeEase }}
        >
          <Link
            href={ROUTES.schemes}
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              homeCtaClass,
              "h-11 rounded-[1.1rem] px-5",
            )}
          >
            Browse all schemes
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
