import { connectToDatabase } from "@/lib/db";
import { Lead, type LeadStatus } from "@/models/lead";
import { Application } from "@/models/application";
import { Appointment } from "@/models/appointment";
import { User } from "@/models/user";
import { syncFundingAssessmentsIntoLeads } from "@/services/funding-assessment";

export async function listLeads(limit = 100) {
  await connectToDatabase();
  // Ensure older funding assessments also appear under CRM / Leads.
  try {
    await syncFundingAssessmentsIntoLeads();
  } catch (error) {
    console.error("Funding assessment → lead sync failed:", error);
  }
  return Lead.find().sort({ createdAt: -1 }).limit(limit).lean().exec();
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await connectToDatabase();
  const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true })
    .lean()
    .exec();

  if (!lead) {
    throw new Error("Lead not found.");
  }

  return lead;
}

export async function getAdminOverviewMetrics() {
  await connectToDatabase();

  const [
    leadsTotal,
    leadsNew,
    usersTotal,
    applicationsTotal,
    appointmentsTotal,
  ] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ status: "new" }),
    User.countDocuments(),
    Application.countDocuments(),
    Appointment.countDocuments({ status: "requested" }),
  ]);

  return {
    leadsTotal,
    leadsNew,
    usersTotal,
    applicationsTotal,
    appointmentsRequested: appointmentsTotal,
  };
}
