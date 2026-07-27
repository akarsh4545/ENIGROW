import type { LegalPage } from "@/data/legal";

export function LegalPageContent({ page }: { page: LegalPage }) {
  return (
    <article>
      <header className="border-border/70 border-b">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
            {page.title}
          </p>
          <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {page.headline}
          </h1>
          <p className="text-muted-foreground mt-4 text-sm">
            Last updated{" "}
            {new Date(page.updatedAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl space-y-10 px-4 py-12 sm:px-6 sm:py-16">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-muted-foreground text-base leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
