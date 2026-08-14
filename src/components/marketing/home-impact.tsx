"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, FileCheck2, Landmark, ShieldCheck } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { homeEase } from "@/components/marketing/home-motion";
import { cn } from "@/lib/utils";

const proof = [
  {
    icon: Building2,
    title: "Business Registration",
    copy: "Company, MSME, and entity setup with clear filings.",
  },
  {
    icon: Landmark,
    title: "Government Schemes",
    copy: "PMEGP, CGTMSE, MUDRA and allied pathway guidance.",
  },
  {
    icon: FileCheck2,
    title: "Funding Assistance",
    copy: "Documentation and readiness support for capital conversations.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Support",
    copy: "GST, licensing, and ongoing formalities with named ownership.",
  },
] as const;

export function HomeImpact() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b border-[#0B1F33]/[0.06] bg-[#0B1F33]">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-14 sm:grid-cols-2 sm:px-6 sm:py-16 lg:grid-cols-4 lg:gap-5">
        {proof.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-center"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
                ease: homeEase,
              }}
            >
              <span className="mx-auto grid size-11 place-items-center rounded-2xl bg-[#18B878] text-white">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="font-heading mt-4 text-lg font-bold tracking-tight text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {item.copy}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center px-4 pb-10 sm:px-6">
        <Link
          href="/testimonials"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "rounded-full border-white/25 bg-transparent font-semibold text-white hover:bg-white/10 hover:text-white",
          )}
        >
          View all success stories →
        </Link>
      </div>
    </section>
  );
}
