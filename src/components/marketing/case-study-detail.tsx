import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import type { CaseStudy } from "@/data/careers-case-studies";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function CaseStudyDetailContent({ study }: { study: CaseStudy }) {
  return (
    <article>
      <header className="border-border/70 border-b">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
            {study.industry}
          </p>
          <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {study.title}
          </h1>
          <p className="text-muted-foreground mt-5 text-base">
            {study.summary}
          </p>
          <p className="text-primary mt-3 text-sm font-medium">
            {study.outcome}
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl space-y-10 px-4 py-12 sm:px-6 sm:py-16">
        <section>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Challenge
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            {study.challenge}
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Approach
          </h2>
          <ul className="mt-4 space-y-3">
            {study.approach.map((item) => (
              <li
                key={item}
                className="border-primary/35 text-muted-foreground border-l-2 pl-4 text-sm sm:text-base"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Results
          </h2>
          <ul className="mt-4 space-y-3">
            {study.results.map((item) => (
              <li
                key={item}
                className="text-muted-foreground text-sm sm:text-base"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href={ROUTES.contact} className={cn(buttonVariants())}>
            Discuss a similar engagement
          </Link>
          <Link
            href={ROUTES.caseStudies}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            All case studies
          </Link>
        </div>
      </div>
    </article>
  );
}
