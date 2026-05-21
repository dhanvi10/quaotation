"use client";

import { useMemo } from "react";
import { DgvclBadge } from "./dgvcl-badge";
import {
  useQuotationStore,
  getCompanyDisplayName,
  getOfficeAddress,
  getSiteLocation,
} from "@/store/quotation-store";
import { useActiveTheme } from "@/hooks/use-theme-colors";
import { PRIMARY_CONTACT, SUBTITLE } from "@/data/presets";
import { formatGujaratiDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { BorderStyle } from "@/types/quotation";

function borderClass(style: BorderStyle): string {
  if (style === "double") return "border-[3px] border-double";
  if (style === "elegant")
    return "border-2 border-solid shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]";
  return "border border-solid";
}

const FONT_SIZE_MAP = {
  sm: "text-[11px]",
  base: "text-[13px]",
  lg: "text-[15px]",
} as const;

export function QuotationPaper({ id }: { id?: string }) {
  const theme = useActiveTheme();
  const borderStyle = useQuotationStore((s) => s.borderStyle);
  const companyId = useQuotationStore((s) => s.companyId);
  const customCompanyName = useQuotationStore((s) => s.customCompanyName);
  const showSecondary = useQuotationStore((s) => s.showSecondaryContact);
  const secondaryName = useQuotationStore((s) => s.secondaryContactName);
  const secondaryPhone = useQuotationStore((s) => s.secondaryContactPhone);
  const state = useQuotationStore();
  const clauses = useQuotationStore((s) => s.clauses);
  const footerNote = useQuotationStore((s) => s.footerNote);
  const quotationNumber = useQuotationStore((s) => s.quotationNumber);
  const quotationDate = useQuotationStore((s) => s.quotationDate);
  const companyLogo = useQuotationStore((s) => s.companyLogo);
  const watermarkImage = useQuotationStore((s) => s.watermarkImage);
  const stampImage = useQuotationStore((s) => s.stampImage);
  const descriptionFontSize = useQuotationStore((s) => s.descriptionFontSize);

  const companyName = getCompanyDisplayName({ companyId, customCompanyName });
  const address = getOfficeAddress(state);
  const site = getSiteLocation(state);

  const formattedDate = useMemo(() => {
    try {
      return formatGujaratiDate(new Date(quotationDate));
    } catch {
      return quotationDate;
    }
  }, [quotationDate]);

  const paperStyle = {
    "--q-primary": theme.primary,
    "--q-accent": theme.accent,
    background: theme.paperBg,
    borderColor: theme.primary,
  } as React.CSSProperties;

  return (
    <article
      id={id}
      className="quotation-paper relative mx-auto w-[210mm] min-h-[297mm] overflow-x-hidden print:shadow-none"
      style={paperStyle}
    >
      {/* ── Watermark ── */}
      {watermarkImage ? (
        <img
          src={watermarkImage}
          alt=""
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-contain opacity-[0.06]"
        />
      ) : (
        <div
          className="pointer-events-none absolute bottom-[18%] right-[12%] z-0 h-48 w-24 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 120'%3E%3Crect x='27' y='0' width='6' height='100' fill='${encodeURIComponent(theme.primary)}'/%3E%3Cline x1='0' y1='18' x2='60' y2='18' stroke='${encodeURIComponent(theme.primary)}' stroke-width='3'/%3E%3Cline x1='5' y1='38' x2='55' y2='38' stroke='${encodeURIComponent(theme.primary)}' stroke-width='3'/%3E%3C/svg%3E")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      {/* ── Inner bordered content ── */}
      <div
        className={cn(
          "relative z-10 m-3 flex min-h-[calc(297mm-24px)] flex-col p-5",
          borderClass(borderStyle)
        )}
        style={{ borderColor: theme.primary }}
      >
        {/* ── Meta row ── */}
        <div
          className="mb-3 flex flex-wrap justify-between gap-2 font-sans text-[10px] text-slate-600"
          suppressHydrationWarning
        >
          <span suppressHydrationWarning>
            <strong>ક્વોટે. નં:</strong> {quotationNumber}
          </span>
          <span suppressHydrationWarning>
            <strong>તારીખ:</strong> {formattedDate}
          </span>
        </div>

        {/* ── Header — 3-column grid, NO responsive breakpoints (must work at print width) ── */}
        <header
          className="grid gap-3"
          style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1.5fr) minmax(0,1fr)", alignItems: "start" }}
        >
          {/* Col 1 — subtitle tag */}
          <div className="min-w-0 self-start">
            <div
              className="inline-block rounded-br-2xl px-4 py-2 text-[11px] font-bold leading-snug text-white shadow-md"
              style={{ background: theme.headerGradient }}
            >
              {SUBTITLE}
            </div>
          </div>

          {/* Col 2 — company name + address */}
          <div className="min-w-0 overflow-visible px-1 text-center">
            {companyLogo && (
              <img
                src={companyLogo}
                alt=""
                className="mx-auto mb-2 h-14 w-auto object-contain"
              />
            )}
            <h1
              className="company-gradient-text font-display font-extrabold tracking-tight"
              style={{
                backgroundImage: theme.headerGradient,
                fontSize: "1.75rem",
                lineHeight: 1.4,
              }}
            >
              {companyName}
            </h1>
            <p
              className="mt-1.5 font-gujarati font-semibold leading-relaxed"
              style={{ color: theme.accent, fontSize: "0.8rem" }}
            >
              {address}
            </p>
          </div>

          {/* Col 3 — contacts + DGVCL badge */}
          <div className="flex min-w-0 flex-col items-end gap-1 text-right">
            <p className="font-gujarati text-sm font-bold text-slate-900">
              {PRIMARY_CONTACT.name}
            </p>
            <p className="font-sans text-sm font-semibold text-slate-700">
              મો. {PRIMARY_CONTACT.phone}
            </p>
            {showSecondary && (
              <>
                <p className="mt-0.5 font-gujarati text-xs font-semibold text-slate-800">
                  {secondaryName}
                </p>
                <p className="font-sans text-sm text-slate-600">મો. {secondaryPhone}</p>
              </>
            )}
            <div className="mt-2 flex justify-end">
              <DgvclBadge />
            </div>
            {stampImage && (
              <img
                src={stampImage}
                alt="stamp"
                className="mt-2 ml-auto h-16 w-16 object-contain opacity-90"
              />
            )}
          </div>
        </header>

        {/* ── Location glass box ── */}
        <div
          className="glass-location my-4 rounded-2xl px-5 py-3"
          style={{
            background: theme.locationBg,
            border: `2px solid ${theme.locationBorder}`,
            boxShadow: `0 8px 32px -8px ${theme.primary}33`,
          }}
        >
          <p
            className="font-display text-lg font-bold leading-snug"
            style={{ color: theme.primary }}
          >
            <span className="mr-2">સ્થળ :</span>
            <span className="font-gujarati font-semibold" style={{ color: theme.accent }}>
              {site || "—"}
            </span>
          </p>
        </div>

        {/* ── Clauses ── */}
        <div className="flex-1 space-y-2.5" style={{ color: theme.bodyText }}>
          {clauses.map((clause, i) => {
            const text = clause.html.replace(/<[^>]+>/g, "").trim();
            if (!text) return null;
            return (
              <div
                key={clause.id}
                className={cn(
                  "flex gap-2 leading-relaxed",
                  FONT_SIZE_MAP[descriptionFontSize ?? "base"]
                )}
              >
                <span
                  className="mt-0.5 shrink-0 font-display text-sm font-bold"
                  style={{ color: theme.primary }}
                >
                  ({i + 1})
                </span>
                <div
                  className="clause-content flex-1 text-justify font-gujarati"
                  dangerouslySetInnerHTML={{ __html: clause.html }}
                />
              </div>
            );
          })}
        </div>

        {footerNote.trim() && (
          <p
            className="mt-4 text-right font-gujarati text-sm font-bold"
            style={{ color: theme.primary }}
          >
            {footerNote}
          </p>
        )}

        {/* ── Signatures ── */}
        <footer className="mt-6 grid grid-cols-[1fr_3px_1fr] gap-0 pt-4">
          <div
            className="flex min-h-[72px] items-start justify-center rounded-tl-xl p-3"
            style={{ background: theme.sigBg }}
          >
            <span className="font-display text-sm font-bold" style={{ color: theme.primary }}>
              કામ આપનારની સહી
            </span>
          </div>
          <div style={{ background: theme.primary }} />
          <div
            className="flex min-h-[72px] items-start justify-center rounded-tr-xl p-3"
            style={{ background: theme.sigBg }}
          >
            <span className="font-display text-sm font-bold" style={{ color: theme.primary }}>
              કામ લેનારની સહી
            </span>
          </div>
        </footer>
      </div>
    </article>
  );
}
