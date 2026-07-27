import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import type { EventItem } from "@/data/gallery-events";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function EventDetailContent({ event }: { event: EventItem }) {
  return (
    <article>
      <header className="border-border/70 border-b">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
            {event.status} · {event.format}
          </p>
          <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {event.title}
          </h1>
          <p className="text-muted-foreground mt-5 text-base">
            {event.summary}
          </p>
          <p className="text-muted-foreground mt-4 text-sm">
            {new Date(event.date).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {event.location}
          </p>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-3xl gap-10 px-4 py-12 sm:px-6 sm:py-16">
        <section>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Agenda
          </h2>
          <ul className="mt-4 space-y-3">
            {event.agenda.map((item) => (
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
            Takeaways
          </h2>
          <ul className="mt-4 space-y-3">
            {event.takeaways.map((item) => (
              <li
                key={item}
                className="text-muted-foreground text-sm sm:text-base"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`${ROUTES.contact}?service=${encodeURIComponent(event.title)}`}
            className={cn(buttonVariants())}
          >
            {event.status === "upcoming"
              ? "Register interest"
              : "Ask for recording notes"}
          </Link>
          <Link
            href={ROUTES.events}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            All events
          </Link>
        </div>
      </div>
    </article>
  );
}
