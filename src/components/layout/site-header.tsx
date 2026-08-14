"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { primaryNav, serviceLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-border/80 bg-background/90 shadow-[0_10px_32px_-18px_rgba(0,24,72,0.38)] backdrop-blur-xl"
          : "bg-background/70 border-transparent backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <Link
          href={ROUTES.home}
          className="inline-flex shrink-0 items-center"
          aria-label={`${siteConfig.name} home`}
        >
          <BrandLogo priority className="h-11 w-auto sm:h-12" />
        </Link>

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-0.5">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-[0.9rem] font-medium">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-3">
                  <ul className="grid w-[28rem] gap-1 sm:grid-cols-2">
                    {serviceLinks.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="hover:bg-muted block rounded-xl p-3 transition"
                          >
                            <div className="text-sm font-semibold">
                              {item.title}
                            </div>
                            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li className="sm:col-span-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href={ROUTES.services}
                          className="text-primary hover:bg-muted block rounded-xl p-3 text-sm font-semibold transition"
                        >
                          View all services →
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {primaryNav
                .filter((item) => item.title !== "Services")
                .map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "rounded-lg px-3 py-2 text-[0.9rem] font-medium transition-colors",
                            active
                              ? "bg-secondary text-foreground"
                              : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
                          )}
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <Link
            href={ROUTES.login}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hidden sm:inline-flex",
            )}
          >
            Sign in
          </Link>
          <Link
            href={ROUTES.eligibility}
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden rounded-full px-4 font-semibold sm:inline-flex",
            )}
          >
            Check Eligibility
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,22rem)]">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <BrandLogo className="h-12 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1">
                {primaryNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActivePath(pathname, item.href)
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="bg-border my-3 h-px" />
                <Link
                  href={ROUTES.login}
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full rounded-full",
                  )}
                >
                  Sign in
                </Link>
                <Link
                  href={ROUTES.eligibility}
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "w-full rounded-full font-semibold",
                  )}
                >
                  Check Eligibility
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
