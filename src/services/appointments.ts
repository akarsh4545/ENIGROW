import { connectToDatabase } from "@/lib/db";
import { Appointment } from "@/models/appointment";
import type { AppointmentCreateValues } from "@/validations/dashboard";
import type { Types } from "mongoose";

export async function listAppointmentsForUser(userId: string) {
  await connectToDatabase();
  return Appointment.find({ userId }).sort({ preferredAt: 1 }).lean().exec();
}

export async function createAppointmentForUser(
  userId: string,
  input: AppointmentCreateValues,
) {
  await connectToDatabase();

  const preferredAt = new Date(input.preferredAt);
  if (Number.isNaN(preferredAt.getTime())) {
    throw new Error("Invalid preferred date/time.");
  }

  return Appointment.create({
    userId: userId as unknown as Types.ObjectId,
    topic: input.topic,
    preferredAt,
    notes: input.notes || undefined,
    status: "requested",
  });
}
