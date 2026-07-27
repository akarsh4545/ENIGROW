import { siteConfig } from "@/config/site";

export function getWhatsAppUrl(message?: string) {
  const number = (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ??
    siteConfig.whatsappNumber ??
    ""
  ).replace(/\D/g, "");
  if (!number) return null;

  const url = new URL(`https://wa.me/${number}`);
  if (message) {
    url.searchParams.set("text", message);
  }
  return url.toString();
}
