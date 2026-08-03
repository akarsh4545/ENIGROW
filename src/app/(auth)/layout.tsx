import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Auth pages shell (login / register).
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
