import { redirect } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { ROUTES } from "@/constants/routes";

const ADMIN_ROLES = new Set(["admin", "super_admin", "employee"]);

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect(`${ROUTES.login}?callbackUrl=${encodeURIComponent("/admin")}`);
  }

  if (!ADMIN_ROLES.has(session.user.role)) {
    redirect(ROUTES.dashboard);
  }

  return (
    <AdminShell userName={session.user.name} role={session.user.role}>
      {children}
    </AdminShell>
  );
}
