"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

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

export function HomeHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#0B1F33]/[0.08] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between gap-4 px-4 sm:h-[5rem] sm:px-6">
        <Link
          href={ROUTES.home}
          className="inline-flex shrink-0 items-center"
          aria-label={`${siteConfig.name} home`}
        >
          <BrandLogo priority className="h-[3.25rem] w-auto sm:h-[3.75rem]" />
        </Link>

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-0.5">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-[0.9rem] font-medium text-[#0B1F33] data-[state=open]:bg-[#E7F7EF]">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-3">
                  <ul className="grid w-[28rem] gap-1 sm:grid-cols-2">
                    {serviceLinks.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block rounded-lg p-3 transition hover:bg-[#E7F7EF]"
                          >
                            <div className="text-sm font-medium text-[#0B1F33]">
                              {item.title}
                            </div>
                            <p className="mt-1 text-xs text-[#5A6B7A]">
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
                          className="block rounded-lg p-3 text-sm font-semibold text-[#18B878] transition hover:bg-[#E7F7EF]"
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
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "rounded-lg px-3 py-2 text-[0.9rem] font-medium transition-colors",
                            active
                              ? "bg-[#E7F7EF] text-[#0B1F33]"
                              : "text-[#0B1F33]/75 hover:bg-[#E7F7EF] hover:text-[#0B1F33]",
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

        <div className="flex items-center gap-2">
          <Link
            href={ROUTES.login}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hidden text-[#0B1F33] hover:bg-[#E7F7EF] hover:text-[#0B1F33] sm:inline-flex",
            )}
          >
            Sign in
          </Link>
          <Link
            href={ROUTES.contact}
            className={cn(
              buttonVariants({ size: "sm" }),
              "home-v2-cta hidden rounded-full px-4 font-semibold sm:inline-flex",
            )}
          >
            Book consult
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="border-[#0B1F33]/15 text-[#0B1F33] lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,22rem)]">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <BrandLogo className="h-14 w-auto" />
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
                      pathname === item.href
                        ? "bg-[#E7F7EF] text-[#0B1F33]"
                        : "text-[#5A6B7A] hover:bg-[#E7F7EF] hover:text-[#0B1F33]",
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="my-3 h-px bg-[#D5E2D9]" />
                <Link
                  href={ROUTES.login}
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full border-[#0B1F33]/15 text-[#0B1F33]",
                  )}
                >
                  Sign in
                </Link>
                <Link
                  href={ROUTES.contact}
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "home-v2-cta w-full rounded-full font-semibold",
                  )}
                >
                  Book consult
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
