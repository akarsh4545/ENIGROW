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
import {
  homeCardHover,
  homeCtaClass,
  homeEase,
} from "@/components/marketing/home-motion";
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
  const [featured, ...rest] = schemes.items;

  return (
    <section className="relative overflow-hidden border-b border-[#e2e6ef] bg-[#eef1f7]/80">
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: homeEase }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold tracking-[0.18em] text-[#c08418] uppercase">
            Government schemes
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-[#001848] sm:text-4xl md:text-5xl">
            Find the Right Funding Route for Your Business
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5b6577] sm:text-lg">
            {schemes.support}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-5 lg:gap-6">
          {featured ? (
            <motion.div
              className="lg:col-span-3"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: homeEase }}
            >
              {(() => {
                const Icon = schemeIcons[featured.title] ?? BadgePercent;
                const amount =
                  featured.meta.find((m) => /amount|cover/i.test(m.label))
                    ?.value ?? featured.highlight;
                const timeline =
                  featured.meta.find((m) => /timeline/i.test(m.label))?.value ??
                  "—";
                return (
                  <Link
                    href={featured.href}
                    className={cn(
                      "group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[1.5rem] border border-transparent bg-[#001848] p-7 text-white sm:p-8",
                      "shadow-[0_28px_60px_-30px_rgba(0,24,72,0.7)]",
                      homeCardHover,
                      "focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none",
                    )}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-20 -right-16 size-72 rounded-full bg-[#c08418]/30 blur-3xl transition duration-500 group-hover:scale-110"
                    />
                    <div className="relative flex items-start justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl bg-[#c08418] text-[#1a1408]">
                        <Icon className="size-5" />
                      </span>
                      <span className="grid size-9 place-items-center rounded-full bg-white/10 transition group-hover:bg-[#c08418] group-hover:text-[#1a1408]">
                        <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                    <p className="relative mt-8 text-[11px] font-semibold tracking-[0.14em] text-[#c08418] uppercase">
                      {featured.tag}
                    </p>
                    <h3 className="font-heading relative mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                      {featured.title}
                    </h3>
                    <p className="relative mt-4 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
                      {featured.copy}
                    </p>
                    <div className="relative mt-auto grid grid-cols-2 gap-3 pt-8">
                      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                        <p className="flex items-center gap-1.5 text-[10px] tracking-[0.12em] text-white/50 uppercase">
                          <Wallet className="size-3" /> Funding
                        </p>
                        <p className="font-heading mt-1 text-lg font-bold">
                          {amount}
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                        <p className="flex items-center gap-1.5 text-[10px] tracking-[0.12em] text-white/50 uppercase">
                          <Clock3 className="size-3" /> Timeline
                        </p>
                        <p className="font-heading mt-1 text-lg font-bold">
                          {timeline}
                        </p>
                      </div>
                    </div>
                    <p className="relative mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#c08418]">
                      Explore scheme
                      <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                    </p>
                  </Link>
                );
              })()}
            </motion.div>
          ) : null}

          <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
            {rest.map((item, index) => {
              const Icon = schemeIcons[item.title] ?? BadgePercent;
              const amount =
                item.meta.find((m) => /amount|cover/i.test(m.label))?.value ??
                item.highlight;
              return (
                <motion.li
                  key={item.href}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.06 + index * 0.05,
                    ease: homeEase,
                  }}
                  className="h-full"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex h-full flex-col rounded-[1.35rem] border border-[#e2e6ef] bg-white p-5 shadow-[0_12px_36px_-28px_rgba(0,24,72,0.2)]",
                      homeCardHover,
                      "focus-visible:ring-ring/40 hover:border-[#001848]/20 focus-visible:ring-2 focus-visible:outline-none",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-[#001848]/[0.06] text-[#001848] transition group-hover:-translate-y-0.5">
                        <Icon className="size-4" />
                      </span>
                      <ArrowUpRight className="size-4 text-[#5b6577] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#001848]" />
                    </div>
                    <h3 className="font-heading mt-4 text-xl font-bold tracking-tight text-[#001848]">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5b6577]">
                      {item.copy}
                    </p>
                    <p className="mt-4 text-sm font-semibold text-[#001848]">
                      {amount}
                    </p>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href={ROUTES.schemes}
            className={cn(
              buttonVariants({ size: "lg" }),
              homeCtaClass,
              "h-11 px-6",
            )}
          >
            Browse all schemes
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
