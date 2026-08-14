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
import { HomeBackdrop } from "@/components/marketing/home-backdrop";
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
    <section className="border-border/70 relative overflow-hidden border-b">
      <HomeBackdrop variant="schemes" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: homeEase }}
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
            const amount =
              item.meta.find((m) => /amount|cover/i.test(m.label))?.value ??
              item.highlight;
            const timeline =
              item.meta.find((m) => /timeline/i.test(m.label))?.value ?? "—";

            return (
              <motion.li
                key={item.href}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : index * 0.08,
                  ease: homeEase,
                }}
                whileHover={reduceMotion ? undefined : { y: -8 }}
                className="h-full"
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border p-6 transition duration-300 sm:p-7",
                    "focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none",
                    featured
                      ? "bg-primary text-primary-foreground border-transparent shadow-[0_22px_50px_-24px_color-mix(in_oklch,var(--primary)_75%,transparent)] hover:shadow-[0_28px_56px_-20px_color-mix(in_oklch,var(--primary)_85%,transparent)]"
                      : "border-border/70 bg-card hover:border-primary/40 shadow-[0_1px_2px_color-mix(in_oklch,var(--foreground)_5%,transparent),0_16px_40px_-28px_color-mix(in_oklch,var(--primary)_22%,transparent)] hover:shadow-[0_24px_48px_-20px_color-mix(in_oklch,var(--primary)_40%,transparent)]",
                  )}
                >
                  {featured ? (
                    <div
                      aria-hidden
                      className="absolute -top-16 -right-10 size-52 rounded-full bg-[color-mix(in_oklch,var(--accent)_32%,transparent)] blur-3xl transition duration-500 group-hover:scale-110"
                    />
                  ) : null}

                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "grid size-11 place-items-center rounded-2xl transition duration-300 group-hover:rotate-6",
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
                            : "bg-accent/25 text-accent-foreground/85",
                        )}
                      >
                        {featured ? `Featured · ${item.tag}` : item.tag}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "grid size-9 place-items-center rounded-full transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                        featured
                          ? "bg-primary-foreground/10 group-hover:bg-accent group-hover:text-accent-foreground"
                          : "bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground",
                      )}
                    >
                      <ArrowUpRight className="size-4 transition duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>

                  <div className="relative mt-6">
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
                  </div>

                  <div className="relative mt-5 grid grid-cols-2 gap-2.5">
                    <div
                      className={cn(
                        "rounded-xl border px-3 py-2.5",
                        featured
                          ? "border-primary-foreground/15 bg-primary-foreground/8"
                          : "border-border/70 bg-background/80",
                      )}
                    >
                      <p
                        className={cn(
                          "flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase",
                          featured
                            ? "text-primary-foreground/65"
                            : "text-muted-foreground",
                        )}
                      >
                        <Wallet className="size-3" />
                        Funding range
                      </p>
                      <p className="mt-1 text-sm font-semibold">{amount}</p>
                    </div>
                    <div
                      className={cn(
                        "rounded-xl border px-3 py-2.5",
                        featured
                          ? "border-primary-foreground/15 bg-primary-foreground/8"
                          : "border-border/70 bg-background/80",
                      )}
                    >
                      <p
                        className={cn(
                          "flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase",
                          featured
                            ? "text-primary-foreground/65"
                            : "text-muted-foreground",
                        )}
                      >
                        <Clock3 className="size-3" />
                        Timeline
                      </p>
                      <p className="mt-1 text-sm font-semibold">{timeline}</p>
                    </div>
                  </div>

                  <div className="relative mt-4">
                    <p
                      className={cn(
                        "text-[10px] tracking-[0.14em] uppercase",
                        featured
                          ? "text-primary-foreground/65"
                          : "text-muted-foreground",
                      )}
                    >
                      Best for
                    </p>
                    <p className="mt-1 text-sm font-medium">{item.forWhom}</p>
                    <p
                      className={cn(
                        "mt-2 text-sm font-medium",
                        featured ? "text-accent" : "text-primary",
                      )}
                    >
                      {item.highlight}
                    </p>
                  </div>

                  <div className="relative mt-auto pt-5">
                    <div className="flex flex-wrap gap-1.5">
                      {item.benefits.map((benefit, benefitIndex) => (
                        <motion.span
                          key={benefit}
                          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.15 + benefitIndex * 0.05,
                            duration: 0.35,
                          }}
                          className={cn(
                            "rounded-full border px-2.5 py-1 text-[11px] font-medium",
                            featured
                              ? "border-primary-foreground/15 bg-primary-foreground/8"
                              : "border-border/70 bg-secondary/50 text-foreground/80",
                          )}
                        >
                          {benefit}
                        </motion.span>
                      ))}
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
          transition={{ duration: 0.45, delay: 0.1, ease: homeEase }}
        >
          <Link
            href={ROUTES.schemes}
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              homeCtaClass,
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
