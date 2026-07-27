import type { Metadata } from "next";

import {
  ServiceRoutePage,
  createServiceMetadata,
} from "@/lib/services/service-page";

export const metadata: Metadata = createServiceMetadata("accounting");

export default function Page() {
  return <ServiceRoutePage slug="accounting" />;
}
