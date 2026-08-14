"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { homeContent } from "@/data/home";
import { cn } from "@/lib/utils";

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const { hero } = homeContent;

  return (
    <section className="relative isolate min-h-[calc(100dvh-4rem)] overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,oklch(0.22_0.03_220_/_0.88)_0%,oklch(0.22_0.03_220_/_0.62)_42%,oklch(0.22_0.03_220_/_0.28)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,color-mix(in_oklch,var(--accent)_22%,transparent),transparent_42%)]" />
      </motion.div>

      <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-6xl items-end px-4 py-16 sm:px-6 sm:py-20 md:items-center">
        <div className="max-w-2xl text-white">
          <motion.p
            className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {siteConfig.name}
          </motion.p>

          <motion.h1
            className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.16,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {hero.support}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={hero.primaryCta.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-accent text-accent-foreground hover:bg-accent/90",
              )}
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/40 bg-white/5 text-white hover:bg-white/12 hover:text-white",
              )}
            >
              {hero.secondaryCta.label}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
