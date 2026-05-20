import { QUOTATION_THEMES } from "@/data/presets";
import { useQuotationStore } from "@/store/quotation-store";
import type { QuotationTheme } from "@/types/quotation";

export function useActiveTheme(): QuotationTheme & { primary: string; accent: string } {
  const themeId = useQuotationStore((s) => s.themeId);
  const customPrimary = useQuotationStore((s) => s.customPrimary);
  const customAccent = useQuotationStore((s) => s.customAccent);

  const base = QUOTATION_THEMES.find((t) => t.id === themeId) ?? QUOTATION_THEMES[0];

  return {
    ...base,
    primary: customPrimary ?? base.primary,
    accent: customAccent ?? base.accent,
  };
}
