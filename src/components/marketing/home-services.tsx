"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeEase } from "@/components/marketing/home-motion";
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
    <section className="relative overflow-hidden border-b border-[#0B1F33]/[0.06] bg-white">
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: homeEase }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold tracking-[0.18em] text-[#18B878] uppercase">
            What we do
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-[#0B1F33] sm:text-4xl md:text-5xl">
            {services.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5A6B7A] sm:text-lg">
            {services.support}
          </p>
        </motion.div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item, index) => (
            <motion.li
              key={item.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.45,
                delay: Math.min(index * 0.05, 0.28),
                ease: homeEase,
              }}
              className="h-full"
            >
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-[1.35rem] border border-[#0B1F33]/[0.07] bg-[#F7F9F6] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#18B878]/35 hover:bg-white hover:shadow-[0_22px_48px_-28px_rgba(11,31,51,0.35)] sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#0B1F33]/80 uppercase">
                    {categoryLabels[item.category]}
                  </span>
                  <span className="grid size-8 place-items-center rounded-full bg-white text-[#0B1F33] transition group-hover:bg-[#18B878] group-hover:text-white">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <h3 className="font-heading mt-5 text-lg font-bold tracking-tight text-[#0B1F33] sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#5A6B7A]">
                  {item.summary}
                </p>
              </Link>
            </motion.li>
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
              "home-v2-cta h-11 rounded-full px-6 font-semibold",
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
