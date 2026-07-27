import { z } from "zod";

export const BUSINESS_ENTITY_TYPES = [
  "proprietorship",
  "partnership",
  "llp",
  "private_limited",
  "opc",
  "startup",
  "ngo",
  "others",
] as const;

export const BUSINESS_STAGES_FUNDING = [
  "idea",
  "early_revenue",
  "growing",
  "established",
] as const;

export const FUNDING_PURPOSES = [
  "working_capital",
  "machinery",
  "expansion",
  "inventory",
  "marketing",
  "new_unit",
  "debt_refinance",
  "other",
] as const;

export const INDUSTRIES = [
  "manufacturing",
  "trading",
  "services",
  "food_agro",
  "retail",
  "technology",
  "healthcare",
  "education",
  "textiles",
  "construction",
  "other",
] as const;

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Other",
] as const;

export const TURNOVER_BANDS = [
  "under_10l",
  "10l_50l",
  "50l_1cr",
  "1cr_5cr",
  "5cr_plus",
] as const;

export const FUNDING_BANDS = [
  "under_5l",
  "5l_10l",
  "10l_25l",
  "25l_50l",
  "50l_1cr",
  "1cr_plus",
] as const;

export const YEARS_BANDS = ["0", "under_1", "1_2", "2_5", "5_plus"] as const;

export const EMPLOYEE_BANDS = ["1", "2_5", "6_20", "21_50", "50_plus"] as const;

export const yesNo = z.enum(["yes", "no"]);

export const fundingAssessmentSchema = z.object({
  // Step 1
  businessName: z.string().trim().min(2).max(120),
  founderName: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8).max(20),
  state: z.enum(INDIAN_STATES),
  city: z.string().trim().min(2).max(80),
  industry: z.enum(INDUSTRIES),
  businessCategory: z.string().trim().min(2).max(80),
  businessType: z.enum(BUSINESS_ENTITY_TYPES),

  // Step 2
  businessStage: z.enum(BUSINESS_STAGES_FUNDING),
  yearsInBusiness: z.enum(YEARS_BANDS),
  annualTurnover: z.enum(TURNOVER_BANDS),
  monthlyRevenue: z.enum(TURNOVER_BANDS),
  employees: z.enum(EMPLOYEE_BANDS),
  fundingRequired: z.enum(FUNDING_BANDS),
  fundingPurpose: z.enum(FUNDING_PURPOSES),
  existingLoan: yesNo,

  // Step 3
  gstRegistered: yesNo,
  udyamRegistered: yesNo,
  dpiitStartup: yesNo,
  womanFounder: yesNo,
  scStFounder: yesNo,
  exportBusiness: yesNo,
  manufacturingUnit: yesNo,
  creditScore: z.number().int().min(300).max(900).optional(),
});

export type FundingAssessmentInput = z.infer<typeof fundingAssessmentSchema>;

export type EligibilityTier =
  "eligible" | "likely" | "needs_improvement" | "not_eligible";

export type FundingProgramMatch = {
  id: string;
  name: string;
  category: string;
  tier: EligibilityTier;
  amountRange: string;
  approvalProbability: number;
  whyMatches: string[];
  conditions: string[];
  documents: string[];
  nextSteps: string[];
  timeline: string;
  href: string;
};

export type FundingInsight = {
  id: string;
  text: string;
};

export type FundingAction = {
  id: string;
  title: string;
  detail: string;
  priority: "high" | "medium" | "low";
};

export type FundingReportScores = {
  overall: number;
  readiness: number;
  approvalProbability: number;
  businessStrength: number;
  documentation: number;
  financialHealth: number;
  growthPotential: number;
};

export type FundingReport = {
  scores: FundingReportScores;
  estimatedMaxFunding: string;
  bestCategory: string;
  programs: FundingProgramMatch[];
  insights: FundingInsight[];
  actions: FundingAction[];
  generatedAt: string;
};
