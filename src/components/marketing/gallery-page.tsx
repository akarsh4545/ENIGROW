"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

import { galleryContent } from "@/data/gallery-events";
import { cn } from "@/lib/utils";

const filters = [
  { id: "all", label: "All" },
  { id: "workspace", label: "Workspace" },
  { id: "workshops", label: "Workshops" },
  { id: "field", label: "Field" },
  { id: "team", label: "Team" },
] as const;

export function GalleryPageContent() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");

  const items = useMemo(() => {
    if (filter === "all") return galleryContent.items;
    return galleryContent.items.filter((item) => item.category === filter);
  }, [filter]);

  return (
    <>
      <section className="border-border/70 relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,color-mix(in_oklch,var(--accent)_22%,transparent),transparent_40%),linear-gradient(180deg,color-mix(in_oklch,var(--secondary)_65%,transparent),transparent)]"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <motion.div
            className="max-w-3xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
              {galleryContent.title}
            </p>
            <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              {galleryContent.headline}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              {galleryContent.support}
            </p>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm transition",
                  filter === item.id
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-border/80 text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <motion.li
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group border-border/70 bg-card overflow-hidden rounded-2xl border"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4">
                  <p className="text-muted-foreground text-xs tracking-wide uppercase">
                    {item.category}
                  </p>
                  <h2 className="font-heading mt-1 text-lg font-semibold tracking-tight">
                    {item.title}
                  </h2>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
