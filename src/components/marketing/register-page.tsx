import Link from "next/link";

import { RegisterForm } from "@/components/forms/register-form";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";

export function RegisterPageContent() {
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
          Create your account
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Save progress, submit applications, and get advisor follow-ups.
        </p>
      </div>

      <div className="border-border/80 bg-card rounded-2xl border p-6 sm:p-8">
        <RegisterForm />
      </div>
    </div>
  );
}
