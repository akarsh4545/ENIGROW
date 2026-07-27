import type { Metadata } from "next";

import {
  ServiceRoutePage,
  createServiceMetadata,
} from "@/lib/services/service-page";

export const metadata: Metadata = createServiceMetadata("digital-marketing");

export default function Page() {
  return <ServiceRoutePage slug="digital-marketing" />;
}
