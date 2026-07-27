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
import { adminNav, canAccessAdminNavItem } from "@/config/admin-nav";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

function AdminNavLinks({
  onNavigate,
  className,
  role,
}: {
  onNavigate?: () => void;
  className?: string;
  role?: string | null;
}) {
  const pathname = usePathname();
  const items = adminNav.filter((item) => canAccessAdminNavItem(item, role));

  return (
    <nav className={cn("flex flex-col gap-1", className)} aria-label="Admin">
      {items.map((item) => {
        const Icon = item.icon;
        const active =
          item.href === "/admin"
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
            <Icon className="size-4 shrink-0" />
            <span className="truncate">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({
  children,
  userName,
  role,
}: {
  children: React.ReactNode;
  userName?: string | null;
  role?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-background min-h-dvh">
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
                  aria-label="Open admin menu"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[min(100%,20rem)] overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle>Admin</SheetTitle>
                </SheetHeader>
                <AdminNavLinks
                  className="mt-6"
                  onNavigate={() => setOpen(false)}
                  role={role}
                />
              </SheetContent>
            </Sheet>
            <div>
              <Link
                href="/admin"
                className="font-heading text-lg font-semibold tracking-tight"
              >
                {siteConfig.name} Admin
              </Link>
              {role ? (
                <p className="text-muted-foreground text-[11px] tracking-wide uppercase">
                  {role.replaceAll("_", " ")}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-muted-foreground hidden text-sm sm:block">
              {userName || "Admin"}
            </p>
            <ThemeToggle />
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

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="border-border/70 bg-card sticky top-20 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border p-3">
            <AdminNavLinks role={role} />
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
