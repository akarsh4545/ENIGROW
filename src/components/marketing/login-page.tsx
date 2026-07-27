import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "@/components/forms/login-form";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";

export function LoginPageContent() {
  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <Link
          href={ROUTES.home}
          className="font-heading text-primary text-2xl font-semibold tracking-tight"
        >
          {siteConfig.name}
        </Link>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          Sign in to your account
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Track applications, appointments, and saved services.
        </p>
      </div>

      <div className="border-border/80 bg-card rounded-2xl border p-6 sm:p-8">
        <Suspense
          fallback={
            <p className="text-muted-foreground text-sm">Loading form…</p>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
