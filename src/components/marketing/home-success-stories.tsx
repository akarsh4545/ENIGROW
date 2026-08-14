"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";
import { cn } from "@/lib/utils";

export function HomeSuccessStories() {
  const reduceMotion = useReducedMotion();
  const { successStories } = homeContent;

  return (
    <section className="relative overflow-hidden border-b border-[#0B1F33]/[0.06] bg-[#E7F7EF]/50">
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: homeEase }}
        >
          <p className="text-sm font-semibold tracking-[0.18em] text-[#18B878] uppercase">
            {successStories.eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-balance text-[#0B1F33] sm:text-4xl md:text-5xl">
            {successStories.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5A6B7A] sm:text-lg">
            {successStories.support}
          </p>
        </motion.div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {successStories.items.map((item, index) => (
            <motion.li
              key={item.name}
              className="group relative flex flex-col overflow-hidden rounded-[1.35rem] border border-[#0B1F33]/[0.07] bg-white p-6 shadow-[0_14px_40px_-30px_rgba(11,31,51,0.3)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_-24px_rgba(11,31,51,0.35)]"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: homeEase,
              }}
            >
              <Quote
                className="absolute top-5 right-5 size-8 text-[#18B878]/25"
                aria-hidden
              />

              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className={cn(
                    "grid size-11 place-items-center rounded-xl text-sm font-semibold",
                    index % 2 === 0
                      ? "bg-[#0B1F33] text-white"
                      : "bg-[#18B878] text-white",
                  )}
                >
                  {item.initials}
                </span>
                <div>
                  <p className="font-heading text-lg font-bold tracking-tight text-[#0B1F33]">
                    {item.name}
                  </p>
                  <p className="text-xs font-medium tracking-[0.14em] text-[#5A6B7A] uppercase">
                    {item.role}
                  </p>
                </div>
              </div>

              <p className="mt-5 flex-1 text-sm leading-relaxed text-[#5A6B7A] sm:text-[0.95rem]">
                “{item.quote}”
              </p>

              <dl className="mt-6 grid grid-cols-3 gap-2 border-t border-[#0B1F33]/[0.08] pt-4">
                {item.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dd className="font-heading text-sm font-bold tracking-tight text-[#0B1F33] sm:text-base">
                      {metric.value}
                    </dd>
                    <dt className="mt-1 text-[0.65rem] tracking-[0.12em] text-[#5A6B7A] uppercase">
                      {metric.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </motion.li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Link
            href={successStories.cta.href}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "home-v2-outline rounded-full font-semibold",
            )}
          >
            {successStories.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
