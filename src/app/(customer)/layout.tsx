import { redirect } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

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
