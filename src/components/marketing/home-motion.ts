"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, type Variants } from "framer-motion";

type Options = {
  end: number;
  duration?: number;
  decimals?: number;
  enabled?: boolean;
};

export function useCountUp({
  end,
  duration = 1.4,
  decimals = 0,
  enabled = true,
}: Options) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled || !inView) return;
    if (reduceMotion) {
      setValue(end);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Number((eased * end).toFixed(decimals)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [decimals, duration, enabled, end, inView, reduceMotion]);

  return { ref, value };
}

export const homeEase = [0.22, 1, 0.36, 1] as const;

/** Shared primary CTA micro-interaction for marketing surfaces */
export const homeCtaClass =
  "rounded-full font-semibold transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-16px_rgba(0,24,72,0.4)] active:translate-y-0 active:scale-[0.99]";

/** Shared card hover lift — transform + opacity only */
export const homeCardHover =
  "transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_20px_44px_-22px_rgba(0,24,72,0.32)]";

/** Reusable scroll-reveal presets (opacity + translateY only) */
export const revealContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: homeEase },
  },
};

export const revealItemFast: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: homeEase },
  },
};

export function revealProps(reduceMotion: boolean | null) {
  if (reduceMotion) {
    return {
      initial: false as const,
      whileInView: undefined,
      viewport: undefined,
      transition: undefined,
    };
  }
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 } as const,
    transition: { duration: 0.55, ease: homeEase },
  };
}
