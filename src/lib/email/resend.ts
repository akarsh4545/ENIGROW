import { Resend } from "resend";

let resendClient: Resend | null = null;

function assertResendApiKey(): string {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing RESEND_API_KEY. Add it to .env.local (see .env.example).",
    );
  }
  return apiKey;
}

export function getResend(): Resend {
  if (!resendClient) {
    resendClient = new Resend(assertResendApiKey());
  }
  return resendClient;
}

export function getDefaultFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL ?? "Enigrow <onboarding@resend.dev>";
}

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string | string[];
  tags?: { name: string; value: string }[];
};

export async function sendEmail(input: SendEmailInput) {
  const resend = getResend();

  const { data, error } = await resend.emails.send({
    from: getDefaultFromEmail(),
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
    replyTo: input.replyTo,
    tags: input.tags,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function sendWelcomeEmail(options: { to: string; name: string }) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Enigrow";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return sendEmail({
    to: options.to,
    subject: `Welcome to ${appName}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #0f172a;">
        <h1 style="margin-bottom: 8px;">Welcome, ${options.name}</h1>
        <p>Your ${appName} account is ready. You can manage applications, bookings, and documents from your dashboard.</p>
        <p>
          <a href="${appUrl}/login" style="display:inline-block;padding:10px 16px;background:#1f5f6b;color:#fff;text-decoration:none;border-radius:8px;">
            Go to dashboard
          </a>
        </p>
      </div>
    `,
    text: `Welcome, ${options.name}. Your ${appName} account is ready. Visit ${appUrl}/login`,
    tags: [{ name: "category", value: "welcome" }],
  });
}
