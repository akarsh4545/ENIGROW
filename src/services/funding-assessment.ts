import { connectToDatabase } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { generateFundingReport } from "@/lib/funding/engine";
import {
  FundingAssessment,
  type AssessmentStatus,
} from "@/models/funding-assessment";
import type { FundingAssessmentInput } from "@/validations/funding-assessment";

export async function createFundingAssessment(input: FundingAssessmentInput) {
  await connectToDatabase();
  const report = generateFundingReport(input);

  const doc = await FundingAssessment.create({
    input,
    report,
    status: "new",
  });

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
