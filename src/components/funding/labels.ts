import {
  type BUSINESS_ENTITY_TYPES,
  type BUSINESS_STAGES_FUNDING,
  type EMPLOYEE_BANDS,
  type FUNDING_BANDS,
  type FUNDING_PURPOSES,
  type INDUSTRIES,
  type TURNOVER_BANDS,
  type YEARS_BANDS,
} from "@/validations/funding-assessment";

export const entityLabels: Record<
  (typeof BUSINESS_ENTITY_TYPES)[number],
  string
> = {
  proprietorship: "Proprietorship",
  partnership: "Partnership",
  llp: "LLP",
  private_limited: "Private Limited",
  opc: "OPC",
  startup: "Startup",
  ngo: "NGO",
  others: "Others",
};

export const stageLabels: Record<
  (typeof BUSINESS_STAGES_FUNDING)[number],
  string
> = {
  idea: "Idea",
  early_revenue: "Early Revenue",
  growing: "Growing",
  established: "Established",
};

export const yearsLabels: Record<(typeof YEARS_BANDS)[number], string> = {
  "0": "Not started yet",
  under_1: "Under 1 year",
  "1_2": "1–2 years",
  "2_5": "2–5 years",
  "5_plus": "5+ years",
};

export const turnoverLabels: Record<(typeof TURNOVER_BANDS)[number], string> = {
  under_10l: "Under ₹10L",
  "10l_50l": "₹10L–₹50L",
  "50l_1cr": "₹50L–₹1 Cr",
  "1cr_5cr": "₹1 Cr–₹5 Cr",
  "5cr_plus": "₹5 Cr+",
};

export const fundingLabels: Record<(typeof FUNDING_BANDS)[number], string> = {
  under_5l: "Under ₹5L",
  "5l_10l": "₹5L–₹10L",
  "10l_25l": "₹10L–₹25L",
  "25l_50l": "₹25L–₹50L",
  "50l_1cr": "₹50L–₹1 Cr",
  "1cr_plus": "₹1 Cr+",
};

export const purposeLabels: Record<(typeof FUNDING_PURPOSES)[number], string> =
  {
    working_capital: "Working capital",
    machinery: "Machinery / equipment",
    expansion: "Business expansion",
    inventory: "Inventory",
    marketing: "Marketing / growth",
    new_unit: "New unit / greenfield",
    debt_refinance: "Debt refinance",
    other: "Other",
  };

export const industryLabels: Record<(typeof INDUSTRIES)[number], string> = {
  manufacturing: "Manufacturing",
  trading: "Trading",
  services: "Services",
  food_agro: "Food & Agro",
  retail: "Retail",
  technology: "Technology",
  healthcare: "Healthcare",
  education: "Education",
  textiles: "Textiles",
  construction: "Construction",
  other: "Other",
};

export const employeeLabels: Record<(typeof EMPLOYEE_BANDS)[number], string> = {
  "1": "Just me",
  "2_5": "2–5",
  "6_20": "6–20",
  "21_50": "21–50",
  "50_plus": "50+",
};

export const STORAGE_KEY = "enigrow-funding-assessment-v1";
