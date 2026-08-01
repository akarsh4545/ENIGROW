"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { homeEase } from "@/components/marketing/home-motion";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  href: string;
  title: string;
  summary: string;
  tag: string;
  index?: number;
};

export function ServiceCard({
  href,
  title,
  summary,
  tag,
  index = 0,
}: ServiceCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.3),
        ease: homeEase,
      }}
      whileHover={reduceMotion ? undefined : { y: -10, scale: 1.015 }}
      className="h-full list-none"
    >
      <Link
        href={href}
        className={cn(
          "bg-card group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-transparent p-5 sm:p-6",
          "shadow-[0_10px_30px_-18px_color-mix(in_oklch,var(--foreground)_18%,transparent)]",
          "transition duration-300",
          "hover:border-primary/25 hover:shadow-[0_24px_48px_-22px_color-mix(in_oklch,var(--primary)_38%,transparent)]",
          "focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none",
        )}
      >
        {/* Dynamic hover wash */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,color-mix(in_oklch,var(--accent)_22%,transparent),transparent_45%),linear-gradient(160deg,transparent_40%,color-mix(in_oklch,var(--primary)_8%,transparent)_100%)] opacity-0 transition duration-300 group-hover:opacity-100"
        />
        <span
          aria-hidden
          className="bg-primary absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition duration-300 group-hover:scale-x-100"
        />

        <div className="relative flex items-start justify-between gap-3">
          <span className="bg-muted text-foreground/80 group-hover:bg-primary/10 group-hover:text-primary inline-flex rounded-lg px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase transition">
            {tag}
          </span>
          <span className="bg-muted/80 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground grid size-8 place-items-center rounded-full transition duration-300 group-hover:scale-110 group-hover:rotate-12">
            <ArrowUpRight className="size-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <h3 className="font-heading group-hover:text-primary relative mt-5 text-lg font-semibold tracking-tight transition sm:text-xl">
          {title}
        </h3>
        <p className="text-muted-foreground relative mt-2.5 flex-1 text-sm leading-relaxed">
          {summary}
        </p>

        <span className="text-primary relative mt-5 inline-flex items-center gap-1 text-sm font-semibold opacity-80 transition group-hover:opacity-100">
          Explore
          <ArrowUpRight className="size-3.5 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </motion.li>
  );
}
