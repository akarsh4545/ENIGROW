"use client";

import { cn } from "@/lib/utils";

type Variant =
  | "light"
  | "services"
  | "schemes"
  | "process"
  | "stories"
  | "callback"
  | "teal"
  | "cta"
  | "impact";

type Props = {
  variant: Variant;
  className?: string;
};

/** Decorative layered background for homepage sections only. */
export function HomeBackdrop({ variant, className }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "home-bg pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        className={cn("home-bg-layer home-bg-mesh", `home-bg-mesh--${variant}`)}
      />
      <div
        className={cn("home-bg-layer home-bg-glow", `home-bg-glow--${variant}`)}
      />
      <div
        className={cn(
          "home-bg-layer home-bg-texture",
          `home-bg-texture--${variant}`,
        )}
      />
      {variant === "process" ? (
        <div className="home-bg-layer home-bg-process-beam" />
      ) : null}
      {variant === "teal" || variant === "cta" ? (
        <div
          className={cn(
            "home-bg-layer home-bg-sweep",
            `home-bg-sweep--${variant}`,
          )}
        />
      ) : null}
    </div>
  );
}
