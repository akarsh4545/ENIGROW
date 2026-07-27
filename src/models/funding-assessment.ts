import {
  Schema,
  models,
  model,
  type HydratedDocument,
  type Model,
} from "mongoose";

import type {
  FundingAssessmentInput,
  FundingReport,
} from "@/validations/funding-assessment";

export const ASSESSMENT_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "closed",
] as const;

export type AssessmentStatus = (typeof ASSESSMENT_STATUSES)[number];

export interface IFundingAssessment {
  input: FundingAssessmentInput;
  report: FundingReport;
  status: AssessmentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type FundingAssessmentDocument = HydratedDocument<IFundingAssessment>;
export type FundingAssessmentModel = Model<IFundingAssessment>;

const fundingAssessmentSchema = new Schema<
  IFundingAssessment,
  FundingAssessmentModel
>(
  {
    input: { type: Schema.Types.Mixed, required: true },
    report: { type: Schema.Types.Mixed, required: true },
    status: {
      type: String,
      enum: ASSESSMENT_STATUSES,
      default: "new",
      index: true,
    },
    notes: { type: String, trim: true },
  },
  { timestamps: true },
);

fundingAssessmentSchema.index({ "input.email": 1, createdAt: -1 });
fundingAssessmentSchema.index({ "input.phone": 1 });

export const FundingAssessment =
  (models.FundingAssessment as FundingAssessmentModel | undefined) ??
  model<IFundingAssessment, FundingAssessmentModel>(
    "FundingAssessment",
    fundingAssessmentSchema,
  );
