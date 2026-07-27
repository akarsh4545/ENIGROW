import {
  Schema,
  models,
  model,
  type HydratedDocument,
  type Model,
  type Types,
} from "mongoose";

export const APPLICATION_STATUSES = [
  "draft",
  "submitted",
  "in_review",
  "needs_info",
  "approved",
  "rejected",
  "completed",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export interface IApplication {
  userId: Types.ObjectId;
  title: string;
  serviceSlug: string;
  serviceName: string;
  status: ApplicationStatus;
  notes?: string;
  referenceCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ApplicationDocument = HydratedDocument<IApplication>;
export type ApplicationModel = Model<IApplication>;

const applicationSchema = new Schema<IApplication, ApplicationModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    serviceSlug: { type: String, required: true, trim: true, index: true },
    serviceName: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: APPLICATION_STATUSES,
      default: "submitted",
      index: true,
    },
    notes: { type: String, trim: true },
    referenceCode: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true },
);

export const Application =
  (models.Application as ApplicationModel | undefined) ??
  model<IApplication, ApplicationModel>("Application", applicationSchema);
