import Razorpay from "razorpay";
import crypto from "crypto";

let razorpayClient: Razorpay | null = null;

function assertRazorpayEnv() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error(
      "Missing Razorpay env vars. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local.",
    );
  }

  return { keyId, keySecret };
}

export function getRazorpay(): Razorpay {
  if (!razorpayClient) {
    const { keyId, keySecret } = assertRazorpayEnv();
    razorpayClient = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }
  return razorpayClient;
}

export function getRazorpayPublicKey(): string {
  const key =
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? process.env.RAZORPAY_KEY_ID;
  if (!key) {
    throw new Error("Missing NEXT_PUBLIC_RAZORPAY_KEY_ID / RAZORPAY_KEY_ID.");
  }
  return key;
}

/** Amount in INR rupees → paise for Razorpay. */
export function toPaise(amountInRupees: number): number {
  return Math.round(amountInRupees * 100);
}

export async function createRazorpayOrder(options: {
  amountInRupees: number;
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}) {
  const razorpay = getRazorpay();

  return razorpay.orders.create({
    amount: toPaise(options.amountInRupees),
    currency: options.currency ?? "INR",
    receipt: options.receipt,
    notes: options.notes,
  });
}

export function verifyPaymentSignature(options: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const { keySecret } = assertRazorpayEnv();
  const payload = `${options.orderId}|${options.paymentId}`;
  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(payload)
    .digest("hex");

  const expectedBuf = Buffer.from(expected);
  const actualBuf = Buffer.from(options.signature);

  if (expectedBuf.length !== actualBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}
