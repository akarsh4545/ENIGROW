import { connectToDatabase } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { Lead } from "@/models/lead";
import type { ContactFormValues } from "@/validations/contact";

export async function createContactLead(input: ContactFormValues) {
  await connectToDatabase();

  const lead = await Lead.create({
    name: input.name,
    email: input.email,
    phone: input.phone || undefined,
    subject: input.subject || undefined,
    message: input.message,
    serviceInterest: input.serviceInterest || undefined,
    source: "contact",
    status: "new",
  });

  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  if (process.env.RESEND_API_KEY && supportEmail) {
    try {
      await sendEmail({
        to: supportEmail,
        subject: `New enquiry from ${input.name}`,
        replyTo: input.email,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6;">
            <h2>New Enigrow enquiry</h2>
            <p><strong>Name:</strong> ${input.name}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            <p><strong>Phone:</strong> ${input.phone || "—"}</p>
            <p><strong>Subject:</strong> ${input.subject || "—"}</p>
            <p><strong>Service interest:</strong> ${input.serviceInterest || "—"}</p>
            <p><strong>Message:</strong></p>
            <p>${input.message.replace(/\n/g, "<br />")}</p>
          </div>
        `,
        text: `New enquiry from ${input.name} (${input.email})\n\n${input.message}`,
        tags: [{ name: "category", value: "contact-lead" }],
      });
    } catch (error) {
      console.error("Contact lead email failed:", error);
    }
  }

  return {
    id: String(lead._id),
  };
}
