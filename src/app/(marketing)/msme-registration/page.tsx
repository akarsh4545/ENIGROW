import type { Metadata } from "next";

import {
  ServiceRoutePage,
  createServiceMetadata,
} from "@/lib/services/service-page";

export const metadata: Metadata = createServiceMetadata("msme-registration");

export default function Page() {
  return <ServiceRoutePage slug="msme-registration" />;
}
