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
  /** Height/sizing classes for the image itself */
  className?: string;
  /** Extra classes for the premium frame */
  frameClassName?: string;
  priority?: boolean;
};

export function BrandLogo({
  className,
  frameClassName,
  priority = false,
}: BrandLogoProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "brand-logo-mark inline-flex items-center justify-center rounded-[14px] px-1 py-0.5 transition duration-300 will-change-transform",
        // Light: soft blend into navbar
        "border-border/50 border bg-[#FAFAF8]/55",
        // Dark: charcoal frame, teal border, no white box
        "dark:border-primary/30 dark:bg-[color-mix(in_oklch,var(--card)_92%,black)]",
        "dark:shadow-[inset_0_1px_0_color-mix(in_oklch,white_7%,transparent)]",
        // Hover
        "hover:scale-[1.02]",
        "hover:border-primary/25 hover:shadow-[0_10px_28px_-16px_color-mix(in_oklch,var(--primary)_40%,transparent)]",
        "dark:hover:border-primary/45 dark:hover:shadow-[0_0_0_1px_color-mix(in_oklch,var(--primary)_22%,transparent),0_12px_32px_-14px_color-mix(in_oklch,var(--primary)_50%,transparent)]",
        frameClassName,
      )}
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
