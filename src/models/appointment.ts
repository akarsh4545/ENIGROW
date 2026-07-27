import {
  Schema,
  models,
  model,
  type HydratedDocument,
  type Model,
  type Types,
} from "mongoose";

export const APPOINTMENT_STATUSES = [
  "requested",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

export interface IAppointment {
  userId: Types.ObjectId;
  topic: string;
  preferredAt: Date;
  notes?: string;
  status: AppointmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type AppointmentDocument = HydratedDocument<IAppointment>;
export type AppointmentModel = Model<IAppointment>;

const appointmentSchema = new Schema<IAppointment, AppointmentModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    topic: { type: String, required: true, trim: true },
    preferredAt: { type: Date, required: true, index: true },
    notes: { type: String, trim: true },
    status: {
      type: String,
      enum: APPOINTMENT_STATUSES,
      default: "requested",
      index: true,
    },
  },
  { timestamps: true },
);

export const Appointment =
  (models.Appointment as AppointmentModel | undefined) ??
  model<IAppointment, AppointmentModel>("Appointment", appointmentSchema);
