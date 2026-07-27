import type { Metadata } from "next";

import {
  ServiceRoutePage,
  createServiceMetadata,
} from "@/lib/services/service-page";

export const metadata: Metadata = createServiceMetadata("iso-certification");

export default function Page() {
  return <ServiceRoutePage slug="iso-certification" />;
}
