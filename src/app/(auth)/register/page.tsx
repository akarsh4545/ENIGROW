import type { Metadata } from "next";

import { RegisterPageContent } from "@/components/marketing/register-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Create account",
  description: `Create a ${siteConfig.name} account to manage applications and consultations.`,
};

export default function RegisterPage() {
  return <RegisterPageContent />;
}
