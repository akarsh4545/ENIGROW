import { connectToDatabase } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { generateFundingReport } from "@/lib/funding/engine";
import {
  FundingAssessment,
  type AssessmentStatus,
} from "@/models/funding-assessment";
import { Lead } from "@/models/lead";
import type { FundingAssessmentInput } from "@/validations/funding-assessment";

export async function createFundingAssessment(input: FundingAssessmentInput) {
  await connectToDatabase();
  const report = generateFundingReport(input);

  const doc = await FundingAssessment.create({
    input,
    report,
    status: "new",
  });

  // Mirror into CRM / Leads so super admin sees every public enquiry in one place.
  try {
    await Lead.create({
      name: input.founderName,
      email: input.email,
      phone: input.phone,
      subject: "Funding eligibility assessment",
      serviceInterest: `Funding — ${input.fundingRequired}`,
      source: "funding_assessment",
      status: "new",
      message: [
        `Assessment ID: ${String(doc._id)}`,
        `Business: ${input.businessName}`,
        `Location: ${input.city}, ${input.state}`,
        `Industry: ${input.industry}`,
        `Entity: ${input.businessType}`,
        `Stage: ${input.businessStage}`,
        `Funding ask: ${input.fundingRequired}`,
        `Purpose: ${input.fundingPurpose}`,
        `Score: ${report.scores.overall}/100`,
        `Best category: ${report.bestCategory}`,
        `Est. max funding: ${report.estimatedMaxFunding}`,
      ].join("\n"),
    });
  } catch (error) {
    console.error("Funding assessment CRM lead sync failed:", error);
  }

  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  if (process.env.RESEND_API_KEY && supportEmail) {
    try {
      await sendEmail({
        to: supportEmail,
        subject: `New funding assessment — ${input.businessName}`,
        replyTo: input.email,
        html: `
          <div style="font-family:sans-serif;line-height:1.6">
            <h2>New funding eligibility assessment</h2>
            <p><strong>Business:</strong> ${input.businessName}</p>
            <p><strong>Founder:</strong> ${input.founderName}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            <p><strong>Phone:</strong> ${input.phone}</p>
            <p><strong>Funding required:</strong> ${input.fundingRequired}</p>
            <p><strong>Overall score:</strong> ${report.scores.overall}/100</p>
            <p><strong>Best category:</strong> ${report.bestCategory}</p>
            <p><strong>Est. max funding:</strong> ${report.estimatedMaxFunding}</p>
          </div>
        `,
        text: `New assessment from ${input.founderName} (${input.businessName}) — score ${report.scores.overall}`,
        tags: [{ name: "category", value: "funding-assessment" }],
      });
    } catch (error) {
      console.error("Funding assessment email failed:", error);
    }
  }

  return {
    id: String(doc._id),
    report,
  };
}

export async function listFundingAssessments(limit = 100) {
  await connectToDatabase();
  return FundingAssessment.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean()
    .exec();
}

/**
 * Copy any funding assessments that are missing from CRM / Leads
 * (covers submissions that landed only in Funding Assessments before sync).
 */
export async function syncFundingAssessmentsIntoLeads(limit = 500) {
  await connectToDatabase();

  const [assessments, existingLeadCount] = await Promise.all([
    FundingAssessment.find().sort({ createdAt: -1 }).limit(limit).lean().exec(),
    Lead.countDocuments({ source: "funding_assessment" }),
  ]);

  if (assessments.length === 0 || existingLeadCount >= assessments.length) {
    return { synced: 0, skipped: assessments.length };
  }

  let synced = 0;
  for (const assessment of assessments) {
    const id = String(assessment._id);
    const input = assessment.input;
    const report = assessment.report;
    if (!input?.email || !input?.founderName) continue;

    const already = await Lead.exists({
      source: "funding_assessment",
      email: input.email.toLowerCase(),
      $or: [
        { message: { $regex: `Assessment ID: ${id}` } },
        {
          phone: input.phone,
          message: {
            $regex: `Business: ${input.businessName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
          },
        },
      ],
    });
    if (already) continue;

    await Lead.create({
      name: input.founderName,
      email: input.email,
      phone: input.phone,
      subject: "Funding eligibility assessment",
      serviceInterest: `Funding — ${input.fundingRequired}`,
      source: "funding_assessment",
      status:
        assessment.status === "contacted" || assessment.status === "qualified"
          ? assessment.status
          : "new",
      message: [
        `Assessment ID: ${id}`,
        `Business: ${input.businessName}`,
        `Location: ${input.city}, ${input.state}`,
        `Industry: ${input.industry}`,
        `Entity: ${input.businessType}`,
        `Stage: ${input.businessStage}`,
        `Funding ask: ${input.fundingRequired}`,
        `Purpose: ${input.fundingPurpose}`,
        `Score: ${report?.scores?.overall ?? "—"}/100`,
        `Best category: ${report?.bestCategory ?? "—"}`,
        `Est. max funding: ${report?.estimatedMaxFunding ?? "—"}`,
      ].join("\n"),
      createdAt: assessment.createdAt,
      updatedAt: assessment.updatedAt,
    });
    synced += 1;
  }

  return { synced, skipped: assessments.length - synced };
}

export async function updateFundingAssessmentStatus(
  id: string,
  status: AssessmentStatus,
  notes?: string,
) {
  await connectToDatabase();
  const update: { status: AssessmentStatus; notes?: string } = { status };
  if (notes !== undefined) update.notes = notes;
  const doc = await FundingAssessment.findByIdAndUpdate(id, update, {
    new: true,
  })
    .lean()
    .exec();
  if (!doc) throw new Error("Assessment not found.");
  return doc;
}
