import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ROUTES } from "@/constants/routes";

export default async function CustomerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect(
      `${ROUTES.login}?callbackUrl=${encodeURIComponent(ROUTES.dashboard)}`,
    );
  }

  return (
    <DashboardShell userName={session.user.name} role={session.user.role}>
      {children}
    </DashboardShell>
  );
}
