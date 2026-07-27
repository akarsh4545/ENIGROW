import type { Metadata } from "next";
import Link from "next/link";

import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button-variants";
import { listApplicationsForUser } from "@/services/applications";
import { listAppointmentsForUser } from "@/services/appointments";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const [applications, appointments] = userId
    ? await Promise.all([
        listApplicationsForUser(userId),
        listAppointmentsForUser(userId),
      ])
    : [[], []];

  const upcoming = appointments.filter(
    (item) => new Date(item.preferredAt).getTime() >= Date.now(),
  );

  return (
    <div className="space-y-8">
      <div>
        <p className="text-primary text-sm font-medium tracking-[0.16em] uppercase">
          Overview
        </p>
        <h1 className="font-heading mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Welcome, {session?.user?.name?.split(" ")[0] || "there"}
        </h1>
        <p className="text-muted-foreground mt-2">
          Track applications, appointments, and account activity from one place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Applications",
            value: applications.length,
            href: "/dashboard/applications",
          },
          {
            label: "Upcoming appointments",
            value: upcoming.length,
            href: "/dashboard/appointments",
          },
          {
            label: "Account",
            value: session?.user?.role ?? "customer",
            href: "/dashboard/profile",
          },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="border-border/70 bg-card hover:border-primary/40 rounded-2xl border p-5 transition"
          >
            <p className="text-muted-foreground text-sm">{item.label}</p>
            <p className="font-heading mt-2 text-3xl font-semibold tracking-tight capitalize">
              {item.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/dashboard/applications" className={cn(buttonVariants())}>
          Manage applications
        </Link>
        <Link
          href="/dashboard/appointments"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Book appointment
        </Link>
      </div>
    </div>
  );
}
