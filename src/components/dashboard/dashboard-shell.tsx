"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Menu } from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { dashboardNav } from "@/config/dashboard-nav";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

function NavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex flex-col gap-1", className)}
      aria-label="Dashboard"
    >
      {dashboardNav.map((item) => {
        const Icon = item.icon;
        const active =
          item.href === "/dashboard"
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

const ADMIN_ROLES = new Set(["admin", "super_admin", "employee"]);
const LEADS_ROLES = new Set(["admin", "super_admin"]);

export function DashboardShell({
  children,
  userName,
  role,
}: {
  children: React.ReactNode;
  userName?: string | null;
  role?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const canAccessAdmin = role ? ADMIN_ROLES.has(role) : false;
  const canAccessLeads = role ? LEADS_ROLES.has(role) : false;

  return (
    <div className="bg-muted/30 min-h-dvh">
      <header className="border-border/70 bg-background/90 sticky top-0 z-40 border-b backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="lg:hidden"
                  aria-label="Open dashboard menu"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[min(100%,20rem)]">
                <SheetHeader>
                  <SheetTitle>{siteConfig.name}</SheetTitle>
                </SheetHeader>
                <NavLinks className="mt-6" onNavigate={() => setOpen(false)} />
                {canAccessAdmin ? (
                  <div className="mt-4 space-y-2 border-t pt-4">
                    <Link
                      href={ROUTES.admin}
                      onClick={() => setOpen(false)}
                      className={cn(buttonVariants({ size: "sm" }), "w-full")}
                    >
                      Admin console
                    </Link>
                    {canAccessLeads ? (
                      <Link
                        href="/admin/leads"
                        onClick={() => setOpen(false)}
                        className={cn(
                          buttonVariants({ size: "sm", variant: "outline" }),
                          "w-full",
                        )}
                      >
                        CRM / Leads
                      </Link>
                    ) : null}
                  </div>
                ) : null}
              </SheetContent>
            </Sheet>
            <Link
              href={ROUTES.dashboard}
              className="font-heading text-lg font-semibold tracking-tight"
            >
              {siteConfig.name}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-muted-foreground hidden text-sm sm:block">
              {userName || "Account"}
            </p>
            <ThemeToggle />
            {canAccessLeads ? (
              <Link
                href="/admin/leads"
                className={cn(buttonVariants({ size: "sm" }))}
              >
                CRM / Leads
              </Link>
            ) : null}
            <Link
              href={ROUTES.home}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              Website
            </Link>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => signOut({ callbackUrl: ROUTES.login })}
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="border-border/70 bg-card sticky top-20 rounded-2xl border p-3">
            <NavLinks />
            {canAccessAdmin ? (
              <div className="mt-3 space-y-2 border-t pt-3">
                <Link
                  href={ROUTES.admin}
                  className={cn(
                    buttonVariants({ size: "sm", variant: "outline" }),
                    "w-full",
                  )}
                >
                  Admin console
                </Link>
                {canAccessLeads ? (
                  <Link
                    href="/admin/leads"
                    className={cn(buttonVariants({ size: "sm" }), "w-full")}
                  >
                    CRM / Leads
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
