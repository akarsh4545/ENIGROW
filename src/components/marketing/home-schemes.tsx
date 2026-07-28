"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgePercent,
  Landmark,
  PiggyBank,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeContent } from "@/data/home";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const schemeIcons: Record<string, LucideIcon> = {
  PMEGP: Landmark,
  CGTMSE: ShieldCheck,
  "MUDRA Loan": PiggyBank,
  "Stand-Up India": Users,
};

const ease = [0.22, 1, 0.36, 1] as const;

export function HomeSchemes() {
  const reduceMotion = useReducedMotion();
  const { schemes } = homeContent;

  return (
    <section className="border-border/70 relative overflow-hidden border-b">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,color-mix(in_oklch,var(--accent)_22%,transparent),transparent_36%),linear-gradient(180deg,transparent,color-mix(in_oklch,var(--secondary)_45%,transparent)_100%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease }}
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

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {schemes.items.map((item, index) => {
            const Icon = schemeIcons[item.title] ?? BadgePercent;
            const featured = index === 0;

            return (
              <motion.li
                key={item.href}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 28, scale: 0.97 }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: reduceMotion ? 0 : index * 0.08,
                  ease,
                }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex h-full min-h-[17rem] flex-col overflow-hidden rounded-[1.35rem] border p-6 transition duration-300 sm:p-7",
                    "focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none",
                    featured
                      ? "bg-primary text-primary-foreground border-transparent shadow-[0_22px_50px_-24px_color-mix(in_oklch,var(--primary)_75%,transparent)]"
                      : "border-border/70 bg-card/95 hover:border-primary/30 shadow-[0_1px_2px_color-mix(in_oklch,var(--foreground)_5%,transparent),0_16px_40px_-28px_color-mix(in_oklch,var(--primary)_28%,transparent)] hover:shadow-[0_20px_44px_-22px_color-mix(in_oklch,var(--primary)_42%,transparent)]",
                  )}
                >
                  {featured ? (
                    <>
                      <div
                        aria-hidden
                        className="absolute -top-16 -right-10 size-52 rounded-full bg-[color-mix(in_oklch,var(--accent)_35%,transparent)] blur-3xl transition duration-500 group-hover:scale-110"
                      />
                      <div
                        aria-hidden
                        className="absolute -bottom-20 -left-10 size-44 rounded-full bg-[color-mix(in_oklch,var(--primary)_40%,black)] opacity-50 blur-3xl"
                      />
                    </>
                  ) : (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--accent)_55%,transparent),transparent)] opacity-0 transition group-hover:opacity-100"
                    />
                  )}

                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "grid size-11 place-items-center rounded-2xl transition duration-300 group-hover:scale-105",
                          featured
                            ? "bg-primary-foreground/12"
                            : "bg-primary/8 text-primary",
                        )}
                      >
                        <Icon className="size-5" />
                      </span>
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase",
                          featured
                            ? "bg-primary-foreground/10"
                            : "bg-accent/25 text-accent-foreground/80",
                        )}
                      >
                        {featured ? `Featured · ${item.tag}` : item.tag}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "grid size-9 place-items-center rounded-full transition",
                        featured
                          ? "bg-primary-foreground/10 group-hover:bg-accent group-hover:text-accent-foreground"
                          : "bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground",
                      )}
                    >
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>

                  <div className="relative mt-auto pt-8">
                    <h3
                      className={cn(
                        "font-heading text-2xl font-semibold tracking-tight sm:text-[1.7rem]",
                        !featured && "group-hover:text-primary transition",
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 text-sm leading-relaxed",
                        featured
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.copy}
                    </p>
                    <p
                      className={cn(
                        "mt-4 text-sm font-medium",
                        featured ? "text-accent" : "text-primary",
                      )}
                    >
                      {item.highlight}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.meta.map((row) => (
                        <span
                          key={row.label}
                          className={cn(
                            "rounded-full border px-3 py-1.5 text-xs",
                            featured
                              ? "border-primary-foreground/15 bg-primary-foreground/8"
                              : "border-border/70 bg-background/80",
                          )}
                        >
                          <span
                            className={
                              featured
                                ? "text-primary-foreground/65"
                                : "text-muted-foreground"
                            }
                          >
                            {row.label}:{" "}
                          </span>
                          <span className="font-semibold">{row.value}</span>
                        </span>
                      ))}
                      <span
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-xs",
                          featured
                            ? "border-primary-foreground/15 bg-primary-foreground/8"
                            : "border-border/70 bg-background/80",
                        )}
                      >
                        Best for:{" "}
                        <span className="font-semibold">{item.forWhom}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, delay: 0.12, ease }}
        >
          <Link
            href={ROUTES.schemes}
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-11 rounded-full px-5",
            )}
          >
            Browse all schemes
            <ArrowRight className="size-4" />
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
