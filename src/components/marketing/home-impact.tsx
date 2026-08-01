"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, IndianRupee, TrendingUp, Users } from "lucide-react";

import { HomeBackdrop } from "@/components/marketing/home-backdrop";
import { homeEase, useCountUp } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";

const iconMap = {
  rupee: IndianRupee,
  trend: TrendingUp,
  people: Users,
  support: Award,
} as const;

function CountCr() {
  const { ref, value } = useCountUp({ end: 110, duration: 1.5 });
  return (
    <p
      ref={ref}
      className="font-heading mt-5 text-3xl font-semibold tracking-tight sm:text-4xl"
    >
      ₹{Math.round(value)}Cr+
    </p>
  );
}

function CountPercent() {
  const { ref, value } = useCountUp({ end: 92, duration: 1.35 });
  return (
    <p
      ref={ref}
      className="font-heading mt-5 text-3xl font-semibold tracking-tight sm:text-4xl"
    >
      {Math.round(value)}%
    </p>
  );
}

function CountPlus() {
  const { ref, value } = useCountUp({ end: 720, duration: 1.45 });
  return (
    <p
      ref={ref}
      className="font-heading mt-5 text-3xl font-semibold tracking-tight sm:text-4xl"
    >
      {Math.round(value)}+
    </p>
  );
}

function StatDisplay({ value }: { value: string }) {
  if (value.includes("Cr")) return <CountCr />;
  if (value.includes("%")) return <CountPercent />;
  if (value.endsWith("+") && /\d/.test(value)) return <CountPlus />;
  return (
    <p className="font-heading mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
      {value}
    </p>
  );
}

export function HomeImpact() {
  const reduceMotion = useReducedMotion();
  const { impact } = homeContent;

  return (
    <section className="border-border/70 border-b">
      <div className="bg-primary text-primary-foreground relative overflow-hidden">
        <HomeBackdrop variant="impact" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 sm:py-16 lg:grid-cols-4 lg:gap-6">
          {impact.items.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.label}
                className="flex flex-col items-center text-center"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                  ease: homeEase,
                }}
              >
                <span className="bg-accent text-accent-foreground grid size-12 place-items-center rounded-2xl shadow-[0_10px_30px_color-mix(in_oklch,var(--accent)_45%,transparent)] transition hover:scale-105">
                  <Icon className="size-5" aria-hidden />
                </span>
                <StatDisplay value={item.value} />
                <p className="text-primary-foreground/75 mt-2 text-xs font-medium tracking-[0.18em] uppercase">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
