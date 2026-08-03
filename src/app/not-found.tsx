import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        404
      </p>
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="text-muted-foreground max-w-md">
        The page you are looking for does not exist or was moved.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
        Back to home
      </Link>
    </main>
  );
}
