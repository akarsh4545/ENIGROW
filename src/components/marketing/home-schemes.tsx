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
import { homeEase } from "@/components/marketing/home-motion";
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
    <section className="relative overflow-hidden border-b border-[#0B1F33]/[0.06] bg-[#F7F9F6]">
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: homeEase }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold tracking-[0.18em] text-[#18B878] uppercase">
            Government schemes
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-[#0B1F33] sm:text-4xl md:text-5xl">
            {schemes.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5A6B7A] sm:text-lg">
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
                  reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : index * 0.07,
                  ease: homeEase,
                }}
                className="h-full"
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border p-6 transition duration-300 sm:p-7",
                    featured
                      ? "border-transparent bg-[#0B1F33] text-white shadow-[0_24px_50px_-28px_rgba(11,31,51,0.7)]"
                      : "border-[#0B1F33]/[0.08] bg-white text-[#0B1F33] shadow-[0_14px_40px_-30px_rgba(11,31,51,0.25)] hover:-translate-y-1 hover:border-[#18B878]/30 hover:shadow-[0_22px_48px_-24px_rgba(11,31,51,0.35)]",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        "grid size-11 place-items-center rounded-2xl",
                        featured
                          ? "bg-[#18B878] text-white"
                          : "bg-[#E7F7EF] text-[#0B1F33]",
                      )}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "size-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                        featured ? "text-white/70" : "text-[#5A6B7A]",
                      )}
                    />
                  </div>

                  <p
                    className={cn(
                      "mt-5 text-[11px] font-semibold tracking-[0.14em] uppercase",
                      featured ? "text-[#18B878]" : "text-[#18B878]",
                    )}
                  >
                    {item.tag}
                  </p>
                  <h3 className="font-heading mt-2 text-2xl font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 text-sm leading-relaxed",
                      featured ? "text-white/70" : "text-[#5A6B7A]",
                    )}
                  >
                    {item.copy}
                  </p>

                  <div
                    className={cn(
                      "mt-6 flex flex-wrap gap-4 border-t pt-4 text-sm",
                      featured ? "border-white/10" : "border-[#0B1F33]/[0.08]",
                    )}
                  >
                    <span className="inline-flex items-center gap-1.5 font-semibold">
                      <Wallet className="size-3.5 opacity-70" />
                      {amount}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5",
                        featured ? "text-white/65" : "text-[#5A6B7A]",
                      )}
                    >
                      <Clock3 className="size-3.5" />
                      {timeline}
                    </span>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-12 flex justify-center">
          <Link
            href={ROUTES.schemes}
            className={cn(
              buttonVariants({ size: "lg" }),
              "home-v2-cta h-11 rounded-full px-6 font-semibold",
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
