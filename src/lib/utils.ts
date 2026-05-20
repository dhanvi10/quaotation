import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatGujaratiDate(date: Date): string {
  const gujMonths = [
    "જાન્યુઆરી",
    "ફેબ્રુઆરી",
    "માર્ચ",
    "એપ્રિલ",
    "મે",
    "જૂન",
    "જુલાઈ",
    "ઑગસ્ટ",
    "સપ્ટેમ્બર",
    "ઑક્ટોબર",
    "નવેમ્બર",
    "ડિસેમ્બર",
  ];
  const d = date.getDate();
  const m = gujMonths[date.getMonth()];
  const y = date.getFullYear();
  return `${d} ${m}, ${y}`;
}

export function generateQuotationNumber(): string {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const r = Math.floor(Math.random() * 900 + 100);
  return `SE/${y}${m}/${r}`;
}
