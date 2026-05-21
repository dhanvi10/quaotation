"use client";

import { DgvclBadge } from "./dgvcl-badge";
import {
  useQuotationStore,
  getCompanyDisplayName,
  getOfficeAddress,
  getSiteLocation,
} from "@/store/quotation-store";
import { useActiveTheme } from "@/hooks/use-theme-colors";
import { PRIMARY_CONTACT } from "@/data/presets";
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
  const companyLogo = useQuotationStore((s) => s.companyLogo);
  const watermarkImage = useQuotationStore((s) => s.watermarkImage);
  const stampImage = useQuotationStore((s) => s.stampImage);
  const descriptionFontSize = useQuotationStore((s) => s.descriptionFontSize);

  const companyName = getCompanyDisplayName({ companyId, customCompanyName });
  const address = getOfficeAddress(state);
  const site = getSiteLocation(state);

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
        {/* ── Header ─────────────────────────────────────────────────────────
            Layout matches reference:
            [Left: name + phones]  [Center: logo + company + address]  [Right: DGVCL badge]
        ──────────────────────────────────────────────────────────────────── */}
        <header
          className="grid items-start gap-3"
          style={{ gridTemplateColumns: "minmax(0,auto) minmax(0,2fr) minmax(0,auto)" }}
        >
          {/* Col 1 — primary contact name + phones */}
          <div className="flex flex-col gap-0.5 pt-1">
            <p
              className="font-gujarati font-bold leading-snug"
              style={{ color: theme.primary, fontSize: "0.85rem" }}
            >
              {PRIMARY_CONTACT.name}
            </p>
            <p
              className="font-sans font-semibold tabular-nums"
              style={{ color: theme.primary, fontSize: "0.82rem" }}
            >
              મો. {PRIMARY_CONTACT.phone}
            </p>
            {showSecondary && (
              <>
                <p
                  className="mt-1 font-gujarati font-semibold leading-snug"
                  style={{ color: theme.primary, fontSize: "0.82rem" }}
                >
                  {secondaryName}
                </p>
                <p
                  className="font-sans font-semibold tabular-nums"
                  style={{ color: theme.primary, fontSize: "0.82rem" }}
                >
                  મો. {secondaryPhone}
                </p>
              </>
            )}
          </div>

          {/* Col 2 — logo (optional) + company name + address */}
          <div className="flex flex-col items-center text-center">
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
                fontSize: "3rem",
              }}
            >
              {companyName}
            </h1>
            <p
              className="mt-1 font-gujarati font-semibold leading-relaxed"
              style={{ color: theme.accent, fontSize: "0.82rem" }}
            >
              {address}
            </p>
          </div>

          {/* Col 3 — DGVCL badge + optional stamp */}
          <div className="flex flex-col items-end gap-2 pt-1">
            <DgvclBadge />
            {stampImage && (
              <img
                src={stampImage}
                alt="stamp"
                className="h-14 w-14 object-contain opacity-90"
              />
            )}
          </div>
        </header>

        {/* ── Divider under header ── */}
        <div
          className="my-3 h-[2px] w-full rounded-full opacity-20"
          style={{ background: theme.primary }}
        />

        {/* ── Location glass box ── */}
        <div
          className="glass-location rounded-2xl px-5 py-3"
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
        <div className="mt-3 flex-1 space-y-2.5" style={{ color: theme.bodyText }}>
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
