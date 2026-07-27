import type { Metadata } from "next";

import { LoginPageContent } from "@/components/marketing/login-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sign in",
  description: `Sign in to your ${siteConfig.name} account.`,
};

export default function LoginPage() {
  return <LoginPageContent />;
}
