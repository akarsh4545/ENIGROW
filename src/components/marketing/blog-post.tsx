import Link from "next/link";

import type { BlogPost } from "@/data/blog";
import { ROUTES } from "@/constants/routes";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <article>
      <header className="border-border/70 border-b">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-primary text-sm font-medium tracking-[0.18em] uppercase">
            {post.category}
          </p>
          <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="text-muted-foreground mt-5 text-base">{post.excerpt}</p>
          <p className="text-muted-foreground mt-4 text-sm">
            {post.author} ·{" "}
            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {post.readingMinutes} min read
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl space-y-5 px-4 py-12 sm:px-6 sm:py-16">
        {post.content.map((paragraph) => (
          <p
            key={paragraph}
            className="text-muted-foreground text-base leading-relaxed sm:text-lg"
          >
            {paragraph}
          </p>
        ))}

        <div className="pt-6">
          <Link
            href={ROUTES.blog}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Back to blog
          </Link>
        </div>
      </div>
    </article>
  );
}
