"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const brandLogo = {
  src: "/brand/enigrow-logo.png",
  width: 748,
  height: 496,
  alt: `${siteConfig.name} — सफलता की सही शुरुआत`,
} as const;

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center transition duration-300 hover:scale-[1.02]"
    >
      <Image
        src={brandLogo.src}
        alt={brandLogo.alt}
        width={brandLogo.width}
        height={brandLogo.height}
        priority={priority}
        className={cn("h-12 w-auto object-contain", className)}
      />
    </motion.span>
  );
}
