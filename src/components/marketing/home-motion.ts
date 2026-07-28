"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

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

export const homeCtaClass =
  "transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_14px_34px_-16px_color-mix(in_oklch,var(--primary)_45%,transparent)] active:scale-[0.99] active:translate-y-0";
