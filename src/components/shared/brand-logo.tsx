import Image from "next/image";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const brandLogo = {
  src: "/brand/enigrow-logo.jpg",
  width: 1024,
  height: 682,
  alt: `${siteConfig.name} — सफलता की सही शुरुआत`,
} as const;

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Image
      src={brandLogo.src}
      alt={brandLogo.alt}
      width={brandLogo.width}
      height={brandLogo.height}
      priority={priority}
      className={cn(
        "h-12 w-auto rounded-md bg-white object-contain",
        className,
      )}
    />
  );
}
