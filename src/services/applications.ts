import { connectToDatabase } from "@/lib/db";
import { Application } from "@/models/application";
import type { ApplicationCreateValues } from "@/validations/dashboard";
import type { Types } from "mongoose";

function referenceCode() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `EG-${stamp}-${rand}`;
}

export async function listApplicationsForUser(userId: string) {
  await connectToDatabase();
  return Application.find({ userId }).sort({ createdAt: -1 }).lean().exec();
}

export async function createApplicationForUser(
  userId: string,
  input: ApplicationCreateValues,
) {
  await connectToDatabase();

  const application = await Application.create({
    userId: userId as unknown as Types.ObjectId,
    title: `${input.serviceName} application`,
    serviceSlug: input.serviceSlug,
    serviceName: input.serviceName,
    notes: input.notes || undefined,
    status: "submitted",
    referenceCode: referenceCode(),
  });

  return application;
}
