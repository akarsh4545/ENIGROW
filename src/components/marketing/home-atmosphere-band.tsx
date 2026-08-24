"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { homeEase } from "@/components/marketing/home-motion";
import { homeContent } from "@/data/home";

/**
 * Slim full-bleed photo break — keeps the homepage from feeling text-only,
 * without adding another content section.
 */
export function HomeAtmosphereBand() {
  const reduceMotion = useReducedMotion();
  const { atmosphere } = homeContent.visuals;

  return (
    <section className="relative isolate h-44 overflow-hidden border-b border-[#001848]/20 sm:h-56 md:h-64">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: homeEase }}
      >
        <Image
          src={atmosphere.src}
          alt={atmosphere.alt}
          fill
          sizes="100vw"
          className="object-cover object-[center_35%]"
          priority={false}
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#001848]/80 via-[#001848]/55 to-[#001848]/35"
      />
      <div className="relative mx-auto flex h-full w-full max-w-6xl items-end px-4 pb-8 sm:px-6 sm:pb-10">
        <motion.p
          className="font-heading max-w-md text-xl font-bold tracking-tight text-balance text-white sm:text-2xl"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, ease: homeEase }}
        >
          Practical guidance for the paperwork that unlocks capital.
        </motion.p>
      </div>
    </section>
  );
}
