import {
  Schema,
  models,
  model,
  type HydratedDocument,
  type Model,
} from "mongoose";

import {
  LEAD_SOURCES,
  LEAD_STATUSES,
  type LeadSource,
  type LeadStatus,
} from "@/constants/leads";

export type { LeadSource, LeadStatus };
export { LEAD_SOURCES, LEAD_STATUSES };

export interface ILead {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  source: LeadSource;
  status: LeadStatus;
  serviceInterest?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type LeadDocument = HydratedDocument<ILead>;
export type LeadModel = Model<ILead>;

const leadSchema = new Schema<ILead, LeadModel>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    source: {
      type: String,
      enum: LEAD_SOURCES,
      default: "contact",
      index: true,
    },
    status: {
      type: String,
      enum: LEAD_STATUSES,
      default: "new",
      index: true,
    },
    serviceInterest: { type: String, trim: true },
  },
  { timestamps: true },
);

export const Lead =
  (models.Lead as LeadModel | undefined) ??
  model<ILead, LeadModel>("Lead", leadSchema);
