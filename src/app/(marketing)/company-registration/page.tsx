import type { Metadata } from "next";

import {
  ServiceRoutePage,
  createServiceMetadata,
} from "@/lib/services/service-page";

export const metadata: Metadata = createServiceMetadata("company-registration");

export default function Page() {
  return <ServiceRoutePage slug="company-registration" />;
}
